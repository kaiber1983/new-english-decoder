import { decodePrompt } from "@/lib/prompts/decodePrompt";
import { mockDecode } from "@/lib/mockDecode";
import type { DecodeResult } from "@/lib/types";

const MODEL = "gpt-5-mini";

export async function POST(request: Request) {
  let body: { text?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";

  if (!text) {
    return Response.json(
      { error: "Please enter an English word or sentence." },
      { status: 400 },
    );
  }

  if (process.env.USE_MOCK_AI !== "false") {
    return Response.json(mockDecode(text));
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  try {
    const result = await callOpenAI(text);
    return Response.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The decoder failed unexpectedly.";

    return Response.json({ error: message }, { status: 502 });
  }
}

async function callOpenAI(text: string): Promise<DecodeResult> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: "system",
          content: decodePrompt,
        },
        {
          role: "user",
          content: text,
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI API request failed.");
  }

  const data = await response.json();
  const output = extractOutputText(data);

  try {
    return JSON.parse(output) as DecodeResult;
  } catch {
    throw new Error("The AI returned invalid JSON. Please try again.");
  }
}

function extractOutputText(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "output_text" in data &&
    typeof data.output_text === "string"
  ) {
    return data.output_text;
  }

  throw new Error("The AI response did not include JSON text.");
}
