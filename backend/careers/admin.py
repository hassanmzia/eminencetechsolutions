from django.contrib import admin
from .models import JobPosting, JobApplication


@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'employment_type', 'experience_level', 'location_type', 'is_active']
    list_filter = ['department', 'employment_type', 'experience_level', 'location_type', 'is_active']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'job', 'status', 'created_at']
    list_filter = ['status', 'job']
    search_fields = ['first_name', 'last_name', 'email']
    readonly_fields = ['created_at', 'updated_at']
