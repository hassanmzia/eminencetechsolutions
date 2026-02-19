from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'messages', views.ContactMessageViewSet)
router.register(r'newsletter', views.NewsletterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
