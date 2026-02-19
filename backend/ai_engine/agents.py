"""
Multi-Agent AI System for Eminence Tech Solutions

Architecture:
- Router Agent: Classifies incoming queries and routes to specialized agents
- Sales Agent: Handles business inquiries, pricing, and service recommendations
- Technical Agent: Answers technical questions about AI, cloud, DevSecOps
- Support Agent: Handles general support and FAQ queries
- Research Agent: Provides AI market analysis and technology insights

Supports MCP (Model Context Protocol) and A2A (Agent-to-Agent) communication patterns.
"""

import json
import logging
from dataclasses import dataclass, field
from typing import Optional

logger = logging.getLogger(__name__)

# Company knowledge base for RAG context
COMPANY_KNOWLEDGE = {
    "company": {
        "name": "Eminence Tech Solutions",
        "location": "44330 Mercure Circle, Sterling, VA",
        "website": "https://www.eminencetechsolutions.com",
        "tagline": "Pioneering AI Innovation for Enterprise Transformation",
        "mission": "To harmonize client aspirations with technological expertise, unlocking a future where businesses thrive through tailored AI and cloud solutions.",
    },
    "services": [
        {
            "name": "Agentic AI Systems",
            "description": "Design, development, and deployment of autonomous AI agent systems that can reason, plan, and execute complex tasks independently.",
            "capabilities": ["Multi-agent orchestration", "Tool-use AI systems", "Autonomous decision-making", "Human-in-the-loop workflows"],
        },
        {
            "name": "Generative AI Solutions",
            "description": "Custom LLM implementations, fine-tuning, RAG systems, and generative AI applications for enterprise use cases.",
            "capabilities": ["Custom LLM deployment", "RAG pipelines", "Content generation", "Code generation", "Multimodal AI"],
        },
        {
            "name": "Multi-Agent Systems",
            "description": "Architecting and building collaborative multi-agent systems using MCP, A2A protocols for complex enterprise workflows.",
            "capabilities": ["Agent-to-Agent communication", "Model Context Protocol", "Distributed agent systems", "Agent orchestration"],
        },
        {
            "name": "AI Transformation & Strategy",
            "description": "End-to-end AI transformation consulting including roadmaps, blueprints, architecture development, and organizational change management.",
            "capabilities": ["AI readiness assessment", "Transformation roadmaps", "Blueprint development", "Change management", "ROI analysis"],
        },
        {
            "name": "DevSecOps & MLOps",
            "description": "Full DevSecOps pipeline implementation with integrated security, CI/CD for ML models, and automated deployment workflows.",
            "capabilities": ["CI/CD pipelines", "Security automation", "ML model deployment", "Infrastructure as Code", "Monitoring & observability"],
        },
        {
            "name": "Cloud & Kubernetes",
            "description": "Multi-cloud architecture, Kubernetes and OpenShift orchestration, containerization, and cloud-native application development.",
            "capabilities": ["Multi-cloud deployment", "Kubernetes management", "OpenShift administration", "Container orchestration", "Cloud migration"],
        },
        {
            "name": "Cybersecurity & Compliance",
            "description": "Comprehensive cybersecurity services including ATO support, compliance frameworks, AI security, and governance.",
            "capabilities": ["ATO support", "Compliance frameworks", "AI security", "Governance & guardrails", "Risk assessment"],
        },
        {
            "name": "AI Governance & Ethics",
            "description": "Establishing ethical AI frameworks, regulatory compliance, responsible AI practices, and governance structures.",
            "capabilities": ["Ethical AI frameworks", "Regulatory compliance", "Bias detection", "Transparency reporting", "AI guardrails"],
        },
    ],
}


@dataclass
class AgentMessage:
    """Message format for inter-agent communication (A2A protocol)."""
    sender: str
    receiver: str
    content: str
    message_type: str = "request"
    context: dict = field(default_factory=dict)
    metadata: dict = field(default_factory=dict)


@dataclass
class MCPContext:
    """Model Context Protocol context for maintaining agent state."""
    session_id: str
    conversation_history: list = field(default_factory=list)
    active_tools: list = field(default_factory=list)
    knowledge_context: list = field(default_factory=list)
    agent_state: dict = field(default_factory=dict)


