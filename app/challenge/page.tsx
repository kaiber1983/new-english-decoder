import type { Metadata } from "next";
import { ChallengeGuess } from "@/components/ChallengeGuess";

export const metadata: Metadata = {
  title: "Guess a New English Word",
  description: "Guess the meaning of a visible-meaning word shared by a friend.",
};

export default function ChallengePage() {
  return <ChallengeGuess />;
}
