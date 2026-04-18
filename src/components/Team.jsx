'use client';
import { useState } from 'react';

const members = [
  {
    name: 'Don',
    school: 'John Jay College',

    linkedin: '#',
    x: '22%',
    y: '32%',
  },
  {
    name: 'Husnain',
    school: 'Brooklyn College',

    linkedin: 'https://www.linkedin.com/in/husnain-kh',
    x: '65%',
    y: '22%',
  },
  {
    name: 'Tahreem',
    school: 'Brooklyn College',

    linkedin: 'https://www.linkedin.com/in/tahreemimran04',
    x: '35%',
    y: '68%',
  },
  {
    name: 'Sanjida',
    school: 'Brooklyn College',

    linkedin: 'https://www.linkedin.com/in/sanjida-a-24a550298',
    x: '72%',
    y: '62%',
  },
];

export default function Team() {
  const [active, setActive] = useState(null);
  const member = active !== null ? members[active] : null;

  return (
    <>
      <div className="divider" />
      <div
        className="section reveal"
        id="team"
        style={{ paddingBottom: '3rem' }}
      >
        <p className="section-num">03 — The team</p>
        <h2 className="section-title">
          Built by four people
          <br />
          <em>in 48 hours.</em>
        </h2>
        <p className="section-sub" style={{ marginTop: '0.5rem' }}>
          Tap a location to meet the builder.
        </p>
      </div>

      {/* Map canvas */}
      <div
        style={{
          position: 'relative',
          margin: '0 3rem 6rem',
          height: '380px',
          background: '#0e0e12',
          border: '1px solid var(--border)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
        onClick={() => setActive(null)}
      >
        {/* grid lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.06,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* NYC label */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            fontFamily: "'DM Mono',monospace",
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          New York City
        </div>

        {/* dots */}
        {members.map((m, i) => (
          <div
            key={m.name}
            onClick={(e) => {
              e.stopPropagation();
              setActive(active === i ? null : i);
            }}
            style={{
              position: 'absolute',
              left: m.x,
              top: m.y,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            {/* pulse ring */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background:
                  active === i
                    ? 'rgba(200,169,110,0.35)'
                    : 'rgba(200,169,110,0.18)',
                border: `1.5px solid ${
                  active === i ? '#c8a96e' : 'rgba(200,169,110,0.7)'
                }`,
                animation: 'teamPulse 1.8s infinite',
                animationDelay: `${i * 0.4}s`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            />

            {/* name label */}
            <div
              style={{
                position: 'absolute',
                bottom: '26px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(14,14,18,0.97)',
                border: '1px solid rgba(200,169,110,0.22)',
                borderRadius: '3px',
                padding: '5px 9px',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.58rem',
                color: active === i ? '#c8a96e' : '#f0ede8',
                letterSpacing: '0.04em',
                pointerEvents: 'none',
                transition: 'color 0.2s',
              }}
            >
              {m.name}
            </div>
          </div>
        ))}

        {/* slide-up panel */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background:
              'linear-gradient(to top, rgba(14,14,18,0.99) 0%, rgba(14,14,18,0.94) 80%, transparent 100%)',
            padding: '2rem 2rem 1.5rem',
            transform: member ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            zIndex: 3,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {member && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                    fontWeight: 300,
                    color: '#f0ede8',
                    lineHeight: 1.1,
                    marginBottom: '0.3rem',
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.8)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {member.school}
                </div>
              </div>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  color: '#c8a96e',
                  border: '1px solid rgba(200,169,110,0.35)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s, border-color 0.2s',
                  background: 'rgba(200,169,110,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(200,169,110,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(200,169,110,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(200,169,110,0.35)';
                }}
              >
                LinkedIn ↗
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes teamPulse {
          0%   { box-shadow: 0 0 0 0 rgba(200,169,110,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(200,169,110,0); }
          100% { box-shadow: 0 0 0 0 rgba(200,169,110,0); }
        }
        @media (max-width: 640px) {
          #team-map { margin: 0 1.5rem 4rem !important; height: 300px !important; }
        }
      `}</style>
    </>
  );
}
