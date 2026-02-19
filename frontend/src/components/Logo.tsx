import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 40, showText = true, textSize = 'md' }) => {
  const textSizes = {
    sm: { name: '0.875rem', sub: '0.5rem', gap: '0.625rem' },
    md: { name: '1.125rem', sub: '0.625rem', gap: '0.75rem' },
    lg: { name: '1.5rem', sub: '0.75rem', gap: '1rem' },
  };

  const ts = textSizes[textSize];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: ts.gap }}>
      {/* Logo Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Eminence Tech Solutions Logo"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="nodeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect x="4" y="4" width="112" height="112" rx="24" fill="#0f172a" stroke="url(#logoGradient)" strokeWidth="2" />

        {/* Neural network / Brain circuit pattern */}
        {/* Central brain node */}
        <circle cx="60" cy="52" r="14" fill="none" stroke="url(#logoGradient)" strokeWidth="2.5" />
        <circle cx="60" cy="52" r="7" fill="url(#logoGradient)" opacity="0.9" />

        {/* Top node */}
        <circle cx="60" cy="24" r="5" fill="url(#nodeGlow)" opacity="0.8" />
        <line x1="60" y1="29" x2="60" y2="38" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.7" />

        {/* Top-left node */}
        <circle cx="32" cy="34" r="4.5" fill="url(#nodeGlow)" opacity="0.7" />
        <line x1="36" y1="36.5" x2="48" y2="45" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.6" />

        {/* Top-right node */}
        <circle cx="88" cy="34" r="4.5" fill="url(#nodeGlow)" opacity="0.7" />
        <line x1="84" y1="36.5" x2="72" y2="45" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.6" />

        {/* Left node */}
        <circle cx="24" cy="58" r="4.5" fill="url(#nodeGlow)" opacity="0.7" />
        <line x1="28.5" y1="58" x2="46" y2="54" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.6" />

        {/* Right node */}
        <circle cx="96" cy="58" r="4.5" fill="url(#nodeGlow)" opacity="0.7" />
        <line x1="91.5" y1="58" x2="74" y2="54" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.6" />

        {/* Bottom-left node */}
        <circle cx="36" cy="78" r="4" fill="url(#nodeGlow)" opacity="0.65" />
        <line x1="39" y1="75.5" x2="51" y2="63" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.5" />

        {/* Bottom-right node */}
        <circle cx="84" cy="78" r="4" fill="url(#nodeGlow)" opacity="0.65" />
        <line x1="81" y1="75.5" x2="69" y2="63" stroke="url(#logoGradient2)" strokeWidth="1.5" opacity="0.5" />

        {/* Cross connections for neural network effect */}
        <line x1="35" y1="37" x2="56" y2="25" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.3" />
        <line x1="85" y1="37" x2="64" y2="25" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.3" />
        <line x1="27" y1="55" x2="34" y2="38" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.25" />
        <line x1="93" y1="55" x2="86" y2="38" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.25" />
        <line x1="38" y1="75" x2="26" y2="62" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.25" />
        <line x1="82" y1="75" x2="94" y2="62" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.25" />

        {/* Stylized "E" lettermark at bottom */}
        <path
          d="M42 90 L42 102 L78 102 L78 99 L46 99 L46 97.5 L74 97.5 L74 94.5 L46 94.5 L46 93 L78 93 L78 90 Z"
          fill="url(#logoGradient)"
          opacity="0.9"
        />
      </svg>

      {/* Text */}
      {showText && (
        <div>
          <div style={{
            fontSize: ts.name,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'white',
          }}>
            EMINENCE
          </div>
          <div style={{
            fontSize: ts.sub,
            fontWeight: 600,
            color: '#60a5fa',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            TECH SOLUTIONS
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
