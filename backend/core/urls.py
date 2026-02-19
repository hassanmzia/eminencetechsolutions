from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'case-studies', views.CaseStudyViewSet)
router.register(r'team', views.TeamMemberViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'blog', views.BlogPostViewSet)
router.register(r'partners', views.PartnerViewSet)
router.register(r'metrics', views.CompanyMetricViewSet)

urlpatterns = [
    path('health/', views.health_check, name='health-check'),
    path('', include(router.urls)),
]
