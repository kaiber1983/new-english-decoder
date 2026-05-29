import Link from "next/link";
import { ArrowRight, Flame, Trophy, WandSparkles } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[calc(100svh-73px)] overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 bg-[#fff9e8]" />
        <div className="absolute left-[-6rem] top-20 h-64 w-64 rotate-12 border-[28px] border-lime-300" />
        <div className="absolute bottom-[-8rem] right-[-5rem] h-80 w-80 rounded-full border-[34px] border-sky-300" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,23,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(28,25,23,0.055)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-73px)] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-stone-950 bg-white px-3 py-1 text-sm font-bold text-stone-950 shadow-[4px_4px_0_#1c1917]">
              <WandSparkles aria-hidden="true" className="size-4 text-lime-600" />
              Free forever. Built to spread.
            </div>
            <h1 className="font-display max-w-4xl text-5xl font-black leading-[0.98] text-stone-950 sm:text-7xl lg:text-8xl">
              Refactor English into words people can see.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-stone-700 sm:text-2xl sm:leading-9">
              New English turns hidden expert words into visible meaning, then lets
              friends guess, like, and share the best inventions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-stone-950 px-5 font-bold text-white shadow-[5px_5px_0_#bef264] hover:bg-lime-700"
                href="/new"
              >
                Make a word
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-stone-950 bg-white px-5 font-bold text-stone-950 hover:bg-lime-100"
                href="/challenge?word=sky%20worry&meaning=fear%20before%20flying"
              >
                <Flame aria-hidden="true" className="size-4" />
                Try a challenge
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <Link
              className="group border-t-2 border-stone-950 bg-white/75 pt-4 hover:bg-white"
              href="/new"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">
                01
              </span>
              <h2 className="mt-2 text-xl font-black text-stone-950">Make</h2>
              <p className="mt-1 text-stone-600">Turn one meaning into one visible word.</p>
            </Link>
            <Link
              className="group border-t-2 border-lime-500 bg-white/75 pt-4 hover:bg-white"
              href="/challenge?word=time%20eating%20meeting&meaning=a%20meeting%20that%20takes%20too%20much%20time"
            >
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">
                02
              </span>
              <h2 className="mt-2 text-xl font-black text-stone-950">Guess</h2>
              <p className="mt-1 text-stone-600">Send a challenge and see who gets it.</p>
            </Link>
            <Link
              className="group border-t-2 border-sky-500 bg-white/75 pt-4 hover:bg-white"
              href="/board"
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-500">
                <Trophy aria-hidden="true" className="size-4" /> 03
              </span>
              <h2 className="mt-2 text-xl font-black text-stone-950">Rank</h2>
              <p className="mt-1 text-stone-600">Vote for the most explosive inventions.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
