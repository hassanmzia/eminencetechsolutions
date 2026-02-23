import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase, MapPin, Clock, DollarSign, CheckCircle,
  ChevronDown, ChevronUp, Users, Heart, GraduationCap, Globe, ExternalLink, Loader2,
} from 'lucide-react';

const FAIRHIRE_URL = 'https://demo.eminencetechsolutions.com:3047/register';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

// Fallback jobs shown when FairHire is unavailable
const fallbackJobs = [
  {
    id: 'fallback-1', title: 'Senior Agentic AI Engineer', department: 'AI Engineering',
    type: 'Full Time', experience_level: 'Senior', location: 'Sterling, VA / Remote', is_remote: false,
    salary: '$160,000 - $220,000',
    description: 'Join our AI Engineering team to design and build production-grade agentic AI systems for enterprise clients.',
    requirements: '5+ years software engineering\n3+ years AI/ML systems\nLLM frameworks experience\nStrong Python skills\nProduction AI deployment',
    skills: ['Python', 'LangChain', 'LLM', 'RAG', 'Kubernetes', 'AWS/Azure/GCP'],
  },
  {
    id: 'fallback-2', title: 'DevSecOps Engineer', department: 'Cloud & Infrastructure',
    type: 'Full Time', experience_level: 'Mid Level', location: 'Sterling, VA / Remote', is_remote: true,
    salary: '$130,000 - $170,000',
    description: 'Build and maintain secure CI/CD pipelines for AI/ML workloads across multi-cloud environments.',
    requirements: '3+ years DevOps experience\nKubernetes expertise\nCI/CD tools experience\nSecurity frameworks knowledge\nCloud platform experience',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'AWS', 'Security'],
  },
  {
    id: 'fallback-3', title: 'AI Solutions Architect', department: 'Consulting',
    type: 'Full Time', experience_level: 'Lead/Principal', location: 'Sterling, VA / Remote', is_remote: false,
    salary: '$180,000 - $250,000',
    description: 'Lead the technical design of AI solutions for enterprise clients. Bridge business requirements and technical implementation.',
    requirements: '8+ years software architecture\n5+ years AI/ML\nEnterprise architecture experience\nStrong communication\nCloud certifications preferred',
    skills: ['Solution Architecture', 'AI/ML', 'Cloud', 'Enterprise Architecture', 'Communication'],
  },
];

interface Job {
  id: number | string;
  title: string;
  department: string | { name: string };
  description: string;
  requirements: string;
  experience_level: string;
  location: string;
  is_remote: boolean;
  salary_min?: number | null;
  salary_max?: number | null;
  salary?: string;
  type?: string;
  skills?: string[];
  nice_to_have?: string;
}

function formatSalary(job: Job): string {
  if (job.salary) return job.salary;
  if (job.salary_min && job.salary_max) {
    return `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`;
  }
  return 'Competitive';
}

function getDepartment(job: Job): string {
  if (typeof job.department === 'string') return job.department;
  return job.department?.name || '';
}

function getRequirementsList(job: Job): string[] {
  if (!job.requirements) return [];
  return job.requirements.split('\n').map(r => r.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
}

function getLocationType(job: Job): string {
  if (job.is_remote) return 'Remote';
  if (job.location?.toLowerCase().includes('remote')) return 'Hybrid';
  return 'On-site';
}

const experienceLabelMap: Record<string, string> = {
  entry: 'Entry Level', mid: 'Mid Level', senior: 'Senior',
  lead: 'Lead', principal: 'Principal', 'Lead/Principal': 'Lead/Principal',
  'Mid Level': 'Mid Level',
};

const Careers: React.FC = () => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'fairhire' | 'fallback'>('fallback');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch('/api/careers/openings/');
        if (!resp.ok) throw new Error('API error');
        const data = await resp.json();
        if (!cancelled && data.results && data.results.length > 0) {
          setJobs(data.results);
          setSource('fairhire');
        }
      } catch {
        // keep fallback jobs
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
              {source === 'fairhire' && (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Powered by <strong>FairHire AI</strong> — our AI-driven hiring platform
                </p>
              )}
            </div>
          </AnimatedSection>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary-600)' }} />
              <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>Loading open positions...</p>
            </div>
          ) : (
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {jobs.map((job, idx) => {
                const jobId = String(job.id);
                const reqs = getRequirementsList(job);
                return (
                  <AnimatedSection key={jobId} delay={idx * 100}>
                    <div className="card" style={{ cursor: 'pointer' }}>
                      <div onClick={() => setExpandedJob(expandedJob === jobId ? null : jobId)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={13} /> {getDepartment(job)}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={13} /> {getLocationType(job)}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={13} /> {experienceLabelMap[job.experience_level] || job.experience_level}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={13} /> {formatSalary(job)}</span>
                          </div>
                        </div>
                        {expandedJob === jobId ? <ChevronUp size={20} color="var(--color-text-muted)" /> : <ChevronDown size={20} color="var(--color-text-muted)" />}
                      </div>

                      {expandedJob === jobId && (
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>{job.description}</p>

                          {reqs.length > 0 && (
                            <>
                              <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Requirements</h4>
                              <ul style={{ listStyle: 'none', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                {reqs.map(r => (
                                  <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle size={14} style={{ color: 'var(--color-success-500)', flexShrink: 0 }} /> {r}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}

                          {job.nice_to_have && (
                            <>
                              <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Nice to Have</h4>
                              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>{job.nice_to_have}</p>
                            </>
                          )}

                          {job.skills && job.skills.length > 0 && (
                            <>
                              <h4 style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Skills</h4>
                              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                {job.skills.map(s => <span key={s} className="badge">{s}</span>)}
                              </div>
                            </>
                          )}

                          <a href={FAIRHIRE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            Apply Now <ExternalLink size={16} />
                          </a>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
