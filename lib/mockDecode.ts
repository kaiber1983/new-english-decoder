import type { DecodeResult } from "./types";
import { seedWords, wordToDecodeResult } from "./seedWords";

export function mockDecode(text: string): DecodeResult {
  const normalized = text.toLowerCase();
  const match = seedWords.find((entry) => normalized.includes(entry.word));

  if (match) {
    return wordToDecodeResult(text, match);
  }

  return {
    original: text,
    plainEnglish: "A simpler English version of this phrase.",
    logicEnglish: "meaning shown with clear word-building logic",
    detectedHardWords: [
      {
        word: text.trim(),
        plainMeaning: "simpler English meaning",
        logicMeaning: "clear word meaning",
        field: "general",
        difficulty: "medium",
        betterEverydayWord: "simple everyday wording",
        wordParts: [{ part: text.trim(), meaning: "needs clearer explanation" }],
      },
    ],
    summary:
      "This phrase can be rebuilt into simpler English so ordinary readers can understand it faster.",
  };
}
