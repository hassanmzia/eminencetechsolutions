from rest_framework import serializers
from .models import (
    Service, CaseStudy, TeamMember, Testimonial,
    BlogPost, Partner, CompanyMetric
)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'short_description', 'icon', 'technologies']


class CaseStudySerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)

    class Meta:
        model = CaseStudy
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'


class BlogPostListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'author_name', 'category', 'tags', 'published_at']


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'


class CompanyMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyMetric
        fields = '__all__'
