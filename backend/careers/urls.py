from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'jobs', views.JobPostingViewSet)
router.register(r'applications', views.JobApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
