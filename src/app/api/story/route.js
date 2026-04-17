import { NextResponse } from 'next/server';
import { researchLocation } from '@/lib/tavily';
import { generateStory } from '@/lib/claude';
import { generateVoice } from '@/lib/elevenlabs';

export async function POST(req) {
  try {
    const { address, lat, lng } = await req.json();

    const { research, summary, sources } = await researchLocation(
      address,
      lat,
      lng,
    );
    const storyData = await generateStory(address, research, summary);
    const audioData = await generateVoice(
      storyData.story,
      storyData.voice_style,
    );

    return NextResponse.json({
      ...storyData,
      audio: audioData,
      sources,
      coordinates: { lat, lng },
    });
  } catch (err) {
    console.error('Story generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate story' },
      { status: 500 },
    );
  }
}
