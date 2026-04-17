'use client';
import Link from 'next/link';

export default function CTA() {
  return (
    <div
      className="reveal"
      style={{
        textAlign: 'center',
        padding: '8rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '400px',
          background:
            'radial-gradient(ellipse,rgba(200,169,110,0.06) 0%,transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <h2
        style={{
          fontWeight: 300,
          fontSize: 'clamp(2.5rem,7vw,5.5rem)',
          lineHeight: 1.0,
          marginBottom: '1.5rem',
        }}
      >
        Brooklyn has
        <br />
        <em style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
          never been
        </em>
        <br />
        this loud.
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--text2)',
          maxWidth: '440px',
          margin: '0 auto 3rem',
          lineHeight: 1.8,
        }}
      >
        Hundreds of stories. Every block. Every era. All waiting to be heard.
      </p>
      <Link href="/map" className="btn-primary">
        Open the map →
      </Link>
    </div>
  );
}
