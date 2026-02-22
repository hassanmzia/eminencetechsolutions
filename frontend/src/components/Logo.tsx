import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 40, showText = true, textSize = 'md' }) => {
  const textSizes = {
    sm: { name: '0.75rem', sub: '0.5rem', gap: '0.625rem' },
    md: { name: '0.9375rem', sub: '0.625rem', gap: '0.75rem' },
    lg: { name: '1.125rem', sub: '0.75rem', gap: '1rem' },
  };

  const ts = textSizes[textSize];
  const scale = size / 40;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: ts.gap }}>
      <svg
        width={size * 3.2}
        height={size}
        viewBox="0 0 320 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Eminence Tech Solutions Logo"
      >
        {/* ETS Text */}
        <text
          x="4"
          y="72"
          style={{
            fontSize: '72px',
            fontWeight: 700,
            fontFamily: 'Arial, Helvetica, sans-serif',
            letterSpacing: '0.05em',
          }}
          fill="#c0392b"
        >
          ETS
        </text>

        {/* Dot matrix pattern */}
        {/* Row 1 - smallest dots */}
        <circle cx="190" cy="20" r="3" fill="#2c3e50" opacity="0.4" />
        <circle cx="210" cy="20" r="3.5" fill="#2c3e50" opacity="0.45" />
        <circle cx="230" cy="20" r="3.5" fill="#2c3e50" opacity="0.45" />
        <circle cx="250" cy="20" r="4" fill="#2c3e50" opacity="0.5" />
        <circle cx="270" cy="20" r="4" fill="#2c3e50" opacity="0.5" />
        <circle cx="290" cy="20" r="4.5" fill="#2c3e50" opacity="0.55" />

        {/* Row 2 */}
        <circle cx="190" cy="38" r="3.5" fill="#2c3e50" opacity="0.45" />
        <circle cx="210" cy="38" r="4" fill="#2c3e50" opacity="0.5" />
        <circle cx="230" cy="38" r="4.5" fill="#2c3e50" opacity="0.55" />
        <circle cx="250" cy="38" r="5" fill="#2c3e50" opacity="0.6" />
        <circle cx="270" cy="38" r="5" fill="#2c3e50" opacity="0.6" />
        <circle cx="290" cy="38" r="5.5" fill="#2c3e50" opacity="0.65" />

        {/* Row 3 */}
        <circle cx="190" cy="56" r="4" fill="#2c3e50" opacity="0.5" />
        <circle cx="210" cy="56" r="4.5" fill="#2c3e50" opacity="0.55" />
        <circle cx="230" cy="56" r="5" fill="#2c3e50" opacity="0.6" />
        <circle cx="250" cy="56" r="5.5" fill="#2c3e50" opacity="0.65" />
        <circle cx="270" cy="56" r="6" fill="#2c3e50" opacity="0.7" />
        <circle cx="290" cy="56" r="6.5" fill="#2c3e50" opacity="0.75" />

        {/* Row 4 - largest dots */}
        <circle cx="190" cy="76" r="4.5" fill="#2c3e50" opacity="0.55" />
        <circle cx="210" cy="76" r="5" fill="#2c3e50" opacity="0.6" />
        <circle cx="230" cy="76" r="5.5" fill="#2c3e50" opacity="0.65" />
        <circle cx="250" cy="76" r="6" fill="#2c3e50" opacity="0.7" />
        <circle cx="270" cy="76" r="7" fill="#2c3e50" opacity="0.8" />
        <circle cx="290" cy="76" r="7.5" fill="#2c3e50" opacity="0.9" />
      </svg>

      {/* Text */}
      {showText && (
        <div>
          <div style={{
            fontSize: ts.name,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--color-text-primary)',
          }}>
            EMINENCE
          </div>
          <div style={{
            fontSize: ts.sub,
            fontWeight: 600,
            color: '#c0392b',
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
