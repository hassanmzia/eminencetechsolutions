import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Sparkles, Network, TrendingUp, GitBranch, Cloud,
  Shield, Scale, Database, GraduationCap, ArrowRight, CheckCircle, ArrowLeft, Wifi,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={32} />,
  Sparkles: <Sparkles size={32} />,
  Network: <Network size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  GitBranch: <GitBranch size={32} />,
  Cloud: <Cloud size={32} />,
  Shield: <Shield size={32} />,
  Scale: <Scale size={32} />,
  Database: <Database size={32} />,
  GraduationCap: <GraduationCap size={32} />,
  Wifi: <Wifi size={32} />,
};

const serviceImages: Record<string, string> = {
  'agentic-ai-systems': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
  'generative-ai-solutions': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80',
  'multi-agent-ai-systems': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
  'ai-transformation-strategy': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  'devsecops-mlops': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  'cloud-kubernetes': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
  'cybersecurity-compliance': 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80',
  'ai-governance-ethics': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  'data-engineering-analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'training-education': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  'data-engineering-data-science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'iot-device-integration': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
};

const allServices = [
  {
    title: 'Agentic AI Systems', slug: 'agentic-ai-systems', icon: 'Brain',
    short_description: 'Design, develop, and deploy autonomous AI agent systems that reason, plan, and execute complex tasks with human-in-the-loop oversight.',
    full_description: 'Our Agentic AI Systems practice delivers cutting-edge autonomous AI solutions that transform how enterprises operate. We architect systems where AI agents independently reason through complex problems, create execution plans, utilize tools, and deliver results with built-in safety guardrails. From single-agent automation to sophisticated multi-agent orchestrations, we build AI systems that augment human decision-making while maintaining full transparency and control. Our solutions incorporate MCP (Model Context Protocol) for robust tool integration and A2A (Agent-to-Agent) protocols for seamless inter-agent collaboration.',
    features: ['Autonomous task execution', 'Multi-step reasoning chains', 'Tool-use and API integration', 'Human-in-the-loop workflows', 'Safety guardrails and monitoring', 'MCP and A2A protocol support'],
    technologies: ['LangChain', 'AutoGen', 'CrewAI', 'OpenAI', 'Anthropic', 'MCP', 'A2A'],
  },
  {
    title: 'Generative AI Solutions', slug: 'generative-ai-solutions', icon: 'Sparkles',
    short_description: 'Custom LLM implementations, fine-tuning, RAG systems, and enterprise generative AI applications tailored to your business needs.',
    full_description: 'Transform your business with our enterprise-grade Generative AI solutions. We build custom LLM applications, implement Retrieval-Augmented Generation (RAG) pipelines for accurate domain-specific responses, fine-tune models on your proprietary data, and deploy scalable generative AI systems. Whether you need intelligent document processing, automated content generation, code assistance, or conversational AI, our team delivers production-ready solutions with enterprise security and compliance built in.',
    features: ['Custom LLM deployment', 'RAG pipeline development', 'Model fine-tuning', 'Prompt engineering', 'Content generation systems', 'Multimodal AI applications'],
    technologies: ['GPT-4', 'Claude', 'Llama', 'FAISS', 'Pinecone', 'ChromaDB', 'LangChain'],
  },
  {
    title: 'Multi-Agent AI Systems', slug: 'multi-agent-ai-systems', icon: 'Network',
    short_description: 'Architect and build collaborative multi-agent systems using MCP and A2A protocols for complex enterprise workflows.',
    full_description: 'Our Multi-Agent Systems practice specializes in designing and implementing collaborative AI architectures where multiple specialized agents work together to solve complex enterprise challenges. Using Model Context Protocol (MCP) for standardized tool integration and Agent-to-Agent (A2A) communication protocols, we build systems where agents can discover, negotiate, and collaborate autonomously.',
    features: ['Agent-to-Agent (A2A) protocols', 'Model Context Protocol (MCP)', 'Distributed agent orchestration', 'Specialized agent design', 'Agent discovery and negotiation', 'Collaborative problem solving'],
    technologies: ['MCP', 'A2A', 'AutoGen', 'CrewAI', 'LangGraph', 'Kubernetes'],
  },
  {
    title: 'AI Transformation & Strategy', slug: 'ai-transformation-strategy', icon: 'TrendingUp',
    short_description: 'End-to-end AI transformation consulting with roadmaps, blueprints, architecture development, and organizational change management.',
    full_description: 'Navigate the AI revolution with confidence. Our AI Transformation & Strategy practice provides comprehensive consulting services to help organizations plan, execute, and sustain their AI journey. We start with thorough assessments of your current capabilities, define clear transformation roadmaps, develop detailed architectural blueprints, and guide you through every phase of implementation.',
    features: ['AI readiness assessment', 'Transformation roadmaps', 'Blueprint and architecture design', 'Change management', 'ROI analysis and tracking', 'Best practices advisory'],
    technologies: ['Strategic Frameworks', 'TOGAF', 'SAFe', 'Design Thinking'],
  },
  {
    title: 'DevSecOps & MLOps', slug: 'devsecops-mlops', icon: 'GitBranch',
    short_description: 'Full DevSecOps pipeline implementation with integrated security, CI/CD for ML models, and automated deployment workflows.',
    full_description: 'Accelerate your development velocity while maintaining the highest security standards. Our DevSecOps & MLOps practice builds end-to-end pipelines that automate everything from code commit to production deployment, with security checks integrated at every stage.',
    features: ['CI/CD pipeline automation', 'Security-first development', 'ML model lifecycle management', 'Infrastructure as Code', 'Automated testing and validation', 'Monitoring and observability'],
    technologies: ['Jenkins', 'GitLab CI', 'ArgoCD', 'Terraform', 'Ansible', 'MLflow', 'Kubeflow'],
  },
  {
    title: 'Cloud & Kubernetes', slug: 'cloud-kubernetes', icon: 'Cloud',
    short_description: 'Multi-cloud architecture, Kubernetes and OpenShift orchestration, and cloud-native application development across AWS, Azure, and GCP.',
    full_description: 'Harness the full power of cloud computing with our multi-cloud expertise. We design and implement cloud architectures that optimize for performance, cost, and resilience across AWS, Azure, and GCP.',
    features: ['Multi-cloud architecture', 'Kubernetes administration', 'OpenShift management', 'Container orchestration', 'Cloud migration', 'Cost optimization'],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'OpenShift', 'Docker', 'Helm', 'Istio'],
  },
  {
    title: 'Cybersecurity & Compliance', slug: 'cybersecurity-compliance', icon: 'Shield',
    short_description: 'Comprehensive cybersecurity services including ATO support, compliance frameworks, AI security, and governance implementation.',
    full_description: 'Protect your digital assets and AI systems with our comprehensive cybersecurity and compliance services. We provide end-to-end security solutions including ATO support, compliance frameworks (FedRAMP, NIST, SOC 2, HIPAA), AI-specific security assessments, and continuous monitoring.',
    features: ['ATO support and acceleration', 'Compliance framework implementation', 'AI security assessment', 'Penetration testing', 'Continuous monitoring', 'Incident response planning'],
    technologies: ['NIST RMF', 'FedRAMP', 'SOC 2', 'HIPAA', 'SIEM', 'SOAR'],
  },
  {
    title: 'AI Governance & Ethics', slug: 'ai-governance-ethics', icon: 'Scale',
    short_description: 'Establishing ethical AI frameworks, regulatory compliance, responsible AI practices, guardrails, and governance structures.',
    full_description: 'As AI becomes central to business operations, robust governance and ethical frameworks are essential. We help organizations establish comprehensive AI governance structures including ethical review boards, bias detection and mitigation processes, transparency standards, and regulatory compliance.',
    features: ['Ethical AI framework development', 'Bias detection and mitigation', 'Regulatory compliance (EU AI Act, NIST AI RMF)', 'AI guardrails implementation', 'Transparency and explainability', 'Risk assessment and management'],
    technologies: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'Guardrails AI', 'Responsible AI Toolkit'],
  },
  {
    title: 'Data Engineering & Analytics', slug: 'data-engineering-analytics', icon: 'Database',
    short_description: 'Build robust data pipelines, implement data lakes, and deliver actionable analytics to power your AI and business intelligence.',
    full_description: 'Data is the foundation of every successful AI initiative. Our Data Engineering & Analytics practice designs and implements scalable data architectures, ETL/ELT pipelines, data lakes, and analytics platforms that transform raw data into actionable intelligence.',
    features: ['Data pipeline architecture', 'Data lake implementation', 'Real-time analytics', 'Data quality management', 'Business intelligence', 'Data governance'],
    technologies: ['Apache Kafka', 'Apache Spark', 'Snowflake', 'dbt', 'Airflow', 'PowerBI', 'Tableau'],
  },
  {
    title: 'Data Engineering & Data Science', slug: 'data-engineering-data-science', icon: 'Database',
    short_description: 'Scalable data pipelines, data lakes, advanced analytics, and machine learning to turn raw data into actionable insights.',
    full_description: 'Data is the lifeblood of modern AI and business intelligence. Our Data Engineering & Data Science practice designs and builds robust data architectures, ETL/ELT pipelines, data lakes, and advanced analytics platforms. We combine data engineering best practices with cutting-edge data science techniques including statistical modeling, machine learning, and deep learning to extract maximum value from your data assets.',
    features: ['Data pipeline architecture', 'Data lake and warehouse design', 'Machine learning model development', 'Advanced analytics and visualization', 'Real-time streaming analytics', 'Data quality and governance'],
    technologies: ['Apache Spark', 'Snowflake', 'dbt', 'Python', 'Airflow', 'Kafka', 'PowerBI', 'Tableau'],
  },
  {
    title: 'IoT Device Integration', slug: 'iot-device-integration', icon: 'Wifi',
    short_description: 'End-to-end IoT solutions connecting devices, sensors, and edge computing to enterprise AI and cloud platforms.',
    full_description: 'Bridge the physical and digital worlds with our IoT Device Integration practice. We design and implement end-to-end IoT architectures that connect sensors, devices, and edge computing nodes to enterprise cloud platforms and AI systems. From device provisioning and management to real-time data ingestion, edge AI processing, and predictive maintenance, we deliver IoT solutions that drive operational efficiency and unlock new business capabilities.',
    features: ['Device provisioning and management', 'Edge computing and Edge AI', 'Real-time data ingestion', 'Predictive maintenance', 'Digital twin implementation', 'IoT security and compliance'],
    technologies: ['MQTT', 'AWS IoT Core', 'Azure IoT Hub', 'Edge AI', 'Raspberry Pi', 'Arduino', 'LoRaWAN'],
  },
  {
    title: 'Training & Education', slug: 'training-education', icon: 'GraduationCap',
    short_description: 'Professional training programs in AI/ML, Cloud Engineering, DevSecOps, Kubernetes, and emerging technologies.',
    full_description: 'Empower your team with the skills to drive innovation. Our Training & Education practice offers comprehensive professional development programs covering AI/ML, cloud engineering, DevSecOps, Kubernetes administration, and more.',
    features: ['Customized training programs', 'Hands-on lab environments', 'Certification preparation', 'Team skill assessments', 'Ongoing learning paths', 'Executive AI literacy'],
    technologies: ['AI/ML', 'Cloud Platforms', 'Kubernetes', 'DevSecOps', 'Data Science', 'Cybersecurity'],
  },
];

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const ServiceDetail: React.FC<{ service: typeof allServices[0] }> = ({ service }) => (
  <div style={{ paddingTop: '6rem' }}>
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '2rem', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to All Services
        </Link>
        {serviceImages[service.slug] && (
          <img
            src={serviceImages[service.slug]}
            alt={service.title}
            className="section-banner-img"
          />
        )}
        <div className="content-grid" style={{ alignItems: 'start' }}>
          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', marginBottom: '1.5rem' }}>
              {iconMap[service.icon]}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>{service.title}</h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {service.full_description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/consulting" className="btn btn-primary">Start a Project <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Key Capabilities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {service.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-success-500)', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Technologies</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {service.technologies.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Get Started?</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Let's discuss how {service.title} can transform your operations.
        </p>
        <Link to="/consulting" className="btn btn-primary btn-lg">Schedule a Consultation <ArrowRight size={16} /></Link>
      </div>
    </section>
  </div>
);

const Services: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (slug) {
    const service = allServices.find((s) => s.slug === slug);
    if (service) return <ServiceDetail service={service} />;
  }

  return (
    <div style={{ paddingTop: '6rem' }}>
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label"><Brain size={14} /> Our Services</span>
              <h1 className="section-title">Comprehensive <span className="gradient-text">AI & Cloud Services</span></h1>
              <p className="section-subtitle">End-to-end consulting, development, and deployment services for enterprise AI transformation.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-2">
            {allServices.map((service, idx) => (
              <AnimatedSection key={service.slug} delay={idx * 75}>
                <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="card" style={{ height: '100%', cursor: 'pointer', padding: 0, overflow: 'hidden' }}>
                    {serviceImages[service.slug] && (
                      <img src={serviceImages[service.slug]} alt={service.title} className="card-img" style={{ borderRadius: 0, marginBottom: 0, height: '140px' }} />
                    )}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'start' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', flexShrink: 0 }}>
                          {iconMap[service.icon]}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{service.title}</h3>
                          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{service.short_description}</p>
                          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                            {service.technologies.slice(0, 4).map((t) => (
                              <span key={t} className="badge" style={{ fontSize: '0.6875rem' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
