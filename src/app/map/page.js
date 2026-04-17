'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const BROOKLYN_CENTER = [40.6782, -73.9442];

const HOTSPOTS = [
  // Brooklyn
  {
    name: 'Brooklyn Navy Yard',
    lat: 40.6994,
    lng: -73.9742,
    hint: '1940s · WWII shipbuilding',
  },
  {
    name: 'Fulton Street, Bed-Stuy',
    lat: 40.6834,
    lng: -73.9412,
    hint: '1980s · Community & culture',
  },
  {
    name: 'Knickerbocker Ave, Bushwick',
    lat: 40.6944,
    lng: -73.9172,
    hint: '1977 · The Blackout',
  },
  {
    name: 'Eastern Parkway, Crown Heights',
    lat: 40.6695,
    lng: -73.9496,
    hint: '1920s · Great Migration',
  },
  {
    name: 'Coney Island Boardwalk',
    lat: 40.5755,
    lng: -73.9707,
    hint: '1950s · Golden era',
  },
  {
    name: 'DUMBO',
    lat: 40.7034,
    lng: -73.9888,
    hint: '1970s · Artists & warehouses',
  },
  {
    name: 'Red Hook Waterfront',
    lat: 40.6744,
    lng: -74.009,
    hint: '1940s · Dockworkers',
  },
  {
    name: 'Brighton Beach',
    lat: 40.5775,
    lng: -73.9614,
    hint: '1980s · Soviet immigration',
  },
  {
    name: 'Prospect Park',
    lat: 40.6602,
    lng: -73.969,
    hint: '1960s · Civil rights era',
  },
  {
    name: 'Bedford Ave, Williamsburg',
    lat: 40.7142,
    lng: -73.961,
    hint: '1970s · Puerto Rican community',
  },
  {
    name: 'Brooklyn College',
    lat: 40.6313,
    lng: -73.9518,
    hint: '1930s · WPA campus',
  },
  {
    name: 'Fort Greene Park',
    lat: 40.6908,
    lng: -73.9746,
    hint: '1860s · Civil War prison',
  },
  {
    name: 'Brownsville, Pitkin Ave',
    lat: 40.6629,
    lng: -73.9119,
    hint: '1940s · Jewish community',
  },
  {
    name: 'Bay Ridge, Shore Road',
    lat: 40.6281,
    lng: -74.0307,
    hint: '1950s · Norwegian settlement',
  },
  // Manhattan
  {
    name: 'Harlem, 125th Street',
    lat: 40.8079,
    lng: -73.9452,
    hint: '1920s · Harlem Renaissance',
  },
  {
    name: 'Lower East Side',
    lat: 40.7153,
    lng: -73.9863,
    hint: '1900s · Jewish immigration',
  },
  {
    name: 'Stonewall Inn, Greenwich Village',
    lat: 40.7335,
    lng: -74.0021,
    hint: '1969 · LGBTQ uprising',
  },
  {
    name: 'Ellis Island',
    lat: 40.6995,
    lng: -74.0397,
    hint: '1900s · Immigration gateway',
  },
  {
    name: 'Triangle Shirtwaist Factory',
    lat: 40.7265,
    lng: -74.0051,
    hint: '1911 · Labor tragedy',
  },
  {
    name: 'Seneca Village, Central Park',
    lat: 40.7791,
    lng: -73.9697,
    hint: '1850s · Displaced community',
  },
  {
    name: 'Tin Pan Alley, 28th Street',
    lat: 40.7459,
    lng: -73.9896,
    hint: '1900s · American songwriting',
  },
  // Bronx
  {
    name: 'Grand Concourse, Bronx',
    lat: 40.8448,
    lng: -73.9285,
    hint: '1930s · Art Deco borough',
  },
  {
    name: 'Hunts Point, South Bronx',
    lat: 40.8151,
    lng: -73.8865,
    hint: '1970s · Community resilience',
  },
  {
    name: 'Yankee Stadium area',
    lat: 40.8296,
    lng: -73.9262,
    hint: '1920s · Baseball cathedral',
  },
  // Queens
  {
    name: 'Flushing, Main Street',
    lat: 40.7579,
    lng: -73.8298,
    hint: '1980s · Asian immigration wave',
  },
  {
    name: 'Astoria, Steinway Street',
    lat: 40.7723,
    lng: -73.9303,
    hint: '1920s · Greek community',
  },
  {
    name: 'Jackson Heights',
    lat: 40.7484,
    lng: -73.8912,
    hint: '1970s · Latin American roots',
  },
  // Staten Island
  {
    name: 'St. George Ferry Terminal',
    lat: 40.6437,
    lng: -74.0736,
    hint: '1905 · Gateway to the island',
  },
];
export default function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const audioRef = useRef(null);
  const introAudioRef = useRef(null);

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIntro, setPlayingIntro] = useState(false);
  const [progress, setProgress] = useState(0);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapContainer.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(mapContainer.current, {
      center: [40.7128, -74.006], // NYC center
      zoom: 11,
      zoomControl: false,
    });
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      },
    ).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    HOTSPOTS.forEach((spot) => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="hotspot-marker"><div class="hotspot-dot"></div><div class="hotspot-label">${spot.name}<span>${spot.hint}</span></div></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(map);
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        map.panTo([spot.lat, spot.lng], { animate: true });
        handleLocationClick(spot.lat, spot.lng);
      });
    });
    map.on('click', (e) => handleLocationClick(e.latlng.lat, e.latlng.lng));
    mapRef.current = map;
  }, [leafletLoaded]);

  const placeMarker = (lat, lng) => {
    if (!window.L || !mapRef.current) return;
    if (markerRef.current) markerRef.current.remove();
    const icon = window.L.divIcon({
      className: '',
      html: `<div style="width:20px;height:20px;border-radius:50%;background:rgba(200,169,110,0.25);border:2px solid #c8a96e;animation:markerPulse 1.5s infinite"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    markerRef.current = window.L.marker([lat, lng], { icon }).addTo(
      mapRef.current,
    );
  };

  const fetchStory = async (address, lat, lng) => {
    setLoading(true);
    setError(null);
    setStory(null);
    setIsPlaying(false);
    setPlayingIntro(false);
    setProgress(0);
    setSources([]);

    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, lat, lng }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate story');
      }
      const data = await res.json();
      setStory(data);
      setSources(data.sources || []);
      return data;
    } catch (err) {
      setError(err.message || 'Could not generate a story. Try another spot.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = async (lat, lng) => {
    placeMarker(lat, lng);
    const geocodeRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const geocodeData = await geocodeRes.json();
    const address =
      geocodeData.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    const data = await fetchStory(address, lat, lng);
    if (!data) return;
    setTimeout(() => {
      if (data.introAudio && introAudioRef.current) {
        introAudioRef.current.play().catch(() => {});
        setPlayingIntro(true);
      } else if (data.audio && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 400);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearching(true);
    const query = search;
    setSearch('');
    const data = await fetchStory(
      query + ', New York City',
      BROOKLYN_CENTER[0],
      BROOKLYN_CENTER[1],
    );
    setSearching(false);
    if (!data) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query + ' New York City',
      )}&format=json&limit=1`,
    )
      .then((r) => r.json())
      .then((geo) => {
        if (geo.length > 0 && mapRef.current) {
          mapRef.current.setView(
            [parseFloat(geo[0].lat), parseFloat(geo[0].lon)],
            16,
            { animate: true },
          );
          placeMarker(parseFloat(geo[0].lat), parseFloat(geo[0].lon));
        }
      })
      .catch(() => {});
    setTimeout(() => {
      if (data.introAudio && introAudioRef.current) {
        introAudioRef.current.play().catch(() => {});
        setPlayingIntro(true);
      } else if (data.audio && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 400);
  };

  const togglePlay = () => {
    if (playingIntro && introAudioRef.current) {
      introAudioRef.current.pause();
      setPlayingIntro(false);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0,
    );
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime =
      ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
  };

  const isAnyPlaying = isPlaying || playingIntro;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#111114;font-family:'Cormorant Garamond',Georgia,serif;overflow:hidden}
        .leaflet-container{background:#111114}
        .leaflet-control-zoom a{background:#1a1a1f!important;color:#c8a96e!important;border-color:rgba(255,255,255,0.1)!important}
        .leaflet-control-zoom a:hover{background:#1f1f26!important}
        .leaflet-control-attribution{background:rgba(17,17,20,0.7)!important;color:rgba(255,255,255,0.2)!important;font-size:9px!important}
        @keyframes markerPulse{0%{box-shadow:0 0 0 0 rgba(200,169,110,0.5)}70%{box-shadow:0 0 0 14px rgba(200,169,110,0)}100%{box-shadow:0 0 0 0 rgba(200,169,110,0)}}
        @keyframes fadeUpDown{0%,100%{opacity:0.4;transform:translateX(-50%) translateY(0)}50%{opacity:0.8;transform:translateX(-50%) translateY(-6px)}}
        @keyframes loadingPulse{0%,100%{opacity:0.2;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes fadeInSource{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
        .hotspot-marker{position:relative;cursor:pointer}
        .hotspot-dot{width:10px;height:10px;border-radius:50%;background:rgba(200,169,110,0.35);border:1.5px solid #c8a96e;transition:all .2s}
        .hotspot-marker:hover .hotspot-dot{background:rgba(200,169,110,0.8);transform:scale(1.5)}
        .hotspot-label{display:none;position:absolute;bottom:18px;left:50%;transform:translateX(-50%);background:rgba(17,17,20,0.97);border:1px solid rgba(200,169,110,0.25);border-radius:3px;padding:6px 10px;white-space:nowrap;font-family:'DM Mono',monospace;font-size:10px;color:#f0ede8;letter-spacing:0.04em;pointer-events:none;z-index:9999}
        .hotspot-label span{display:block;color:rgba(200,169,110,0.65);font-size:9px;margin-top:2px}
        .hotspot-marker:hover .hotspot-label{display:block}
        input::placeholder{color:rgba(255,255,255,0.25)}
        input:focus{border-color:rgba(200,169,110,0.5)!important;outline:none}
      `}</style>

      <div style={{ width: '100vw', height: '100svh', position: 'relative' }}>
        {story && !loading && (
          <button
            onClick={() => {
              setStory(null);
              setSources([]);
              setIsPlaying(false);
              setPlayingIntro(false);
              if (audioRef.current) audioRef.current.pause();
              if (introAudioRef.current) introAudioRef.current.pause();
            }}
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1rem',
              zIndex: 1001,
              background: 'rgba(14,14,18,0.96)',
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              fontFamily: "'DM Mono',monospace",
              fontSize: '0.6rem',
              color: 'rgba(200,169,110,0.7)',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            ← back to map
          </button>
        )}
        {/* Top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '1.25rem 1.5rem 2rem',
            background:
              'linear-gradient(to bottom, rgba(17,17,20,0.97) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              pointerEvents: 'all',
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 300,
                fontSize: '1rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#f0ede8',
                textDecoration: 'none',
              }}
            >
              ECH<span style={{ color: '#c8a96e' }}>O</span>ES
            </Link>
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
              }}
            >
              New York City
            </span>
          </div>
          <form
            onSubmit={handleSearch}
            style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'all' }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any NYC address, neighborhood, or landmark..."
              style={{
                flex: 1,
                background: 'rgba(20,20,25,0.97)',
                border: '1px solid rgba(200,169,110,0.2)',
                borderRadius: '3px',
                padding: '0.65rem 1rem',
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.72rem',
                color: '#f0ede8',
                letterSpacing: '0.02em',
              }}
            />
            <button
              type="submit"
              disabled={searching}
              style={{
                background: 'rgba(200,169,110,0.12)',
                border: '1px solid rgba(200,169,110,0.3)',
                borderRadius: '3px',
                padding: '0.65rem 1.1rem',
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.68rem',
                color: '#c8a96e',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            >
              {searching ? '...' : 'Search →'}
            </button>
          </form>
        </div>

        {/* Map */}
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

        {/* Hotspots */}
        {showHotspots && (
          <div
            style={{
              position: 'absolute',
              top: '130px',
              right: '1rem',
              zIndex: 1000,
              background: 'rgba(14,14,18,0.96)',
              border: '1px solid rgba(200,169,110,0.15)',
              borderRadius: '4px',
              padding: '1rem',
              width: '210px',
              maxHeight: 'calc(100svh - 200px)',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.58rem',
                  color: '#c8a96e',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Notable spots
              </span>
              <button
                onClick={() => setShowHotspots(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                }}
              >
                ✕
              </button>
            </div>
            {HOTSPOTS.map((spot, i) => (
              <div
                key={i}
                onClick={() => {
                  mapRef.current?.setView([spot.lat, spot.lng], 16, {
                    animate: true,
                  });
                  handleLocationClick(spot.lat, spot.lng);
                }}
                style={{
                  padding: '0.45rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.65')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: '0.9rem',
                    color: '#f0ede8',
                    fontWeight: 300,
                  }}
                >
                  {spot.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: '0.57rem',
                    color: 'rgba(200,169,110,0.55)',
                    marginTop: '1px',
                  }}
                >
                  {spot.hint}
                </div>
              </div>
            ))}
          </div>
        )}

        {!showHotspots && (
          <button
            onClick={() => setShowHotspots(true)}
            style={{
              position: 'absolute',
              top: '130px',
              right: '1rem',
              zIndex: 1000,
              background: 'rgba(14,14,18,0.96)',
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: '4px',
              padding: '0.5rem 0.85rem',
              fontFamily: "'DM Mono',monospace",
              fontSize: '0.6rem',
              color: '#c8a96e',
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            Notable spots
          </button>
        )}

        {/* Tap prompt */}
        {!loading && !story && !error && (
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              zIndex: 999,
              textAlign: 'center',
              pointerEvents: 'none',
              animation: 'fadeUpDown 3s ease-in-out infinite',
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(200,169,110,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              Tap anywhere · or pick a spot →
            </div>
            <div
              style={{
                width: '1px',
                height: '28px',
                background:
                  'linear-gradient(to bottom,rgba(200,169,110,0.5),transparent)',
                margin: '0.5rem auto 0',
              }}
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'rgba(14,14,18,0.97)',
              border: '1px solid rgba(200,169,110,0.2)',
              borderRadius: '4px',
              padding: '1.25rem 1.75rem',
              minWidth: '300px',
              maxWidth: '90vw',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              {[0, 0.2, 0.4].map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#c8a96e',
                    animation: `loadingPulse 1s ${d}s infinite`,
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                Searching the archives...
              </span>
            </div>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: '0.58rem',
                color: 'rgba(200,169,110,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              Consulting Tavily · Claude · ElevenLabs
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'rgba(14,14,18,0.97)',
              border: '1px solid rgba(200,100,100,0.3)',
              borderRadius: '4px',
              padding: '0.85rem 1.5rem',
              fontFamily: "'DM Mono',monospace",
              fontSize: '0.65rem',
              color: 'rgba(255,150,150,0.8)',
              maxWidth: '90vw',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        {/* Story panel */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '2.5rem 1.5rem 1.5rem',
            background:
              'linear-gradient(to top, rgba(14,14,18,0.99) 0%, rgba(14,14,18,0.92) 75%, transparent 100%)',
            transform: story && !loading ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {story && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>

              {/* Hidden audio elements — always mounted so they can play */}
              {story.introAudio && (
                <audio
                  ref={introAudioRef}
                  src={story.introAudio}
                  onEnded={() => {
                    setPlayingIntro(false);
                    if (audioRef.current) {
                      audioRef.current.play().catch(() => {});
                      setIsPlaying(true);
                    }
                  }}
                />
              )}
              {story.audio && (
                <audio
                  ref={audioRef}
                  src={story.audio}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => { setIsPlaying(false); setProgress(0); }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              )}

              {/* INTRO STATE — only the archivist line */}
              {playingIntro && story.intro && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1rem 0 1.5rem',
                    fontFamily: "'DM Mono',monospace",
                    fontSize: 'clamp(0.75rem,2vw,0.88rem)',
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.04em',
                    lineHeight: 1.75,
                  }}
                >
                  {story.intro}
                </div>
              )}

              {/* STORY STATE — revealed after intro ends */}
              {!playingIntro && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.4rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a96e' }}>
                      {story.era}
                    </span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.57rem', color: 'rgba(255,255,255,0.85)' }}>
                      {story.narrator}
                    </span>
                  </div>

                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', fontWeight: 300, color: '#f0ede8', marginBottom: '0.35rem' }}>
                    {story.title}
                  </div>

                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.57rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.75rem' }}>
                    {story.address_display}
                  </div>

                  <div
                    style={{
                      fontSize: 'clamp(0.95rem,2.5vw,1.1rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: '#b8b4ae',
                      lineHeight: 1.8,
                      marginBottom: '1.25rem',
                      borderLeft: '1px solid rgba(200,169,110,0.2)',
                      paddingLeft: '1rem',
                    }}
                  >
                    &ldquo;{story.story}&rdquo;
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      onClick={togglePlay}
                      style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        border: '1px solid rgba(200,169,110,0.35)',
                        background: 'rgba(200,169,110,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', flexShrink: 0,
                      }}
                    >
                      {isAnyPlaying ? (
                        <div style={{ display: 'flex', gap: '3px' }}>
                          <div style={{ width: '3px', height: '11px', background: '#c8a96e', borderRadius: '1px' }} />
                          <div style={{ width: '3px', height: '11px', background: '#c8a96e', borderRadius: '1px' }} />
                        </div>
                      ) : (
                        <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '9px solid #c8a96e', marginLeft: '2px' }} />
                      )}
                    </button>
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={handleSeek}>
                      <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden', marginBottom: '5px' }}>
                        <div style={{ height: '100%', background: '#c8a96e', width: `${progress}%`, transition: 'width 0.1s linear' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(255,255,255,0.22)' }}>{story.era}</span>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(255,255,255,0.22)' }}>{isPlaying ? 'playing...' : 'tap to play'}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.85rem', fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
                    {story.context}
                  </div>

                  {sources.length > 0 && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(200,169,110,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Sources
                      </div>
                      {sources.map((s, i) => (
                        <div key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.56rem', color: 'rgba(255,255,255,0.5)', padding: '0.15rem 0', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                          <span style={{ color: 'rgba(200,169,110,0.4)', flexShrink: 0 }}>·</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
