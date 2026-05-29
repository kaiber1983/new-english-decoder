"use client";

import { useMemo, useState } from "react";
import { Flame, MessageCircle, Share2, ThumbsUp } from "lucide-react";

type BoardRange = "week" | "month" | "all";

type SocialWord = {
  id: string;
  word: string;
  meaning: string;
  likes: number;
  comments: string[];
  createdAt: string;
};

const storageKey = "logic-english-social-words";

const seedWords: SocialWord[] = [
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadWords() {
  if (typeof window === "undefined") {
    return seedWords;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as SocialWord[]) : seedWords;
  } catch {
    return seedWords;
  }
}

function saveWords(words: SocialWord[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(words));
}

function initialSocialState() {
  if (typeof window === "undefined") {
    return {
      words: seedWords,
      activeId: seedWords[0].id,
      word: "",
      meaning: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const sharedWord = params.get("word");
  const sharedMeaning = params.get("meaning");
  const loaded = loadWords();

  if (sharedWord && sharedMeaning) {
    const decodedWord = decodeURIComponent(sharedWord);
    const decodedMeaning = decodeURIComponent(sharedMeaning);
    const shared: SocialWord = {
      id: slugify(decodedWord) || "shared-word",
      word: decodedWord,
      meaning: decodedMeaning,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    const merged = [shared, ...loaded.filter((item) => item.id !== shared.id)];
    saveWords(merged);

    return {
      words: merged,
      activeId: shared.id,
      word: decodedWord,
      meaning: decodedMeaning,
    };
  }

  return {
    words: loaded,
    activeId: loaded[0]?.id ?? seedWords[0].id,
    word: "",
    meaning: "",
  };
}

function inRange(word: SocialWord, range: BoardRange) {
  if (range === "all") {
    return true;
  }

  const created = new Date(word.createdAt).getTime();
  const age = Date.now() - created;
  const days = range === "week" ? 7 : 31;

  return age <= days * 24 * 60 * 60 * 1000;
}

function shareText(word: SocialWord) {
  return `Guess this New English word: "${word.word}"`;
}

function shareIntentUrl(platform: "x" | "twitter", word: SocialWord, url: string) {
  const text = encodeURIComponent(shareText(word));
  const encodedUrl = encodeURIComponent(url);

  if (platform === "x") {
    return `https://x.com/intent/post?text=${text}&url=${encodedUrl}`;
  }

  return `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
}

export function NewEnglishSocialHub() {
  const initialState = useMemo(() => initialSocialState(), []);
  const [word, setWord] = useState(initialState.word);
  const [meaning, setMeaning] = useState(initialState.meaning);
  const [guess, setGuess] = useState("");
  const [comment, setComment] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [range, setRange] = useState<BoardRange>("week");
  const [words, setWords] = useState<SocialWord[]>(initialState.words);
  const [activeId, setActiveId] = useState(initialState.activeId);

  const activeWord = words.find((item) => item.id === activeId) ?? words[0];

  const leaderboard = useMemo(
    () =>
      words
        .filter((item) => inRange(item, range))
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 5),
    [range, words],
  );

  const shareLink =
    typeof window === "undefined" || !activeWord
      ? ""
      : `${window.location.origin}/new-english?word=${encodeURIComponent(
          activeWord.word,
        )}&meaning=${encodeURIComponent(activeWord.meaning)}`;

  function createChallenge() {
    const cleanWord = word.trim().toLowerCase();
    const cleanMeaning = meaning.trim();

    if (!cleanWord || !cleanMeaning) {
      return;
    }

    const nextWord: SocialWord = {
      id: `${slugify(cleanWord)}-${Date.now()}`,
      word: cleanWord,
      meaning: cleanMeaning,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    const nextWords = [nextWord, ...words];
    setWords(nextWords);
    setActiveId(nextWord.id);
    setRevealed(false);
    setGuess("");
    saveWords(nextWords);
  }

  function likeActiveWord() {
    const nextWords = words.map((item) =>
      item.id === activeId ? { ...item, likes: item.likes + 1 } : item,
    );
    setWords(nextWords);
    saveWords(nextWords);
  }

  function postComment() {
    const cleanComment = comment.trim();

    if (!cleanComment) {
      return;
    }

    const nextWords = words.map((item) =>
      item.id === activeId
        ? { ...item, comments: [cleanComment, ...item.comments] }
        : item,
    );
    setWords(nextWords);
    setComment("");
    saveWords(nextWords);
  }

  async function copyForPlatform(platformUrl: string) {
    if (!activeWord) {
      return;
    }

    const text = `${shareText(activeWord)}\n${shareLink}`;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this share text:", text);
    }

    window.open(platformUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
              Social challenge
            </p>
            <h2 className="font-display mt-2 text-4xl font-bold leading-tight text-stone-950">
              Make a word. Let friends guess.
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 px-3 py-1 text-sm font-semibold text-stone-700">
            <Flame aria-hidden="true" className="size-4 text-lime-600" />
            Weekly sparks
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-stone-700">New word</span>
            <input
              className="mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
              onChange={(event) => setWord(event.target.value)}
              placeholder="sky worry"
              value={word}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Hidden meaning</span>
            <input
              className="mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
              onChange={(event) => setMeaning(event.target.value)}
              placeholder="fear before flying"
              value={meaning}
            />
          </label>
        </div>
        <button
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-stone-950 px-4 font-semibold text-white transition hover:bg-lime-700"
          onClick={createChallenge}
          type="button"
        >
          <Share2 aria-hidden="true" className="size-4" />
          Create challenge
        </button>

        {activeWord ? (
          <div className="mt-6 rounded-lg border border-lime-200 bg-lime-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lime-800">
              Share this guessing link
            </p>
            <p className="mt-2 break-all rounded-md bg-white px-3 py-2 text-sm text-stone-700">
              {shareLink}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                aria-label="Share to X"
                className="inline-flex min-h-10 items-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-lime-700"
                href={shareIntentUrl("x", activeWord, shareLink)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Share to X
              </a>
              <a
                aria-label="Share to Twitter"
                className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
                href={shareIntentUrl("twitter", activeWord, shareLink)}
                rel="noopener noreferrer"
                target="_blank"
              >
                Share to Twitter
              </a>
              <button
                className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
                onClick={() => copyForPlatform("https://www.tiktok.com/upload")}
                type="button"
              >
                Share to TikTok
              </button>
              <button
                className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
                onClick={() => copyForPlatform("https://www.instagram.com/")}
                type="button"
              >
                Share to Instagram
              </button>
            </div>
          </div>
        ) : null}

        {activeWord ? (
          <div className="mt-6 rounded-lg border border-stone-200 bg-[#fffdf7] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500">
              Guess what it means
            </p>
            <h3 className="mt-2 break-words text-4xl font-semibold text-stone-950">
              {activeWord.word}
            </h3>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-stone-700">Your guess</span>
              <input
                className="mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
                onChange={(event) => setGuess(event.target.value)}
                placeholder="what do you think it means?"
                value={guess}
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="inline-flex min-h-10 items-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-lime-700"
                onClick={() => setRevealed(true)}
                type="button"
              >
                Reveal meaning
              </button>
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
                onClick={likeActiveWord}
                type="button"
              >
                <ThumbsUp aria-hidden="true" className="size-4" />
                Like this word
              </button>
              <span className="inline-flex min-h-10 items-center rounded-lg bg-white px-3 text-sm font-semibold text-stone-700">
                {activeWord.likes} {activeWord.likes === 1 ? "like" : "likes"}
              </span>
            </div>
            {revealed ? (
              <p className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-3 font-semibold text-sky-950">
                {activeWord.meaning}
              </p>
            ) : null}
          </div>
        ) : null}

        {activeWord ? (
          <div className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-stone-950">
              <MessageCircle aria-hidden="true" className="size-5 text-lime-700" />
              Comments
            </h3>
            <label className="mt-4 block">
              <span className="text-sm font-semibold text-stone-700">Comment</span>
              <input
                className="mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
                onChange={(event) => setComment(event.target.value)}
                placeholder="This is instantly clear."
                value={comment}
              />
            </label>
            <button
              className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-lime-700"
              onClick={postComment}
              type="button"
            >
              Post comment
            </button>
            <div className="mt-4 space-y-2">
              {activeWord.comments.length ? (
                activeWord.comments.map((item, index) => (
                  <p
                    className="rounded-lg border border-stone-200 bg-[#fffdf7] px-3 py-2 text-stone-700"
                    key={`${item}-${index}`}
                  >
                    {item}
                  </p>
                ))
              ) : (
                <p className="text-sm text-stone-500">No comments yet.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <aside className="rounded-lg border border-stone-200 bg-stone-950 p-5 text-white shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-300">
          Leaderboards
        </p>
        <h2 className="font-display mt-2 text-4xl font-bold leading-tight">
          Most explosive new words
        </h2>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {(["week", "month", "all"] as BoardRange[]).map((item) => (
            <button
              className={`min-h-10 rounded-lg border px-3 text-sm font-semibold ${
                range === item
                  ? "border-lime-300 bg-lime-300 text-stone-950"
                  : "border-stone-700 text-stone-200 hover:border-lime-300"
              }`}
              key={item}
              onClick={() => setRange(item)}
              type="button"
            >
              {item === "week" ? "Week" : item === "month" ? "Month" : "All time"}
            </button>
          ))}
        </div>
        <ol className="mt-5 space-y-3">
          {leaderboard.map((item, index) => (
            <li
              className="rounded-lg border border-stone-700 bg-stone-900 p-4"
              key={item.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-300">
                    #{index + 1}
                  </p>
                  <button
                    className="mt-1 text-left text-xl font-semibold text-white hover:text-lime-200"
                    onClick={() => {
                      setActiveId(item.id);
                      setRevealed(false);
                    }}
                    type="button"
                  >
                    {item.word}
                  </button>
                </div>
                <span className="rounded-full bg-lime-300 px-3 py-1 text-sm font-semibold text-stone-950">
                  {item.likes}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-300">{item.meaning}</p>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
