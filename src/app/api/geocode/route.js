import { NextResponse } from 'next/server';

export async function POST(req) {
  const { query } = await req.json();

  // Try multiple query variations
  const queries = [
    `${query} New York City`,
    `${query} NYC`,
    `${query} New York`,
    query,
  ];

  for (const q of queries) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          q,
        )}&format=json&limit=5&countrycodes=us&addressdetails=1`,
        { headers: { 'User-Agent': 'Echoes/1.0' } },
      );
      const data = await res.json();

      if (data.length > 0) {
        // Prefer results within NYC's 5 boroughs
        const nycBoroughs = ['manhattan', 'brooklyn', 'queens', 'bronx', 'staten island'];
        const nyc = data.find((r) =>
          nycBoroughs.some((b) => r.display_name?.toLowerCase().includes(b)),
        );
        const best = nyc || data[0];
        return NextResponse.json({
          lat: parseFloat(best.lat),
          lng: parseFloat(best.lon),
          display_name: best.display_name,
        });
      }
    } catch (err) {
      console.error('Geocode attempt failed:', err);
    }
  }

  // Last resort — try OSM's search API
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query,
      )}&format=json&limit=3&viewbox=-74.05,40.57,-73.83,40.74&bounded=0`,
      { headers: { 'User-Agent': 'Echoes/1.0' } },
    );
    const data = await res.json();
    if (data.length > 0) {
      return NextResponse.json({
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        display_name: data[0].display_name,
      });
    }
  } catch (err) {
    console.error('Last resort geocode failed:', err);
  }

  return NextResponse.json({ error: 'Location not found' }, { status: 404 });
}
