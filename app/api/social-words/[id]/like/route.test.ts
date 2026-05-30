import { beforeEach, describe, expect, it, vi } from "vitest";
import { createSharedWord, resetSocialWordStoreForTests } from "@/lib/socialWordService";
import { POST } from "./route";

describe("/api/social-words/[id]/like", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-30T00:00:00.000Z"));
    resetSocialWordStoreForTests();
  });

  it("increments likes for a shared word", async () => {
    const word = await createSharedWord({
      word: "sky worry",
      meaning: "fear before flying",
    });

    const response = await POST(new Request("http://localhost"), {
      params: Promise.resolve({ id: word.id }),
    });
    const updated = await response.json();

    expect(updated.likes).toBe(1);
  });
});
