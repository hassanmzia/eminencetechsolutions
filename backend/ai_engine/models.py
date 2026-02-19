import uuid
from django.db import models


class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session_key = models.CharField(max_length=100, unique=True)
    visitor_name = models.CharField(max_length=200, blank=True)
    visitor_email = models.EmailField(blank=True)
    context = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"Session {self.session_key[:8]}..."


class ChatMessage(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    content = models.TextField()
    metadata = models.JSONField(default=dict, blank=True)
    agent_name = models.CharField(max_length=100, blank=True, help_text="Which agent handled this message")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."


class KnowledgeDocument(models.Model):
    DOC_TYPES = [
        ('service', 'Service Information'),
        ('faq', 'FAQ'),
        ('case_study', 'Case Study'),
        ('technology', 'Technology'),
        ('policy', 'Policy'),
        ('general', 'General'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=300)
    content = models.TextField()
    doc_type = models.CharField(max_length=20, choices=DOC_TYPES, default='general')
    metadata = models.JSONField(default=dict, blank=True)
    embedding_id = models.CharField(max_length=200, blank=True, help_text="Reference to vector store embedding")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title


class AgentTask(models.Model):
    AGENT_TYPES = [
        ('router', 'Router Agent'),
        ('sales', 'Sales Agent'),
        ('technical', 'Technical Agent'),
        ('support', 'Support Agent'),
        ('research', 'Research Agent'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='tasks')
    agent_type = models.CharField(max_length=20, choices=AGENT_TYPES)
    task_description = models.TextField()
    result = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.agent_type} - {self.task_description[:50]}..."
