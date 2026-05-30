import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Leaderboard } from "./Leaderboard";

describe("Leaderboard", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          words: [
            {
              id: "time-eating-meeting",
              word: "time eating meeting",
              meaning: "a meeting that consumes your whole day",
              likes: 184,
              comments: [],
              createdAt: "2026-05-30T00:00:00.000Z",
            },
          ],
        }),
      ),
    );
  });

  it("shows week, month, and all-time rankings without extra page noise", async () => {
    render(<Leaderboard />);

    expect(screen.getByText("Most explosive New English")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Week" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Month" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All time" })).toBeInTheDocument();
    expect(await screen.findByText("time eating meeting")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/api/social-words?range=week");
  });
});
