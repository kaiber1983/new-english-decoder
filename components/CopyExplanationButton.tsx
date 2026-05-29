"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyExplanationButton({
  text,
  label = "Copy explanation",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 font-semibold text-stone-950 transition hover:border-stone-950 focus:outline-none focus:ring-4 focus:ring-lime-200"
      onClick={copy}
      type="button"
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4 text-lime-700" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
