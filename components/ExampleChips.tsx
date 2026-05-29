"use client";

import { Sparkles } from "lucide-react";

export const examples = [
  "hypertension",
  "pork",
  "interoperability",
  "cardiovascular disease",
  "legal liability",
  "sustainable infrastructure",
];

export function ExampleChips({ onPick }: { onPick: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {examples.map((example) => (
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 text-sm font-medium text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:border-stone-950 hover:shadow-md"
          key={example}
          onClick={() => onPick(example)}
          type="button"
        >
          <Sparkles aria-hidden="true" className="size-4 text-lime-600" />
          {example}
        </button>
      ))}
    </div>
  );
}
