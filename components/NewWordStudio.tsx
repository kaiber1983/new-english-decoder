"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  challengeUrl,
  createSocialWord,
  loadSocialWords,
  saveSocialWords,
} from "@/lib/socialWords";
import { SocialShareBar } from "./SocialShareBar";

function cleanPieces(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

export function NewWordStudio() {
  const [meaning, setMeaning] = useState("");
  const [pieces, setPieces] = useState("");
  const [builtWord, setBuiltWord] = useState("");
  const [builtMeaning, setBuiltMeaning] = useState("");

  const preview = useMemo(() => cleanPieces(pieces), [pieces]);
  const url = builtWord ? challengeUrl(builtWord, builtMeaning) : "";

  function createChallenge() {
    const cleanMeaning = meaning.trim();

    if (!preview || !cleanMeaning) {
      return;
    }

    const nextWord = createSocialWord(preview, cleanMeaning);
    const nextWords = [nextWord, ...loadSocialWords()];
    saveSocialWords(nextWords);
    setBuiltWord(nextWord.word);
    setBuiltMeaning(nextWord.meaning);
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1fr] lg:px-8">
      <section className="lg:pt-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-700">
          New English Studio
        </p>
        <h1 className="font-display mt-3 text-5xl font-black leading-[0.98] text-stone-950 sm:text-6xl">
          Make one word worth sharing.
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">
          Build a visible word, send it as a challenge, then see whether people
          understand it at first sight.
        </p>
      </section>

      <section className="rounded-lg border border-stone-950 bg-stone-950 p-5 text-white shadow-[8px_8px_0_#bef264] sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-stone-200">Meaning</span>
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 text-white outline-none placeholder:text-stone-500 focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
              onChange={(event) => setMeaning(event.target.value)}
              placeholder="fear before flying"
              value={meaning}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-200">New English</span>
            <input
              className="mt-2 min-h-12 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 text-white outline-none placeholder:text-stone-500 focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
              onChange={(event) => setPieces(event.target.value)}
              placeholder="sky worry"
              value={pieces}
            />
          </label>
        </div>

        <div className="mt-5 rounded-lg bg-[#fff9e8] p-5 text-stone-950">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Preview
          </p>
          <p className="mt-2 break-words text-4xl font-semibold">
            {preview || "sky worry"}
          </p>
        </div>

        <button
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-lg bg-lime-300 px-5 font-semibold text-stone-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400"
          disabled={!preview || !meaning.trim()}
          onClick={createChallenge}
          type="button"
        >
          <Sparkles aria-hidden="true" className="size-5" />
          Create share challenge
        </button>
        {builtWord ? (
        <section className="mt-6 rounded-lg border border-lime-300 bg-lime-50 p-5 text-stone-950">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lime-800">
            Share with friends
          </p>
          <p className="mt-2 break-words text-3xl font-semibold text-stone-950">
            {builtWord}
          </p>
          <p className="mt-3 break-all rounded-md bg-white px-3 py-2 text-sm text-stone-700">
            {url}
          </p>
          <div className="mt-4">
            <SocialShareBar url={url} word={builtWord} />
          </div>
          <Link
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-800 hover:text-stone-950"
            href={url}
          >
            Open challenge
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
        ) : null}
      </section>
    </main>
  );
}
