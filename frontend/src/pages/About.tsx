
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Target, Eye, Users, Award, MapPin, ArrowRight,
  CheckCircle, Globe, Shield, Cpu,
} from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const About: React.FC = () => (
  <div style={{ paddingTop: '6rem' }}>
    {/* Hero */}
    <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <AnimatedSection>
            <div>
              <span className="section-label"><Brain size={14} /> About Us</span>
              <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                Pioneering <span className="gradient-text">AI Innovation</span> Since Day One
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Eminence Tech Solutions stands at the forefront of AI and cloud-based innovation, serving as a catalyst for business growth. Founded in Sterling, Virginia, we have grown into a trusted partner for enterprises seeking to harness the transformative power of artificial intelligence.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80"
              alt="Modern office workspace"
              className="hero-side-img"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <AnimatedSection>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
            alt="Team strategy session"
            className="section-banner-img"
          />
        </AnimatedSection>
        <div className="grid grid-2" style={{ gap: '2rem' }}>
          <AnimatedSection>
            <div className="card" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                alt="Mission-driven team presentation"
                className="card-img" style={{ borderRadius: 0, marginBottom: 0 }}
              />
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}>
                    <Target size={22} />
                  </div>
                  <h3 style={{ color: 'var(--color-text-primary)' }}>Our Mission</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  To harmonize client aspirations with our technological expertise, unlocking a future where businesses thrive through tailored AI and cloud solutions. We are committed to delivering innovative, secure, and ethically responsible AI systems that drive measurable business outcomes.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="card" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80"
                alt="Innovation and vision"
                className="card-img" style={{ borderRadius: 0, marginBottom: 0 }}
              />
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', border: '1px solid #ddd6fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-violet-500)' }}>
                    <Eye size={22} />
                  </div>
                  <h3 style={{ color: 'var(--color-text-primary)' }}>Our Vision</h3>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  To be the most trusted AI consulting partner for enterprises undergoing digital transformation. We envision a world where every organization, regardless of size, can leverage the power of AI to innovate, compete, and create lasting value for their stakeholders.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
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
                <div style={{ color: 'var(--color-primary-600)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{v.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Location */}
    <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Corporate headquarters"
              style={{ width: '100%', height: '240px', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'var(--color-surface)' }}>
              <MapPin size={32} style={{ color: 'var(--color-primary-600)', marginBottom: '1rem' }} />
              <h2 style={{ marginBottom: '0.75rem' }}>Headquartered in <span className="gradient-text">Sterling, Virginia</span></h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                44330 Mercure Circle, Sterling, VA - Serving clients nationwide and globally with on-site and remote consulting.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/consulting" className="btn btn-primary btn-lg">Work With Us <ArrowRight size={16} /></Link>
                <Link to="/careers" className="btn btn-secondary btn-lg">Join Our Team</Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default About;
