const VOICE_MAP = {
  warm_elderly_man:   'ch0vU2DwfJVmFG2iZy89',
  warm_elderly_woman: 'tE1KlkSzdHDpi3dDzO60',
  middle_aged_man:    'VQWIG7jHNSEv826utbm8',
  middle_aged_woman:  'MnUw1cSnpiLoLhpd3Hqp',
  young_man:          'wSqOdjeNqDrHcoK0zorF',
  young_woman:        'TbMNBJ27fH2U0VgpSNko',
  gravelly_old_man:   'Q4oILuo4P8VeXtE6FMLI',
  soft_old_woman:     'GpOshR6AeCDz0A9MCHKJ',
};

// Emotional range per voice category.
// Lower stability = more pitch/pace variation. Higher style = more expressive acting.
const VOICE_SETTINGS = {
  warm_elderly_man:   { stability: 0.30, similarity_boost: 0.82, style: 0.85 },
  warm_elderly_woman: { stability: 0.32, similarity_boost: 0.82, style: 0.82 },
  middle_aged_man:    { stability: 0.35, similarity_boost: 0.80, style: 0.78 },
  middle_aged_woman:  { stability: 0.35, similarity_boost: 0.80, style: 0.76 },
  young_man:          { stability: 0.38, similarity_boost: 0.78, style: 0.72 },
  young_woman:        { stability: 0.38, similarity_boost: 0.78, style: 0.70 },
  gravelly_old_man:   { stability: 0.28, similarity_boost: 0.84, style: 0.88 },
  soft_old_woman:     { stability: 0.30, similarity_boost: 0.84, style: 0.85 },
  archivist:          { stability: 0.55, similarity_boost: 0.72, style: 0.28 },
};

export async function generateVoice(text, voiceStyle) {
  const voiceId = VOICE_MAP[voiceStyle] || VOICE_MAP.warm_elderly_man;
  const settings = VOICE_SETTINGS[voiceStyle] || VOICE_SETTINGS.warm_elderly_man;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `<speak>${text}</speak>`,
        model_id: 'eleven_multilingual_v2',
        enable_ssml_parsing: true,
        voice_settings: {
          ...settings,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs error: ${err}`);
  }

  const audioBuffer = await response.arrayBuffer();
  const base64Audio = Buffer.from(audioBuffer).toString('base64');
  return `data:audio/mpeg;base64,${base64Audio}`;
}
