from rest_framework import serializers
from .models import JobPosting, JobApplication


class JobPostingSerializer(serializers.ModelSerializer):
    application_count = serializers.SerializerMethodField()

    class Meta:
        model = JobPosting
        fields = '__all__'

    def get_application_count(self, obj):
        return obj.applications.count()


class JobPostingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = [
            'id', 'title', 'slug', 'department', 'employment_type',
            'experience_level', 'location', 'location_type', 'salary_range',
            'skills', 'created_at'
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 'job', 'first_name', 'last_name', 'email', 'phone',
            'linkedin_url', 'portfolio_url', 'resume', 'cover_letter',
            'years_of_experience', 'skills', 'availability', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_resume(self, value):
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Resume file size must be under 10MB.")
        allowed_types = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        if value.content_type not in allowed_types:
            raise serializers.ValidationError("Only PDF and Word documents are accepted.")
        return value
