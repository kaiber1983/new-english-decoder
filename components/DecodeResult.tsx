import type { DecodeResult as DecodeResultType } from "@/lib/types";
import { WordCard } from "./WordCard";

function Layer({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <section className={`rounded-lg border p-5 ${tone}`}>
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">{label}</h3>
      <p className="mt-3 text-xl font-medium leading-relaxed text-stone-950">{value}</p>
    </section>
  );
}

export function DecodeResult({ result }: { result: DecodeResultType }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <Layer
          label="Original English"
          value={result.original}
          tone="border-stone-200 bg-white text-stone-500"
        />
        <Layer
          label="Plain English"
          value={result.plainEnglish}
          tone="border-sky-200 bg-sky-50 text-sky-700"
        />
        <Layer
          label="Logic English"
          value={result.logicEnglish}
          tone="border-lime-300 bg-lime-50 text-lime-800"
        />
      </div>

      <section className="rounded-lg border border-stone-200 bg-stone-950 p-5 text-white">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-stone-300">
          Summary
        </h3>
        <p className="mt-3 text-lg leading-relaxed">{result.summary}</p>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-stone-950">Hidden Power Words</h2>
          <span className="text-sm text-stone-500">
            {result.detectedHardWords.length} found
          </span>
        </div>
        <div className="grid gap-4">
          {result.detectedHardWords.map((word) => (
            <WordCard key={word.word} word={word} />
          ))}
        </div>
      </section>
    </div>
  );
}
