from django.contrib import admin
from .models import ContactMessage, NewsletterSubscriber


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'inquiry_type', 'is_read', 'is_responded', 'created_at']
    list_filter = ['inquiry_type', 'is_read', 'is_responded']
    search_fields = ['name', 'email', 'subject', 'message']


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'is_active', 'subscribed_at']
    list_filter = ['is_active']
