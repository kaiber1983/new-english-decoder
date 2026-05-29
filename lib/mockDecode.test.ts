import { describe, expect, it } from "vitest";
import { mockDecode } from "./mockDecode";

describe("mockDecode", () => {
  it("decodes hypertension into transparent medical English", () => {
    const result = mockDecode("The patient was diagnosed with hypertension.");

    expect(result.original).toBe("The patient was diagnosed with hypertension.");
    expect(result.plainEnglish).toContain("high blood pressure");
    expect(result.logicEnglish).toContain("blood pressure too high disease");
    expect(result.detectedHardWords[0]).toMatchObject({
      word: "hypertension",
      field: "medical",
      difficulty: "high",
      betterEverydayWord: "high blood pressure",
    });
  });

  it("decodes pork as pig meat", () => {
    const result = mockDecode("pork");

    expect(result.plainEnglish).toBe("pig meat");
    expect(result.logicEnglish).toBe("pig meat");
  });

  it("falls back to a gentle generic result for unknown text", () => {
    const result = mockDecode("bureaucratic opacity");

    expect(result.original).toBe("bureaucratic opacity");
    expect(result.detectedHardWords.length).toBeGreaterThan(0);
    expect(result.summary).toContain("simpler English");
  });
});
