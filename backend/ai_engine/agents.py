"""
Conversational AI Assistant for Eminence Tech Solutions

NLP-powered chatbot that uses OpenAI or Anthropic LLMs to provide
natural, conversational responses about the company. Falls back to
intelligent pattern matching when no API key is configured.
"""

import json
import logging
import os
import re
from dataclasses import dataclass, field
from typing import Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Complete company knowledge base — fed into the LLM system prompt
# ---------------------------------------------------------------------------
COMPANY_KNOWLEDGE = {
    "company": {
        "name": "Eminence Tech Solutions",
        "legal_name": "Eminence Tech Solutions LLC",
        "location": "44330 Mercure Circle, Sterling, VA 20166",
        "phone": "(703) 665-3988",
        "email": "info@eminencetechsolutions.com",
        "website": "https://www.eminencetechsolutions.com",
        "business_hours": "Monday – Friday, 9:00 AM – 6:00 PM EST",
        "tagline": "Pioneering AI Innovation for Enterprise Transformation",
        "mission": (
            "To harmonize client aspirations with technological expertise, "
            "unlocking a future where businesses thrive through tailored AI "
            "and cloud solutions."
        ),
        "founded": "Over 10 years of excellence in enterprise IT and AI consulting",
        "founder": "Hassan M. Zia – Founder & CEO",
        "social_media": {
            "linkedin": "https://www.linkedin.com/company/eminence-tech-solutions",
        },
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
        {
            "name": "Data Engineering & Data Science",
            "description": "End-to-end data solutions including data pipeline architecture, data lakes, real-time analytics, machine learning model development, and business intelligence.",
            "capabilities": ["Data pipeline architecture", "Data lake implementation", "Machine learning model development", "Real-time analytics", "Business intelligence", "Data governance"],
        },
        {
            "name": "IoT Device Integration",
            "description": "Design, develop, and deploy Internet of Things solutions including device connectivity, edge computing, sensor data processing, IoT platform integration, and real-time monitoring dashboards.",
            "capabilities": ["IoT device connectivity", "Edge computing", "Sensor data processing", "IoT platform integration", "Real-time monitoring", "Predictive maintenance"],
        },
        {
            "name": "Training & Education",
            "description": "Professional training programs in AI/ML, Cloud Engineering, DevSecOps, Kubernetes, and emerging technologies for teams and individuals.",
            "capabilities": ["Customized training programs", "Hands-on lab environments", "Certification preparation", "Team skill assessments"],
        },
    ],
    "team": [
        {"name": "Hassan M. Zia", "title": "Founder & CEO", "expertise": "AI Strategy, Enterprise Architecture, Cloud Solutions, Cybersecurity, Agentic AI"},
        {"name": "Dr. Sarah Chen", "title": "Chief AI Officer", "expertise": "Machine Learning, Agentic AI, NLP, Multi-Agent Systems, RAG"},
        {"name": "Michael Torres", "title": "VP of Cloud Engineering", "expertise": "Multi-Cloud, Kubernetes, OpenShift, DevSecOps, Infrastructure"},
        {"name": "Priya Sharma", "title": "Director of AI Governance", "expertise": "AI Ethics, Governance, Regulatory Compliance, Risk Management"},
        {"name": "David Kim", "title": "Head of Cybersecurity", "expertise": "Cybersecurity, ATO, FedRAMP, AI Security, Compliance"},
        {"name": "Alex Rodriguez", "title": "Principal Solutions Architect", "expertise": "Solution Architecture, Microservices, API Design, MLOps"},
    ],
    "technologies": {
        "AI/ML": ["LangChain", "PyTorch", "TensorFlow", "Hugging Face", "OpenAI", "Anthropic", "scikit-learn"],
        "Agents": ["MCP (Model Context Protocol)", "A2A (Agent-to-Agent)", "AutoGen", "CrewAI", "LangGraph"],
        "Cloud": ["AWS", "Azure", "GCP", "multi-cloud architectures"],
        "Orchestration": ["Kubernetes", "OpenShift", "Docker", "Helm", "Istio"],
        "DevSecOps": ["Jenkins", "GitLab CI", "ArgoCD", "Terraform", "Ansible"],
        "Data": ["PostgreSQL", "MongoDB", "Redis", "Apache Kafka", "Snowflake", "Apache Spark", "Vector DBs"],
        "IoT": ["AWS IoT", "Azure IoT Hub", "MQTT", "InfluxDB", "Grafana", "Edge AI"],
    },
    "stats": {
        "enterprise_clients": "150+",
        "ai_models_deployed": "500+",
        "cloud_migrations": "200+",
        "security_certifications": "50+",
        "team_experts": "75+",
        "years": "10+",
    },
    "industries": [
        "Government / Federal", "Healthcare", "Defense", "Financial Services",
        "Logistics & Supply Chain", "Energy", "Manufacturing", "Retail",
    ],
    "engagement_model": (
        "We offer flexible engagement models including fixed-price projects, "
        "time-and-materials consulting, dedicated teams, and managed services. "
        "Engagements typically begin with a free initial consultation, followed "
        "by a discovery phase, proposal, and then execution."
    ),
    "consulting_process": (
        "1. Free initial consultation to understand your needs. "
        "2. Discovery & assessment phase. "
        "3. Proposal with roadmap, timeline, and investment. "
        "4. Execution with regular check-ins and milestones. "
        "5. Deployment and knowledge transfer. "
        "6. Ongoing support and optimization."
    ),
}