class BaseAgent:
    """Base class for all agents in the multi-agent system."""

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        raise NotImplementedError

    def get_agent_card(self) -> dict:
        """A2A Agent Card - describes agent capabilities."""
        return {
            "name": self.name,
            "description": self.description,
            "protocol": "A2A/1.0",
            "capabilities": [],
        }


class RouterAgent(BaseAgent):
    """Routes incoming queries to the most appropriate specialized agent."""

    ROUTING_RULES = {
        "sales": ["pricing", "cost", "quote", "proposal", "budget", "engagement", "hire", "contract", "partner"],
        "technical": ["kubernetes", "docker", "openshift", "ai", "ml", "devops", "devsecops", "cloud",
                      "architecture", "agentic", "rag", "llm", "mcp", "agent", "autonomous", "deploy",
                      "microservice", "api", "data", "security", "compliance"],
        "support": ["help", "issue", "problem", "support", "question", "faq", "hours", "contact", "location"],
        "research": ["research", "market", "analysis", "trend", "innovation", "future", "comparison", "benchmark",
                      "adoption", "strategy", "roadmap", "transformation"],
    }

    def __init__(self):
        super().__init__("Router Agent", "Classifies and routes queries to specialized agents")

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        message_lower = message.lower()
        scores = {}
        for agent_type, keywords in self.ROUTING_RULES.items():
            score = sum(1 for kw in keywords if kw in message_lower)
            if score > 0:
                scores[agent_type] = score

        if not scores:
            return "sales"

        return max(scores, key=scores.get)


class SalesAgent(BaseAgent):
    """Handles business inquiries, service recommendations, and consulting opportunities."""

    def __init__(self):
        super().__init__("Sales Agent", "Handles business inquiries and service recommendations")

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        services_info = "\n".join(
            f"- **{s['name']}**: {s['description']}"
            for s in COMPANY_KNOWLEDGE["services"]
        )

        response = (
            f"Thank you for your interest in Eminence Tech Solutions! "
            f"Based on your inquiry, here's how we can help:\n\n"
            f"We offer comprehensive AI and cloud consulting services:\n\n"
            f"{services_info}\n\n"
            f"We'd love to schedule a consultation to discuss your specific needs. "
            f"You can submit a detailed inquiry through our Consulting page, "
            f"or contact us directly at info@eminencetechsolutions.com.\n\n"
            f"Our team of experts is ready to help with your AI transformation journey, "
            f"from initial assessment and roadmap creation to full implementation and ongoing support."
        )
        return response


class TechnicalAgent(BaseAgent):
    """Answers technical questions about AI, cloud, DevSecOps capabilities."""

    def __init__(self):
        super().__init__("Technical Agent", "Provides technical information about our capabilities")

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        message_lower = message.lower()
        relevant_services = []
        for service in COMPANY_KNOWLEDGE["services"]:
            service_text = f"{service['name']} {service['description']} {' '.join(service['capabilities'])}".lower()
            if any(word in service_text for word in message_lower.split()):
                relevant_services.append(service)

        if not relevant_services:
            relevant_services = COMPANY_KNOWLEDGE["services"][:3]

        response = "Here's our technical expertise relevant to your query:\n\n"
        for service in relevant_services:
            caps = ", ".join(service["capabilities"])
            response += f"**{service['name']}**\n{service['description']}\n"
            response += f"Key capabilities: {caps}\n\n"

        response += (
            "Our team works with cutting-edge technologies including:\n"
            "- **AI/ML**: LangChain, PyTorch, TensorFlow, Hugging Face, OpenAI, Anthropic\n"
            "- **Agents**: MCP (Model Context Protocol), A2A (Agent-to-Agent), AutoGen, CrewAI\n"
            "- **Cloud**: AWS, Azure, GCP, multi-cloud architectures\n"
            "- **Orchestration**: Kubernetes, OpenShift, Docker, Helm\n"
            "- **DevSecOps**: Jenkins, GitLab CI, ArgoCD, Terraform, Ansible\n"
            "- **Data**: PostgreSQL, MongoDB, Redis, Apache Kafka, Vector DBs\n\n"
            "Would you like to discuss a specific technical requirement?"
        )
        return response


