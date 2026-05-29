import type { Metadata } from "next";
import { DecodeForm } from "@/components/DecodeForm";

export const metadata: Metadata = {
  title: "Decode English",
  description: "Paste difficult English and rebuild it into transparent English.",
};

export default function DecodePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-lime-700">
          Decoder
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold text-stone-950 sm:text-5xl">
          Paste difficult English. See what it really says.
        </h1>
      </div>
      <DecodeForm initialText="The patient was diagnosed with hypertension." />
    </main>
  );
}
