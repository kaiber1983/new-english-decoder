"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import {
  createSocialWord,
  loadSocialWords,
  saveSocialWords,
  slugifySocialWord,
} from "@/lib/socialWords";

function getSharedChallenge() {
  if (typeof window === "undefined") {
    return {
      word: "sky worry",
      meaning: "fear before flying",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    word: params.get("word") ?? "sky worry",
    meaning: params.get("meaning") ?? "fear before flying",
  };
}

export function ChallengeGuess() {
  const shared = useMemo(() => getSharedChallenge(), []);
  const [guess, setGuess] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);
  const [revealed, setRevealed] = useState(false);

  function likeWord() {
    const loaded = loadSocialWords();
    const idStart = slugifySocialWord(shared.word);
    const existing = loaded.find((item) => item.word === shared.word);
    const stored = existing ?? createSocialWord(shared.word, shared.meaning);
    const nextWords = [
      { ...stored, id: stored.id || idStart, likes: stored.likes + 1 },
      ...loaded.filter((item) => item.id !== stored.id),
    ];
    saveSocialWords(nextWords);
    setLikes((current) => current + 1);
  }

  function postComment() {
    const cleanComment = comment.trim();

    if (!cleanComment) {
      return;
    }

    setComments((current) => [cleanComment, ...current]);
    setComment("");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
        Guessing game
      </p>
      <h1 className="font-display mt-3 text-5xl font-black leading-[0.98] text-stone-950">
        Guess this New English word.
      </h1>

      <section className="mt-8 rounded-lg border border-stone-950 bg-white p-5 shadow-[7px_7px_0_#7dd3fc] sm:p-6">
        <p className="break-words text-5xl font-black leading-tight text-stone-950">
          {shared.word}
        </p>
        <label className="mt-6 block">
          <span className="text-sm font-semibold text-stone-700">Your guess</span>
          <input
            className="mt-2 min-h-12 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
            onChange={(event) => setGuess(event.target.value)}
            placeholder="what does it mean?"
            value={guess}
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className="min-h-11 rounded-lg bg-stone-950 px-4 font-semibold text-white hover:bg-lime-700"
            onClick={() => setRevealed(true)}
            type="button"
          >
            Reveal meaning
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 font-semibold text-stone-950 hover:border-stone-950"
            onClick={likeWord}
            type="button"
          >
            <Heart aria-hidden="true" className="size-4" />
            Like this word
          </button>
          <span className="inline-flex min-h-11 items-center rounded-lg bg-lime-50 px-3 text-sm font-semibold text-lime-900">
            {likes} {likes === 1 ? "like" : "likes"}
          </span>
        </div>
        {revealed ? (
          <p className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-4 text-xl font-semibold text-sky-950">
            {shared.meaning}
          </p>
        ) : null}
      </section>

      <section className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-stone-950">
          <MessageCircle aria-hidden="true" className="size-5 text-lime-700" />
          Comments
        </h2>
        <label className="mt-4 block">
          <span className="text-sm font-semibold text-stone-700">Comment</span>
          <input
            className="mt-2 min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 outline-none focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
            onChange={(event) => setComment(event.target.value)}
            placeholder="I guessed it instantly."
            value={comment}
          />
        </label>
        <button
          className="mt-3 min-h-10 rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-lime-700"
          onClick={postComment}
          type="button"
        >
          Post comment
        </button>
        <div className="mt-4 space-y-2">
          {comments.map((item, index) => (
            <p
              className="rounded-lg border border-stone-200 bg-[#fffdf7] px-3 py-2 text-stone-700"
              key={`${item}-${index}`}
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <Link
        className="mt-6 inline-flex text-sm font-semibold text-stone-700 hover:text-stone-950"
        href="/new"
      >
        Make your own challenge
      </Link>
    </main>
  );
}
