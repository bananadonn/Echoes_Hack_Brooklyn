// ---------------------------------------------------------------------------
// Voice table — pre-picked voices covering key era / gender / tone combos
// Keys: "<era>-<gender>-<tone>"
// ---------------------------------------------------------------------------

export const VOICE_TABLE = {
  // 1940s Brooklyn — WWII era, working-class
  '1940s-female-nostalgic':   'EXAVITQu4vr4xnSDxMaL', // Bella  — soft, warm
  '1940s-female-proud':       '21m00Tcm4TlvDq8ikWAM', // Rachel — calm, steady
  '1940s-male-nostalgic':     'TxGEqnHWrfWFTfGW9XjX', // Josh   — deep, warm
  '1940s-male-gruff':         'VR6AewLTigWG4xSOukaG', // Arnold — crisp, authoritative

  // 1920s Brooklyn — Jazz Age / immigrant era
  '1920s-female-wistful':     'MF3mGyEYCl7XYWbV9V6O', // Elli   — emotional, young
  '1920s-female-nostalgic':   'EXAVITQu4vr4xnSDxMaL', // Bella
  '1920s-male-gruff':         'VR6AewLTigWG4xSOukaG', // Arnold
  '1920s-male-nostalgic':     'pNInz6obpgDQGcFmaJgB', // Adam   — deep, measured

  // 1960s Brooklyn — civil rights / borough pride era
  '1960s-female-proud':       '21m00Tcm4TlvDq8ikWAM', // Rachel
  '1960s-female-nostalgic':   'EXAVITQu4vr4xnSDxMaL', // Bella
  '1960s-male-proud':         'pNInz6obpgDQGcFmaJgB', // Adam
  '1960s-male-nostalgic':     'TxGEqnHWrfWFTfGW9XjX', // Josh

  // 1980s Brooklyn
  '1980s-female-nostalgic':   'MF3mGyEYCl7XYWbV9V6O', // Elli
  '1980s-male-nostalgic':     'yoZ06aMxZJJ28mfd3POQ', // Sam    — raspy, streetwise

  // Era-only fallbacks (gender × era, no tone)
  '1940s-female':             'EXAVITQu4vr4xnSDxMaL',
  '1940s-male':               'TxGEqnHWrfWFTfGW9XjX',
  '1920s-female':             'MF3mGyEYCl7XYWbV9V6O',
  '1920s-male':               'pNInz6obpgDQGcFmaJgB',
  '1960s-female':             '21m00Tcm4TlvDq8ikWAM',
  '1960s-male':               'pNInz6obpgDQGcFmaJgB',
  '1980s-female':             'MF3mGyEYCl7XYWbV9V6O',
  '1980s-male':               'yoZ06aMxZJJ28mfd3POQ',

  // Gender-only fallbacks
  'female':                   'EXAVITQu4vr4xnSDxMaL',
  'male':                     'TxGEqnHWrfWFTfGW9XjX',

  // Ultimate fallback
  'default':                  'ErXwobaYiN019PkySvjV', // Antoni — well-rounded
};

//input claude narrator and pick a voice from the table based on its parameters 
export function pickVoice(narrator) {
  const { era = '', gender = '', tone = '' } = narrator ?? {};

  // Normalise to lowercase for consistent key lookup
  const e = era.toLowerCase().trim();
  const g = gender.toLowerCase().trim();
  const t = tone.toLowerCase().trim();

  return (
    VOICE_TABLE[`${e}-${g}-${t}`] ||
    VOICE_TABLE[`${e}-${g}`]      ||
    VOICE_TABLE[`${g}-${t}`]      ||
    VOICE_TABLE[`${e}`]            ||
    VOICE_TABLE[`${g}`]            ||
    VOICE_TABLE['default']
  );
}

export async function streamTTS(text, voiceId) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('ELEVENLABS_API_KEY is not set');

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.75,
          style: 0.35,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`ElevenLabs error ${res.status}: ${err}`);
  }

  return res;
}
