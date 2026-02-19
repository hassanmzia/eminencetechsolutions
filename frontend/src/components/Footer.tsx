import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, MapPin, Phone, Linkedin, Github, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer style={{
      background: 'var(--color-dark-900)',
      borderTop: '1px solid rgba(148, 163, 184, 0.08)',
      paddingTop: '4rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
        }}>
          {/* Company Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: 'white',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--gradient-accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Brain size={20} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800 }}>EMINENCE</div>
                <div style={{ fontSize: '0.5625rem', color: 'var(--color-primary-400)', letterSpacing: '0.15em' }}>TECH SOLUTIONS</div>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Pioneering AI Innovation for Enterprise Transformation. Expert consulting in Agentic AI, Multi-Agent Systems, Cloud Architecture, and Cybersecurity.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="mailto:info@eminencetechsolutions.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                <Mail size={14} /> info@eminencetechsolutions.com
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                <MapPin size={14} /> 44330 Mercure Circle, Sterling, VA
              </span>
              <a href="tel:+17035551234" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                <Phone size={14} /> (703) 555-1234
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { path: '/services/agentic-ai-systems', label: 'Agentic AI Systems' },
                { path: '/services/generative-ai-solutions', label: 'Generative AI' },
                { path: '/services/multi-agent-ai-systems', label: 'Multi-Agent Systems' },
                { path: '/services/ai-transformation-strategy', label: 'AI Transformation' },
                { path: '/services/devsecops-mlops', label: 'DevSecOps & MLOps' },
                { path: '/services/cloud-kubernetes', label: 'Cloud & Kubernetes' },
                { path: '/services/cybersecurity-compliance', label: 'Cybersecurity' },
              ].map((link) => (
                <Link key={link.path} to={link.path} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 150ms' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { path: '/about', label: 'About Us' },
                { path: '/case-studies', label: 'Case Studies' },
                { path: '/blog', label: 'Insights & Blog' },
                { path: '/careers', label: 'Careers' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/consulting', label: 'Start a Project' },
              ].map((link) => (
                <Link key={link.path} to={link.path} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Subscribe to our newsletter for the latest AI insights and industry updates.
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--color-success-500)', fontSize: '0.875rem' }}>
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: 1,
                    padding: '0.625rem 0.875rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    borderRadius: 'var(--radius-md)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.625rem' }}>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-muted)', transition: 'all 150ms',
              }}>
                <Linkedin size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-muted)', transition: 'all 150ms',
              }}>
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(148, 163, 184, 0.08)',
          padding: '1.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} Eminence Tech Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
