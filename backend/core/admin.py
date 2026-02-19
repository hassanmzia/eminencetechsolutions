from django.contrib import admin
from .models import (
    Service, CaseStudy, TeamMember, Testimonial,
    BlogPost, Partner, CompanyMetric
)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ['title', 'industry', 'is_featured', 'is_active']
    list_filter = ['industry', 'is_featured', 'is_active']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'order', 'is_active']
    list_filter = ['is_active']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company', 'rating', 'is_featured']
    list_filter = ['rating', 'is_featured']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_published', 'published_at']
    list_filter = ['category', 'is_published']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'partnership_type', 'order', 'is_active']
    list_filter = ['partnership_type', 'is_active']


@admin.register(CompanyMetric)
class CompanyMetricAdmin(admin.ModelAdmin):
    list_display = ['label', 'value', 'order', 'is_active']