class SupportAgent(BaseAgent):
    """Handles general support and FAQ queries."""

    def __init__(self):
        super().__init__("Support Agent", "Handles general support and FAQ queries")

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        company = COMPANY_KNOWLEDGE["company"]
        response = (
            f"Welcome to {company['name']}! I'm here to help.\n\n"
            f"**About Us**: {company['mission']}\n\n"
            f"**Location**: {company['location']}\n"
            f"**Website**: {company['website']}\n\n"
            f"**How to reach us**:\n"
            f"- Use our Contact form for general inquiries\n"
            f"- Submit a Consulting Inquiry for project discussions\n"
            f"- Browse our Careers page for job opportunities\n"
            f"- Email: info@eminencetechsolutions.com\n\n"
            f"Is there something specific I can help you with?"
        )
        return response


class ResearchAgent(BaseAgent):
    """Provides AI market analysis and technology insights."""

    def __init__(self):
        super().__init__("Research Agent", "Provides AI research and market analysis insights")

    def process(self, message: str, context: Optional[MCPContext] = None) -> str:
        response = (
            "Based on current AI industry trends and our expertise:\n\n"
            "**Key AI Trends We Track & Advise On:**\n\n"
            "1. **Agentic AI Revolution**: Autonomous AI systems that can plan, reason, and execute "
            "complex multi-step tasks are transforming enterprise operations.\n\n"
            "2. **Multi-Agent Orchestration**: Systems using protocols like MCP and A2A enable "
            "collaborative AI agents that specialize and communicate to solve complex problems.\n\n"
            "3. **RAG-Enhanced Enterprise AI**: Retrieval-Augmented Generation is becoming the "
            "standard for building accurate, grounded AI applications with enterprise data.\n\n"
            "4. **AI Governance & Ethics**: Growing regulatory landscape (EU AI Act, NIST AI RMF) "
            "requires robust governance frameworks and guardrails.\n\n"
            "5. **AI-Native DevSecOps**: Security-first AI development practices are critical "
            "for production AI systems.\n\n"
            "**Our Research Services Include:**\n"
            "- AI readiness and maturity assessments\n"
            "- Technology landscape analysis\n"
            "- Competitive AI benchmarking\n"
            "- AI adoption strategy development\n"
            "- Innovation roadmapping\n\n"
            "We help organizations navigate the rapidly evolving AI landscape with "
            "data-driven insights and strategic guidance."
        )
        return response


class MultiAgentOrchestrator:
    """
    Orchestrates the multi-agent system using MCP and A2A protocols.
    Implements the router pattern for intelligent query distribution.
    """

    def __init__(self):
        self.router = RouterAgent()
        self.agents = {
            "sales": SalesAgent(),
            "technical": TechnicalAgent(),
            "support": SupportAgent(),
            "research": ResearchAgent(),
        }

    def process_message(self, message: str, session_id: str = "", history: list = None) -> dict:
        """Process a user message through the multi-agent system."""
        context = MCPContext(
            session_id=session_id,
            conversation_history=history or [],
        )

        # Route to appropriate agent
        agent_type = self.router.process(message, context)
        agent = self.agents.get(agent_type, self.agents["support"])

        # Process with selected agent
        response = agent.process(message, context)

        return {
            "response": response,
            "agent": agent.name,
            "agent_type": agent_type,
            "session_id": session_id,
        }

    def get_system_info(self) -> dict:
        """Get information about the multi-agent system."""
        return {
            "system": "Eminence AI Multi-Agent System",
            "version": "1.0.0",
            "protocols": ["MCP/1.0", "A2A/1.0"],
            "agents": [
                agent.get_agent_card()
                for agent in [self.router] + list(self.agents.values())
            ],
            "capabilities": [
                "Multi-agent routing and orchestration",
                "RAG-based knowledge retrieval",
                "MCP context management",
                "A2A inter-agent communication",
                "Conversation memory",
            ],
        }
