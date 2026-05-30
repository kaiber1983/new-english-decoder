import { createSharedWord, listRankedSharedWords } from "@/lib/socialWordService";
import type { BoardRange } from "@/lib/socialWords";

function parseRange(value: string | null): BoardRange {
  return value === "month" || value === "all" ? value : "week";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const words = await listRankedSharedWords(parseRange(searchParams.get("range")));

  return Response.json({ words });
}

export async function POST(request: Request) {
  let body: { word?: unknown; meaning?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  try {
    const word = await createSharedWord({
      word: body.word,
      meaning: body.meaning,
    });

    return Response.json(word, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The word could not be created.";

    return Response.json({ error: message }, { status: 400 });
  }
}
