import { pickVoice, streamTTS } from '@/lib/elevenlabs'
export async function POST(request){
    const {story, narrator} = await request.json()

    const voiceId = pickVoice(narrator)
    const audioStream = await streamTTS(story, voiceId)

    return new Response(audioStream.body, {
    headers: { 'Content-Type': 'audio/mpeg' }
    })
}
