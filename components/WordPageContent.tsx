import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { seedWords, type SeedWord } from "@/lib/seedWords";
import { CopyExplanationButton } from "./CopyExplanationButton";

function copyText(word: SeedWord) {
  return `${word.word} = ${word.plainMeaning}
Logic English: ${word.logicMeaning}
Word parts: ${word.wordParts.map((part) => `${part.part} = ${part.meaning}`).join("; ")}
Example: ${word.peoplesEnglish}`;
}

export function WordPageContent({ word }: { word: SeedWord }) {
  const relatedWords = seedWords
    .filter((entry) => entry.slug !== word.slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
        Transparent English Dictionary
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-stone-950 sm:text-5xl">
        {word.word} meaning in plain English
      </h1>

      <section className="mt-7 rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-500">
          One-second meaning
        </p>
        <p className="mt-3 break-words text-3xl font-semibold leading-tight text-stone-950 sm:text-4xl">
          {word.word} = {word.plainMeaning}
        </p>
        <p className="mt-4 rounded-lg border border-lime-200 bg-lime-50 px-4 py-3 text-xl font-semibold leading-snug text-lime-900 break-words">
          Logic English: {word.logicMeaning}
        </p>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          A clearer word-building version of the same idea.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-stone-950 px-4 font-semibold text-white transition hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-lime-200"
            href="/decode"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            Decode another word
          </Link>
          <CopyExplanationButton label="Copy this meaning" text={copyText(word)} />
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Field
          </p>
          <p className="mt-2 text-xl font-semibold capitalize text-stone-950">
            {word.field}
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Difficulty
          </p>
          <p className="mt-2 text-xl font-semibold capitalize text-stone-950">
            {word.difficulty}
          </p>
        </div>
        <div className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
            Better everyday word
          </p>
          <p className="mt-2 break-words text-xl font-semibold text-sky-900">
            {word.betterEverydayWord}
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-stone-950">Why this word is hard</h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">{word.whyHard}</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-[#fffdf7] p-5">
          <h2 className="text-xl font-semibold text-stone-950">Word parts</h2>
          <div className="mt-4 grid gap-3">
            {word.wordParts.map((part) => (
              <div
                className="rounded-md bg-white px-4 py-3 shadow-sm"
                key={`${word.word}-${part.part}`}
              >
                <span className="font-semibold text-stone-950">{part.part}</span>
                <span className="mx-2 text-stone-400">=</span>
                <span className="text-stone-700">{part.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-stone-950">Real sentence</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <dt className="text-sm font-semibold text-stone-500">Original</dt>
            <dd className="mt-1 text-lg text-stone-950">{word.realSentence}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-stone-500">People&apos;s English</dt>
            <dd className="mt-1 text-lg text-stone-950">{word.peoplesEnglish}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-stone-500">Logic English</dt>
            <dd className="mt-1 text-lg text-stone-950">{word.logicSentence}</dd>
          </div>
        </dl>
      </section>

      <Link
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-950"
        href="/decode"
      >
        Try your own sentence
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>

      <section className="mt-10 border-t border-stone-200 pt-6">
        <h2 className="text-xl font-semibold text-stone-950">Related words</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedWords.map((entry) => (
            <Link
              className="rounded-lg border border-stone-200 bg-white p-4 transition hover:border-stone-950 hover:shadow-sm"
              href={`/words/${entry.slug}`}
              key={entry.slug}
            >
              <span className="block font-semibold text-stone-950">{entry.word}</span>
              <span className="mt-1 block text-sm text-stone-600">
                {entry.plainMeaning}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
