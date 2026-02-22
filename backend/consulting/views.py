import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ConsultingInquiry
from .serializers import ConsultingInquirySerializer

logger = logging.getLogger(__name__)


class ConsultingInquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ConsultingInquiry.objects.all()
    serializer_class = ConsultingInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Send email notification to admin
        try:
            send_mail(
                subject=f'[ETS Consulting] New inquiry from {inquiry.company_name}',
                message=(
                    f'New consulting inquiry received:\n\n'
                    f'Company: {inquiry.company_name}\n'
                    f'Contact: {inquiry.contact_name} ({inquiry.contact_title or "N/A"})\n'
                    f'Email: {inquiry.email}\n'
                    f'Phone: {inquiry.phone or "N/A"}\n'
                    f'Industry: {inquiry.industry or "N/A"}\n'
                    f'Company Size: {inquiry.company_size or "N/A"}\n\n'
                    f'Service Type: {inquiry.service_type}\n'
                    f'Project Title: {inquiry.project_title}\n'
                    f'Budget Range: {inquiry.budget_range}\n'
                    f'Urgency: {inquiry.urgency}\n'
                    f'Timeline: {inquiry.timeline or "N/A"}\n\n'
                    f'Project Description:\n{inquiry.project_description}\n\n'
                    f'Business Objectives:\n{inquiry.business_objectives or "N/A"}\n\n'
                    f'Additional Notes:\n{inquiry.additional_notes or "N/A"}'
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception:
            logger.exception('Failed to send consulting inquiry notification email')

        return Response(
            {
                'message': 'Your consulting inquiry has been submitted successfully. Our team will contact you within 24 hours.',
                'inquiry_id': str(inquiry.id),
            },
            status=status.HTTP_201_CREATED
        )


@api_view(['GET'])
def service_types(request):
    return Response({
        'service_types': [
            {'value': choice[0], 'label': choice[1]}
            for choice in ConsultingInquiry.SERVICE_TYPES
        ],
        'urgency_levels': [
            {'value': choice[0], 'label': choice[1]}
            for choice in ConsultingInquiry.URGENCY_LEVELS
        ],
        'budget_ranges': [
            {'value': choice[0], 'label': choice[1]}
            for choice in ConsultingInquiry.BUDGET_RANGES
        ],
    })
