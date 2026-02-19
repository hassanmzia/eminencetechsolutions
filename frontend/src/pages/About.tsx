
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Target, Eye, Users, Award, MapPin, ArrowRight,
  CheckCircle, Globe, Shield, Cpu, Linkedin,
} from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const team = [
  { name: 'Hassan M. Zia', title: 'Founder & CEO', bio: 'Visionary technologist with 20+ years in enterprise IT, AI/ML, cloud architecture, and cybersecurity.', specs: ['AI Strategy', 'Enterprise Architecture', 'Cloud Solutions', 'Agentic AI'] },
  { name: 'Dr. Sarah Chen', title: 'Chief AI Officer', bio: 'PhD in ML with extensive experience building production AI systems including agentic AI and multi-agent architectures.', specs: ['Machine Learning', 'Agentic AI', 'NLP', 'Multi-Agent Systems'] },
  { name: 'Michael Torres', title: 'VP of Cloud Engineering', bio: 'Cloud expert with deep expertise across AWS, Azure, GCP. Certified Kubernetes administrator.', specs: ['Multi-Cloud', 'Kubernetes', 'OpenShift', 'DevSecOps'] },
  { name: 'Priya Sharma', title: 'Director of AI Governance', bio: 'Leading authority on AI ethics, governance, and regulatory compliance including EU AI Act and NIST AI RMF.', specs: ['AI Ethics', 'Governance', 'Compliance', 'NIST AI RMF'] },
  { name: 'David Kim', title: 'Head of Cybersecurity', bio: 'CISSP-certified expert with extensive experience in federal ATO processes and AI security.', specs: ['Cybersecurity', 'ATO', 'FedRAMP', 'AI Security'] },
  { name: 'Alex Rodriguez', title: 'Principal Solutions Architect', bio: 'Full-stack architect specializing in scalable enterprise systems with integrated AI capabilities.', specs: ['Solution Architecture', 'Microservices', 'MLOps', 'API Design'] },
];

const About: React.FC = () => (
  <div style={{ paddingTop: '6rem' }}>
    {/* Hero */}
    <section className="section" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ maxWidth: '800px' }}>
            <span className="section-label"><Brain size={14} /> About Us</span>
            <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              Pioneering <span className="gradient-text">AI Innovation</span> Since Day One
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              Eminence Tech Solutions stands at the forefront of AI and cloud-based innovation, serving as a catalyst for business growth. Founded in Sterling, Virginia, we have grown into a trusted partner for enterprises seeking to harness the transformative power of artificial intelligence.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section" style={{ background: 'var(--color-dark-900)' }}>
      <div className="container">
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          <AnimatedSection>
            <div className="card" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-400)' }}>
                  <Target size={22} />
                </div>
                <h3 style={{ color: 'white' }}>Our Mission</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                To harmonize client aspirations with our technological expertise, unlocking a future where businesses thrive through tailored AI and cloud solutions. We are committed to delivering innovative, secure, and ethically responsible AI systems that drive measurable business outcomes.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="card" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-violet-400)' }}>
                  <Eye size={22} />
                </div>
                <h3 style={{ color: 'white' }}>Our Vision</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                To be the most trusted AI consulting partner for enterprises undergoing digital transformation. We envision a world where every organization, regardless of size, can leverage the power of AI to innovate, compete, and create lasting value for their stakeholders.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label"><Award size={14} /> Our Values</span>
            <h2 className="section-title">What <span className="gradient-text">Drives Us</span></h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-4">
          {[
            { icon: <Cpu size={24} />, title: 'Innovation First', desc: 'We stay at the cutting edge, adopting and pioneering technologies like MCP, A2A, and agentic AI before they become mainstream.' },
            { icon: <Shield size={24} />, title: 'Security by Design', desc: 'Every solution we build has security, compliance, and governance integrated from the ground up.' },
            { icon: <Users size={24} />, title: 'Client Partnership', desc: 'We are not just vendors; we become an extension of your team, invested in your long-term success.' },
            { icon: <Globe size={24} />, title: 'Ethical AI', desc: 'We champion responsible AI development with transparency, fairness, and accountability at the core.' },
          ].map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 100}>
              <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ color: 'var(--color-primary-400)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>{v.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section" style={{ background: 'var(--color-dark-900)' }}>
      <div className="container">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label"><Users size={14} /> Leadership</span>
            <h2 className="section-title">Meet Our <span className="gradient-text">Expert Team</span></h2>
            <p className="section-subtitle">Industry veterans with deep expertise across AI, cloud, security, and enterprise architecture.</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-3">
          {team.map((m, i) => (
            <AnimatedSection key={m.name} delay={i * 75}>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 style={{ color: 'white', marginBottom: '0.25rem' }}>{m.name}</h4>
                <div style={{ color: 'var(--color-primary-400)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>{m.title}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{m.bio}</p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {m.specs.map(s => <span key={s} className="badge" style={{ fontSize: '0.6875rem' }}>{s}</span>)}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Location */}
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <AnimatedSection>
          <MapPin size={32} style={{ color: 'var(--color-primary-400)', marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.75rem' }}>Headquartered in <span className="gradient-text">Sterling, Virginia</span></h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            44330 Mercure Circle, Sterling, VA - Serving clients nationwide and globally with on-site and remote consulting.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/consulting" className="btn btn-primary btn-lg">Work With Us <ArrowRight size={16} /></Link>
            <Link to="/careers" className="btn btn-secondary btn-lg">Join Our Team</Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default About;
