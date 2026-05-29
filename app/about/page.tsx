import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The idea behind English without class walls.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
        English without class walls
      </p>
      <h1 className="font-display mt-3 text-5xl font-bold leading-tight text-stone-950">
        Expert English should not be a locked room.
      </h1>
      <div className="mt-8 space-y-6 text-lg leading-8 text-stone-700">
        <p>
          Logic English Decoder is built around a simple belief: many hard English
          words are hard because history hid their meaning behind Latin, Greek,
          legal, medical, or academic language.
        </p>
        <p>
          The goal is not translation into another language. The goal is
          transparent English: English rebuilt with visible logic, so ordinary
          readers can understand faster.
        </p>
        <p>
          Pork becomes pig meat. Hypertension becomes high blood pressure, then
          blood pressure too high disease. Interoperability becomes systems work
          together ability.
        </p>
      </div>
    </main>
  );
}
