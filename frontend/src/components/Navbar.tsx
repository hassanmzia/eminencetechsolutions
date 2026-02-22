import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { path: '/', label: 'Home' },
  {
    label: 'Services',
    children: [
      { path: '/services', label: 'All Services' },
      { path: '/services/agentic-ai-systems', label: 'Agentic AI Systems' },
      { path: '/services/generative-ai-solutions', label: 'Generative AI' },
      { path: '/services/multi-agent-ai-systems', label: 'Multi-Agent Systems' },
      { path: '/services/ai-transformation-strategy', label: 'AI Transformation' },
      { path: '/services/devsecops-mlops', label: 'DevSecOps & MLOps' },
      { path: '/services/cloud-kubernetes', label: 'Cloud & Kubernetes' },
      { path: '/services/cybersecurity-compliance', label: 'Cybersecurity' },
      { path: '/services/data-engineering-data-science', label: 'Data Engineering & Data Science' },
      { path: '/services/iot-device-integration', label: 'IoT Device Integration' },
    ],
  },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/about', label: 'About' },
  { path: '/careers', label: 'Careers' },
  { path: '/blog', label: 'Insights' },
  { path: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled
          ? 'rgba(250, 248, 245, 0.97)'
          : 'var(--color-surface)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid var(--color-border)',
        transition: 'all 300ms ease',
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}>
          <Logo size={30} showText={true} textSize="sm" />
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}
        className="desktop-nav"
        >
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.875rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'color 150ms',
                    fontFamily: 'inherit',
                  }}
                >
                  {link.label}
                  <ChevronDown size={14} />
                </button>
                {activeDropdown === link.label && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    minWidth: '240px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.5rem',
                    boxShadow: 'var(--shadow-lg)',
                    animation: 'fadeIn 0.15s ease-out',
                  }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        style={{
                          display: 'block',
                          padding: '0.625rem 1rem',
                          color: location.pathname === child.path ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                          fontSize: '0.8125rem',
                          borderRadius: 'var(--radius-md)',
                          transition: 'all 150ms',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-bg-secondary)';
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = location.pathname === child.path ? 'var(--color-primary-600)' : 'var(--color-text-secondary)';
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                style={{
                  padding: '0.5rem 0.875rem',
                  color: location.pathname === link.path ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  transition: 'color 150ms',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            )
          )}
          <Link to="/consulting" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem' }}>
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-nav-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="mobile-menu"
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '1rem',
          }}
        >
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <div style={{
                  padding: '0.75rem 1rem',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {link.label}
                </div>
                {link.children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    style={{
                      display: 'block',
                      padding: '0.625rem 1rem 0.625rem 2rem',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.8125rem',
                      textDecoration: 'none',
                    }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path!}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.8125rem',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            )
          )}
          <div style={{ padding: '1rem' }}>
            <Link to="/consulting" className="btn btn-primary" style={{ width: '100%' }}>
              Get Started
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
