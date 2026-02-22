import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Mail, MapPin, Phone, Clock, Send, CheckCircle, MessageSquare,
  Users, Newspaper, HelpCircle, ArrowRight,
} from 'lucide-react';

const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry', icon: <HelpCircle size={16} /> },
  { value: 'partnership', label: 'Partnership Opportunity', icon: <Users size={16} /> },
  { value: 'press', label: 'Press & Media', icon: <Newspaper size={16} /> },
  { value: 'support', label: 'Technical Support', icon: <MessageSquare size={16} /> },
];

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    inquiry_type: 'general', subject: '', message: '',
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
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <AnimatedSection>
              <div>
                <span className="section-label"><Mail size={14} /> Contact Us</span>
                <h1 style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                  Let's Start a <span className="gradient-text">Conversation</span>
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  Whether you have a question about our services, need technical support, or want to explore a partnership, we're here to help.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80"
                alt="Modern professional office"
                className="hero-side-img"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            {/* Contact Form */}
            <AnimatedSection>
              {submitted ? (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', background: 'var(--color-surface)' }}>
                  <CheckCircle size={56} style={{ color: 'var(--color-success-500)', marginBottom: '1.5rem' }} />
                  <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Message Sent!</h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', inquiry_type: 'general', subject: '', message: '' }); }} className="btn btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Send Us a Message</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} className="form-input" required placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" required placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="(555) 123-4567" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input name="company" value={form.company} onChange={handleChange} className="form-input" placeholder="Your company" />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">Inquiry Type</label>
                      <select name="inquiry_type" value={form.inquiry_type} onChange={handleChange} className="form-select">
                        {inquiryTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">Subject *</label>
                      <input name="subject" value={form.subject} onChange={handleChange} className="form-input" required placeholder="What is this about?" />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="form-label">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} className="form-textarea" required rows={5} placeholder="Tell us more about your needs..." />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                        Send Message <Send size={16} />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={200}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80"
                  alt="Professional handshake"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
                />
                <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem' }}>Get in Touch</h2>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  Our team is ready to help you navigate your AI transformation journey. Reach out through any of the channels below.
                </p>

                {[
                  { icon: <Mail size={20} />, title: 'Email', detail: 'info@eminencetechsolutions.com', sub: 'We respond within 24 hours' },
                  { icon: <Phone size={20} />, title: 'Phone', detail: '(703) 665-3988', sub: 'Mon-Fri, 9am-6pm EST' },
                  { icon: <MapPin size={20} />, title: 'Office', detail: '44330 Mercure Circle', sub: 'Sterling, VA 20166' },
                  { icon: <Clock size={20} />, title: 'Business Hours', detail: 'Monday - Friday', sub: '9:00 AM - 6:00 PM EST' },
                ].map((item) => (
                  <div key={item.title} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'start', background: 'var(--color-surface)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>{item.title}</div>
                      <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>{item.detail}</div>
                      <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}

                <div className="card" style={{ background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-100)' }}>
                  <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Looking for a Consulting Engagement?</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    For detailed project inquiries, use our dedicated consulting form for a faster response.
                  </p>
                  <a href="/consulting" className="btn btn-primary btn-sm">
                    Consulting Inquiry <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
