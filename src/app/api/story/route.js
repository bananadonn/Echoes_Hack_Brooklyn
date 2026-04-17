import { NextResponse } from 'next/server';
import { researchLocation } from '@/lib/tavily';
import { generateStory } from '@/lib/claude';
import { generateVoice } from '@/lib/elevenlabs';

// Ellipses get the longest pause — they're emotional beats, not just gaps.
// Sentence-end pauses are intentionally varied so the rhythm feels human.
function addBreaths(text) {
  return text
    .replace(/\.\.\. /g, '... <break time="1100ms"/> ')
    .replace(/\.\.\.$/g, '... <break time="1100ms"/> ')
    .replace(/\. /g, '. <break time="550ms"/> ')
    .replace(/\? /g, '? <break time="600ms"/> ')
    .replace(/\! /g, '! <break time="500ms"/> ')
    .replace(/\, /g, ', <break time="180ms"/> ');
}

export async function POST(req) {
  try {
    const { address, lat, lng } = await req.json();

    if (!address) {
      return NextResponse.json({ error: 'Missing address' }, { status: 400 });
    }

    console.log(`Generating story for: ${address}`);

    const { research, summary, sources } = await researchLocation(
      address,
      lat,
      lng,
    );
    const storyData = await generateStory(address, research, summary);

    const storyText = addBreaths(storyData.story);
    const introText = storyData.intro
      ? `<break time="400ms"/> ${addBreaths(storyData.intro)} <break time="1200ms"/>`
      : null;

    const [introAudio, storyAudio] = await Promise.all([
      introText
        ? generateVoice(introText, 'archivist')
        : Promise.resolve(null),
      generateVoice(storyText, storyData.voice_style),
    ]);

    return NextResponse.json({
      ...storyData,
      introAudio,
      audio: storyAudio,
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
