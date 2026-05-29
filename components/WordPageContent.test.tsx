import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { seedWords } from "@/lib/seedWords";
import { WordPageContent } from "./WordPageContent";

describe("WordPageContent", () => {
  it("makes the plain meaning, hard-word explanation, and next actions obvious", () => {
    render(<WordPageContent word={seedWords[0]} />);

    expect(screen.getByText("hypertension = high blood pressure")).toBeInTheDocument();
    expect(screen.getByText("Why this word is hard")).toBeInTheDocument();
    expect(screen.getByText("Decode another word")).toBeInTheDocument();
    expect(screen.getByText("Copy this meaning")).toBeInTheDocument();
    expect(screen.getByText("Field")).toBeInTheDocument();
    expect(screen.getByText("medical")).toBeInTheDocument();
    expect(screen.getByText("Difficulty")).toBeInTheDocument();
    expect(screen.getByText("Related words")).toBeInTheDocument();
    expect(screen.getByText("pork")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "porkpig meat" })).toHaveAttribute(
      "href",
      "/words/pork",
    );
  });
});
