import { describe, expect, it, vi } from "vitest";

vi.stubEnv("USE_MOCK_AI", "true");

describe("POST /api/decode", () => {
  it("rejects empty input", async () => {
    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/decode", {
        method: "POST",
        body: JSON.stringify({ text: "   " }),
      }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "Please enter an English word or sentence.",
    });
  });

  it("returns mock decode data when USE_MOCK_AI is true", async () => {
    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/decode", {
        method: "POST",
        body: JSON.stringify({ text: "hypertension" }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      plainEnglish: "high blood pressure",
    });
  });
});
