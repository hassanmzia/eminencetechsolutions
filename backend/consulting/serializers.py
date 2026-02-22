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
        extra_kwargs = {
            'contact_title': {'required': False, 'allow_blank': True},
            'phone': {'required': False, 'allow_blank': True},
            'company_website': {'required': False, 'allow_blank': True},
            'company_size': {'required': False, 'allow_blank': True},
            'business_objectives': {'required': False, 'allow_blank': True},
            'current_technology_stack': {'required': False, 'allow_blank': True},
            'timeline': {'required': False, 'allow_blank': True},
            'budget_range': {'required': False},
            'urgency': {'required': False},
            'how_did_you_hear': {'required': False, 'allow_blank': True},
            'additional_notes': {'required': False, 'allow_blank': True},
        }


class ConsultingEngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultingEngagement
        fields = '__all__'
