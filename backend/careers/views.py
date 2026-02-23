import logging

import requests
from django.conf import settings
from django.core.cache import cache
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import JobPosting, JobApplication
from .serializers import (
    JobPostingSerializer, JobPostingListSerializer, JobApplicationSerializer
)

logger = logging.getLogger(__name__)


class JobPostingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobPosting.objects.filter(is_active=True)
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['department', 'employment_type', 'experience_level', 'location_type']
    search_fields = ['title', 'description', 'skills']

    def get_serializer_class(self):
        if self.action == 'list':
            return JobPostingListSerializer
        return JobPostingSerializer


class JobApplicationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        application = serializer.save()
        return Response(
            {
                'message': 'Application submitted successfully.',
                'application_id': str(application.id),
            },
            status=status.HTTP_201_CREATED
        )


CACHE_KEY = 'fairhire_openings'
CACHE_TTL = 300  # 5 minutes


@api_view(['GET'])
def fairhire_openings(request):
    """Proxy open job listings from the FairHire platform."""
    cached = cache.get(CACHE_KEY)
    if cached is not None:
        return Response(cached)

    api_url = getattr(settings, 'FAIRHIRE_API_URL', '')
    api_token = getattr(settings, 'FAIRHIRE_API_TOKEN', '')

    if not api_url or not api_token:
        return Response({'results': [], 'source': 'fairhire', 'error': 'not_configured'})

    try:
        resp = requests.get(
            f'{api_url.rstrip("/")}/jobs/',
            params={'status': 'open', 'page_size': 50},
            headers={'Authorization': f'Token {api_token}'},
            timeout=10,
            verify=True,
        )
        resp.raise_for_status()
        data = resp.json()

        # Normalize: FairHire uses DRF pagination → {count, results}
        jobs = data.get('results', data) if isinstance(data, dict) else data
        payload = {'results': jobs, 'source': 'fairhire'}
        cache.set(CACHE_KEY, payload, CACHE_TTL)
        return Response(payload)
    except Exception:
        logger.exception('Failed to fetch jobs from FairHire')
        return Response({'results': [], 'source': 'fairhire', 'error': 'unavailable'})
