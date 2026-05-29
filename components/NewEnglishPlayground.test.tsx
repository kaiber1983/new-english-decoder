import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NewEnglishPlayground } from "./NewEnglishPlayground";

describe("NewEnglishPlayground", () => {
  it("asks whether a New English expression is understandable at a glance", async () => {
    const user = userEvent.setup();

    render(<NewEnglishPlayground />);

    expect(
      screen.getAllByText("Can you understand it at a glance?").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("people mountain people sea")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Yes" })[0]).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "Yes" })[0]);

    expect(screen.getByText("You got it at a glance.")).toBeInTheDocument();
  });
});
