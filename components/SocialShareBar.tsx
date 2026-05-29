"use client";

import { shareIntentUrl, shareText } from "@/lib/socialWords";

export function SocialShareBar({ word, url }: { word: string; url: string }) {
  async function copyForPlatform(platformUrl: string) {
    const text = `${shareText(word)}\n${url}`;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this share text:", text);
    }

    window.open(platformUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        aria-label="Share to X"
        className="inline-flex min-h-10 items-center rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-lime-700"
        href={shareIntentUrl("x", word, url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        Share to X
      </a>
      <a
        aria-label="Share to Twitter"
        className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
        href={shareIntentUrl("twitter", word, url)}
        rel="noopener noreferrer"
        target="_blank"
      >
        Share to Twitter
      </a>
      <button
        className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
        onClick={() => copyForPlatform("https://www.tiktok.com/upload")}
        type="button"
      >
        Share to TikTok
      </button>
      <button
        className="inline-flex min-h-10 items-center rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 hover:border-stone-950"
        onClick={() => copyForPlatform("https://www.instagram.com/")}
        type="button"
      >
        Share to Instagram
      </button>
    </div>
  );
}
