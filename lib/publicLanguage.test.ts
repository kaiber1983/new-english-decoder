import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const publicFiles = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/layout.tsx",
  "app/board/page.tsx",
  "app/challenge/page.tsx",
  "app/new/page.tsx",
  "app/new-english/page.tsx",
  "app/words/[slug]/page.tsx",
  "components/ChallengeGuess.tsx",
  "components/Leaderboard.tsx",
  "components/NewEnglishPlayground.tsx",
  "components/NewEnglishMaker.tsx",
  "components/NewEnglishSocialHub.tsx",
  "components/NewWordStudio.tsx",
  "components/SocialShareBar.tsx",
  "components/WordPageContent.tsx",
  "lib/socialWords.ts",
  "lib/newEnglishExamples.ts",
  "lib/prompts/decodePrompt.ts",
  "README.md",
];

const blockedTerms = [
  `${"Chin"}${"a"}`,
  `${"Chin"}${"ese"}`,
  `${"Ching"}${"lish"}`,
  String.fromCharCode(0x4e2d, 0x6587),
  String.fromCharCode(0x4e2d, 0x5f0f),
];

describe("public language", () => {
  it("does not position the product around country or dialect labels", () => {
    const offenders = publicFiles.flatMap((file) => {
      const content = readFileSync(file, "utf8");
      return blockedTerms
        .filter((term) => content.toLowerCase().includes(term.toLowerCase()))
        .map((term) => `${file}: ${term}`);
    });

    expect(offenders).toEqual([]);
  });
});
