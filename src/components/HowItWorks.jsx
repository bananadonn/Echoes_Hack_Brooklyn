'use client';
import { useEffect } from 'react';

const steps = [
  {
    num: '001',
    title: 'Tap any location',
    desc: 'Open the New York City map. Tap any building, block, or corner. Every street has witnessed something.',
  },
  {
    num: '002',
    title: 'History surfaces',
    desc: 'Tavily searches public archives, records, newspapers, and databases in real time. The real story, not invented.',
  },
  {
    num: '003',
    title: 'The voice speaks',
    desc: 'ElevenLabs generates a voice matched to the era and emotion of the story. A 1920s immigrant sounds nothing like a 1980s activist.',
  },
];

export default function HowItWorks() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="divider" />
      <div className="section reveal" id="how">
        <p className="section-num">01 — How it works</p>
        <h2 className="section-title">
          Tap. Listen.
          <br />
          <em>Remember.</em>
        </h2>
        <p className="section-sub">
          No tour guides. No Wikipedia. Just the raw story of what happened
          here, told by the voice that lived it.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            marginTop: '3rem',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.num}
              className="reveal-child"
              style={{
                background: 'var(--bg)',
                padding: '2rem',
                transition: 'background .3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--surface)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--bg)')
              }
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.62rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 300,
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--text2)',
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
