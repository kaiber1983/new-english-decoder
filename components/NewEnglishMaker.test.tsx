import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NewEnglishMaker } from "./NewEnglishMaker";

describe("NewEnglishMaker", () => {
  it("lets people build a new expression from simple word pieces", async () => {
    const user = userEvent.setup();

    render(<NewEnglishMaker />);

    expect(screen.getByText("Make your own New English")).toBeInTheDocument();
    await user.type(screen.getByLabelText("Meaning"), "anxiety before flying");
    await user.type(screen.getByLabelText("Simple word pieces"), "sky worry");
    await user.click(screen.getByRole("button", { name: "Build expression" }));

    expect(screen.getAllByText("sky worry").length).toBeGreaterThan(0);
    expect(screen.getByText("Can people understand it at a glance?")).toBeInTheDocument();
  });
});
