import Link from "next/link";
import { Braces } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-[#fffdf7]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[100vw] items-center justify-between px-4 py-4 sm:max-w-6xl sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 font-semibold text-stone-950" href="/">
          <span className="grid size-9 place-items-center rounded-lg bg-lime-300 text-stone-950">
            <Braces aria-hidden="true" className="size-5" />
          </span>
          <span className="hidden sm:inline">Logic English Decoder</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-stone-700 sm:gap-5">
          <Link className="hidden hover:text-stone-950 sm:inline" href="/about">
            About
          </Link>
          <Link
            className="rounded-lg bg-stone-950 px-3 py-2 font-semibold text-white hover:bg-lime-700"
            href="/new"
          >
            Make
          </Link>
          <Link className="hidden hover:text-stone-950 sm:inline" href="/board">
            Board
          </Link>
          <Link className="hidden hover:text-stone-950 sm:inline" href="/decode">
            Decode
          </Link>
        </nav>
      </div>
    </header>
  );
}
