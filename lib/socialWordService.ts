import {
  createSocialWord,
  rankedWords,
  seedSocialWords,
  type BoardRange,
  type SocialWord,
} from "./socialWords";

let socialWords = [...seedSocialWords];

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function findWord(id: string) {
  return socialWords.find((item) => item.id === id);
}

export function resetSocialWordStoreForTests() {
  socialWords = [];
}

export async function listRankedSharedWords(range: BoardRange = "week") {
  return rankedWords(socialWords, range);
}

export async function createSharedWord(input: {
  word: unknown;
  meaning: unknown;
}) {
  const word = cleanText(input.word);
  const meaning = cleanText(input.meaning);

  if (!word || !meaning) {
    throw new Error("Word and meaning are required.");
  }

  const nextWord = createSocialWord(word, meaning);
  socialWords = [nextWord, ...socialWords];
  return nextWord;
}

export async function likeSharedWord(id: string) {
  const word = findWord(id);

  if (!word) {
    throw new Error("Word not found.");
  }

  const updated = { ...word, likes: word.likes + 1 };
  socialWords = socialWords.map((item) => (item.id === id ? updated : item));
  return updated;
}

export async function addCommentToWord(id: string, comment: unknown) {
  const cleanComment = cleanText(comment);
  const word = findWord(id);

  if (!word) {
    throw new Error("Word not found.");
  }

  if (!cleanComment) {
    throw new Error("Comment is required.");
  }

  const updated: SocialWord = {
    ...word,
    comments: [cleanComment, ...word.comments],
  };
  socialWords = socialWords.map((item) => (item.id === id ? updated : item));
  return updated;
}
