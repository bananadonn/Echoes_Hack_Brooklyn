'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToMap = (e) => {
    e.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => router.push('/map'), 580);
  };

  return (
    <>
      {exiting && <div className="page-exit-overlay" />}
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
          <button className="nav-link" onClick={() => scrollTo('how')}>
            How it works
          </button>
          <button className="nav-link" onClick={() => scrollTo('voices')}>
            Voices
          </button>
          <a href="/map" className="nav-explore" onClick={goToMap}>
            Explore New York
          </a>
        </div>
      </nav>
    </>
  );
}
