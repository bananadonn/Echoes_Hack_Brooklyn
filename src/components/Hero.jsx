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
        75, 35, 60, 45, 55, 80, 40, 65, 30, 70, 50, 45, 60, 35,
      ];
      heights.forEach((h, i) => {
        const b = document.createElement('div');
        const played = i < Math.floor(heights.length * 0.6);
        b.style.cssText = `
          width:2px; height:${h}%; border-radius:1px;
          background:${played ? '#c8a96e' : 'rgba(200,169,110,0.22)'};
          opacity:${played ? 0.25 + (h / 100) * 0.75 : 0.22}; flex-shrink:0;
          ${
            played
              ? `animation: waveAnim ${0.5 + Math.random() * 0.6}s ${
                  i * 0.04
                }s infinite ease-in-out alternate;`
              : ''
          }
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
        @media (max-width: 640px) {
          .hero-demo-two-col { flex-direction: column !important; }
          .hero-demo-narrator-col { width: 100% !important; padding-right: 0 !important; padding-bottom: 1rem !important; border-bottom: 1px solid rgba(200,169,110,0.12); }
          .hero-demo-divider-v { display: none !important; }
          .hero-demo-right-col { padding-left: 0 !important; padding-top: 1rem !important; }
        }
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
          <Link
            href="/map"
            className="nav-explore"
            style={{
              fontSize: '0.72rem',
              padding: '0.7rem 1.75rem',
              letterSpacing: '0.14em',
            }}
          >
            Start Exploring →
          </Link>
        </div>

        {/* Demo card */}
        <div
          style={{
            width: 'min(820px,95vw)',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeUp .8s 1.1s ease forwards',
          }}
        >
          <div
            style={{
              background: '#111114',
              border: '1px solid rgba(200,169,110,0.18)',
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

            {/* Fake dark map */}
            <div
              style={{
                width: '100%',
                height: '180px',
                background: '#111114',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Dark map base — mimics CartoDB Dark Matter */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(160deg,#0e0e12 0%,#131318 50%,#0c0c10 100%)',
                }}
              />
              {/* Street grid — horizontal */}
              {[14, 28, 42, 56, 70, 84].map((pct, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${pct}%`,
                    height: '1px',
                    background: 'rgba(255,255,255,0.06)',
                  }}
                />
              ))}
              {/* Street grid — vertical */}
              {[10, 22, 34, 46, 58, 70, 82, 93].map((pct, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${pct}%`,
                    width: '1px',
                    background: 'rgba(255,255,255,0.06)',
                  }}
                />
              ))}
              {/* Major roads — thicker */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '40%',
                  height: '2px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '35%',
                  width: '2px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '68%',
                  width: '2px',
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              {/* Story dots — other locations */}
              {[
                { top: '22%', left: '18%' },
                { top: '68%', left: '72%' },
                { top: '38%', left: '82%' },
                { top: '75%', left: '28%' },
                { top: '15%', left: '55%' },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(200,169,110,0.3)',
                    border: '1.5px solid rgba(200,169,110,0.6)',
                    transform: 'translate(-50%,-50%)',
                    ...s,
                  }}
                />
              ))}
              {/* Street name labels — horizontal roads */}
              {[
                { top: '37%', left: '8%', label: 'DOUGLASS ST' },
                { top: '54%', left: '52%', label: 'DEGRAW ST' },
                { top: '24%', left: '38%', label: 'UNION ST' },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: s.top,
                    left: s.left,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.42rem',
                    color: 'rgba(255,255,255,0.22)',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {s.label}
                </div>
              ))}
              {/* Street name labels — vertical roads */}
              {[
                { top: '18%', left: '33%', label: 'SMITH ST' },
                { top: '62%', left: '66%', label: 'NEVINS ST' },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: s.top,
                    left: s.left,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.42rem',
                    color: 'rgba(255,255,255,0.22)',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    transform: 'rotate(90deg) translateX(-50%)',
                    transformOrigin: 'left center',
                  }}
                >
                  {s.label}
                </div>
              ))}
              {/* Active marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '48%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(200,169,110,0.25)',
                    border: '2px solid #c8a96e',
                    animation: 'pinPulse 2s infinite',
                  }}
                />
              </div>
              {/* Map label overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40px',
                  background:
                    'linear-gradient(to bottom,transparent,rgba(14,14,18,0.95))',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '0.6rem',
                  right: '0.75rem',
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.55rem',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.08em',
                }}
              >
                NEW YORK CITY
              </div>
            </div>

            {/* Story panel — two-column layout matching the actual map page */}
            <div
              style={{
                padding: '1.25rem 1.5rem 1.25rem',
                background:
                  'linear-gradient(to top,rgba(14,14,18,0.99) 0%,rgba(14,14,18,0.92) 100%)',
              }}
            >
              <div className="hero-demo-two-col" style={{ display: 'flex', gap: 0 }}>
                {/* Left: narrator info + sources */}
                <div
                  className="hero-demo-narrator-col"
                  style={{
                    width: '140px',
                    flexShrink: 0,
                    paddingRight: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.58rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#c8a96e',
                      marginBottom: '0.5rem',
                    }}
                  >
                    1910S
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.56rem',
                      color: 'rgba(255,255,255,0.72)',
                      lineHeight: 1.65,
                      letterSpacing: '0.02em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Elderly lifelong Gowanus resident, late seventies, grew up
                    near the canal
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.52rem',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.5,
                    }}
                  >
                    99 Douglass Street, Brooklyn
                  </div>

                  {/* Sources */}
                  <div
                    style={{
                      marginTop: '0.9rem',
                      paddingTop: '0.9rem',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: '0.5rem',
                        color: 'rgba(200,169,110,0.6)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '0.45rem',
                      }}
                    >
                      Sources
                    </div>
                    {[
                      {
                        domain: 'brownstoner.com',
                        title: 'Brooklyn History — The…',
                      },
                      {
                        domain: 'history.pmlib.org',
                        title: 'Long Island County Histories…',
                      },
                      {
                        domain: 's-media.nyc.gov',
                        title: '[PDF] Crown Heights North II…',
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: '0.35rem',
                          padding: '0.4rem 0.55rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '2px',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: '0.46rem',
                            color: 'rgba(200,169,110,0.55)',
                            letterSpacing: '0.04em',
                            marginBottom: '0.15rem',
                          }}
                        >
                          {s.domain}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: '0.5rem',
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.35,
                          }}
                        >
                          {s.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical divider */}
                <div
                  className="hero-demo-divider-v"
                  style={{
                    width: '1px',
                    background: 'rgba(200,169,110,0.18)',
                    flexShrink: 0,
                  }}
                />

                {/* Right: title + quote + waveform + context */}
                <div className="hero-demo-right-col" style={{ flex: 1, paddingLeft: '1.25rem', minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      color: '#f0ede8',
                      marginBottom: '0.6rem',
                      lineHeight: 1.2,
                    }}
                  >
                    Dead End on Douglass Street
                  </div>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: '#b8b4ae',
                      lineHeight: 1.8,
                      marginBottom: '1rem',
                    }}
                  >
                    "The canal… you could smell it before you saw it. My
                    grandfather, my great-uncle actually, he said it&apos;d been
                    that way since before he was born. Industrial waste, sewer
                    runoff, all of it. And Douglass Street just… ends."
                  </div>

                  {/* Audio player */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '1px solid rgba(200,169,110,0.35)',
                        background: 'rgba(200,169,110,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {/* Pause icon — playing state */}
                      <div style={{ display: 'flex', gap: '3px' }}>
                        <div
                          style={{
                            width: '3px',
                            height: '11px',
                            background: '#c8a96e',
                            borderRadius: '1px',
                          }}
                        />
                        <div
                          style={{
                            width: '3px',
                            height: '11px',
                            background: '#c8a96e',
                            borderRadius: '1px',
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {/* Static waveform bars */}
                      <div
                        ref={waveRef}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          height: '44px',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '4px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: '0.52rem',
                            color: 'rgba(255,255,255,0.22)',
                          }}
                        >
                          1910s
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Mono',monospace",
                            fontSize: '0.52rem',
                            color: 'rgba(255,255,255,0.22)',
                          }}
                        >
                          playing...
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Context */}
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: '0.58rem',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.65,
                      letterSpacing: '0.02em',
                    }}
                  >
                    The dead end of Douglass Street in Gowanus, Brooklyn, sits
                    at the head of the Gowanus Canal, which by the 1880s was
                    heavily polluted with industrial waste and sewage; a
                    flushing tunnel was completed in 1911 to partially address
                    the contamination.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
