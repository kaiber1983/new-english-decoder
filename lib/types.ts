export type WordPart = {
  part: string;
  meaning: string;
};

export type HardWord = {
  word: string;
  plainMeaning: string;
  logicMeaning: string;
  wordParts: WordPart[];
  field: string;
  difficulty: "low" | "medium" | "high";
  betterEverydayWord: string;
};

export type DecodeResult = {
  original: string;
  plainEnglish: string;
  logicEnglish: string;
  detectedHardWords: HardWord[];
  summary: string;
};
