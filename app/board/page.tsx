import type { Metadata } from "next";
import { Leaderboard } from "@/components/Leaderboard";

export const metadata: Metadata = {
  title: "New English Board",
  description: "See the most shared and most liked New English words.",
};

export default function BoardPage() {
  return <Leaderboard />;
}
