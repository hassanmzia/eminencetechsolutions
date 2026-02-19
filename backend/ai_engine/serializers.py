from rest_framework import serializers
from .models import ChatSession, ChatMessage, KnowledgeDocument, AgentTask


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'content', 'agent_name', 'created_at']
        read_only_fields = ['id', 'created_at']


class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'session_key', 'visitor_name', 'visitor_email', 'messages', 'created_at']


class ChatInputSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=2000)
    session_key = serializers.CharField(max_length=100, required=False)
    visitor_name = serializers.CharField(max_length=200, required=False, default="")
    visitor_email = serializers.EmailField(required=False, default="")


class KnowledgeDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeDocument
        fields = '__all__'


class AgentTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentTask
        fields = '__all__'
