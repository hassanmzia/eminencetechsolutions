import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Github, ArrowRight, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';

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
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border)',
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
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-primary)', marginBottom: '1.25rem', display: 'block' }}>
              <Logo size={28} showText={true} textSize="sm" />
            </Link>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Pioneering AI Innovation for Enterprise Transformation. Expert consulting in Agentic AI, Multi-Agent Systems, Cloud Architecture, and Cybersecurity.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="mailto:info@eminencetechsolutions.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', textDecoration: 'none' }}>
                <Mail size={14} /> info@eminencetechsolutions.com
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
                <MapPin size={14} /> 44330 Mercure Circle, Sterling, VA
              </span>
              <a href="tel:+17035551234" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', textDecoration: 'none' }}>
                <Phone size={14} /> (703) 555-1234
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</h4>
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
                <Link key={link.path} to={link.path} style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', textDecoration: 'none', transition: 'color 150ms' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { path: '/about', label: 'About Us' },
                { path: '/case-studies', label: 'Case Studies' },
                { path: '/blog', label: 'Insights & Blog' },
                { path: '/careers', label: 'Careers' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/consulting', label: 'Start a Project' },
              ].map((link) => (
                <Link key={link.path} to={link.path} style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Subscribe to our newsletter for the latest AI insights and industry updates.
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--color-success-500)', fontSize: '0.8125rem' }}>
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
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.8125rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.625rem' }}>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { href: 'https://www.linkedin.com/company/eminencetechsolutions', icon: <Linkedin size={14} />, label: 'LinkedIn' },
                { href: 'https://github.com/eminencetechsolutions', icon: <Github size={14} />, label: 'GitHub' },
                { href: 'https://x.com/eminencetech', icon: <Twitter size={14} />, label: 'X (Twitter)' },
                { href: 'https://www.facebook.com/eminencetechsolutions', icon: <Facebook size={14} />, label: 'Facebook' },
                { href: 'https://www.instagram.com/eminencetechsolutions', icon: <Instagram size={14} />, label: 'Instagram' },
                { href: 'https://www.youtube.com/@eminencetechsolutions', icon: <Youtube size={14} />, label: 'YouTube' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} style={{
                  width: '30px', height: '30px', borderRadius: '8px',
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-text-muted)', transition: 'all 150ms',
                }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
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
