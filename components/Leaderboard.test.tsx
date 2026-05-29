import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Leaderboard } from "./Leaderboard";

describe("Leaderboard", () => {
  it("shows week, month, and all-time rankings without extra page noise", () => {
    render(<Leaderboard />);

    expect(screen.getByText("Most explosive New English")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Week" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Month" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All time" })).toBeInTheDocument();
    expect(screen.getByText("time eating meeting")).toBeInTheDocument();
  });
});
