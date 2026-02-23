"""Seed the database with initial company data."""
from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import (
    Service, CaseStudy, TeamMember, Testimonial,
    BlogPost, Partner, CompanyMetric
)
from careers.models import JobPosting


class Command(BaseCommand):
    help = 'Seeds the database with initial Eminence Tech Solutions data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')
        self._create_services()
        self._create_team()
        self._create_testimonials()
        self._create_case_studies()
        self._create_blog_posts()
        self._create_partners()
        self._create_metrics()
        self._create_job_postings()
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def _create_services(self):
        services = [
            {
                "title": "Agentic AI Systems",
                "slug": "agentic-ai-systems",
                "short_description": "Design, develop, and deploy autonomous AI agent systems that reason, plan, and execute complex tasks with human-in-the-loop oversight.",
                "full_description": "Our Agentic AI Systems practice delivers cutting-edge autonomous AI solutions that transform how enterprises operate. We architect systems where AI agents independently reason through complex problems, create execution plans, utilize tools, and deliver results with built-in safety guardrails. From single-agent automation to sophisticated multi-agent orchestrations, we build AI systems that augment human decision-making while maintaining full transparency and control. Our solutions incorporate MCP (Model Context Protocol) for robust tool integration and A2A (Agent-to-Agent) protocols for seamless inter-agent collaboration.",
                "icon": "Brain",
                "features": ["Autonomous task execution", "Multi-step reasoning chains", "Tool-use and API integration", "Human-in-the-loop workflows", "Safety guardrails and monitoring", "MCP and A2A protocol support"],
                "technologies": ["LangChain", "AutoGen", "CrewAI", "OpenAI", "Anthropic", "MCP", "A2A"],
                "order": 1,
            },
            {
                "title": "Generative AI Solutions",
                "slug": "generative-ai-solutions",
                "short_description": "Custom LLM implementations, fine-tuning, RAG systems, and enterprise generative AI applications tailored to your business needs.",
                "full_description": "Transform your business with our enterprise-grade Generative AI solutions. We build custom LLM applications, implement Retrieval-Augmented Generation (RAG) pipelines for accurate domain-specific responses, fine-tune models on your proprietary data, and deploy scalable generative AI systems. Whether you need intelligent document processing, automated content generation, code assistance, or conversational AI, our team delivers production-ready solutions with enterprise security and compliance built in.",
                "icon": "Sparkles",
                "features": ["Custom LLM deployment", "RAG pipeline development", "Model fine-tuning", "Prompt engineering", "Content generation systems", "Multimodal AI applications"],
                "technologies": ["GPT-4", "Claude", "Llama", "FAISS", "Pinecone", "ChromaDB", "LangChain"],
                "order": 2,
            },
            {
                "title": "Multi-Agent AI Systems",
                "slug": "multi-agent-ai-systems",
                "short_description": "Architect and build collaborative multi-agent systems using MCP and A2A protocols for complex enterprise workflows.",
                "full_description": "Our Multi-Agent Systems practice specializes in designing and implementing collaborative AI architectures where multiple specialized agents work together to solve complex enterprise challenges. Using Model Context Protocol (MCP) for standardized tool integration and Agent-to-Agent (A2A) communication protocols, we build systems where agents can discover, negotiate, and collaborate autonomously. From distributed problem-solving to parallel processing pipelines, our multi-agent solutions deliver capabilities that far exceed what any single AI system can achieve.",
                "icon": "Network",
                "features": ["Agent-to-Agent (A2A) protocols", "Model Context Protocol (MCP)", "Distributed agent orchestration", "Specialized agent design", "Agent discovery and negotiation", "Collaborative problem solving"],
                "technologies": ["MCP", "A2A", "AutoGen", "CrewAI", "LangGraph", "Kubernetes"],
                "order": 3,
            },
            {
                "title": "AI Transformation & Strategy",
                "slug": "ai-transformation-strategy",
                "short_description": "End-to-end AI transformation consulting with roadmaps, blueprints, architecture development, and organizational change management.",
                "full_description": "Navigate the AI revolution with confidence. Our AI Transformation & Strategy practice provides comprehensive consulting services to help organizations plan, execute, and sustain their AI journey. We start with thorough assessments of your current capabilities, define clear transformation roadmaps, develop detailed architectural blueprints, and guide you through every phase of implementation. Our approach encompasses organizational transformation, technology modernization, process optimization, and change management to ensure lasting impact and measurable ROI.",
                "icon": "TrendingUp",
                "features": ["AI readiness assessment", "Transformation roadmaps", "Blueprint and architecture design", "Change management", "ROI analysis and tracking", "Best practices advisory"],
                "technologies": ["Strategic Frameworks", "TOGAF", "SAFe", "Design Thinking"],
                "order": 4,
            },
            {
                "title": "DevSecOps & MLOps",
                "slug": "devsecops-mlops",
                "short_description": "Full DevSecOps pipeline implementation with integrated security, CI/CD for ML models, and automated deployment workflows.",
                "full_description": "Accelerate your development velocity while maintaining the highest security standards. Our DevSecOps & MLOps practice builds end-to-end pipelines that automate everything from code commit to production deployment, with security checks integrated at every stage. For AI/ML workloads, we implement specialized MLOps pipelines for model training, validation, deployment, and monitoring. Our approach ensures reproducibility, traceability, and governance across your entire AI lifecycle.",
                "icon": "GitBranch",
                "features": ["CI/CD pipeline automation", "Security-first development", "ML model lifecycle management", "Infrastructure as Code", "Automated testing and validation", "Monitoring and observability"],
                "technologies": ["Jenkins", "GitLab CI", "ArgoCD", "Terraform", "Ansible", "MLflow", "Kubeflow"],
                "order": 5,
            },
            {
                "title": "Cloud & Kubernetes",
                "slug": "cloud-kubernetes",
                "short_description": "Multi-cloud architecture, Kubernetes and OpenShift orchestration, and cloud-native application development across AWS, Azure, and GCP.",
                "full_description": "Harness the full power of cloud computing with our multi-cloud expertise. We design and implement cloud architectures that optimize for performance, cost, and resilience across AWS, Azure, and GCP. Our Kubernetes and OpenShift specialists ensure your containerized workloads run efficiently at scale, with proper security, networking, and storage configurations. From cloud migration to cloud-native development, we help organizations unlock the agility and scalability of modern cloud platforms.",
                "icon": "Cloud",
                "features": ["Multi-cloud architecture", "Kubernetes administration", "OpenShift management", "Container orchestration", "Cloud migration", "Cost optimization"],
                "technologies": ["AWS", "Azure", "GCP", "Kubernetes", "OpenShift", "Docker", "Helm", "Istio"],
                "order": 6,
            },
            {
                "title": "Cybersecurity & Compliance",
                "slug": "cybersecurity-compliance",
                "short_description": "Comprehensive cybersecurity services including ATO support, compliance frameworks, AI security, and governance implementation.",
                "full_description": "Protect your digital assets and AI systems with our comprehensive cybersecurity and compliance services. We provide end-to-end security solutions including Authority to Operate (ATO) support for federal systems, implementation of compliance frameworks (FedRAMP, NIST, SOC 2, HIPAA), AI-specific security assessments, and continuous monitoring. Our team ensures your AI systems are secure, ethical, and compliant with evolving regulatory requirements.",
                "icon": "Shield",
                "features": ["ATO support and acceleration", "Compliance framework implementation", "AI security assessment", "Penetration testing", "Continuous monitoring", "Incident response planning"],
                "technologies": ["NIST RMF", "FedRAMP", "SOC 2", "HIPAA", "SIEM", "SOAR"],
                "order": 7,
            },
            {
                "title": "AI Governance & Ethics",
                "slug": "ai-governance-ethics",
                "short_description": "Establishing ethical AI frameworks, regulatory compliance, responsible AI practices, guardrails, and governance structures.",
                "full_description": "As AI becomes central to business operations, robust governance and ethical frameworks are essential. We help organizations establish comprehensive AI governance structures including ethical review boards, bias detection and mitigation processes, transparency and explainability standards, and regulatory compliance programs. Our AI governance solutions ensure your AI systems are trustworthy, fair, accountable, and aligned with both organizational values and regulatory requirements including the EU AI Act, NIST AI RMF, and emerging state regulations.",
                "icon": "Scale",
                "features": ["Ethical AI framework development", "Bias detection and mitigation", "Regulatory compliance (EU AI Act, NIST AI RMF)", "AI guardrails implementation", "Transparency and explainability", "Risk assessment and management"],
                "technologies": ["NIST AI RMF", "EU AI Act", "ISO 42001", "Guardrails AI", "Responsible AI Toolkit"],
                "order": 8,
            },
            {
                "title": "Data Engineering & Analytics",
                "slug": "data-engineering-analytics",
                "short_description": "Build robust data pipelines, implement data lakes, and deliver actionable analytics to power your AI and business intelligence initiatives.",
                "full_description": "Data is the foundation of every successful AI initiative. Our Data Engineering & Analytics practice designs and implements scalable data architectures, ETL/ELT pipelines, data lakes, and analytics platforms that transform raw data into actionable intelligence. We ensure data quality, governance, and accessibility while enabling real-time analytics and machine learning workloads at enterprise scale.",
                "icon": "Database",
                "features": ["Data pipeline architecture", "Data lake implementation", "Real-time analytics", "Data quality management", "Business intelligence", "Data governance"],
                "technologies": ["Apache Kafka", "Apache Spark", "Snowflake", "dbt", "Airflow", "PowerBI", "Tableau"],
                "order": 9,
            },
            {
                "title": "Data Engineering & Data Science",
                "slug": "data-engineering-data-science",
                "short_description": "End-to-end data science solutions including ML model development, statistical analysis, predictive modeling, and advanced analytics to drive data-informed business decisions.",
                "full_description": "Our Data Engineering & Data Science practice combines robust data infrastructure with advanced analytical capabilities. We build machine learning models, develop predictive analytics, perform statistical analysis, and create data-driven solutions that transform how organizations make decisions. From feature engineering and model training to deployment and monitoring, we deliver the full data science lifecycle with enterprise-grade reliability and scale.",
                "icon": "FlaskConical",
                "features": ["Machine learning model development", "Predictive analytics", "Statistical analysis", "Feature engineering", "Model training and evaluation", "Data visualization and storytelling"],
                "technologies": ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Pandas", "Jupyter", "MLflow"],
                "order": 10,
            },
            {
                "title": "IoT Device Integration",
                "slug": "iot-device-integration",
                "short_description": "Design, develop, and deploy Internet of Things solutions with device connectivity, edge computing, sensor data processing, and real-time monitoring dashboards.",
                "full_description": "Our IoT Device Integration practice delivers end-to-end Internet of Things solutions for enterprises. We design and implement device connectivity architectures, edge computing pipelines, sensor data ingestion and processing systems, and real-time monitoring dashboards. Whether you need predictive maintenance for industrial equipment, smart building automation, or fleet tracking, we integrate IoT data with AI and cloud platforms to unlock actionable insights from your connected devices.",
                "icon": "Wifi",
                "features": ["IoT device connectivity", "Edge computing", "Sensor data processing", "Real-time monitoring dashboards", "Predictive maintenance", "IoT platform integration"],
                "technologies": ["AWS IoT", "Azure IoT Hub", "MQTT", "Apache Kafka", "InfluxDB", "Grafana", "Edge AI"],
                "order": 11,
            },
            {
                "title": "Training & Education",
                "slug": "training-education",
                "short_description": "Professional training programs in AI/ML, Cloud Engineering, DevSecOps, Kubernetes, and emerging technologies for teams and individuals.",
                "full_description": "Empower your team with the skills to drive innovation. Our Training & Education practice offers comprehensive professional development programs covering AI/ML, cloud engineering, DevSecOps, Kubernetes administration, and more. We provide hands-on, project-based learning experiences customized to your organization's technology stack and business objectives, from introductory courses to advanced certifications.",
                "icon": "GraduationCap",
                "features": ["Customized training programs", "Hands-on lab environments", "Certification preparation", "Team skill assessments", "Ongoing learning paths", "Executive AI literacy"],
                "technologies": ["AI/ML", "Cloud Platforms", "Kubernetes", "DevSecOps", "Data Science", "Cybersecurity"],
                "order": 12,
            },
        ]
        for s in services:
            Service.objects.update_or_create(slug=s['slug'], defaults=s)
        self.stdout.write(f'  Created {len(services)} services')

    def _create_team(self):
        members = [
            {
                "name": "Hassan M. Zia",
                "title": "Founder & CEO",
                "bio": "Visionary technologist and entrepreneur with over 20 years of experience in enterprise IT, AI/ML, cloud architecture, and cybersecurity. Leading Eminence Tech Solutions in pioneering AI innovation for enterprise transformation.",
                "specializations": ["AI Strategy", "Enterprise Architecture", "Cloud Solutions", "Cybersecurity", "Agentic AI"],
                "order": 1,
            },
            {
                "name": "Dr. Sarah Chen",
                "title": "Chief AI Officer",
                "bio": "PhD in Machine Learning with extensive experience in building production AI systems. Leads our AI research and development initiatives including agentic AI, multi-agent systems, and RAG architectures.",
                "specializations": ["Machine Learning", "Agentic AI", "NLP", "Multi-Agent Systems", "RAG"],
                "order": 2,
            },
            {
                "name": "Michael Torres",
                "title": "VP of Cloud Engineering",
                "bio": "Cloud architecture expert with deep expertise across AWS, Azure, and GCP. Certified Kubernetes administrator leading our multi-cloud and container orchestration practice.",
                "specializations": ["Multi-Cloud", "Kubernetes", "OpenShift", "DevSecOps", "Infrastructure"],
                "order": 3,
            },
            {
                "name": "Priya Sharma",
                "title": "Director of AI Governance",
                "bio": "Leading authority on AI ethics, governance, and regulatory compliance. Helps organizations navigate the complex landscape of AI regulations and establish responsible AI practices.",
                "specializations": ["AI Ethics", "Governance", "Regulatory Compliance", "Risk Management", "NIST AI RMF"],
                "order": 4,
            },
            {
                "name": "David Kim",
                "title": "Head of Cybersecurity",
                "bio": "CISSP-certified cybersecurity expert with extensive experience in federal ATO processes, compliance frameworks, and AI security. Ensures all our solutions meet the highest security standards.",
                "specializations": ["Cybersecurity", "ATO", "FedRAMP", "AI Security", "Compliance"],
                "order": 5,
            },
            {
                "name": "Alex Rodriguez",
                "title": "Principal Solutions Architect",
                "bio": "Full-stack solutions architect specializing in designing scalable, secure enterprise systems that integrate AI capabilities with modern cloud-native architectures.",
                "specializations": ["Solution Architecture", "Microservices", "API Design", "System Integration", "MLOps"],
                "order": 6,
            },
        ]
        for m in members:
            TeamMember.objects.update_or_create(name=m['name'], defaults=m)
        self.stdout.write(f'  Created {len(members)} team members')

    def _create_testimonials(self):
        testimonials = [
            {
                "client_name": "James Mitchell",
                "client_title": "CTO",
                "company": "Federal Financial Services Corp",
                "content": "Eminence Tech Solutions transformed our approach to AI adoption. Their team delivered a comprehensive AI strategy roadmap and implemented agentic AI systems that automated 60% of our document processing workflows. Their expertise in federal compliance and ATO processes was invaluable.",
                "rating": 5,
                "is_featured": True,
            },
            {
                "client_name": "Dr. Rachel Liu",
                "client_title": "VP of Innovation",
                "company": "National Healthcare Systems",
                "content": "The multi-agent AI system Eminence built for our clinical research operations is remarkable. It coordinates data collection, analysis, and reporting across multiple departments seamlessly. Their understanding of healthcare compliance and AI governance set them apart from other consultants we evaluated.",
                "rating": 5,
                "is_featured": True,
            },
            {
                "client_name": "Robert Okafor",
                "client_title": "Director of Engineering",
                "company": "Defense Analytics Group",
                "content": "Working with Eminence on our Kubernetes migration and DevSecOps transformation was a game-changer. They not only modernized our infrastructure but also implemented ML pipelines that deploy models 10x faster than our previous process. Their ATO expertise saved us months of compliance work.",
                "rating": 5,
                "is_featured": True,
            },
            {
                "client_name": "Maria Santos",
                "client_title": "Chief Digital Officer",
                "company": "Global Logistics Partners",
                "content": "Eminence's AI transformation consulting helped us completely reimagine our supply chain operations. The RAG-based knowledge system they built gives our teams instant access to operational insights that previously required days of manual analysis.",
                "rating": 5,
                "is_featured": False,
            },
            {
                "client_name": "Thomas Anderson",
                "client_title": "CISO",
                "company": "SecureBank Financial",
                "content": "The cybersecurity and AI governance frameworks Eminence implemented have become the gold standard across our organization. Their deep understanding of both AI risks and traditional security threats provided a holistic protection strategy we didn't think was possible.",
                "rating": 5,
                "is_featured": False,
            },
        ]
        for t in testimonials:
            Testimonial.objects.update_or_create(
                client_name=t['client_name'], company=t['company'], defaults=t
            )
        self.stdout.write(f'  Created {len(testimonials)} testimonials')

    def _create_case_studies(self):
        services = {s.slug: s for s in Service.objects.all()}
        studies = [
            {
                "title": "AI-Powered Document Processing for Federal Agency",
                "slug": "federal-document-processing-ai",
                "client_name": "Federal Financial Services",
                "industry": "Government / Financial Services",
                "challenge": "A federal agency needed to process millions of financial documents annually with high accuracy while maintaining strict compliance with government security standards. Manual processing was slow, error-prone, and costly.",
                "solution": "We designed and deployed an agentic AI system using multi-agent architecture with MCP integration. The system uses specialized agents for document classification, data extraction, validation, and compliance checking. A RAG-based knowledge system provides agents with up-to-date regulatory context.",
                "results": "60% reduction in document processing time. 95% accuracy rate in data extraction. Full ATO compliance achieved. $2.5M annual cost savings. Processing capacity increased from 10,000 to 50,000 documents per month.",
                "technologies_used": ["Agentic AI", "Multi-Agent Systems", "RAG", "MCP", "Kubernetes", "FedRAMP"],
                "metrics": {"processing_time_reduction": "60%", "accuracy": "95%", "cost_savings": "$2.5M/year"},
                "service": services.get("agentic-ai-systems"),
                "is_featured": True,
            },
            {
                "title": "Enterprise AI Transformation for Healthcare Provider",
                "slug": "healthcare-ai-transformation",
                "industry": "Healthcare",
                "challenge": "A national healthcare organization needed to modernize its clinical research operations and implement AI-driven analytics while maintaining HIPAA compliance and ensuring AI ethical standards.",
                "solution": "Delivered a comprehensive AI transformation including: organizational AI readiness assessment, transformation roadmap development, multi-agent AI system for research coordination, and an AI governance framework aligned with NIST AI RMF.",
                "results": "3x faster clinical research data processing. AI governance framework adopted across 15 departments. 40% improvement in research insight generation. Achieved HIPAA-compliant AI deployment.",
                "technologies_used": ["AI Transformation", "Multi-Agent AI", "AI Governance", "HIPAA", "Kubernetes", "RAG"],
                "metrics": {"speed_improvement": "3x", "departments_adopted": "15", "insight_improvement": "40%"},
                "service": services.get("ai-transformation-strategy"),
                "is_featured": True,
            },
            {
                "title": "Multi-Cloud DevSecOps & MLOps for Defense Contractor",
                "slug": "defense-devsecops-mlops",
                "industry": "Defense",
                "challenge": "A defense analytics company needed to modernize its development infrastructure, implement secure CI/CD pipelines for ML models, and achieve ATO for their AI-powered analytics platform.",
                "solution": "Implemented a comprehensive DevSecOps and MLOps transformation including Kubernetes migration, automated security scanning, ML model CI/CD pipelines, and full ATO documentation and compliance support.",
                "results": "10x faster ML model deployment. Achieved ATO in record time. 75% reduction in deployment-related incidents. Unified multi-cloud infrastructure across AWS and Azure GovCloud.",
                "technologies_used": ["DevSecOps", "MLOps", "Kubernetes", "ATO", "AWS GovCloud", "Azure GovCloud"],
                "metrics": {"deployment_speed": "10x", "incident_reduction": "75%", "cloud_platforms": "2"},
                "service": services.get("devsecops-mlops"),
                "is_featured": True,
            },
        ]
        for s in studies:
            CaseStudy.objects.update_or_create(slug=s['slug'], defaults=s)
        self.stdout.write(f'  Created {len(studies)} case studies')

    def _create_blog_posts(self):
        author = TeamMember.objects.first()
        posts = [
            {
                "title": "The Rise of Agentic AI: How Autonomous Systems Are Transforming Enterprise Operations",
                "slug": "rise-of-agentic-ai-enterprise",
                "excerpt": "Agentic AI represents a paradigm shift from traditional AI applications. Learn how autonomous AI agents are revolutionizing enterprise operations through independent reasoning, planning, and execution.",
                "content": "Agentic AI systems represent a fundamental evolution in how artificial intelligence is applied in enterprise settings. Unlike traditional AI applications that respond to specific prompts or classify data, agentic systems can independently reason through complex multi-step problems, create execution plans, utilize external tools and APIs, and deliver results with minimal human intervention.\n\n## What Makes AI 'Agentic'?\n\nThe key characteristics that define agentic AI include:\n\n1. **Autonomous Reasoning**: The ability to break down complex problems into sub-tasks and determine the best approach independently.\n\n2. **Tool Use**: Integration with external systems, APIs, databases, and tools through protocols like MCP (Model Context Protocol).\n\n3. **Planning and Execution**: Creating multi-step plans and executing them while adapting to new information.\n\n4. **Memory and Context**: Maintaining context across interactions and learning from previous tasks.\n\n5. **Collaboration**: Working with other agents through A2A (Agent-to-Agent) protocols to solve problems that require diverse expertise.\n\n## Enterprise Applications\n\nOrganizations are deploying agentic AI across numerous use cases:\n\n- **Document Processing**: Agents that classify, extract, validate, and route documents autonomously\n- **Customer Service**: Multi-agent systems that handle complex customer inquiries across channels\n- **Software Development**: AI agents that write, test, and deploy code with human oversight\n- **Research and Analysis**: Agents that gather, synthesize, and present information from multiple sources\n\n## Getting Started\n\nAt Eminence Tech Solutions, we help organizations navigate the agentic AI landscape with proven methodologies and production-ready architectures.",
                "category": "Agentic AI",
                "tags": ["Agentic AI", "Multi-Agent Systems", "Enterprise AI", "MCP", "A2A"],
                "is_published": True,
                "published_at": timezone.now(),
                "author": author,
            },
            {
                "title": "Building Production RAG Systems: Best Practices for Enterprise Deployment",
                "slug": "production-rag-systems-best-practices",
                "excerpt": "Retrieval-Augmented Generation has become the standard for building accurate AI applications with enterprise data. Here are the best practices we've learned from deploying RAG systems at scale.",
                "content": "Retrieval-Augmented Generation (RAG) has emerged as the go-to architecture for building AI applications that need to provide accurate, up-to-date responses grounded in specific organizational knowledge. However, moving from a POC to production RAG system involves significant engineering challenges.\n\n## Key Architecture Decisions\n\n### Chunking Strategy\nHow you split your documents into chunks dramatically affects retrieval quality. We recommend:\n- Semantic chunking over fixed-size chunking\n- Overlap between chunks to maintain context\n- Metadata preservation for filtering\n\n### Vector Store Selection\nChoose based on your scale and requirements:\n- **FAISS**: Great for smaller datasets, fast similarity search\n- **Pinecone**: Managed service, excellent for production\n- **ChromaDB**: Open-source, good for development\n- **pgvector**: When you need to keep everything in PostgreSQL\n\n### Retrieval Optimization\n- Implement hybrid search (semantic + keyword)\n- Use reranking models for better precision\n- Add metadata filtering for domain-specific queries\n\n## Production Considerations\n\n1. **Monitoring**: Track retrieval relevance, response quality, and latency\n2. **Evaluation**: Implement automated evaluation pipelines\n3. **Security**: Ensure document-level access controls\n4. **Scalability**: Design for horizontal scaling of both retrieval and generation\n\nAt Eminence Tech Solutions, we've deployed production RAG systems processing millions of queries for enterprise clients.",
                "category": "Generative AI",
                "tags": ["RAG", "LLM", "Vector Database", "Enterprise AI", "Best Practices"],
                "is_published": True,
                "published_at": timezone.now(),
                "author": author,
            },
            {
                "title": "AI Governance in 2025: Navigating the Regulatory Landscape",
                "slug": "ai-governance-regulatory-landscape-2025",
                "excerpt": "With the EU AI Act taking effect and new US regulations emerging, organizations must establish robust AI governance frameworks. Here's your guide to staying compliant and ethical.",
                "content": "The AI regulatory landscape is evolving rapidly, with significant implications for organizations building and deploying AI systems. Understanding and preparing for these regulations is no longer optional—it's a business imperative.\n\n## Current Regulatory Framework\n\n### EU AI Act\nThe most comprehensive AI regulation globally, the EU AI Act establishes:\n- Risk-based classification of AI systems\n- Mandatory requirements for high-risk AI\n- Transparency obligations\n- Penalties up to 7% of global revenue\n\n### NIST AI Risk Management Framework\nThe US framework provides voluntary guidelines:\n- Govern, Map, Measure, Manage lifecycle\n- Focus on trustworthy AI characteristics\n- Cross-sector applicability\n\n### State-Level Regulations\nMultiple US states are implementing their own AI laws:\n- Colorado AI Act\n- California AI transparency requirements\n- New York City automated employment decision tools law\n\n## Building Your Governance Framework\n\n1. **AI Inventory**: Catalog all AI systems in use\n2. **Risk Assessment**: Classify systems by risk level\n3. **Policy Development**: Create AI-specific policies\n4. **Technical Controls**: Implement guardrails and monitoring\n5. **Training**: Ensure organizational AI literacy\n6. **Audit**: Regular compliance reviews\n\nEminence Tech Solutions helps organizations build governance frameworks that satisfy current regulations while preparing for future requirements.",
                "category": "AI Governance",
                "tags": ["AI Governance", "EU AI Act", "NIST AI RMF", "Compliance", "Ethics"],
                "is_published": True,
                "published_at": timezone.now(),
                "author": author,
            },
        ]
        for p in posts:
            BlogPost.objects.update_or_create(slug=p['slug'], defaults=p)
        self.stdout.write(f'  Created {len(posts)} blog posts')

    def _create_partners(self):
        partners = [
            {"name": "Amazon Web Services (AWS)", "description": "Advanced consulting partner for cloud solutions", "partnership_type": "Cloud Provider", "order": 1},
            {"name": "Microsoft Azure", "description": "Solutions partner for cloud and AI services", "partnership_type": "Cloud Provider", "order": 2},
            {"name": "Google Cloud Platform", "description": "Partner for cloud and AI/ML workloads", "partnership_type": "Cloud Provider", "order": 3},
            {"name": "Red Hat", "description": "OpenShift and enterprise Linux partner", "partnership_type": "Technology", "order": 4},
            {"name": "NVIDIA", "description": "GPU computing and AI infrastructure partner", "partnership_type": "Technology", "order": 5},
            {"name": "Anthropic", "description": "AI safety and Claude AI integration partner", "partnership_type": "AI", "order": 6},
            {"name": "OpenAI", "description": "GPT and enterprise AI solutions partner", "partnership_type": "AI", "order": 7},
        ]
        for p in partners:
            Partner.objects.update_or_create(name=p['name'], defaults=p)
        self.stdout.write(f'  Created {len(partners)} partners')

    def _create_metrics(self):
        metrics = [
            {"label": "Enterprise Clients", "value": "150+", "icon": "Building2", "order": 1},
            {"label": "AI Models Deployed", "value": "500+", "icon": "Brain", "order": 2},
            {"label": "Cloud Migrations", "value": "200+", "icon": "Cloud", "order": 3},
            {"label": "Security Certifications", "value": "50+", "icon": "Shield", "order": 4},
            {"label": "Team Experts", "value": "75+", "icon": "Users", "order": 5},
            {"label": "Years of Excellence", "value": "10+", "icon": "Award", "order": 6},
        ]
        for m in metrics:
            CompanyMetric.objects.update_or_create(label=m['label'], defaults=m)
        self.stdout.write(f'  Created {len(metrics)} company metrics')

    def _create_job_postings(self):
        jobs = [
            {
                "title": "Senior Agentic AI Engineer",
                "slug": "senior-agentic-ai-engineer",
                "department": "AI Engineering",
                "employment_type": "full_time",
                "experience_level": "senior",
                "location": "Sterling, VA / Remote",
                "location_type": "hybrid",
                "description": "Join our AI Engineering team to design and build production-grade agentic AI systems for enterprise clients. You'll work with cutting-edge technologies including LangChain, AutoGen, MCP, and A2A protocols.",
                "requirements": ["5+ years of software engineering experience", "3+ years with AI/ML systems", "Experience with LLM frameworks (LangChain, LlamaIndex)", "Strong Python and system design skills", "Experience deploying AI in production"],
                "responsibilities": ["Design and implement agentic AI architectures", "Build multi-agent systems using MCP and A2A protocols", "Develop RAG pipelines for enterprise knowledge systems", "Collaborate with clients on AI solution design", "Mentor junior engineers"],
                "skills": ["Python", "LangChain", "LLM", "RAG", "Kubernetes", "AWS/Azure/GCP"],
                "salary_range": "$160,000 - $220,000",
                "benefits": ["Health/Dental/Vision", "401k matching", "Remote work flexibility", "Conference budget", "Continuous learning stipend"],
            },
            {
                "title": "DevSecOps Engineer",
                "slug": "devsecops-engineer",
                "department": "Cloud & Infrastructure",
                "employment_type": "full_time",
                "experience_level": "mid",
                "location": "Sterling, VA / Remote",
                "location_type": "remote",
                "description": "Build and maintain secure CI/CD pipelines for AI/ML workloads across multi-cloud environments. You'll implement DevSecOps best practices and support ATO processes for federal clients.",
                "requirements": ["3+ years DevOps/DevSecOps experience", "Kubernetes and container orchestration expertise", "Experience with CI/CD tools (Jenkins, GitLab CI, ArgoCD)", "Knowledge of security frameworks (NIST, FedRAMP)", "Cloud platform experience (AWS, Azure, or GCP)"],
                "responsibilities": ["Build and maintain CI/CD pipelines", "Implement security automation", "Support Kubernetes and OpenShift clusters", "Assist with ATO documentation and compliance", "Develop Infrastructure as Code"],
                "skills": ["Kubernetes", "Docker", "Terraform", "Jenkins", "AWS", "Security"],
                "salary_range": "$130,000 - $170,000",
                "benefits": ["Health/Dental/Vision", "401k matching", "Remote work", "Professional development"],
            },
            {
                "title": "AI Solutions Architect",
                "slug": "ai-solutions-architect",
                "department": "Consulting",
                "employment_type": "full_time",
                "experience_level": "lead",
                "location": "Sterling, VA / Remote",
                "location_type": "hybrid",
                "description": "Lead the technical design of AI solutions for enterprise clients. You'll serve as the bridge between business requirements and technical implementation, designing architectures for complex AI systems.",
                "requirements": ["8+ years in software architecture", "5+ years with AI/ML systems", "Experience with enterprise architecture frameworks", "Strong client communication skills", "Cloud architecture certifications preferred"],
                "responsibilities": ["Design AI solution architectures for clients", "Lead technical discovery sessions", "Create architecture blueprints and roadmaps", "Guide implementation teams", "Present to C-level stakeholders"],
                "skills": ["Solution Architecture", "AI/ML", "Cloud", "Enterprise Architecture", "Communication"],
                "salary_range": "$180,000 - $250,000",
                "benefits": ["Health/Dental/Vision", "401k matching", "Equity options", "Executive benefits package"],
            },
        ]
        for j in jobs:
            JobPosting.objects.update_or_create(slug=j['slug'], defaults=j)
        self.stdout.write(f'  Created {len(jobs)} job postings')
