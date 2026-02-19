from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import JobPosting, JobApplication
from .serializers import (
    JobPostingSerializer, JobPostingListSerializer, JobApplicationSerializer
)


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
