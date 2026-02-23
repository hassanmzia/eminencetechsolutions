import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from .models import ContactMessage, NewsletterSubscriber
from .serializers import ContactMessageSerializer, NewsletterSubscriberSerializer

logger = logging.getLogger(__name__)


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save()

        # Send email notification to admin
        try:
            logger.info(
                'Sending contact email: from=%s, to=%s, host=%s, port=%s, user=%s',
                settings.DEFAULT_FROM_EMAIL,
                settings.ADMIN_EMAIL,
                settings.EMAIL_HOST,
                settings.EMAIL_PORT,
                settings.EMAIL_HOST_USER or '(empty)',
            )
            send_mail(
                subject=f'[ETS Contact] {msg.subject}',
                message=(
                    f'New contact message received:\n\n'
                    f'Name: {msg.name}\n'
                    f'Email: {msg.email}\n'
                    f'Phone: {msg.phone or "N/A"}\n'
                    f'Company: {msg.company or "N/A"}\n'
                    f'Inquiry Type: {msg.inquiry_type}\n\n'
                    f'Subject: {msg.subject}\n\n'
                    f'Message:\n{msg.message}'
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            logger.info('Contact email sent successfully to %s', settings.ADMIN_EMAIL)
        except Exception:
            logger.exception('Failed to send contact notification email')

        return Response(
            {
                'message': 'Thank you for reaching out! We will get back to you within 24 hours.',
                'id': str(msg.id),
            },
            status=status.HTTP_201_CREATED
        )


class NewsletterViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'message': 'Successfully subscribed to our newsletter!'},
            status=status.HTTP_201_CREATED
        )
