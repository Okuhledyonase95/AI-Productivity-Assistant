import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(MessageSchema).min(1).max(50),
      system: z.string().max(4000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const messages = data.system
      ? [{ role: "system" as const, content: data.system }, ...data.messages]
      : data.messages;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to your workspace.");
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("AI request failed");
    }

    const json = await res.json();
    const content: string = json?.choices?.[0]?.message?.content ?? "";
    return { content };
  });