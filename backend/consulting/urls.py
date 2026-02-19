from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'inquiries', views.ConsultingInquiryViewSet)

urlpatterns = [
    path('service-types/', views.service_types, name='service-types'),
    path('', include(router.urls)),
]
