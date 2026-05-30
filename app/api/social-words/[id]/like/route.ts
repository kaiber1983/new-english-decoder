import { likeSharedWord } from "@/lib/socialWordService";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const word = await likeSharedWord(id);
    return Response.json(word);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The word was not found.";

    return Response.json({ error: message }, { status: 404 });
  }
}
