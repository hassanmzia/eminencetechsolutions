
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Trophy, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const caseStudies = [
  {
    title: 'AI-Powered Document Processing for Federal Agency', industry: 'Government / Financial Services',
    challenge: 'A federal agency needed to process millions of financial documents annually with high accuracy while maintaining strict compliance.',
    solution: 'Deployed an agentic AI system using multi-agent architecture with MCP integration for document classification, extraction, validation, and compliance checking.',
    results: ['60% reduction in processing time', '95% accuracy in data extraction', 'Full ATO compliance', '$2.5M annual cost savings'],
    techs: ['Agentic AI', 'Multi-Agent Systems', 'RAG', 'MCP', 'Kubernetes', 'FedRAMP'],
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Enterprise AI Transformation for Healthcare Provider', industry: 'Healthcare',
    challenge: 'A national healthcare organization needed to modernize clinical research operations with AI while maintaining HIPAA compliance.',
    solution: 'Delivered comprehensive AI transformation including readiness assessment, roadmap development, multi-agent system, and AI governance framework.',
    results: ['3x faster research data processing', 'AI governance across 15 departments', '40% improvement in insights', 'HIPAA-compliant AI deployment'],
    techs: ['AI Transformation', 'Multi-Agent AI', 'AI Governance', 'HIPAA', 'Kubernetes', 'RAG'],
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Multi-Cloud DevSecOps & MLOps for Defense Contractor', industry: 'Defense',
    challenge: 'A defense company needed to modernize infrastructure, implement secure ML pipelines, and achieve ATO for AI analytics platform.',
    solution: 'Implemented DevSecOps and MLOps transformation including Kubernetes migration, automated security scanning, and ML CI/CD pipelines.',
    results: ['10x faster ML model deployment', 'ATO achieved in record time', '75% fewer deployment incidents', 'Unified multi-cloud infrastructure'],
    techs: ['DevSecOps', 'MLOps', 'Kubernetes', 'ATO', 'AWS GovCloud', 'Azure GovCloud'],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
];

const CaseStudies: React.FC = () => (
  <div style={{ paddingTop: '6rem' }}>
    <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <AnimatedSection>
            <div>
              <span className="section-label"><Trophy size={14} /> Case Studies</span>
              <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                Proven Results Across <span className="gradient-text">Industries</span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Explore how we have helped organizations achieve measurable business outcomes through AI innovation, cloud modernization, and security excellence.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80"
              alt="Business analytics and results"
              className="hero-side-img"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {caseStudies.map((cs, idx) => (
            <AnimatedSection key={cs.title} delay={idx * 100}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={cs.img} alt={cs.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <span className="badge" style={{ marginBottom: '0.75rem' }}>{cs.industry}</span>
                    <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem', lineHeight: 1.3 }}>{cs.title}</h2>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-primary-600)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Challenge</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary-600)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Solution</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{cs.solution}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-success-600)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Results</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {cs.results.map(r => (
                        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                          <CheckCircle size={14} style={{ color: 'var(--color-success-500)', flexShrink: 0 }} /> {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {cs.techs.map(t => <span key={t} className="badge" style={{ fontSize: '0.6875rem' }}>{t}</span>)}
                </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div className="card" style={{ display: 'inline-block', maxWidth: '500px', textAlign: 'center', background: 'var(--color-surface)' }}>
              <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Have a Similar Challenge?</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                Let us show you how our expertise can deliver results for your organization.
              </p>
              <Link to="/consulting" className="btn btn-primary">Start a Conversation <ArrowRight size={16} /></Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default CaseStudies;
