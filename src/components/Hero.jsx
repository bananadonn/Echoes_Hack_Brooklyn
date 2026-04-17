'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const dotsRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    if (dotsRef.current && dotsRef.current.children.length === 0) {
      for (let i = 0; i < 18; i++) {
        const d = document.createElement('div');
        d.style.cssText = `
          position:absolute; width:4px; height:4px; border-radius:50%;
          background:var(--gold); opacity:0;
          left:${Math.random() * 100}%; top:${Math.random() * 100}%;
          animation: dotPulse ${3 + Math.random() * 4}s ${
          Math.random() * 4
        }s infinite ease-in-out;
        `;
        dotsRef.current.appendChild(d);
      }
    }

    if (waveRef.current && waveRef.current.children.length === 0) {
      const heights = [
        20, 35, 55, 40, 70, 85, 60, 45, 80, 55, 35, 65, 50, 75, 40, 60, 30, 55,
        70, 45, 35, 60, 80, 50, 40, 65, 35, 55, 45, 70, 60, 40, 55, 30, 65, 50,
        75, 35, 60, 45,
      ];
      heights.forEach((h, i) => {
        const b = document.createElement('div');
        b.style.cssText = `
          width:2px; height:${h}%; border-radius:1px; background:var(--gold);
          opacity:0.4; flex-shrink:0;
          animation: waveAnim ${0.5 + Math.random() * 0.6}s ${
          i * 0.04
        }s infinite ease-in-out alternate;
        `;
        waveRef.current.appendChild(b);
      });
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes mapDrift { 0%{transform:translate(0,0)} 100%{transform:translate(48px,48px)} }
        @keyframes dotPulse { 0%,100%{opacity:0;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.5)} }
        @keyframes pinPulse { 0%,100%{box-shadow:0 0 0 0 var(--gold-glow)} 50%{box-shadow:0 0 0 12px transparent} }
        @keyframes waveAnim { from{transform:scaleY(0.3)} to{transform:scaleY(1)} }
      `}</style>

      <div
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '8rem 1.5rem 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              'linear-gradient(rgba(200,169,110,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.15) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
            animation: 'mapDrift 40s linear infinite',
          }}
        />

        {/* Dots */}
        <div
          ref={dotsRef}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        />

        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '2rem',
            opacity: 0,
            animation: 'fadeUp .8s .3s ease forwards',
          }}
        >
          Every place has a story
        </p>

        <h1
          style={{
            fontWeight: 300,
            fontSize: 'clamp(3.5rem,10vw,8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
            opacity: 0,
            animation: 'fadeUp .8s .5s ease forwards',
          }}
        >
          The city
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold2)' }}>
            remembers
          </em>
          <br />
          everything
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem,2vw,1.25rem)',
            fontWeight: 300,
            color: 'var(--text2)',
            maxWidth: '520px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
            fontStyle: 'italic',
            opacity: 0,
            animation: 'fadeUp .8s .7s ease forwards',
          }}
        >
          Tap any location in New York City. Hear what happened there, narrated
          by the voice of someone who lived it.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '5rem',
            opacity: 0,
            animation: 'fadeUp .8s .9s ease forwards',
          }}
        >
          <Link href="/map" className="btn-primary">
            Explore the map →
          </Link>
        </div>

        {/* Demo card */}
        <div
          style={{
            width: 'min(560px,90vw)',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeUp .8s 1.1s ease forwards',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background:
                  'linear-gradient(90deg,transparent,var(--gold),transparent)',
              }}
            />

            {/* Fake map */}
            <div
              style={{
                width: '100%',
                height: '200px',
                background: 'var(--s2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(rgba(200,169,110,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.08) 1px,transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              {[{ top: '30%' }, { top: '55%' }, { top: '78%' }].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'rgba(200,169,110,0.06)',
                    ...s,
                  }}
                />
              ))}
              {[{ left: '25%' }, { left: '55%' }, { left: '80%' }].map(
                (s, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '6px',
                      background: 'rgba(200,169,110,0.06)',
                      ...s,
                    }}
                  />
                ),
              )}
              {[
                { top: '25%', left: '20%' },
                { top: '65%', left: '75%' },
                { top: '40%', left: '85%' },
                { top: '72%', left: '32%' },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    opacity: 0.3,
                    ...s,
                  }}
                />
              ))}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-60%)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pinPulse 2s infinite',
                    background: 'var(--gold-dim)',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--gold)',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.6rem',
                  color: 'var(--text3)',
                  letterSpacing: '0.08em',
                }}
              >
                SANDS STREET, BROOKLYN NAVY YARD
              </div>
            </div>

            {/* Story */}
            {/* Story */}
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  gap: '1rem',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.6rem',
                      color: 'var(--gold)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.2rem',
                    }}
                  >
                    1940S
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.6rem',
                      color: 'var(--text3)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Man in his 60s, son of a Navy Yard worker
                  </div>
                </div>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(200,169,110,0.3)',
                    background: 'var(--gold-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderLeft: '9px solid var(--gold)',
                      marginLeft: '2px',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  color: 'var(--text)',
                  marginBottom: '0.3rem',
                }}
              >
                Nights on Sands Street
              </div>

              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.58rem',
                  color: 'var(--text3)',
                  letterSpacing: '0.04em',
                  marginBottom: '0.75rem',
                }}
              >
                Sands Street, Brooklyn Navy Yard
              </div>

              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--text2)',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                  borderLeft: '1px solid rgba(200,169,110,0.2)',
                  paddingLeft: '1rem',
                }}
              >
                "My father got his first tattoo right here. Sands Street. Some
                parlor between a bar and a gambling house, he said. The Navy
                Yard gates were right down the block. Then Robert Moses came
                through and. I don't know. Eighteen hundred families gone."
              </div>

              <div
                ref={waveRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  height: '24px',
                  marginBottom: '0.75rem',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.6rem',
                    color: 'var(--text3)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Voice:{' '}
                  <span style={{ color: 'var(--gold2)' }}>
                    Man in his 60s, Vinegar Hill
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.6rem',
                    color: 'var(--text3)',
                  }}
                >
                  0:42
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