def _build_system_prompt() -> str:
    """Build the system prompt with full company knowledge."""
    company = COMPANY_KNOWLEDGE["company"]
    services_text = "\n".join(
        f"- **{s['name']}**: {s['description']} "
        f"(Capabilities: {', '.join(s['capabilities'])})"
        for s in COMPANY_KNOWLEDGE["services"]
    )
    team_text = "\n".join(
        f"- {m['name']} – {m['title']} (Expertise: {m['expertise']})"
        for m in COMPANY_KNOWLEDGE["team"]
    )
    tech_text = "\n".join(
        f"- {category}: {', '.join(tools)}"
        for category, tools in COMPANY_KNOWLEDGE["technologies"].items()
    )
    stats = COMPANY_KNOWLEDGE["stats"]

    return f"""You are the friendly, knowledgeable AI assistant for {company['name']}. \
You answer questions about the company, its services, team, and capabilities in a \
natural, conversational tone. Be concise — answer the question directly without \
dumping all information unless the user asks for a full overview.

COMPANY INFORMATION:
- Company: {company['name']}
- Tagline: {company['tagline']}
- Mission: {company['mission']}
- Founded: {company['founded']}
- Founder: {company['founder']}
- Phone: {company['phone']}
- Email: {company['email']}
- Website: {company['website']}
- Address: {company['location']}
- Business Hours: {company['business_hours']}

SERVICES:
{services_text}

LEADERSHIP TEAM:
{team_text}

TECHNOLOGY STACK:
{tech_text}

KEY STATS:
- Enterprise Clients: {stats['enterprise_clients']}
- AI Models Deployed: {stats['ai_models_deployed']}
- Cloud Migrations: {stats['cloud_migrations']}
- Security Certifications: {stats['security_certifications']}
- Team Experts: {stats['team_experts']}
- Years of Excellence: {stats['years']}

INDUSTRIES SERVED: {', '.join(COMPANY_KNOWLEDGE['industries'])}

ENGAGEMENT MODEL: {COMPANY_KNOWLEDGE['engagement_model']}

CONSULTING PROCESS: {COMPANY_KNOWLEDGE['consulting_process']}

GUIDELINES:
- Be conversational and friendly. Use a warm, professional tone.
- Answer questions DIRECTLY. If someone asks for the phone number, just give the phone number.
- Keep answers concise unless the user asks for details.
- Use markdown formatting (bold, lists) when helpful, but keep it light.
- If the user asks something you don't know about the company, say so honestly and suggest they contact the team.
- Encourage users to submit a consulting inquiry or reach out via phone/email when appropriate.
- If the user greets you (hi, hello, hey, etc.), greet them back warmly and ask how you can help.
- You can discuss general AI/tech topics briefly, but always tie it back to how {company['name']} can help.
- Never make up information about the company that isn't provided above.
- Never share competitor information or make comparisons.
"""


