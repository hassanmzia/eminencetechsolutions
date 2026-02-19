import uuid
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ChatSession, ChatMessage
from .serializers import ChatInputSerializer, ChatMessageSerializer
from .agents import MultiAgentOrchestrator

orchestrator = MultiAgentOrchestrator()


@api_view(['POST'])
def chat(request):
    """Process a chat message through the multi-agent AI system."""
    serializer = ChatInputSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    message = serializer.validated_data['message']
    session_key = serializer.validated_data.get('session_key', str(uuid.uuid4()))

    # Get or create session
    session, created = ChatSession.objects.get_or_create(
        session_key=session_key,
        defaults={
            'visitor_name': serializer.validated_data.get('visitor_name', ''),
            'visitor_email': serializer.validated_data.get('visitor_email', ''),
        }
    )

    # Save user message
    ChatMessage.objects.create(
        session=session,
        role='user',
        content=message,
    )

    # Get conversation history
    history = list(
        session.messages.values_list('role', 'content').order_by('created_at')[:20]
    )

    # Process through multi-agent system
    result = orchestrator.process_message(
        message=message,
        session_id=session_key,
        history=history,
    )

    # Save assistant response
    assistant_msg = ChatMessage.objects.create(
        session=session,
        role='assistant',
        content=result['response'],
        agent_name=result['agent'],
        metadata={'agent_type': result['agent_type']},
    )

    return Response({
        'response': result['response'],
        'agent': result['agent'],
        'session_key': session_key,
        'message_id': str(assistant_msg.id),
    })


@api_view(['GET'])
def chat_history(request, session_key):
    """Retrieve chat history for a session."""
    try:
        session = ChatSession.objects.get(session_key=session_key)
    except ChatSession.DoesNotExist:
        return Response({'messages': []})

    messages = session.messages.all()
    serializer = ChatMessageSerializer(messages, many=True)
    return Response({'messages': serializer.data, 'session_key': session_key})


@api_view(['GET'])
def agent_info(request):
    """Get information about the multi-agent AI system."""
    return Response(orchestrator.get_system_info())


@api_view(['GET'])
def mcp_capabilities(request):
    """MCP endpoint - describes available tools and capabilities."""
    return Response({
        "protocol": "MCP/1.0",
        "server": "Eminence Tech Solutions AI Engine",
        "tools": [
            {
                "name": "query_services",
                "description": "Query information about Eminence Tech Solutions services",
                "parameters": {"query": {"type": "string", "description": "Service query"}},
            },
            {
                "name": "submit_inquiry",
                "description": "Submit a consulting inquiry",
                "parameters": {
                    "company": {"type": "string"},
                    "contact": {"type": "string"},
                    "description": {"type": "string"},
                },
            },
            {
                "name": "search_jobs",
                "description": "Search available job positions",
                "parameters": {"query": {"type": "string"}},
            },
            {
                "name": "get_case_studies",
                "description": "Retrieve case studies by industry or technology",
                "parameters": {"filter": {"type": "string"}},
            },
        ],
        "resources": [
            {"uri": "eminence://services", "name": "Service Catalog"},
            {"uri": "eminence://case-studies", "name": "Case Studies"},
            {"uri": "eminence://team", "name": "Team Information"},
        ],
    })


@api_view(['GET'])
def a2a_agent_card(request):
    """A2A endpoint - returns the agent card for inter-agent discovery."""
    return Response({
        "protocol": "A2A/1.0",
        "agent": {
            "name": "Eminence AI Consulting Agent",
            "description": "AI-powered consulting agent for Eminence Tech Solutions",
            "url": "/api/ai/chat/",
            "version": "1.0.0",
            "capabilities": {
                "streaming": False,
                "pushNotifications": False,
                "stateTransitionHistory": True,
            },
            "skills": [
                {
                    "id": "service-inquiry",
                    "name": "Service Inquiry Handler",
                    "description": "Handles questions about AI consulting services",
                },
                {
                    "id": "technical-advisor",
                    "name": "Technical Advisory",
                    "description": "Provides technical guidance on AI, cloud, and DevSecOps",
                },
                {
                    "id": "market-research",
                    "name": "AI Market Research",
                    "description": "Provides AI market analysis and technology insights",
                },
            ],
        },
    })
