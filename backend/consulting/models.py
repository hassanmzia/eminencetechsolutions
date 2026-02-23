import uuid
from django.db import models


class ConsultingInquiry(models.Model):
    SERVICE_TYPES = [
        ('agentic_ai', 'Agentic AI Systems'),
        ('generative_ai', 'Generative AI Solutions'),
        ('autonomous_systems', 'Autonomous Systems'),
        ('multi_agent', 'Multi-Agent Systems'),
        ('ai_transformation', 'AI Transformation'),
        ('ai_migration', 'AI Migration'),
        ('ai_modernization', 'AI Modernization'),
        ('devsecops', 'DevSecOps'),
        ('cybersecurity', 'Cybersecurity & Compliance'),
        ('cloud_architecture', 'Cloud Architecture'),
        ('kubernetes', 'Kubernetes/OpenShift'),
        ('mlops', 'MLOps'),
        ('data_engineering', 'Data Engineering & Data Science'),
        ('iot_integration', 'IoT Device Integration'),
        ('ai_research', 'AI Research & Innovation'),
        ('ai_governance', 'AI Governance & Ethics'),
        ('training', 'Training & Education'),
        ('other', 'Other'),
    ]
    URGENCY_LEVELS = [
        ('low', 'Exploratory - No Rush'),
        ('medium', 'Planning Phase'),
        ('high', 'Active Project - Need Soon'),
        ('critical', 'Urgent - Immediate Need'),
    ]
    BUDGET_RANGES = [
        ('under_50k', 'Under $50,000'),
        ('50k_100k', '$50,000 - $100,000'),
        ('100k_250k', '$100,000 - $250,000'),
        ('250k_500k', '$250,000 - $500,000'),
        ('500k_1m', '$500,000 - $1,000,000'),
        ('over_1m', 'Over $1,000,000'),
        ('tbd', 'To Be Determined'),
    ]
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('qualifying', 'Qualifying'),
        ('proposal', 'Proposal Sent'),
        ('negotiation', 'In Negotiation'),
        ('won', 'Won'),
        ('lost', 'Lost'),
        ('on_hold', 'On Hold'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=200)
    contact_name = models.CharField(max_length=200)
    contact_title = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company_website = models.URLField(blank=True)
    industry = models.CharField(max_length=100)
    company_size = models.CharField(max_length=50, blank=True)
    service_type = models.CharField(max_length=30, choices=SERVICE_TYPES)
    project_title = models.CharField(max_length=300)
    project_description = models.TextField()
    business_objectives = models.TextField(blank=True)
    current_technology_stack = models.TextField(blank=True)
    timeline = models.CharField(max_length=200, blank=True)
    budget_range = models.CharField(max_length=20, choices=BUDGET_RANGES, default='tbd')
    urgency = models.CharField(max_length=10, choices=URGENCY_LEVELS, default='medium')
    how_did_you_hear = models.CharField(max_length=200, blank=True)
    additional_notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    internal_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Consulting inquiries'

    def __str__(self):
        return f"{self.company_name} - {self.project_title}"


class ConsultingEngagement(models.Model):
    PHASE_CHOICES = [
        ('discovery', 'Discovery'),
        ('assessment', 'Assessment'),
        ('design', 'Design & Architecture'),
        ('development', 'Development'),
        ('testing', 'Testing & Validation'),
        ('deployment', 'Deployment'),
        ('maintenance', 'Maintenance & Support'),
        ('completed', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    inquiry = models.ForeignKey(ConsultingInquiry, on_delete=models.SET_NULL, null=True, related_name='engagements')
    title = models.CharField(max_length=300)
    description = models.TextField()
    phase = models.CharField(max_length=20, choices=PHASE_CHOICES, default='discovery')
    deliverables = models.JSONField(default=list)
    technologies = models.JSONField(default=list)
    start_date = models.DateField(null=True, blank=True)
    target_end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
