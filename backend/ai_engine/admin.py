from django.contrib import admin
from .models import ChatSession, ChatMessage, KnowledgeDocument, AgentTask


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_key', 'visitor_name', 'visitor_email', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['visitor_name', 'visitor_email']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'role', 'agent_name', 'created_at']
    list_filter = ['role', 'agent_name']


@admin.register(KnowledgeDocument)
class KnowledgeDocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'doc_type', 'is_active', 'created_at']
    list_filter = ['doc_type', 'is_active']


@admin.register(AgentTask)
class AgentTaskAdmin(admin.ModelAdmin):
    list_display = ['agent_type', 'status', 'created_at', 'completed_at']
    list_filter = ['agent_type', 'status']
