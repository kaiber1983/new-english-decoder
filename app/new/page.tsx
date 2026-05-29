import type { Metadata } from "next";
import { NewWordStudio } from "@/components/NewWordStudio";

export const metadata: Metadata = {
  title: "Make a New English Word",
  description: "Create a visible-meaning word and share it as a guessing challenge.",
};

export default function NewWordPage() {
  return <NewWordStudio />;
}
