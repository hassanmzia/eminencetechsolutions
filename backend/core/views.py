from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import (
    Service, CaseStudy, TeamMember, Testimonial,
    BlogPost, Partner, CompanyMetric
)
from .serializers import (
    ServiceSerializer, ServiceListSerializer, CaseStudySerializer,
    TeamMemberSerializer, TestimonialSerializer, BlogPostSerializer,
    BlogPostListSerializer, PartnerSerializer, CompanyMetricSerializer
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer


class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CaseStudy.objects.filter(is_active=True)
    serializer_class = CaseStudySerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['industry', 'is_featured']
    search_fields = ['title', 'challenge', 'solution']


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_featured']


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'content', 'tags']

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.filter(is_active=True)
    serializer_class = PartnerSerializer


class CompanyMetricViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyMetric.objects.filter(is_active=True)
    serializer_class = CompanyMetricSerializer


@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy', 'service': 'Eminence Tech Solutions API'})
