import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LANGUAGE_NAMES = {
  en: 'English', es: 'Spanish', zh: 'Mandarin Chinese',
  ru: 'Russian', fr: 'French', ko: 'Korean', it: 'Italian', pt: 'Portuguese',
  ur: 'Urdu', hi: 'Hindi',
};

export async function generateStory(address, research, summary, language = 'en') {
  const langName = LANGUAGE_NAMES[language] ?? 'English';
  const langInstruction = language === 'en'
    ? ''
    : `IMPORTANT: Write the entire response — story, intro, title, context, narrator, address_display — in ${langName}. Every field must be in ${langName}. The speech patterns and contractions should feel natural to a native ${langName} speaker, not a translation.\n\n`;

  const prompt = `${langInstruction}You are writing a short first-person spoken monologue for a location-based audio storytelling app called Echoes.

Location: ${address}

Historical research about this location:
${summary}

${research}

Imagine you are transcribing a real person speaking. Not writing. Speaking. The output should look like a transcript of someone talking — broken, contracted, emotional, specific.

MANDATORY RULES (break any of these and the output is wrong):
- ALWAYS use contractions: it's, didn't, wasn't, I'd, they'd, couldn't, you've, we'd. Never "it was" when "it's" fits. Never "did not" when "didn't" fits.
- Use "..." at least 4 times — mid-sentence for hesitation, at the end for trailing off. "And it just... I don't know." "Something about that corner..."
- Start at least one sentence with "And", "But", "See," or "Well," — real people do this constantly.
- Include one moment of self-correction or self-interruption: "My father, my uncle actually, he..." or "It was cold. Real cold."
- Vary sentence length wildly. One word. Then a longer one that breathes. Then three words. Then nothing.
- ALWAYS use informal vernacular: "they had somebody in there", "you know what I mean", "something like that", "I don't know", "I guess."
- NEVER use em dashes. NEVER use flowery metaphors. NEVER write a "conclusion."
- ALWAYS name the specific place at least once naturally.
- Ground every detail in the research. Do not invent facts.
- 65 to 80 words total. No more.

GOOD example — this is what the output should sound like:
"The Yard... my uncle, he worked there. Gate three, welding. And this was the forties, right? Wartime. You could smell the metal two blocks over. Every family in Red Hook, they had somebody in there. When they shut it down... I don't know. It's like something just left. And it didn't come back."

BAD example — this is what to NEVER write:
"I used to walk past the Navy Yard every morning. My uncle worked gate three, welding. This was the forties, wartime. You could smell the metal from two blocks away. When they shut it down, it was like the neighborhood lost its heartbeat."
(Too smooth. Too written. No contractions. No hesitation. Sounds like a book, not a person.)

Also provide:
- A short TITLE (4 to 6 words, the name of the place or a phrase that captures the story)
- ERA: The approximate year or decade
- NARRATOR: Brief description (age, background, connection to place)
- VOICE_STYLE: One of: warm_elderly_woman, warm_elderly_man, middle_aged_woman, middle_aged_man, young_woman, young_man
- CONTEXT: One sentence of factual background that helps the listener understand what they just heard. Mention the real place name.

Also provide:
- INTRO: One sentence spoken by a neutral archivist before the narrator. Sets the historical scene. Formal, factual tone. Example: "Brooklyn Navy Yard, 1943. Over seventy thousand workers built warships here around the clock." 15 to 20 words maximum.

Respond in this exact JSON format with no extra text:
{
  "title": "Short evocative title here",
  "story": "The spoken monologue here...",
  "intro": "Archivist's one-sentence scene-setter here.",
  "context": "One factual sentence giving the listener real historical context about this place.",
  "era": "1940s",
  "narrator": "Retired dockworker, Red Hook resident",
  "voice_style": "warm_elderly_man",
  "address_display": "Short clean version of the address"
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].text;

  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      title: 'A Brooklyn Story',
      story: text,
      context: '',
      era: 'Unknown era',
      narrator: 'Anonymous voice',
      voice_style: 'warm_elderly_man',
      address_display: address,
    };
  }
}
