import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "./route";
import { resetSocialWordStoreForTests } from "@/lib/socialWordService";

describe("/api/social-words", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-30T00:00:00.000Z"));
    resetSocialWordStoreForTests();
  });

  it("creates a word and returns it through the board endpoint", async () => {
    const createdResponse = await POST(
      new Request("http://localhost/api/social-words", {
        method: "POST",
        body: JSON.stringify({
          word: "sky worry",
          meaning: "fear before flying",
        }),
      }),
    );
    const created = await createdResponse.json();

    const listResponse = await GET(
      new Request("http://localhost/api/social-words?range=week"),
    );
    const list = await listResponse.json();

    expect(createdResponse.status).toBe(201);
    expect(created.word).toBe("sky worry");
    expect(list.words[0].id).toBe(created.id);
  });

  it("rejects empty submissions", async () => {
    const response = await POST(
      new Request("http://localhost/api/social-words", {
        method: "POST",
        body: JSON.stringify({ word: "", meaning: "" }),
      }),
    );

    expect(response.status).toBe(400);
  });
});
