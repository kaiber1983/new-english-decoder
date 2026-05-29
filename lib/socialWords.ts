export type BoardRange = "week" | "month" | "all";

export type SocialWord = {
  id: string;
  word: string;
  meaning: string;
  likes: number;
  comments: string[];
  createdAt: string;
};

export const socialWordsStorageKey = "logic-english-social-words";

export const seedSocialWords: SocialWord[] = [
  {
    id: "time-eating-meeting",
    word: "time eating meeting",
    meaning: "a meeting that consumes your whole day",
    likes: 184,
    comments: ["Too real.", "Instantly understandable."],
    createdAt: new Date().toISOString(),
  },
  {
    id: "meaning-locked-word",
    word: "meaning locked word",
    meaning: "a word that hides its meaning from ordinary readers",
    likes: 143,
    comments: ["This describes half of legal English."],
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "work-slow-machine",
    word: "work slow machine",
    meaning: "software that should help but makes work slower",
    likes: 101,
    comments: [],
    createdAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function slugifySocialWord(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function loadSocialWords() {
  if (typeof window === "undefined") {
    return seedSocialWords;
  }

  try {
    const stored = window.localStorage.getItem(socialWordsStorageKey);
    return stored ? (JSON.parse(stored) as SocialWord[]) : seedSocialWords;
  } catch {
    return seedSocialWords;
  }
}

export function saveSocialWords(words: SocialWord[]) {
  window.localStorage.setItem(socialWordsStorageKey, JSON.stringify(words));
}

export function createSocialWord(word: string, meaning: string): SocialWord {
  const cleanWord = word.trim().toLowerCase();
  const cleanMeaning = meaning.trim();

  return {
    id: `${slugifySocialWord(cleanWord)}-${Date.now()}`,
    word: cleanWord,
    meaning: cleanMeaning,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };
}

export function challengeUrl(word: string, meaning: string) {
  const base = typeof window === "undefined" ? "" : window.location.origin;

  return `${base}/challenge?word=${encodeURIComponent(word)}&meaning=${encodeURIComponent(
    meaning,
  )}`;
}

export function inBoardRange(word: SocialWord, range: BoardRange) {
  if (range === "all") {
    return true;
  }

  const created = new Date(word.createdAt).getTime();
  const age = Date.now() - created;
  const days = range === "week" ? 7 : 31;

  return age <= days * 24 * 60 * 60 * 1000;
}

export function rankedWords(words: SocialWord[], range: BoardRange) {
  return words
    .filter((item) => inBoardRange(item, range))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 8);
}

export function shareText(word: string) {
  return `Guess this New English word: "${word}"`;
}

export function shareIntentUrl(platform: "x" | "twitter", word: string, url: string) {
  const text = encodeURIComponent(shareText(word));
  const encodedUrl = encodeURIComponent(url);

  if (platform === "x") {
    return `https://x.com/intent/post?text=${text}&url=${encodedUrl}`;
  }

  return `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
}
