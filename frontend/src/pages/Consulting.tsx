import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Rocket, CheckCircle, ArrowRight, Send, FileText,
  Target, Lightbulb, Settings, BarChart,
} from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const serviceTypes = [
  { value: 'agentic_ai', label: 'Agentic AI Systems' },
  { value: 'generative_ai', label: 'Generative AI Solutions' },
  { value: 'autonomous_systems', label: 'Autonomous Systems' },
  { value: 'multi_agent', label: 'Multi-Agent Systems' },
  { value: 'ai_transformation', label: 'AI Transformation' },
  { value: 'ai_migration', label: 'AI Migration' },
  { value: 'ai_modernization', label: 'AI Modernization' },
  { value: 'devsecops', label: 'DevSecOps' },
  { value: 'cybersecurity', label: 'Cybersecurity & Compliance' },
  { value: 'cloud_architecture', label: 'Cloud Architecture' },
  { value: 'kubernetes', label: 'Kubernetes/OpenShift' },
  { value: 'mlops', label: 'MLOps' },
  { value: 'data_engineering', label: 'Data Engineering' },
  { value: 'ai_research', label: 'AI Research & Innovation' },
  { value: 'ai_governance', label: 'AI Governance & Ethics' },
  { value: 'training', label: 'Training & Education' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: 'under_50k', label: 'Under $50,000' },
  { value: '50k_100k', label: '$50,000 - $100,000' },
  { value: '100k_250k', label: '$100,000 - $250,000' },
  { value: '250k_500k', label: '$250,000 - $500,000' },
  { value: '500k_1m', label: '$500,000 - $1,000,000' },
  { value: 'over_1m', label: 'Over $1,000,000' },
  { value: 'tbd', label: 'To Be Determined' },
];

const urgencyLevels = [
  { value: 'low', label: 'Exploratory - No Rush' },
  { value: 'medium', label: 'Planning Phase' },
  { value: 'high', label: 'Active Project - Need Soon' },
  { value: 'critical', label: 'Urgent - Immediate Need' },
];

const Consulting: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company_name: '', contact_name: '', contact_title: '', email: '', phone: '',
    company_website: '', industry: '', company_size: '', service_type: 'agentic_ai',
    project_title: '', project_description: '', business_objectives: '',
    current_technology_stack: '', timeline: '', budget_range: 'tbd',
    urgency: 'medium', how_did_you_hear: '', additional_notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <AnimatedSection>
            <div style={{ maxWidth: '700px' }}>
              <span className="section-label"><Rocket size={14} /> Start a Project</span>
              <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                Begin Your <span className="gradient-text">AI Transformation</span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Tell us about your project and our team of AI experts will craft a tailored solution. From initial assessment to full deployment, we are your trusted partner.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2 className="section-title">Our <span className="gradient-text">Engagement Process</span></h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-4">
            {[
              { icon: <Lightbulb size={24} />, title: 'Discovery', desc: 'We listen to your challenges, understand your goals, and assess your current state.' },
              { icon: <Target size={24} />, title: 'Strategy', desc: 'We develop a detailed roadmap, blueprint, and architecture for your solution.' },
              { icon: <Settings size={24} />, title: 'Implementation', desc: 'Our experts build, test, and deploy your solution with security built in.' },
              { icon: <BarChart size={24} />, title: 'Optimize', desc: 'Continuous monitoring, optimization, and support to maximize your ROI.' },
            ].map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 100}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', margin: '0 auto 1rem' }}>
                    {step.icon}
                  </div>
                  <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AnimatedSection>
              {submitted ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                  <CheckCircle size={64} style={{ color: 'var(--color-success-500)', marginBottom: '1.5rem' }} />
                  <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Inquiry Submitted Successfully!</h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontSize: '1.0625rem' }}>
                    Thank you for your interest in Eminence Tech Solutions.
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    Our team will review your project details and contact you within 24 hours to schedule an initial consultation.
                  </p>
                  <button onClick={() => { setSubmitted(false); }} className="btn btn-secondary">
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <FileText size={24} style={{ color: 'var(--color-primary-600)' }} />
                    <h2 style={{ color: 'var(--color-text-primary)' }}>Consulting Inquiry Form</h2>
                  </div>

                  {/* Contact Info */}
                  <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Contact Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="form-group"><label className="form-label">Company Name *</label><input name="company_name" value={form.company_name} onChange={handleChange} className="form-input" required placeholder="Acme Corp" /></div>
                    <div className="form-group"><label className="form-label">Contact Name *</label><input name="contact_name" value={form.contact_name} onChange={handleChange} className="form-input" required placeholder="John Doe" /></div>
                    <div className="form-group"><label className="form-label">Title</label><input name="contact_title" value={form.contact_title} onChange={handleChange} className="form-input" placeholder="CTO" /></div>
                    <div className="form-group"><label className="form-label">Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" required placeholder="john@acme.com" /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="(555) 123-4567" /></div>
                    <div className="form-group"><label className="form-label">Company Website</label><input name="company_website" value={form.company_website} onChange={handleChange} className="form-input" placeholder="https://acme.com" /></div>
                    <div className="form-group"><label className="form-label">Industry *</label><input name="industry" value={form.industry} onChange={handleChange} className="form-input" required placeholder="Financial Services" /></div>
                    <div className="form-group"><label className="form-label">Company Size</label><input name="company_size" value={form.company_size} onChange={handleChange} className="form-input" placeholder="500-1000 employees" /></div>
                  </div>

                  {/* Project Info */}
                  <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Project Details</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Service Type *</label>
                      <select name="service_type" value={form.service_type} onChange={handleChange} className="form-select">
                        {serviceTypes.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Project Title *</label><input name="project_title" value={form.project_title} onChange={handleChange} className="form-input" required placeholder="AI-Powered Document Processing System" /></div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Project Description *</label><textarea name="project_description" value={form.project_description} onChange={handleChange} className="form-textarea" required rows={4} placeholder="Describe your project requirements, goals, and any specific challenges..." /></div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Business Objectives</label><textarea name="business_objectives" value={form.business_objectives} onChange={handleChange} className="form-textarea" rows={3} placeholder="What business outcomes are you looking to achieve?" /></div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Current Technology Stack</label><textarea name="current_technology_stack" value={form.current_technology_stack} onChange={handleChange} className="form-textarea" rows={2} placeholder="What technologies does your organization currently use?" /></div>
                    <div className="form-group"><label className="form-label">Timeline</label><input name="timeline" value={form.timeline} onChange={handleChange} className="form-input" placeholder="Q2 2025" /></div>
                    <div className="form-group"><label className="form-label">Budget Range</label>
                      <select name="budget_range" value={form.budget_range} onChange={handleChange} className="form-select">
                        {budgetRanges.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Urgency</label>
                      <select name="urgency" value={form.urgency} onChange={handleChange} className="form-select">
                        {urgencyLevels.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">How Did You Hear About Us?</label><input name="how_did_you_hear" value={form.how_did_you_hear} onChange={handleChange} className="form-input" placeholder="Google, referral, etc." /></div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Additional Notes</label><textarea name="additional_notes" value={form.additional_notes} onChange={handleChange} className="form-textarea" rows={3} placeholder="Anything else you'd like us to know?" /></div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    Submit Consulting Inquiry <Send size={18} />
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
