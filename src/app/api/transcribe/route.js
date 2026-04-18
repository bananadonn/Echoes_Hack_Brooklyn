export async function POST(req) {
  try {
    const formData = await req.formData();
    const audio = formData.get('audio');
    if (!audio) return Response.json({ error: 'No audio' }, { status: 400 });

    const language = formData.get('language') || 'en';
    const elForm = new FormData();
    elForm.append('file', audio, 'recording.webm');
    elForm.append('model_id', 'scribe_v1');
    elForm.append('language_code', language);

    const res = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
      body: elForm,
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return Response.json({ transcript: data.text || '' });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
