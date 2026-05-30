import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  addCommentToWord,
  createSharedWord,
  likeSharedWord,
  listRankedSharedWords,
  resetSocialWordStoreForTests,
} from "./socialWordService";

describe("socialWordService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-30T00:00:00.000Z"));
    resetSocialWordStoreForTests();
  });

  it("creates a shared word and ranks it after likes", async () => {
    const created = await createSharedWord({
      word: "sky worry",
      meaning: "fear before flying",
    });

    await likeSharedWord(created.id);
    await likeSharedWord(created.id);

    const ranked = await listRankedSharedWords("week");

    expect(ranked[0]).toMatchObject({
      id: created.id,
      word: "sky worry",
      meaning: "fear before flying",
      likes: 2,
    });
  });

  it("stores comments for a shared word", async () => {
    const created = await createSharedWord({
      word: "time eating meeting",
      meaning: "a meeting that takes too much time",
    });

    const updated = await addCommentToWord(created.id, "I got it instantly.");

    expect(updated.comments).toEqual(["I got it instantly."]);
  });
});
