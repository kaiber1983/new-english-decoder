import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { NewEnglishSocialHub } from "./NewEnglishSocialHub";

describe("NewEnglishSocialHub", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, "", "/new-english");
  });

  it("creates a shareable guessing challenge with likes, comments, and leaderboards", async () => {
    const user = userEvent.setup();

    render(<NewEnglishSocialHub />);

    await user.type(screen.getByLabelText("New word"), "sky worry");
    await user.type(screen.getByLabelText("Hidden meaning"), "fear before flying");
    await user.click(screen.getByRole("button", { name: "Create challenge" }));

    expect(screen.getByText("Share this guessing link")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Share to X" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Share to Twitter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share to TikTok" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share to Instagram" })).toBeInTheDocument();
    expect(screen.getByText("Guess what it means")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Your guess"), "fear of flying");
    await user.click(screen.getByRole("button", { name: "Reveal meaning" }));
    expect(screen.getAllByText("fear before flying").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Like this word" }));
    expect(screen.getByText("1 like")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Comment"), "This one is instantly clear.");
    await user.click(screen.getByRole("button", { name: "Post comment" }));
    expect(screen.getByText("This one is instantly clear.")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Week" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Month" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All time" })).toBeInTheDocument();
  });
});
