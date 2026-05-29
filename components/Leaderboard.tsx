"use client";

import { useMemo, useState } from "react";
import { rankedWords, type BoardRange, loadSocialWords } from "@/lib/socialWords";

export function Leaderboard() {
  const [range, setRange] = useState<BoardRange>("week");
  const [words] = useState(() => loadSocialWords());
  const ranked = useMemo(() => rankedWords(words, range), [range, words]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
        Leaderboard
      </p>
      <h1 className="font-display mt-3 text-5xl font-black leading-[0.98] text-stone-950 sm:text-6xl">
        Most explosive New English
      </h1>
      <div className="mt-7 grid grid-cols-3 gap-2 rounded-lg border border-stone-200 bg-white p-2">
        {(["week", "month", "all"] as BoardRange[]).map((item) => (
          <button
            className={`min-h-11 rounded-md text-sm font-semibold ${
              range === item
                ? "bg-stone-950 text-white"
                : "text-stone-700 hover:bg-lime-50"
            }`}
            key={item}
            onClick={() => setRange(item)}
            type="button"
          >
            {item === "week" ? "Week" : item === "month" ? "Month" : "All time"}
          </button>
        ))}
      </div>
      <ol className="mt-6 space-y-3">
        {ranked.map((item, index) => (
          <li
            className="grid gap-3 rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-stone-950 sm:grid-cols-[auto_1fr_auto] sm:items-center"
            key={item.id}
          >
            <span className="text-sm font-semibold text-lime-700">#{index + 1}</span>
            <div>
              <p className="break-words text-2xl font-semibold text-stone-950">
                {item.word}
              </p>
              <p className="mt-1 text-stone-600">{item.meaning}</p>
            </div>
            <span className="w-fit rounded-full bg-lime-300 px-3 py-1 text-sm font-semibold text-stone-950">
              {item.likes} likes
            </span>
          </li>
        ))}
      </ol>
    </main>
  );
}
