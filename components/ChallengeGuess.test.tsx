import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChallengeGuess } from "./ChallengeGuess";

describe("ChallengeGuess", () => {
  beforeEach(() => {
    window.history.pushState(
      {},
      "",
      "/challenge?id=sky-worry-1&word=sky%20worry&meaning=fear%20before%20flying",
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          id: "sky-worry-1",
          word: "sky worry",
          meaning: "fear before flying",
          likes: 1,
          comments: [],
          createdAt: "2026-05-30T00:00:00.000Z",
        }),
      ),
    );
  });

  it("lets a friend guess one shared New English word", async () => {
    const user = userEvent.setup();

    render(<ChallengeGuess />);

    expect(screen.getByText("sky worry")).toBeInTheDocument();
    expect(screen.getByText("Guess this New English word.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Your guess"), "fear of flying");
    await user.click(screen.getByRole("button", { name: "Reveal meaning" }));

    expect(screen.getByText("fear before flying")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Like this word" }));

    expect(fetch).toHaveBeenCalledWith("/api/social-words/sky-worry-1/like", {
      method: "POST",
    });
    expect(await screen.findByText("1 like")).toBeInTheDocument();
  });
});
