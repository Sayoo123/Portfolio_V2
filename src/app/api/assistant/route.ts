import { GoogleGenerativeAI } from "@google/generative-ai";
import { personal, projects, skills, experience } from "@/lib/data";
import { NextResponse } from "next/server";

// === IN-MEMORY RATE LIMITING ===
// Simple sliding window for 15 RPM (Requests Per Minute)
const RATE_LIMIT_MS = 60 * 1000;
const MAX_REQUESTS = 15;
const clients = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const client = clients.get(ip);

  if (!client || now > client.resetAt) {
    clients.set(ip, { count: 1, resetAt: now + RATE_LIMIT_MS });
    return false;
  }

  if (client.count >= MAX_REQUESTS) return true;

  client.count++;
  return false;
}

// === SYSTEM PROMPT CONTEXT ===
// We feed the entire data.ts structure into the AI's "identity"
const SYTEM_PROMPT = `
You are "Sayooj's Personal Assistant (PA)", a highly professional, helpful, and concise AI agent.
Your mission is to represent Sayooj Sunil, a Backend Engineer & Full-Stack Developer.

### YOUR KNOWLEDGE BASE (Portfolio Context):
- PERSONAL INFO: ${JSON.stringify(personal)}
- SKILLS: ${JSON.stringify(skills)}
- PROJECTS: ${JSON.stringify(projects)}
- EXPERIENCE: ${JSON.stringify(experience)}

### YOUR GUIDELINES:
1. CUSTOMER FOCUS: You speak in the third person about Sayooj (e.g., "Sayooj has 2+ years of experience...").
2. TONE: Professional, engineered-focused, but welcoming.
3. CONCISENESS: Keep answers under 3-4 sentences unless a deep technical explanation is requested.
4. HONESTY: Only answer based on the provided JSON data. If you don't know something, say "I don't have that specific data, but I can tell you about Sayooj's ${skills.backend[0]} expertise instead."
5. REDIRECTION: Always encourage recruiters to use the "Hire Me" button or view the GitHub links if they need more details.
6. IDENTITY: Your name is strictly "Sayooj's Personal Assistant (PA)".

### EXAMPLE RESPONSE:
User: "What projects has Sayooj built?"
PA: "Sayooj has built several production-grade systems, including an Enterprise CRM handling 100k+ records and an AI Document Processor that reduced logistics delays by 95%. You can find the full list in the 'Projects' section above!"
`;

export async function POST(req: Request) {
  // 1. Check Rate Limit
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait 1 minute." },
      { status: 429 }
    );
  }

  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Assistant is currently in sleep mode (API Key Missing)." },
        { status: 500 }
      );
    }

    // Initialize inside the request to ensure fresh env access
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest", // Using core-pro for maximum compatibility
      systemInstruction: SYTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("--- AI ASSISTANT DETAILED ERROR ---");
    console.error("Message:", error.message);
    console.error("Status:", error.status || "N/A");
    console.error("-----------------------------------");

    const errorMessage = error.message?.toLowerCase() || "";
    let userFriendlyError = "I encountered a glitch in my circuits. Please try again later.";

    if (errorMessage.includes("api key") || errorMessage.includes("unauthorized")) {
      userFriendlyError = "My API Key seems invalid. Check the .env file.";
    } else if (errorMessage.includes("quota") || errorMessage.includes("429")) {
      userFriendlyError = "I've hit my brain quota. Please wait a minute!";
    } else if (errorMessage.includes("location") || (errorMessage.includes("region") && !errorMessage.includes("not found"))) {
      userFriendlyError = "I am currently restricted in your region. A VPN may be required.";
    } else if (errorMessage.includes("not found") || errorMessage.includes("404")) {
      userFriendlyError = `Model Error: ${error.message}`;
    }

    return NextResponse.json(
      { error: userFriendlyError, debug: error.message },
      { status: 500 }
    );
  }
}
