import { tavily } from '@tavily/core';

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function researchLocation(address, lat, lng) {
  const queries = [
    `${address} history historical events`,
    `${address} notable events people stories`,
  ];

  try {
    const results = await Promise.all(
      queries.map((q) =>
        client.search(q, {
          searchDepth: 'advanced',
          maxResults: 5,
          includeAnswer: true,
        }),
      ),
    );

    const allResults = results.flatMap((r) => r.results);

    const sources = allResults
      .slice(0, 4)
      .map((r) => ({ title: r.title, url: r.url, snippet: r.content?.slice(0, 120) }))
      .filter((s) => s.title && s.url);

    const combined = allResults
      .map((r) => `${r.title}: ${r.content}`)
      .join('\n\n');

    const answer = results
      .map((r) => r.answer)
      .filter(Boolean)
      .join(' ');

    return { research: combined, summary: answer, sources };
  } catch (err) {
    console.error('Tavily error:', err);
    const neighborhood = extractNeighborhood(address);
    const fallback = await client.search(
      `${neighborhood} New York City history stories`,
      { maxResults: 5, includeAnswer: true },
    );
    return {
      research: fallback.results
        .map((r) => `${r.title}: ${r.content}`)
        .join('\n\n'),
      summary: fallback.answer || '',
      sources: fallback.results
        .slice(0, 4)
        .map((r) => ({ title: r.title, url: r.url, snippet: r.content?.slice(0, 120) }))
        .filter((s) => s.title && s.url),
    };
  }
}

function extractNeighborhood(address) {
  const neighborhoods = [
    // Brooklyn
    'Williamsburg', 'Bushwick', 'Bed-Stuy', 'Bedford-Stuyvesant', 'Crown Heights',
    'Park Slope', 'Red Hook', 'Flatbush', 'Brownsville', 'East New York',
    'Sunset Park', 'Bay Ridge', 'Bensonhurst', 'Borough Park', 'Flatlands',
    'Canarsie', 'Marine Park', 'Coney Island', 'Brighton Beach', 'Sheepshead Bay',
    'Greenpoint', 'DUMBO', 'Cobble Hill', 'Carroll Gardens', 'Gowanus',
    'Prospect Heights', 'Fort Greene', 'Clinton Hill', 'Prospect Park',
    // Manhattan
    'Harlem', 'East Harlem', 'Washington Heights', 'Inwood', 'Upper West Side',
    'Upper East Side', 'Midtown', 'Hell\'s Kitchen', 'Chelsea', 'Greenwich Village',
    'East Village', 'Lower East Side', 'Chinatown', 'Tribeca', 'SoHo',
    'Financial District', 'Battery Park', 'Morningside Heights', 'Hamilton Heights',
    // Queens
    'Astoria', 'Long Island City', 'Flushing', 'Jamaica', 'Forest Hills',
    'Jackson Heights', 'Corona', 'Elmhurst', 'Woodside', 'Sunnyside',
    'Ridgewood', 'Maspeth', 'Glendale', 'Rego Park', 'Kew Gardens',
    'Rockaway', 'Howard Beach', 'Bayside', 'Whitestone', 'College Point',
    // Bronx
    'South Bronx', 'Hunts Point', 'Mott Haven', 'Concourse', 'Grand Concourse',
    'Fordham', 'Belmont', 'Tremont', 'Morrisania', 'Highbridge',
    'Riverdale', 'Pelham Bay', 'Co-op City', 'Norwood', 'Woodlawn',
    // Staten Island
    'St. George', 'Stapleton', 'Tompkinsville', 'New Brighton', 'Tottenville',
    'Great Kills', 'Annadale', 'Eltingville', 'Rossville',
  ];
  for (const n of neighborhoods) {
    if (address.includes(n)) return n;
  }
  // Fall back to borough name if present
  for (const borough of ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']) {
    if (address.includes(borough)) return borough;
  }
  return 'New York City';
}
