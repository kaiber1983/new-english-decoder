import type { HardWord } from "@/lib/types";

const difficultyStyles = {
  low: "border-emerald-300 bg-emerald-50 text-emerald-800",
  medium: "border-amber-300 bg-amber-50 text-amber-800",
  high: "border-rose-300 bg-rose-50 text-rose-800",
};

export function WordCard({ word }: { word: HardWord }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Hidden Power Word
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-stone-950">{word.word}</h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyStyles[word.difficulty]}`}
        >
          {word.difficulty}
        </span>
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Plain Meaning
          </dt>
          <dd className="mt-1 text-base text-stone-900">{word.plainMeaning}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Logic Meaning
          </dt>
          <dd className="mt-1 text-base text-stone-900">{word.logicMeaning}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Field
          </dt>
          <dd className="mt-1 capitalize text-stone-900">{word.field}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Better Everyday Word
          </dt>
          <dd className="mt-1 text-stone-900">{word.betterEverydayWord}</dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-stone-200 pt-4">
        <h4 className="text-sm font-semibold text-stone-950">Word Parts</h4>
        <div className="mt-3 grid gap-2">
          {word.wordParts.map((part) => (
            <div
              className="grid grid-cols-[minmax(90px,0.6fr)_1fr] gap-3 rounded-md bg-stone-50 px-3 py-2 text-sm"
              key={`${word.word}-${part.part}`}
            >
              <span className="font-semibold text-stone-950">{part.part}</span>
              <span className="text-stone-700">{part.meaning}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
