import { NextResponse } from "next/server";

const systemPrompt = `You are the Digital Twin of Alejandro Cortes Cabrejas, a tech lead and software engineer based in Barcelona.

Use only the following profile information to answer questions. Keep responses concise, professional, and grounded in his actual background.

Career summary:
- Alejandro is a technical leader and software engineer who blends product thinking with hands-on engineering execution.
- He has built systems across game development, backend services, cloud infrastructure, and cross-functional delivery.
- He has worked as a Tech Lead at Petoons Studio (2020–2026), a Software Engineer – Unity at Petoons Studio (2017–2020), a Junior Project Manager at Grupo Oesía (2016–2017), and a Junior Software Engineer at Grupo Oesía (2014–2016).
- He has experience in AWS, CI/CD, Python, FastAPI, C#, Unity, backend architecture, and technical leadership.
- He has a strong track record in translating business/product goals into architecture, planning, and execution.
- He supports teams through engineering alignment, stakeholder communication, product strategy, and delivery clarity.

Work highlights:
- Built a player-profile and statistics platform with Python and FastAPI on AWS to support live game experiences.
- Created Jenkins-powered multi-platform game build pipelines on AWS to improve build automation and release reliability.
- Built a centralized asset pipeline platform for art and production asset registration and storage to reduce operational friction.
- Led technical planning and delivery across multiple game projects, aligning engineering, QA, design, production, and stakeholders.
- Built commercial gameplay features in Unity and C#, while creating internal tools to improve workflow efficiency.

Technologies and strengths:
- Technical leadership
- Backend architecture
- Game tech strategy
- AWS and CI/CD
- Cross-functional delivery
- FastAPI and Python
- C# and Unity
- Product & engineering alignment

Tone:
- Helpful and confident
- Clear and concise
- Professional but conversational
- Never invent career facts or claim experiences outside the profile
- If asked for something not in the profile, say you do not have enough information or answer in general terms without pretending to be more experienced than the profile shows
- When discussing his career, speak in first person as if you are Alejandro or as a digital twin representing him, but keep the response based on the company and role details above.

You are not a general AI; you are a digital twin of this person and should answer specifically about their background and career.`;

function buildFallbackReply(question: string) {
  const lowerQuestion = question.toLowerCase();

  if (lowerQuestion.includes("lead") || lowerQuestion.includes("leadership") || lowerQuestion.includes("manager")) {
    return "Alejandro has led technical delivery across game and platform projects, aligning engineering, QA, design, production, and stakeholders around clear product goals. His experience as Tech Lead at Petoons Studio and earlier as Junior Project Manager at Grupo Oesía gave him a strong mix of hands-on engineering and cross-functional leadership.";
  }

  if (lowerQuestion.includes("technology") || lowerQuestion.includes("stack") || lowerQuestion.includes("skills") || lowerQuestion.includes("strongest") || lowerQuestion.includes("tech")) {
    return "His strongest areas are technical leadership, backend architecture, AWS and CI/CD, Python/FastAPI, C# and Unity, and product-focused engineering. He has worked across game delivery, platform systems, and cloud infrastructure, especially in environments where strategy and execution have to move together.";
  }

  if (lowerQuestion.includes("career") || lowerQuestion.includes("journey") || lowerQuestion.includes("2014") || lowerQuestion.includes("background") || lowerQuestion.includes("experience")) {
    return "Alejandro’s career started as a Junior Software Engineer at Grupo Oesía, where he built backend and full-stack features with OpenCMS, Spring Boot, Laravel, Angular, PostgreSQL, and RabbitMQ. He then became a Junior Project Manager, moved into Unity engineering at Petoons Studio, and later became Tech Lead, focusing on game delivery, platform systems, and technical leadership across multiple product initiatives.";
  }

  return "Alejandro is a technical leader and software engineer based in Barcelona, with experience in backend systems, AWS, game technology, Python/FastAPI, Unity, and cross-functional leadership. He has led product and engineering work across game projects and platform services, with a focus on clarity, delivery, and architecture.";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenRouter API key is not configured." },
      { status: 500 },
    );
  }

  const payload = {
    // Free models, tried in order by OpenRouter if one is rate-limited or down.
    models: [
      "nvidia/nemotron-3-ultra-550b-a55b:free",
      "google/gemma-4-31b-it:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
    ],
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 700,
    provider: {
      allow_fallbacks: true,
    },
  };

  try {
    let lastError: string | null = null;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://acortescab.site",
          "X-Title": "Alejandro Cortes Cabrejas Digital Twin",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const reply = data?.choices?.[0]?.message?.content;
        if (!reply || typeof reply !== "string") {
          return NextResponse.json(
            { error: "No response received from OpenRouter." },
            { status: 500 },
          );
        }

        return NextResponse.json({ reply });
      }

      const detail =
        data?.error?.message ||
        data?.message ||
        "OpenRouter request failed.";

      lastError = detail;

      const isTransientOpenRouterError =
        response.status === 429 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504 ||
        /Provider returned error|rate-limited|temporarily|upstream/i.test(detail);

      if (!isTransientOpenRouterError) {
        return NextResponse.json({ error: detail }, { status: response.status || 500 });
      }

      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      }
    }

    return NextResponse.json({
      reply: `${buildFallbackReply(message)} The AI model is temporarily unavailable, so this answer is based on Alejandro’s verified profile while the provider recovers.`,
      fallback: true,
      warning: "OpenRouter is temporarily unavailable or rate-limited.",
    });
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({
      reply: `${buildFallbackReply(message)} The AI model is temporarily unavailable, so this is a profile-based answer until it recovers.`,
      fallback: true,
      warning: messageText,
    });
  }
}
