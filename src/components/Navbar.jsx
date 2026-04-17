'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 3rem',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '1.1rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          textDecoration: 'none',
        }}
      >
        ECH<span style={{ color: 'var(--gold)' }}>O</span>ES
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <a
          href="#how"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            color: 'var(--text3)',
            textDecoration: 'none',
          }}
        >
          How it works
        </a>
        <a
          href="#voices"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            color: 'var(--text3)',
            textDecoration: 'none',
          }}
        >
          Voices
        </a>
        <Link
          href="/map"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            color: 'var(--gold)',
            border: '1px solid rgba(200,169,110,0.3)',
            padding: '0.5rem 1.2rem',
            borderRadius: '2px',
            textDecoration: 'none',
          }}
        >
          Explore Brooklyn
        </Link>
      </div>
    </nav>
  );
}
