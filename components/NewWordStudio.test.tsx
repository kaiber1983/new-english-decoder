import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewWordStudio } from "./NewWordStudio";

describe("NewWordStudio", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(
          {
            id: "sky-worry-1",
            word: "sky worry",
            meaning: "fear before flying",
            likes: 0,
            comments: [],
            createdAt: "2026-05-30T00:00:00.000Z",
          },
          { status: 201 },
        ),
      ),
    );
  });

  it("creates a focused share challenge for a new word", async () => {
    const user = userEvent.setup();

    render(<NewWordStudio />);

    expect(screen.getByText("Make one word worth sharing.")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Meaning"), "fear before flying");
    await user.type(screen.getByLabelText("New English"), "sky worry");
    await user.click(screen.getByRole("button", { name: "Create share challenge" }));

    expect(fetch).toHaveBeenCalledWith(
      "/api/social-words",
      expect.objectContaining({ method: "POST" }),
    );
    expect(screen.getAllByText("sky worry").length).toBeGreaterThan(0);
    expect(screen.getByText("Share with friends")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open challenge" })).toHaveAttribute(
      "href",
      expect.stringContaining("/challenge?"),
    );
  });
});
