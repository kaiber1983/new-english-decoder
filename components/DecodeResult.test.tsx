import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DecodeResult } from "./DecodeResult";
import type { DecodeResult as DecodeResultType } from "@/lib/types";

const result: DecodeResultType = {
  original: "The patient was diagnosed with hypertension.",
  plainEnglish: "The doctor found that the patient has high blood pressure.",
  logicEnglish: "The sick person was found to have blood pressure too high disease.",
  detectedHardWords: [
    {
      word: "hypertension",
      plainMeaning: "high blood pressure",
      logicMeaning: "blood pressure too high disease",
      field: "medical",
      difficulty: "high",
      betterEverydayWord: "high blood pressure",
      wordParts: [
        { part: "hyper", meaning: "too high" },
        { part: "tension", meaning: "pressure" },
      ],
    },
  ],
  summary: "This sentence means a doctor found high blood pressure.",
};

describe("DecodeResult", () => {
  it("shows the four decoding layers and word parts", () => {
    render(<DecodeResult result={result} />);

    expect(screen.getByText("Original English")).toBeInTheDocument();
    expect(screen.getByText("Plain English")).toBeInTheDocument();
    expect(screen.getByText("Logic English")).toBeInTheDocument();
    expect(screen.getByText("Hidden Power Words")).toBeInTheDocument();
    expect(screen.getByText("hyper")).toBeInTheDocument();
    expect(screen.getByText("too high")).toBeInTheDocument();
  });
});
