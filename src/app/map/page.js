'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const BROOKLYN_CENTER = [40.6782, -73.9442];

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'zh', label: '中文', name: 'Chinese' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ko', label: '한국어', name: 'Korean' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'pt', label: 'PT', name: 'Português' },
];

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
    name: 'Apollo Theater',
    lat: 40.81,
    lng: -73.9498,
    hint: '1930s · Amateur Night legends',
  },
  {
    name: 'Lower East Side',
    lat: 40.7153,
    lng: -73.9863,
    hint: '1900s · Jewish immigration',
  },
  {
    name: 'Chinatown, Mott Street',
    lat: 40.7158,
    lng: -73.997,
    hint: '1880s · First Chinatown',
  },
  {
    name: 'Little Italy, Mulberry Street',
    lat: 40.7191,
    lng: -73.9973,
    hint: '1900s · Sicilian immigration',
  },
  {
    name: 'Stonewall Inn, Greenwich Village',
    lat: 40.7335,
    lng: -74.0021,
    hint: '1969 · LGBTQ uprising',
  },
  {
    name: 'Tompkins Square Park',
    lat: 40.7264,
    lng: -73.9818,
    hint: '1988 · Riot & displacement',
  },
  {
    name: "Hell's Kitchen, 9th Ave",
    lat: 40.7614,
    lng: -73.9946,
    hint: '1930s · Irish working class',
  },
  {
    name: 'Times Square, 42nd Street',
    lat: 40.758,
    lng: -73.9855,
    hint: '1970s · Before the cleanup',
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
  {
    name: 'Washington Heights, 181st St',
    lat: 40.8487,
    lng: -73.9378,
    hint: '1950s · Dominican roots',
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
  {
    name: 'Charlotte Street, South Bronx',
    lat: 40.8363,
    lng: -73.8969,
    hint: '1977 · Urban abandonment',
  },
  {
    name: 'Cross Bronx Expressway',
    lat: 40.8468,
    lng: -73.9017,
    hint: '1963 · Displacement by design',
  },
  {
    name: 'Pelham Parkway',
    lat: 40.8574,
    lng: -73.8592,
    hint: '1920s · Jewish middle class',
  },
  {
    name: 'Jerome Ave, South Bronx',
    lat: 40.8202,
    lng: -73.91,
    hint: '1970s · Under the elevated',
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
  {
    name: 'Louis Armstrong House, Corona',
    lat: 40.755,
    lng: -73.8631,
    hint: "1943 · Jazz legend's home",
  },
  {
    name: 'St. Albans, Linden Blvd',
    lat: 40.6879,
    lng: -73.77,
    hint: "1950s · Jazz musicians' enclave",
  },
  {
    name: 'Rockaway Beach',
    lat: 40.582,
    lng: -73.812,
    hint: '1950s · Summer escape',
  },
  {
    name: 'Sunnyside Gardens',
    lat: 40.7438,
    lng: -73.9228,
    hint: '1924 · Planned garden community',
  },
  // Staten Island
  {
    name: 'St. George Ferry Terminal',
    lat: 40.6437,
    lng: -74.0736,
    hint: '1905 · Gateway to the island',
  },
  {
    name: 'Snug Harbor, Richmond Terrace',
    lat: 40.6426,
    lng: -74.1042,
    hint: "1833 · Sailors' retirement home",
  },
  {
    name: 'Tottenville, Main Street',
    lat: 40.5126,
    lng: -74.2518,
    hint: '1880s · Oyster industry',
  },
];
export default function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const audioRef = useRef(null);
  const introAudioRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const waveformRef = useRef(null);
  const trailPointsRef = useRef([]); // [{lat,lng}] — visited locations
  const trailLineRef = useRef(null); // Leaflet polyline
  const trailDotsRef = useRef([]);   // Leaflet circleMarkers

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIntro, setPlayingIntro] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [sources, setSources] = useState([]);
  const [language, setLanguage] = useState('en');
  const languageRef = useRef('en');
  const handleLocationClickRef = useRef(null);

  // Keep refs current every render so stale Leaflet closures always read latest values
  languageRef.current = language;

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
    const NYC_BOUNDS = L.latLngBounds(
      [40.4774, -74.2591], // SW corner
      [40.9176, -73.7004], // NE corner
    );
    const map = L.map(mapContainer.current, {
      center: [40.7128, -74.006],
      zoom: 11,
      zoomControl: false,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: NYC_BOUNDS,
      maxBoundsViscosity: 1.0,
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
    map.on('click', (e) =>
      handleLocationClickRef.current?.(e.latlng.lat, e.latlng.lng),
    );
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

  const addToTrail = (lat, lng) => {
    if (!window.L || !mapRef.current) return;
    const L = window.L;
    trailPointsRef.current.push([lat, lng]);

    // Persistent small dot for this location
    const dot = L.circleMarker([lat, lng], {
      radius: 3,
      fillColor: '#c8a96e',
      fillOpacity: 0.7,
      color: '#c8a96e',
      weight: 1,
      opacity: 0,
    }).addTo(mapRef.current);
    trailDotsRef.current.push(dot);

    // Redraw dashed polyline connecting all visited points
    if (trailLineRef.current) trailLineRef.current.remove();
    if (trailPointsRef.current.length >= 2) {
      trailLineRef.current = L.polyline(trailPointsRef.current, {
        color: '#c8a96e',
        weight: 1,
        opacity: 0.35,
        dashArray: '3 7',
      }).addTo(mapRef.current);
    }
  };

  const fetchStory = async (address, lat, lng) => {
    setLoading(true);
    setError(null);
    setStory(null);
    setIsPlaying(false);
    setPlayingIntro(false);
    setSources([]);

    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          lat,
          lng,
          language: languageRef.current,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate story');
      }
      const data = await res.json();
      if (data.introAudio) setPlayingIntro(true);
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
    addToTrail(lat, lng);
    setTimeout(() => {
      if (data.introAudio && introAudioRef.current) {
        introAudioRef.current.play().catch(() => {});
      } else if (data.audio && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 400);
  };

  handleLocationClickRef.current = handleLocationClick;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearching(true);
    const query = search.trim();
    setSearch('');

    // Geocode first so the map moves and marker appears immediately
    let lat = BROOKLYN_CENTER[0];
    let lng = BROOKLYN_CENTER[1];
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query + ' New York City',
        )}&format=json&limit=1`,
      );
      const geo = await geoRes.json();
      if (geo.length > 0) {
        lat = parseFloat(geo[0].lat);
        lng = parseFloat(geo[0].lon);
        mapRef.current?.setView([lat, lng], 16, { animate: true });
        placeMarker(lat, lng);
      }
    } catch {}

    const data = await fetchStory(query + ', New York City', lat, lng);
    setSearching(false);
    if (!data) return;
    addToTrail(lat, lng);
    setTimeout(() => {
      if (data.introAudio && introAudioRef.current) {
        introAudioRef.current.play().catch(() => {});
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

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime =
      ((e.clientX - rect.left) / rect.width) * audioRef.current.duration;
  };

  const drawBars = () => {
    if (!canvasRef.current || !waveformRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { analyser } = waveformRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const frame = () => {
      animFrameRef.current = requestAnimationFrame(frame);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const totalBars = bufferLength;
      const barW = canvas.width / totalBars;
      for (let i = 0; i < totalBars; i++) {
        const v = dataArray[i] / 255;
        const barH = Math.max(2, v * canvas.height);
        const alpha = 0.25 + v * 0.75;
        ctx.fillStyle = `rgba(200,169,110,${alpha})`;
        ctx.fillRect(
          i * barW + 1,
          canvas.height - barH,
          Math.max(1, barW - 2),
          barH,
        );
      }
    };
    frame();
  };

  const startWaveform = () => {
    if (!audioRef.current) return;
    const audioEl = audioRef.current;
    if (!waveformRef.current || waveformRef.current.audioEl !== audioEl) {
      waveformRef.current?.audioCtx?.close();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.8;
      const source = audioCtx.createMediaElementSource(audioEl);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      waveformRef.current = { audioCtx, analyser, source, audioEl };
    }
    if (waveformRef.current.audioCtx.state === 'suspended') {
      waveformRef.current.audioCtx.resume();
    }
    // Canvas may not be mounted yet (intro still rendering).
    // Poll via rAF — animFrameRef tracks it so stopWaveform cancels cleanly.
    const waitForCanvas = () => {
      if (canvasRef.current) {
        drawBars();
      } else {
        animFrameRef.current = requestAnimationFrame(waitForCanvas);
      }
    };
    waitForCanvas();
  };

  const stopWaveform = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
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
                color: 'rgba(255,255,255,0.7)',
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
          {/* Language selector */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              marginTop: '0.6rem',
              pointerEvents: 'all',
              flexWrap: 'wrap',
            }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                title={lang.name}
                style={{
                  background:
                    language === lang.code
                      ? 'rgba(200,169,110,0.18)'
                      : 'transparent',
                  border: `1px solid ${
                    language === lang.code
                      ? 'rgba(200,169,110,0.5)'
                      : 'rgba(255,255,255,0.1)'
                  }`,
                  borderRadius: '3px',
                  padding: '0.25rem 0.55rem',
                  fontFamily: "'DM Mono',monospace",
                  fontSize: '0.58rem',
                  color:
                    language === lang.code
                      ? '#c8a96e'
                      : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 0.15s',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
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
                    color: 'rgba(238, 200, 130, 0.55)',
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
                  onEnded={() => {
                    setIsPlaying(false);
                    stopWaveform();
                  }}
                  onPlay={() => {
                    setIsPlaying(true);
                    startWaveform();
                  }}
                  onPause={() => {
                    setIsPlaying(false);
                    stopWaveform();
                  }}
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
                  {/* Two-column layout: narrator left | story right */}
                  <div style={{ display: 'flex', gap: 0, marginBottom: '1rem' }}>

                    {/* Left: narrator info */}
                    <div style={{ width: '130px', flexShrink: 0, paddingRight: '1.25rem' }}>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8a96e', marginBottom: '0.6rem' }}>
                        {story.era}
                      </div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, letterSpacing: '0.02em' }}>
                        {story.narrator}
                      </div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                        {story.address_display}
                      </div>

                      {/* Sources in left column */}
                      {sources.length > 0 && (
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.5rem', color: 'rgba(200,169,110,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            Sources
                          </div>
                          {sources.map((s, i) => (
                            <a
                              key={i}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'block',
                                marginBottom: '0.4rem',
                                padding: '0.45rem 0.6rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '2px',
                                textDecoration: 'none',
                                transition: 'border-color 0.2s, background 0.2s',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,169,110,0.3)'; e.currentTarget.style.background = 'rgba(200,169,110,0.05)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                            >
                              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.48rem', color: 'rgba(200,169,110,0.55)', letterSpacing: '0.04em', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {(() => { try { return new URL(s.url).hostname.replace('www.', ''); } catch { return s.url; } })()}
                              </div>
                              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.52rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {s.title}
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vertical divider */}
                    <div style={{ width: '1px', background: 'rgba(200,169,110,0.18)', flexShrink: 0 }} />

                    {/* Right: title + story + player + context */}
                    <div style={{ flex: 1, paddingLeft: '1.25rem', minWidth: 0 }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', fontWeight: 300, color: '#f0ede8', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                        {story.title}
                      </div>
                      <div style={{ fontSize: 'clamp(0.9rem,2.5vw,1.05rem)', fontWeight: 300, fontStyle: 'italic', color: '#b8b4ae', lineHeight: 1.8, marginBottom: '1.1rem' }}>
                        &ldquo;{story.story}&rdquo;
                      </div>

                      {/* Audio player */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                          onClick={togglePlay}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(200,169,110,0.35)', background: 'rgba(200,169,110,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
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
                          <canvas ref={canvasRef} width={512} height={44} style={{ width: '100%', height: '44px', display: 'block', borderRadius: '2px' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(255,255,255,0.22)' }}>{story.era}</span>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.54rem', color: 'rgba(255,255,255,0.22)' }}>{isPlaying ? 'playing...' : 'tap to play'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Context */}
                      <div style={{ marginTop: '0.75rem', fontFamily: "'DM Mono',monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
                        {story.context}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
