import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Eminence Tech Solutions! I'm your AI assistant powered by our multi-agent system. I can help you with:\n\n- **Service information** about our AI, Cloud, and DevSecOps capabilities\n- **Technical questions** about our technology stack\n- **Business inquiries** about consulting engagements\n- **AI market insights** and technology trends\n\nHow can I assist you today?",
      agent: 'Support Agent',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionKey] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, session_key: sessionKey }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response, agent: data.agent },
        ]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, but I'm currently unable to connect to our AI system. Please try again or reach out to us at info@eminencetechsolutions.com for immediate assistance.",
          agent: 'System',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--color-primary-600)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          transition: 'all 300ms',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <MessageCircle size={22} color="white" />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      width: '370px',
      maxWidth: 'calc(100vw - 2rem)',
      height: '480px',
      maxHeight: 'calc(100vh - 4rem)',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-2xl)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 9999,
      boxShadow: 'var(--shadow-xl)',
      animation: 'fadeInUp 0.3s ease-out',
    }}>
      {/* Header */}
      <div style={{
        padding: '0.875rem 1.25rem',
        background: 'var(--color-primary-600)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>AI Assistant</div>
            <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)' }}>Multi-Agent System</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setIsOpen(false)} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px',
            cursor: 'pointer', padding: '0.375rem', display: 'flex',
          }}>
            <Minimize2 size={14} color="white" />
          </button>
          <button onClick={() => setIsOpen(false)} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px',
            cursor: 'pointer', padding: '0.375rem', display: 'flex',
          }}>
            <X size={14} color="white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            {msg.agent && (
              <div style={{
                fontSize: '0.6875rem',
                color: 'var(--color-primary-600)',
                marginBottom: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}>
                <Bot size={10} />
                {msg.agent}
              </div>
            )}
            <div style={{
              maxWidth: '85%',
              padding: '0.75rem 1rem',
              borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
              background: msg.role === 'user'
                ? 'var(--color-primary-600)'
                : 'var(--color-bg-tertiary)',
              border: msg.role === 'user'
                ? 'none'
                : '1px solid var(--color-border)',
              fontSize: '0.75rem',
              lineHeight: 1.6,
              color: msg.role === 'user' ? 'white' : 'var(--color-text-primary)',
            }}>
              {msg.role === 'assistant' ? (
                <div style={{ fontSize: '0.75rem' }} className="chat-markdown">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
            <div style={{
              display: 'flex', gap: '0.25rem',
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--color-primary-600)',
                  animation: `float 1s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Agent thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        gap: '0.5rem',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about our AI services..."
          style={{
            flex: 1,
            padding: '0.625rem 0.875rem',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-text-primary)',
            fontSize: '0.8125rem',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          style={{
            padding: '0.625rem',
            background: input.trim() ? 'var(--color-primary-600)' : 'var(--color-border)',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 150ms',
          }}
        >
          <Send size={16} color="white" />
        </button>
      </div>

      <style>{`
        .chat-markdown p { margin-bottom: 0.5rem; }
        .chat-markdown p:last-child { margin-bottom: 0; }
        .chat-markdown strong { color: var(--color-primary-600); }
        .chat-markdown ul, .chat-markdown ol { padding-left: 1.25rem; margin-bottom: 0.5rem; }
        .chat-markdown li { margin-bottom: 0.25rem; }
      `}</style>
    </div>
  );
};

export default ChatWidget;
