"use client";

import { useMemo, useState } from "react";
import { Hammer, Sparkles } from "lucide-react";

const starterIdeas = [
  ["anxiety before flying", "sky worry"],
  ["a meeting that eats your day", "time eating meeting"],
  ["a word that hides its meaning", "meaning locked word"],
  ["an app that makes work slower", "work slow machine"],
];

function cleanPieces(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

export function NewEnglishMaker() {
  const [meaning, setMeaning] = useState("");
  const [pieces, setPieces] = useState("");
  const [built, setBuilt] = useState("");

  const preview = useMemo(() => cleanPieces(pieces), [pieces]);

  function buildExpression() {
    setBuilt(preview);
  }

  return (
    <section className="rounded-lg border border-stone-950 bg-stone-950 p-5 text-white shadow-[0_18px_60px_rgba(28,25,23,0.18)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-300">
            Native speakers welcome
          </p>
          <h2 className="font-display mt-2 text-4xl font-bold leading-tight">
            Make your own New English
          </h2>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-lime-300 px-3 py-1 text-sm font-semibold text-lime-200">
          <Sparkles aria-hidden="true" className="size-4" />
          Free forever
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-stone-200">Meaning</span>
            <input
              className="mt-2 min-h-11 w-full rounded-lg border border-stone-600 bg-stone-900 px-3 text-white outline-none placeholder:text-stone-500 focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
              onChange={(event) => setMeaning(event.target.value)}
              placeholder="anxiety before flying"
              value={meaning}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-stone-200">
              Simple word pieces
            </span>
            <input
              className="mt-2 min-h-11 w-full rounded-lg border border-stone-600 bg-stone-900 px-3 text-white outline-none placeholder:text-stone-500 focus:border-lime-300 focus:ring-4 focus:ring-lime-300/20"
              onChange={(event) => setPieces(event.target.value)}
              placeholder="sky worry"
              value={pieces}
            />
          </label>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-300 px-4 font-semibold text-stone-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300"
            disabled={!preview}
            onClick={buildExpression}
            type="button"
          >
            <Hammer aria-hidden="true" className="size-4" />
            Build expression
          </button>
        </div>

        <div className="rounded-lg border border-stone-700 bg-white p-5 text-stone-950">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            New English draft
          </p>
          <p className="mt-3 break-words text-4xl font-semibold leading-tight">
            {built || preview || "sky worry"}
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-lime-700">
            Can people understand it at a glance?
          </p>
          <p className="mt-2 text-stone-700">
            {meaning
              ? `Meaning to test: ${meaning}`
              : "Try a meaning, then rebuild it with short visible words."}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {starterIdeas.map(([idea, expression]) => (
          <button
            className="rounded-full border border-stone-600 px-3 py-1 text-sm font-medium text-stone-200 transition hover:border-lime-300 hover:text-lime-200"
            key={expression}
            onClick={() => {
              setMeaning(idea);
              setPieces(expression);
              setBuilt(expression);
            }}
            type="button"
          >
            {expression}
          </button>
        ))}
      </div>
    </section>
  );
}
