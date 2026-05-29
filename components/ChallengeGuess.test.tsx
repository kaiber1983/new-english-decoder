import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ChallengeGuess } from "./ChallengeGuess";

describe("ChallengeGuess", () => {
  beforeEach(() => {
    window.history.pushState(
      {},
      "",
      "/challenge?word=sky%20worry&meaning=fear%20before%20flying",
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
    expect(screen.getByRole("button", { name: "Like this word" })).toBeInTheDocument();
  });
});
