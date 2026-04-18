'use client';

const voices = [
  {
    era: '1943 · Brooklyn Navy Yard',
    location: 'Sands Street, Red Hook',
    quote:
      '"My mother worked the Yard during the war. She was a mechanic, can you believe that. First time they ever hired women. She came home with grease on her hands and just... proud."',
    voice: 'Working-class woman, wartime Brooklyn',
  },
  {
    era: '1969 · Greenwich Village',
    location: 'Stonewall Inn, Christopher Street',
    quote:
      '"That night nobody planned anything. People were just tired. Tired of being treated like criminals for existing. And something broke open. Something that needed to break."',
    voice: 'Young gay man, Lower Manhattan',
  },
  {
    era: '1920 · Harlem',
    location: '125th Street, Manhattan',
    quote:
      '"You have to understand what it meant to walk down 125th Street then. Every face looked like yours. Every business, every doctor, every artist. We had built something real up here."',
    voice: 'Jamaican immigrant, Harlem Renaissance',
  },
  {
    era: '1977 · South Bronx',
    location: 'Hunts Point, Bronx',
    quote:
      '"People only remember the fires. They do not talk about what we built in the middle of all that. The block associations. The music. Something new was being born right here."',
    voice: 'Puerto Rican community organizer, 1970s Bronx',
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
              className="reveal-child"
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
          {['ElevenLabs', 'Tavily', 'Hack Brooklyn 2026'].map((s) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
