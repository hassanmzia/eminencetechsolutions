from django.contrib import admin
from .models import ConsultingInquiry, ConsultingEngagement


@admin.register(ConsultingInquiry)
class ConsultingInquiryAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'contact_name', 'service_type', 'urgency', 'status', 'created_at']
    list_filter = ['service_type', 'urgency', 'status', 'budget_range']
    search_fields = ['company_name', 'contact_name', 'email', 'project_title']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(ConsultingEngagement)
class ConsultingEngagementAdmin(admin.ModelAdmin):
    list_display = ['title', 'phase', 'start_date', 'target_end_date', 'is_active']
    list_filter = ['phase', 'is_active']
