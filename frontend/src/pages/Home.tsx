import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Sparkles, Network, TrendingUp, GitBranch, Cloud,
  Shield, Scale, Database, GraduationCap, ArrowRight, Star,
  CheckCircle, Zap, Users, Building2, Award,
  Globe, Cpu, Lock, BarChart3, Wifi
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={28} />,
  Sparkles: <Sparkles size={28} />,
  Network: <Network size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  GitBranch: <GitBranch size={28} />,
  Cloud: <Cloud size={28} />,
  Shield: <Shield size={28} />,
  Scale: <Scale size={28} />,
  Database: <Database size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  Wifi: <Wifi size={28} />,
};

const services = [
  { title: 'Agentic AI Systems', slug: 'agentic-ai-systems', icon: 'Brain', desc: 'Autonomous AI agents that reason, plan, and execute complex enterprise tasks with human oversight.', techs: ['LangChain', 'MCP', 'A2A'], img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80' },
  { title: 'Generative AI Solutions', slug: 'generative-ai-solutions', icon: 'Sparkles', desc: 'Custom LLM applications, RAG pipelines, and enterprise generative AI tailored to your data.', techs: ['GPT-4', 'Claude', 'RAG'], img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80' },
  { title: 'Multi-Agent Systems', slug: 'multi-agent-ai-systems', icon: 'Network', desc: 'Collaborative multi-agent architectures using MCP and A2A protocols for complex workflows.', techs: ['MCP', 'A2A', 'AutoGen'], img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
  { title: 'AI Transformation', slug: 'ai-transformation-strategy', icon: 'TrendingUp', desc: 'End-to-end strategy with roadmaps, blueprints, and organizational change management.', techs: ['Strategy', 'Roadmap', 'ROI'], img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80' },
  { title: 'DevSecOps & MLOps', slug: 'devsecops-mlops', icon: 'GitBranch', desc: 'Secure CI/CD pipelines, ML lifecycle management, and automated deployment workflows.', techs: ['ArgoCD', 'MLflow', 'Terraform'], img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cloud & Kubernetes', slug: 'cloud-kubernetes', icon: 'Cloud', desc: 'Multi-cloud architecture, Kubernetes/OpenShift orchestration across AWS, Azure, GCP.', techs: ['K8s', 'OpenShift', 'Docker'], img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
  { title: 'Cybersecurity & ATO', slug: 'cybersecurity-compliance', icon: 'Shield', desc: 'Comprehensive security services including ATO support and compliance frameworks.', techs: ['FedRAMP', 'NIST', 'SOC 2'], img: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=600&q=80' },
  { title: 'AI Governance', slug: 'ai-governance-ethics', icon: 'Scale', desc: 'Ethical AI frameworks, regulatory compliance, guardrails, and governance structures.', techs: ['EU AI Act', 'NIST RMF', 'Ethics'], img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  { title: 'Data Engineering & Data Science', slug: 'data-engineering-data-science', icon: 'Database', desc: 'Scalable data pipelines, data lakes, advanced analytics, and machine learning to turn raw data into actionable insights.', techs: ['Spark', 'Snowflake', 'Python', 'dbt'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
  { title: 'IoT Device Integration', slug: 'iot-device-integration', icon: 'Wifi', desc: 'End-to-end IoT solutions connecting devices, sensors, and edge computing to enterprise AI and cloud platforms.', techs: ['MQTT', 'Edge AI', 'AWS IoT', 'Azure IoT'], img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
];



const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const bannerImages = [
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&h=400&q=80', alt: 'Corporate AI migration - modern enterprise building' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&h=400&q=80', alt: 'Corporate AI strategy team' },
  { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&h=400&q=80', alt: 'AI robot visionary' },
];

const Home: React.FC = () => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Banner Image - cycles through 3 images */}
      <section style={{ background: 'var(--color-bg-secondary)', paddingTop: '5rem' }}>
        <div className="container">
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: 'var(--radius-2xl)' }}>
            {bannerImages.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="section-banner-img"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '220px',
                  marginBottom: 0,
                  opacity: i === bannerIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-secondary)',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '3rem', paddingBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <AnimatedSection>
                <div className="section-label" style={{ marginBottom: '1.5rem' }}>
                  <Zap size={14} /> AI-First Consulting
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <div style={{
                  fontSize: 'clamp(0.85rem, 1.6vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'var(--color-primary-600)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}>
                  WE MAKE IT HAPPEN
                </div>
                <h1 style={{ marginBottom: '1.5rem', fontSize: 'clamp(0.9rem, 1.6vw, 1.25rem)', fontWeight: 700, lineHeight: 1.2 }}>
                  Pioneering{' '}
                  <span className="gradient-text">AI Innovation</span>
                  {' '}for Enterprise Transformation
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '640px', lineHeight: 1.7 }}>
                  Expert consulting in Agentic AI, Multi-Agent Systems, Generative AI,
                  DevSecOps, Cloud Architecture, and Cybersecurity. We architect, build, and
                  deploy intelligent systems that transform how enterprises operate.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/consulting" className="btn btn-primary btn-lg">
                    Start Your AI Journey <ArrowRight size={18} />
                  </Link>
                  <Link to="/services" className="btn btn-secondary btn-lg">
                    Explore Services
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                  {[
                    { icon: <Cpu size={16} />, label: 'MCP & A2A Protocols' },
                    { icon: <Globe size={16} />, label: 'Multi-Cloud Expert' },
                    { icon: <Lock size={16} />, label: 'ATO & FedRAMP' },
                    { icon: <BarChart3 size={16} />, label: 'AI Governance' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--color-text-muted)', fontSize: '0.875rem',
                    }}>
                      <span style={{ color: 'var(--color-primary-600)' }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={300}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaborating on AI solutions"
                  className="hero-side-img"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
                    alt="Digital technology visualization"
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=400&q=80"
                    alt="Data analytics dashboard"
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label"><Brain size={14} /> What We Do</span>
              <h2 className="section-title">
                Comprehensive <span className="gradient-text">AI & Cloud</span> Services
              </h2>
              <p className="section-subtitle">
                From strategy to deployment, we deliver end-to-end AI solutions that drive measurable business outcomes.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {services.map((service, idx) => (
              <AnimatedSection key={service.slug} delay={idx * 75}>
                <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="card" style={{ height: '100%', cursor: 'pointer', padding: 0, overflow: 'hidden' }}>
                    <img src={service.img} alt={service.title} className="card-img" style={{ borderRadius: '0', marginBottom: 0 }} />
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'var(--color-primary-50)',
                        border: '1px solid var(--color-primary-100)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--color-primary-600)', marginBottom: '1.25rem',
                      }}>
                        {iconMap[service.icon]}
                      </div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {service.desc}
                      </p>
                      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {service.techs.map((tech) => (
                          <span key={tech} className="badge" style={{ fontSize: '0.6875rem' }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/services" className="btn btn-secondary">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span className="section-label"><Star size={14} /> Why Eminence</span>
                <h2 style={{ marginBottom: '1.5rem' }}>
                  The AI Partner Your <span className="gradient-text">Enterprise Deserves</span>
                </h2>
                <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                  We combine deep AI expertise with enterprise-grade engineering to deliver
                  solutions that are not just innovative, but production-ready, secure, and compliant.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { title: 'AI-First Architecture', desc: 'Every solution is designed with AI at the core, using cutting-edge protocols like MCP and A2A for agent interoperability.' },
                    { title: 'Security & Compliance Built-In', desc: 'Federal-grade security with ATO, FedRAMP, and NIST compliance integrated from day one.' },
                    { title: 'Full Lifecycle Support', desc: 'From strategic roadmapping through deployment and ongoing optimization - we are with you every step.' },
                    { title: 'Multi-Cloud Expertise', desc: 'Deploy anywhere with our Kubernetes, OpenShift, and multi-cloud orchestration capabilities across AWS, Azure, and GCP.' },
                    { title: 'Proven Track Record', desc: 'Deep experience across government, healthcare, financial services, and defense sectors.' },
                  ].map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '0.875rem' }}>
                      <CheckCircle size={20} style={{ color: 'var(--color-success-500)', flexShrink: 0, marginTop: '0.125rem' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div style={{
                background: 'var(--color-surface)',
                border: 'var(--border-subtle)',
                borderRadius: 'var(--radius-2xl)',
                padding: '2.5rem',
                position: 'relative',
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--color-text-primary)' }}>
                  Our Technology Expertise
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {[
                    { cat: 'AI/ML', items: ['LangChain', 'AutoGen', 'CrewAI', 'PyTorch', 'Hugging Face'] },
                    { cat: 'Protocols', items: ['MCP', 'A2A', 'OpenAI API', 'Claude API'] },
                    { cat: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'Multi-Cloud'] },
                    { cat: 'DevOps', items: ['Kubernetes', 'OpenShift', 'Docker', 'Terraform'] },
                    { cat: 'Security', items: ['NIST RMF', 'FedRAMP', 'SOC 2', 'SIEM'] },
                    { cat: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka', 'Vector DBs'] },
                  ].map((group) => (
                    <div key={group.cat}>
                      <div style={{
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-600)',
                        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem',
                      }}>
                        {group.cat}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {group.items.map((item) => (
                          <span key={item} style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Capabilities Highlight */}
      <section className="section" style={{
        background: 'var(--color-bg-primary)',
      }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label"><Network size={14} /> AI Architecture</span>
              <h2 className="section-title">
                Built on <span className="gradient-text">Next-Generation AI Protocols</span>
              </h2>
              <p className="section-subtitle">
                Our solutions leverage the latest in AI agent interoperability standards.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-3">
            {[
              {
                title: 'Model Context Protocol (MCP)',
                desc: 'Standardized protocol for connecting AI models to tools, data sources, and APIs. We implement MCP servers and clients for seamless AI system integration.',
                features: ['Tool integration', 'Data source connectivity', 'Standardized interfaces', 'Cross-platform compatibility'],
                img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Agent-to-Agent (A2A)',
                desc: 'Inter-agent communication protocol enabling AI agents to discover, negotiate, and collaborate. We build A2A-compliant agent networks for complex workflows.',
                features: ['Agent discovery', 'Task delegation', 'Collaborative solving', 'Agent cards & skills'],
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'RAG Architecture',
                desc: 'Enterprise Retrieval-Augmented Generation systems that ground AI responses in your organizational knowledge with high accuracy and security.',
                features: ['Semantic search', 'Hybrid retrieval', 'Document processing', 'Access controls'],
                img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
              },
            ].map((item, idx) => (
              <AnimatedSection key={item.title} delay={idx * 100}>
                <div className="card" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} className="card-img" style={{ borderRadius: 0, marginBottom: 0 }} />
                  <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {item.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-success-500)' }} /> {f}
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{
        background: 'var(--color-bg-secondary)',
      }}>
        <div className="container">
          <AnimatedSection>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-border)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                alt="Team collaborating in modern office"
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'var(--color-surface)',
              }}>
                <h2 style={{ marginBottom: '1rem' }}>
                  Ready to Transform Your Business with <span className="gradient-text">AI</span>?
                </h2>
                <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                  Let our experts help you navigate the AI landscape. From strategy to deployment, we're your trusted partner.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/consulting" className="btn btn-primary btn-lg">
                    Schedule a Consultation <ArrowRight size={18} />
                  </Link>
                  <Link to="/contact" className="btn btn-secondary btn-lg">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
