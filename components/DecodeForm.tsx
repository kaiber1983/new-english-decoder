"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { DecodeResult as DecodeResultType } from "@/lib/types";
import { DecodeResult } from "./DecodeResult";
import { ExampleChips } from "./ExampleChips";

export function DecodeForm({ initialText = "" }: { initialText?: string }) {
  const [text, setText] = useState(initialText);
  const [result, setResult] = useState<DecodeResultType | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function decode(nextText = text) {
    const value = nextText.trim();
    setText(nextText);
    setError("");

    if (!value) {
      setError("Please paste a difficult English word or sentence.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Decoder failed.");
      }

      setResult(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Decoder failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-7">
      <div className="rounded-lg border border-stone-300 bg-[#fffdf7] p-4 shadow-[0_18px_60px_rgba(35,31,25,0.10)] sm:p-6">
        <label className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-600">
          Decode input
        </label>
        <textarea
          className="mt-3 min-h-36 w-full resize-y rounded-lg border border-stone-300 bg-white p-4 text-lg leading-relaxed text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-4 focus:ring-lime-200"
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste a difficult English word or sentence..."
          value={text}
        />
        <div className="mt-4 flex flex-col gap-4">
          <ExampleChips onPick={(value) => decode(value)} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-stone-950 px-5 text-base font-semibold text-white transition hover:bg-lime-700 disabled:cursor-not-allowed disabled:bg-stone-400"
              disabled={isLoading}
              onClick={() => decode()}
              type="button"
            >
              {isLoading ? (
                <Loader2 aria-hidden="true" className="size-5 animate-spin" />
              ) : (
                <ArrowRight aria-hidden="true" className="size-5" />
              )}
              Decode English
            </button>
            {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
          </div>
        </div>
      </div>

      {result ? <DecodeResult result={result} /> : null}
    </div>
  );
}
