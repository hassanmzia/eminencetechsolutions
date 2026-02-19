
import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const posts = [
  {
    title: 'The Rise of Agentic AI: How Autonomous Systems Are Transforming Enterprise Operations',
    slug: 'rise-of-agentic-ai-enterprise', excerpt: 'Agentic AI represents a paradigm shift from traditional AI. Learn how autonomous AI agents are revolutionizing enterprise operations.',
    category: 'Agentic AI', tags: ['Agentic AI', 'Multi-Agent', 'MCP', 'A2A'], author: 'Hassan M. Zia', date: 'Feb 2026',
  },
  {
    title: 'Building Production RAG Systems: Best Practices for Enterprise Deployment',
    slug: 'production-rag-systems-best-practices', excerpt: 'RAG has become the standard for building accurate AI applications. Here are best practices from deploying RAG at scale.',
    category: 'Generative AI', tags: ['RAG', 'LLM', 'Vector DB', 'Enterprise AI'], author: 'Dr. Sarah Chen', date: 'Feb 2026',
  },
  {
    title: 'AI Governance in 2025: Navigating the Regulatory Landscape',
    slug: 'ai-governance-regulatory-landscape-2025', excerpt: 'With the EU AI Act and new US regulations, organizations must establish robust AI governance frameworks.',
    category: 'AI Governance', tags: ['EU AI Act', 'NIST', 'Compliance', 'Ethics'], author: 'Priya Sharma', date: 'Jan 2026',
  },
  {
    title: 'Multi-Agent AI Systems: Architecture Patterns for Enterprise',
    slug: 'multi-agent-architecture-patterns', excerpt: 'Deep dive into architecture patterns for building collaborative multi-agent systems using MCP and A2A protocols.',
    category: 'Multi-Agent Systems', tags: ['Architecture', 'MCP', 'A2A', 'Design Patterns'], author: 'Alex Rodriguez', date: 'Jan 2026',
  },
  {
    title: 'Kubernetes Security Best Practices for AI Workloads',
    slug: 'kubernetes-security-ai-workloads', excerpt: 'Securing AI workloads on Kubernetes requires specialized approaches. Here is our comprehensive security guide.',
    category: 'DevSecOps', tags: ['Kubernetes', 'Security', 'AI', 'DevSecOps'], author: 'David Kim', date: 'Dec 2025',
  },
  {
    title: 'The Business Case for AI Transformation: ROI Framework',
    slug: 'ai-transformation-roi-framework', excerpt: 'A practical framework for measuring the return on investment of AI transformation initiatives.',
    category: 'AI Strategy', tags: ['ROI', 'Strategy', 'Transformation', 'Business'], author: 'Hassan M. Zia', date: 'Dec 2025',
  },
];

const Blog: React.FC = () => (
  <div style={{ paddingTop: '6rem' }}>
    <section className="section" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container">
        <AnimatedSection>
          <div style={{ maxWidth: '700px' }}>
            <span className="section-label"><BookOpen size={14} /> Insights</span>
            <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
              AI Industry <span className="gradient-text">Insights & Research</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              Expert perspectives on AI innovation, enterprise transformation, and emerging technologies from our team of practitioners and thought leaders.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="grid grid-2">
          {posts.map((post, idx) => (
            <AnimatedSection key={post.slug} delay={idx * 75}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '1rem' }}>{post.category}</span>
                <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {post.tags.map(t => <span key={t} style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', background: 'rgba(148,163,184,0.08)', padding: '0.125rem 0.5rem', borderRadius: '4px' }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(148,163,184,0.08)', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={12} /> {post.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={12} /> {post.date}</span>
                  </div>
                  <span style={{ color: 'var(--color-primary-400)', fontSize: '0.8125rem', fontWeight: 500 }}>Read More</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
