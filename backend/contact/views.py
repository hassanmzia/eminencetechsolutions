from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from .models import ContactMessage, NewsletterSubscriber
from .serializers import ContactMessageSerializer, NewsletterSubscriberSerializer


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        msg = serializer.save()
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
