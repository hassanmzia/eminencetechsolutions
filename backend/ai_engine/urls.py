from django.urls import path
from . import views

urlpatterns = [
    path('chat/', views.chat, name='ai-chat'),
    path('chat/history/<str:session_key>/', views.chat_history, name='chat-history'),
    path('agents/', views.agent_info, name='agent-info'),
    path('mcp/', views.mcp_capabilities, name='mcp-capabilities'),
    path('a2a/agent-card/', views.a2a_agent_card, name='a2a-agent-card'),
]