# ---------------------------------------------------------------------------
# LLM-powered conversational agent
# ---------------------------------------------------------------------------

class ConversationalAgent:
    """NLP-powered conversational agent using OpenAI or Anthropic APIs."""

    def __init__(self):
        self.name = "ETS Assistant"
        self.system_prompt = _build_system_prompt()
        self._openai_client = None
        self._anthropic_client = None
        self._backend = self._detect_backend()

    def _detect_backend(self) -> str:
        """Detect which LLM backend is available."""
        openai_key = os.environ.get("OPENAI_API_KEY", "").strip()
        anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()

        if openai_key:
            try:
                from openai import OpenAI
                self._openai_client = OpenAI(api_key=openai_key)
                logger.info("AI Assistant using OpenAI backend")
                return "openai"
            except Exception:
                logger.exception("Failed to initialise OpenAI client")

        if anthropic_key:
            try:
                import anthropic
                self._anthropic_client = anthropic.Anthropic(api_key=anthropic_key)
                logger.info("AI Assistant using Anthropic backend")
                return "anthropic"
            except Exception:
                logger.exception("Failed to initialise Anthropic client")

        logger.warning("No LLM API key configured — using fallback mode")
        return "fallback"

    # -- public interface ---------------------------------------------------

    def process(self, message: str, history: list = None) -> str:
        """Generate a response using the best available backend."""
        if self._backend == "openai":
            return self._call_openai(message, history or [])
        elif self._backend == "anthropic":
            return self._call_anthropic(message, history or [])
        return self._fallback_response(message)

    # -- OpenAI -------------------------------------------------------------

    def _call_openai(self, message: str, history: list) -> str:
        try:
            messages = [{"role": "system", "content": self.system_prompt}]
            for role, content in history[-20:]:
                messages.append({"role": role, "content": content})

            response = self._openai_client.chat.completions.create(
                model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
                messages=messages,
                max_tokens=600,
                temperature=0.7,
            )
            return response.choices[0].message.content.strip()
        except Exception:
            logger.exception("OpenAI API call failed")
            return self._fallback_response(message)

    # -- Anthropic ----------------------------------------------------------

    def _call_anthropic(self, message: str, history: list) -> str:
        try:
            messages = []
            for role, content in history[-20:]:
                messages.append({"role": role, "content": content})

            response = self._anthropic_client.messages.create(
                model=os.environ.get("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001"),
                system=self.system_prompt,
                messages=messages,
                max_tokens=600,
                temperature=0.7,
            )
            return response.content[0].text.strip()
        except Exception:
            logger.exception("Anthropic API call failed")
            return self._fallback_response(message)

    # -- Smart fallback (no API key) ----------------------------------------

    def _fallback_response(self, message: str) -> str:
        """Pattern-match common questions and give direct answers."""
        msg = message.lower().strip()
        company = COMPANY_KNOWLEDGE["company"]

        # Greetings
        if re.match(r"^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening)|greetings|what'?s\s*up|sup)\b", msg):
            return (
                f"Hi there! Welcome to {company['name']}. "
                f"I'm your AI assistant — I can answer questions about our services, "
                f"team, pricing, and more. How can I help you today?"
            )

        # Thanks / bye
        if re.match(r"^(thanks?|thank\s*you|bye|goodbye|see\s*ya|take\s*care)", msg):
            return (
                f"You're welcome! If you need anything else, feel free to ask. "
                f"You can also reach us at **{company['phone']}** or "
                f"**{company['email']}**. Have a great day!"
            )

        # Phone
        if any(w in msg for w in ["phone", "call", "dial", "telephone", "number"]):
            return (
                f"Our phone number is **{company['phone']}**. "
                f"We're available {company['business_hours']}."
            )

        # Email
        if any(w in msg for w in ["email", "mail", "e-mail"]):
            return (
                f"You can email us at **{company['email']}**. "
                f"We typically respond within 24 hours."
            )

        # Address / location
        if any(w in msg for w in ["address", "location", "where", "office", "visit", "directions"]):
            return (
                f"Our office is located at **{company['location']}**. "
                f"Business hours are {company['business_hours']}."
            )

        # Business hours
        if any(w in msg for w in ["hours", "open", "close", "timing", "schedule", "available"]):
            return (
                f"Our business hours are **{company['business_hours']}**. "
                f"You can reach us at {company['phone']} or {company['email']}."
            )

        # Website
        if any(w in msg for w in ["website", "url", "site", "web"]):
            return f"Our website is **{company['website']}**."

        # Who / about / founder / CEO
        if any(w in msg for w in ["founder", "ceo", "who founded", "who started", "who owns"]):
            return (
                f"Eminence Tech Solutions was founded by **Hassan M. Zia**, "
                f"who serves as Founder & CEO. He has over 20 years of experience "
                f"in enterprise IT, AI/ML, cloud architecture, and cybersecurity."
            )

        # Team
        if any(w in msg for w in ["team", "leadership", "people", "staff", "employees"]):
            team_text = "\n".join(
                f"- **{m['name']}** – {m['title']}"
                for m in COMPANY_KNOWLEDGE["team"]
            )
            return f"Our leadership team includes:\n\n{team_text}\n\nWe have a team of **75+ experts** across AI, cloud, security, and data engineering."

        # Contact (general)
        if any(w in msg for w in ["contact", "reach", "get in touch", "talk to"]):
            return (
                f"You can reach us through:\n\n"
                f"- **Phone**: {company['phone']}\n"
                f"- **Email**: {company['email']}\n"
                f"- **Address**: {company['location']}\n"
                f"- **Hours**: {company['business_hours']}\n\n"
                f"Or submit a message through our Contact page on the website!"
            )

        # Services (general)
        if any(w in msg for w in ["services", "what do you do", "what do you offer", "offerings", "solutions"]):
            svc_list = "\n".join(
                f"- **{s['name']}**: {s['description']}"
                for s in COMPANY_KNOWLEDGE["services"]
            )
            return f"We offer the following services:\n\n{svc_list}\n\nWould you like to know more about any specific service?"

        # Specific service matching
        for service in COMPANY_KNOWLEDGE["services"]:
            service_words = service["name"].lower().split()
            if any(w in msg for w in service_words if len(w) > 3):
                caps = ", ".join(service["capabilities"])
                return (
                    f"**{service['name']}**\n\n"
                    f"{service['description']}\n\n"
                    f"**Key capabilities**: {caps}\n\n"
                    f"Want to discuss how this could work for your project? "
                    f"Reach us at {company['phone']} or submit a consulting inquiry!"
                )

        # Pricing / cost
        if any(w in msg for w in ["price", "pricing", "cost", "how much", "rate", "budget", "fee"]):
            return (
                f"Our pricing depends on the scope and complexity of each project. "
                f"We offer flexible engagement models including fixed-price projects, "
                f"time-and-materials consulting, and dedicated teams.\n\n"
                f"For a tailored quote, submit a consulting inquiry or call us at "
                f"**{company['phone']}** for a free initial consultation."
            )

        # Careers / jobs
        if any(w in msg for w in ["career", "job", "hiring", "work for", "position", "vacancy", "join"]):
            return (
                f"We're always looking for talented people! Check our **Careers page** "
                f"on the website for current openings. You can also send your resume to "
                f"**{company['email']}**."
            )

        # Industries
        if any(w in msg for w in ["industry", "industries", "sector", "who do you work with", "clients"]):
            industries = ", ".join(COMPANY_KNOWLEDGE["industries"])
            stats = COMPANY_KNOWLEDGE["stats"]
            return (
                f"We serve clients across multiple industries including: "
                f"**{industries}**.\n\n"
                f"We've worked with **{stats['enterprise_clients']}** enterprise clients "
                f"and deployed **{stats['ai_models_deployed']}** AI models."
            )

        # How to get started / process
        if any(w in msg for w in ["get started", "process", "how does it work", "engagement", "begin", "start"]):
            return (
                f"Here's how we typically work with clients:\n\n"
                f"{COMPANY_KNOWLEDGE['consulting_process']}\n\n"
                f"Ready to start? Call us at **{company['phone']}** or submit a "
                f"consulting inquiry on our website!"
            )

        # Technologies
        if any(w in msg for w in ["technology", "technologies", "tech stack", "tools", "frameworks"]):
            tech_text = "\n".join(
                f"- **{cat}**: {', '.join(tools)}"
                for cat, tools in COMPANY_KNOWLEDGE["technologies"].items()
            )
            return f"We work with a wide range of technologies:\n\n{tech_text}"

        # Stats
        if any(w in msg for w in ["stats", "numbers", "achievements", "track record", "experience"]):
            stats = COMPANY_KNOWLEDGE["stats"]
            return (
                f"Here are some of our key stats:\n\n"
                f"- **{stats['enterprise_clients']}** Enterprise Clients\n"
                f"- **{stats['ai_models_deployed']}** AI Models Deployed\n"
                f"- **{stats['cloud_migrations']}** Cloud Migrations\n"
                f"- **{stats['security_certifications']}** Security Certifications\n"
                f"- **{stats['team_experts']}** Team Experts\n"
                f"- **{stats['years']}** Years of Excellence"
            )

        # Default
        return (
            f"Thanks for your question! I'd be happy to help. I can answer questions about:\n\n"
            f"- Our **services** (AI, Cloud, DevSecOps, Data Science, IoT, and more)\n"
            f"- **Contact information** (phone, email, address)\n"
            f"- Our **team** and leadership\n"
            f"- **Pricing** and engagement models\n"
            f"- **Careers** and job openings\n\n"
            f"Could you rephrase your question, or feel free to call us at "
            f"**{company['phone']}** for a direct conversation!"
        )


# ---------------------------------------------------------------------------
# Orchestrator — keeps the same interface for views.py
# ---------------------------------------------------------------------------

class MultiAgentOrchestrator:
    """Orchestrates the conversational AI system."""

    def __init__(self):
        self.agent = ConversationalAgent()

    def process_message(self, message: str, session_id: str = "", history: list = None) -> dict:
        """Process a user message through the conversational AI."""
        response = self.agent.process(message, history)
        return {
            "response": response,
            "agent": self.agent.name,
            "agent_type": "conversational",
            "session_id": session_id,
        }

    def get_system_info(self) -> dict:
        """Get information about the AI system."""
        return {
            "system": "Eminence AI Assistant",
            "version": "2.0.0",
            "protocols": ["MCP/1.0", "A2A/1.0"],
            "agents": [
                {
                    "name": self.agent.name,
                    "description": "NLP-powered conversational assistant for Eminence Tech Solutions",
                    "protocol": "A2A/1.0",
                    "capabilities": [
                        "Natural language understanding",
                        "Conversational Q&A",
                        "Service recommendations",
                        "Company information",
                    ],
                },
            ],
            "capabilities": [
                "Natural language conversation",
                "Context-aware responses",
                "Company knowledge base",
                "Conversation memory",
            ],
        }
