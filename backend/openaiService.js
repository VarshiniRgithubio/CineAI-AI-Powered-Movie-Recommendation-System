import OpenAI from 'openai';

function mockRecommendations(input) {
  // Simple deterministic mock based on keywords
  const lower = (input || '').toLowerCase();
  if (lower.includes('action') && lower.includes('female')) {
    return [
      'Mad Max: Fury Road',
      'Wonder Woman',
      'Atomic Blonde',
      'Kill Bill'
    ];
  }
  if (lower.includes('sci-fi') || lower.includes('sci') || lower.includes('science')) {
    return ['Interstellar', 'Blade Runner 2049', 'The Matrix'];
  }
  if (lower.includes('romantic') || lower.includes('romance')) {
    return ['Before Sunrise', 'The Notebook', '500 Days of Summer'];
  }
  // Default
  return ['The Shawshank Redemption', 'Inception', 'The Godfather'];
}

export async function recommendMovies(userInput) {
  // If API key is missing, return mock recommendations for development/testing
  if (!process.env.OPENAI_API_KEY) {
    return mockRecommendations(userInput);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `
You are a movie recommendation assistant.

Based on the user's preference below, suggest exactly 3 to 5 relevant movies.

User preference:
"${userInput}"

Rules:
- Return ONLY a JSON array of movie titles
- No explanations
- No extra text
- Only movie names
        `,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  const text = completion.choices?.[0]?.message?.content || '';
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const arr = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    if (Array.isArray(arr)) return arr;
  } catch (err) {
    // fallthrough to fallback
  }

  // Fallback to mock if parsing failed
  return mockRecommendations(userInput);
}
