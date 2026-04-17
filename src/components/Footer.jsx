export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: '0.9rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
        }}
      >
        ECH<span style={{ color: 'var(--gold)' }}>O</span>ES
      </div>
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: '0.6rem',
          color: 'var(--text3)',
          letterSpacing: '0.06em',
        }}
      >
        Hack Brooklyn 2026 · Built in 48 hours
      </div>
    </footer>
  );
}
