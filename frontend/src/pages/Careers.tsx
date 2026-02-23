import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase, MapPin, Clock, DollarSign, CheckCircle,
  ChevronDown, ChevronUp, ArrowRight, Users, Heart, GraduationCap, Globe, ExternalLink,
} from 'lucide-react';

const FAIRHIRE_URL = 'https://demo.eminencetechsolutions.com:3047/login';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const jobs = [
  {
    title: 'Senior Agentic AI Engineer', slug: 'senior-agentic-ai-engineer', department: 'AI Engineering',
    type: 'Full Time', level: 'Senior', location: 'Sterling, VA / Remote', locationType: 'Hybrid',
    salary: '$160,000 - $220,000',
    description: 'Join our AI Engineering team to design and build production-grade agentic AI systems for enterprise clients.',
    requirements: ['5+ years software engineering', '3+ years AI/ML systems', 'LLM frameworks experience', 'Strong Python skills', 'Production AI deployment'],
    skills: ['Python', 'LangChain', 'LLM', 'RAG', 'Kubernetes', 'AWS/Azure/GCP'],
    benefits: ['Health/Dental/Vision', '401k matching', 'Remote flexibility', 'Conference budget', 'Learning stipend'],
  },
  {
    title: 'DevSecOps Engineer', slug: 'devsecops-engineer', department: 'Cloud & Infrastructure',
    type: 'Full Time', level: 'Mid Level', location: 'Sterling, VA / Remote', locationType: 'Remote',
    salary: '$130,000 - $170,000',
    description: 'Build and maintain secure CI/CD pipelines for AI/ML workloads across multi-cloud environments.',
    requirements: ['3+ years DevOps experience', 'Kubernetes expertise', 'CI/CD tools experience', 'Security frameworks knowledge', 'Cloud platform experience'],
    skills: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'AWS', 'Security'],
    benefits: ['Health/Dental/Vision', '401k matching', 'Remote work', 'Professional development'],
  },
  {
    title: 'AI Solutions Architect', slug: 'ai-solutions-architect', department: 'Consulting',
    type: 'Full Time', level: 'Lead/Principal', location: 'Sterling, VA / Remote', locationType: 'Hybrid',
    salary: '$180,000 - $250,000',
    description: 'Lead the technical design of AI solutions for enterprise clients. Bridge business requirements and technical implementation.',
    requirements: ['8+ years software architecture', '5+ years AI/ML', 'Enterprise architecture experience', 'Strong communication', 'Cloud certifications preferred'],
    skills: ['Solution Architecture', 'AI/ML', 'Cloud', 'Enterprise Architecture', 'Communication'],
    benefits: ['Health/Dental/Vision', '401k matching', 'Equity options', 'Executive benefits'],
  },
];

const Careers: React.FC = () => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span className="section-label"><Briefcase size={14} /> Careers</span>
                <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                  Build the Future of <span className="gradient-text">AI With Us</span>
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  Join a team of passionate innovators shaping the future of enterprise AI. We offer challenging work, continuous learning, and the opportunity to make real impact.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80"
                alt="Diverse team collaborating"
                className="hero-side-img"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <AnimatedSection>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Team working together in a creative space"
              className="section-banner-img"
            />
            <div className="section-header">
              <h2 className="section-title">Why Join <span className="gradient-text">Eminence</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-4">
            {[
              { icon: <GraduationCap size={24} />, title: 'Continuous Learning', desc: 'Annual learning stipend, conference attendance, and certification support.' },
              { icon: <Globe size={24} />, title: 'Remote Flexibility', desc: 'Work from anywhere with hybrid and fully remote options available.' },
              { icon: <Heart size={24} />, title: 'Comprehensive Benefits', desc: 'Full health, dental, vision coverage with 401k matching.' },
              { icon: <Users size={24} />, title: 'Cutting-Edge Projects', desc: 'Work on agentic AI, multi-agent systems, and enterprise-scale solutions.' },
            ].map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 100}>
                <div className="card" style={{ textAlign: 'center', height: '100%' }}>
                  <div style={{ color: 'var(--color-primary-600)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                  <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>{b.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label"><Briefcase size={14} /> Open Positions</span>
              <h2 className="section-title">Current <span className="gradient-text">Opportunities</span></h2>
            </div>
          </AnimatedSection>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {jobs.map((job, idx) => (
              <AnimatedSection key={job.slug} delay={idx * 100}>
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div onClick={() => setExpandedJob(expandedJob === job.slug ? null : job.slug)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={13} /> {job.department}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={13} /> {job.locationType}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={13} /> {job.type}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={13} /> {job.salary}</span>
                      </div>
                    </div>
                    {expandedJob === job.slug ? <ChevronUp size={20} color="var(--color-text-muted)" /> : <ChevronDown size={20} color="var(--color-text-muted)" />}
                  </div>

                  {expandedJob === job.slug && (
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>{job.description}</p>

                      <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Requirements</h4>
                      <ul style={{ listStyle: 'none', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {job.requirements.map(r => (
                          <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                            <CheckCircle size={14} style={{ color: 'var(--color-success-500)' }} /> {r}
                          </li>
                        ))}
                      </ul>

                      <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Skills</h4>
                      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {job.skills.map(s => <span key={s} className="badge">{s}</span>)}
                      </div>

                      <a href={FAIRHIRE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        Apply Now <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
