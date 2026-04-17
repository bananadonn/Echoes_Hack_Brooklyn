'use client';

const voices = [
  {
    era: '1943 · Red Hook',
    location: 'Brooklyn Navy Yard, Gate 4',
    quote:
      '"We built seventeen ships in four years. Women on the floor, men overseas. Nobody told us we couldn\'t."',
    voice: 'Working-class woman, wartime Brooklyn',
  },
  {
    era: '1977 · Bushwick',
    location: 'Knickerbocker Ave',
    quote:
      '"The night the lights went out, something changed in this neighborhood. Some people took. Some people gave. I saw both."',
    voice: 'Middle-aged Puerto Rican man, 1970s',
  },
  {
    era: '1920 · Crown Heights',
    location: 'Eastern Parkway',
    quote:
      '"When I came from Kingston, this boulevard was the most beautiful thing I had ever seen. Still is, if you know where to look."',
    voice: 'Jamaican immigrant, early 20th century',
  },
  {
    era: '1989 · Bed-Stuy',
    location: 'Fulton Street',
    quote:
      '"People think this block was only ever trouble. They don\'t know what we built here before the cameras showed up."',
    voice: 'Young Black man, late 80s Brooklyn',
  },
];

export default function Voices() {
  return (
    <>
      <div className="divider" />
      <div className="section reveal" id="voices">
        <p className="section-num">02 — The voices</p>
        <h2 className="section-title">
          Every story sounds
          <br />
          <em>different.</em>
        </h2>
        <p className="section-sub">
          The voice is automatic. Matched to the era, the person, the weight of
          what happened.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1rem',
            marginTop: '3rem',
          }}
        >
          {voices.map((v, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                padding: '1.5rem',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color .3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.25)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.58rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                {v.era}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  marginBottom: '0.5rem',
                }}
              >
                {v.location}
              </div>
              <div
                style={{
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--text2)',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                  borderLeft: '1px solid rgba(200,169,110,0.15)',
                  paddingLeft: '0.75rem',
                }}
              >
                {v.quote}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.58rem',
                  color: 'var(--text3)',
                  letterSpacing: '0.06em',
                }}
              >
                Voice: <span style={{ color: 'var(--gold2)' }}>{v.voice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsors */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
          }}
        >
          Powered by
        </span>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['ElevenLabs', 'Tavily', 'Featherless.ai', 'Hack Brooklyn 2026'].map(
            (s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.15)',
                  cursor: 'default',
                  transition: 'color .3s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.15)')
                }
              >
                {s}
              </span>
            ),
          )}
        </div>
      </div>
    </>
  );
}
