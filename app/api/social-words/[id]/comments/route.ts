import { addCommentToWord } from "@/lib/socialWordService";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: { comment?: unknown };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  try {
    const word = await addCommentToWord(id, body.comment);
    return Response.json(word);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The comment could not be saved.";

    return Response.json({ error: message }, { status: 400 });
  }
}
