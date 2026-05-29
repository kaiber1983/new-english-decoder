import type { DecodeResult, HardWord } from "./types";

export type SeedWord = HardWord & {
  slug: string;
  realSentence: string;
  peoplesEnglish: string;
  logicSentence: string;
  whyHard: string;
};

export const seedWords: SeedWord[] = [
  {
    slug: "hypertension",
    word: "hypertension",
    plainMeaning: "high blood pressure",
    logicMeaning: "blood pressure too high disease",
    field: "medical",
    difficulty: "high",
    betterEverydayWord: "high blood pressure",
    wordParts: [
      { part: "hyper", meaning: "too high" },
      { part: "tension", meaning: "pressure" },
    ],
    realSentence: "The patient has hypertension.",
    peoplesEnglish: "The patient has high blood pressure.",
    logicSentence: "The sick person has blood pressure too high.",
    whyHard:
      "This word comes from medical language. Many ordinary people understand high blood pressure faster than hypertension.",
  },
  {
    slug: "pork",
    word: "pork",
    plainMeaning: "pig meat",
    logicMeaning: "pig meat",
    field: "food",
    difficulty: "medium",
    betterEverydayWord: "pig meat",
    wordParts: [{ part: "porc", meaning: "pig" }],
    realSentence: "The dish contains pork.",
    peoplesEnglish: "The dish contains pig meat.",
    logicSentence: "The food has pig meat.",
    whyHard:
      "This food word hides the animal name. Pig meat is more direct than pork.",
  },
  {
    slug: "interoperability",
    word: "interoperability",
    plainMeaning: "ability of different systems to work together",
    logicMeaning: "systems work together ability",
    field: "technology",
    difficulty: "high",
    betterEverydayWord: "works with other systems",
    wordParts: [
      { part: "inter", meaning: "between" },
      { part: "operate", meaning: "work" },
      { part: "ability", meaning: "can do" },
    ],
    realSentence: "The software has strong interoperability.",
    peoplesEnglish: "The software works well with other systems.",
    logicSentence: "The software has systems work together ability.",
    whyHard:
      "This technology word compresses several ideas into one long expert word. Systems work together ability shows the meaning piece by piece.",
  },
  {
    slug: "cardiovascular-disease",
    word: "cardiovascular disease",
    plainMeaning: "heart and blood vessel disease",
    logicMeaning: "heart blood-road disease",
    field: "medical",
    difficulty: "high",
    betterEverydayWord: "heart and blood vessel disease",
    wordParts: [
      { part: "cardio", meaning: "heart" },
      { part: "vascular", meaning: "blood vessels" },
    ],
    realSentence: "Cardiovascular disease is common worldwide.",
    peoplesEnglish: "Heart and blood vessel disease is common worldwide.",
    logicSentence: "Heart blood-road disease is common worldwide.",
    whyHard:
      "This medical phrase uses Latin-based parts. Heart and blood vessel disease says the same idea with common body words.",
  },
  {
    slug: "legal-liability",
    word: "legal liability",
    plainMeaning: "legal responsibility",
    logicMeaning: "must answer for harm under law",
    field: "legal",
    difficulty: "high",
    betterEverydayWord: "legal responsibility",
    wordParts: [
      { part: "legal", meaning: "about law" },
      { part: "liability", meaning: "responsibility for harm or debt" },
    ],
    realSentence: "The company may face legal liability.",
    peoplesEnglish: "The company may be legally responsible.",
    logicSentence: "The company may have to answer for harm under law.",
    whyHard:
      "This legal phrase hides a practical idea: someone may have to answer for harm, debt, or damage under law.",
  },
  {
    slug: "sustainable-infrastructure",
    word: "sustainable infrastructure",
    plainMeaning: "basic support systems that can last",
    logicMeaning: "long-lasting support system",
    field: "policy",
    difficulty: "medium",
    betterEverydayWord: "lasting public systems",
    wordParts: [
      { part: "sustain", meaning: "keep going" },
      { part: "infrastructure", meaning: "basic support system" },
    ],
    realSentence: "Cities need sustainable infrastructure.",
    peoplesEnglish: "Cities need basic systems that can last.",
    logicSentence: "Cities need long-lasting support systems.",
    whyHard:
      "This policy phrase joins two abstract words. Basic systems that can last is easier to picture.",
  },
];

export function wordToDecodeResult(text: string, word: SeedWord): DecodeResult {
  const original = text.trim() || word.word;

  return {
    original,
    plainEnglish:
      original.toLowerCase() === word.word
        ? word.plainMeaning
        : original.replace(new RegExp(word.word, "i"), word.plainMeaning),
    logicEnglish:
      original.toLowerCase() === word.word
        ? word.logicMeaning
        : original.replace(new RegExp(word.word, "i"), word.logicMeaning),
    detectedHardWords: [word],
    summary: `This means: ${word.plainMeaning}. The hard word is clearer when you rebuild it as ${word.logicMeaning}.`,
  };
}
