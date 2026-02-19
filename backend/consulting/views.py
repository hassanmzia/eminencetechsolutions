from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ConsultingInquiry
from .serializers import ConsultingInquirySerializer


class ConsultingInquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ConsultingInquiry.objects.all()
    serializer_class = ConsultingInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()
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
