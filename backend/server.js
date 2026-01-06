import dotenv from "dotenv";
dotenv.config(); // ✅ load .env FIRST

import Fastify from "fastify";
import OpenAI from "openai";
import cors from "@fastify/cors";


const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: true
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Health check
fastify.get("/", async () => {
  return { status: "Backend running" };
});

// Recommend route
fastify.post("/recommend", async (request, reply) => {
  try {
    const { preference } = request.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Suggest 3 to 5 movies based on this preference:
${preference}

Return the movie names as a numbered list, one per line.`
        }
      ],
      temperature: 0.7
    });

    const text = completion.choices[0].message.content;

    const movies = text
      .split("\n")
      .map(line => line.replace(/^\d+\.?\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return { movies };

  } catch (error) {
    console.error("OPENAI ERROR 👉", error);
    reply.code(500).send({ error: "Failed to get recommendations" });
  }
});

// Start server
const PORT = process.env.PORT || 3001;

// log API key presence (not the key itself in production)
console.log('OPENAI_API_KEY present:', Boolean(process.env.OPENAI_API_KEY));

// Bind to all interfaces so cloud hosts (Render, etc.) can reach the server
fastify.listen(
  { port: PORT, host: "0.0.0.0" },
  () => {
    console.log(`Server running on port ${PORT}`);
  }
);
