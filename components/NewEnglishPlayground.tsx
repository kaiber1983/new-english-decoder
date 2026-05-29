"use client";

import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { newEnglishExamples } from "@/lib/newEnglishExamples";

type Answer = "yes" | "not-yet";

export function NewEnglishPlayground() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {newEnglishExamples.map((example) => {
        const answer = answers[example.id];

        return (
          <article
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
            key={example.id}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-700">
              New English expression
            </p>
            <h2 className="mt-3 break-words text-3xl font-semibold leading-tight text-stone-950">
              {example.expression}
            </h2>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-stone-500">
              Can you understand it at a glance?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white transition hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-lime-200"
                onClick={() =>
                  setAnswers((current) => ({ ...current, [example.id]: "yes" }))
                }
                type="button"
              >
                <Check aria-hidden="true" className="size-4" />
                Yes
              </button>
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-950 transition hover:border-stone-950 focus:outline-none focus:ring-4 focus:ring-lime-200"
                onClick={() =>
                  setAnswers((current) => ({ ...current, [example.id]: "not-yet" }))
                }
                type="button"
              >
                <HelpCircle aria-hidden="true" className="size-4" />
                Not yet
              </button>
            </div>

            {answer ? (
              <div className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-4">
                <p className="font-semibold text-sky-950">
                  {answer === "yes"
                    ? "You got it at a glance."
                    : "Now compare the transparent version with the standard wording."}
                </p>
                <dl className="mt-3 grid gap-3 text-sm">
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-sky-700">
                      Meaning
                    </dt>
                    <dd className="mt-1 text-stone-800">{example.meaning}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-sky-700">
                      Standard English
                    </dt>
                    <dd className="mt-1 text-stone-800">{example.standardEnglish}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold uppercase tracking-[0.12em] text-sky-700">
                      Pattern
                    </dt>
                    <dd className="mt-1 text-stone-800">{example.pattern}</dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
