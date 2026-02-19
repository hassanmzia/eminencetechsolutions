from rest_framework import serializers
from .models import ConsultingInquiry, ConsultingEngagement


class ConsultingInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultingInquiry
        fields = [
            'id', 'company_name', 'contact_name', 'contact_title',
            'email', 'phone', 'company_website', 'industry', 'company_size',
            'service_type', 'project_title', 'project_description',
            'business_objectives', 'current_technology_stack',
            'timeline', 'budget_range', 'urgency', 'how_did_you_hear',
            'additional_notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ConsultingEngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultingEngagement
        fields = '__all__'
