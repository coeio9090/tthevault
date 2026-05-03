import { createServerFn } from "@tanstack/react-start";
import { MINDS } from "@/lib/vault";

export const mindChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { slug?: string; messages?: Array<{ role: string; content: string }> };
    if (!d.slug || !Array.isArray(d.messages)) throw new Error("invalid input");
    return { slug: d.slug, messages: d.messages };
  })
  .handler(async ({ data }) => {
    const mind = MINDS.find((m) => m.slug === data.slug);
    if (!mind) throw new Error("mind not found");
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: mind.system },
          ...data.messages,
        ],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) throw new Error("// RATE LIMIT // try again in a moment");
      if (resp.status === 402) throw new Error("// CREDITS DEPLETED // top up Lovable AI");
      throw new Error(`// GATEWAY ERROR ${resp.status}`);
    }
    const json = await resp.json();
    const text: string = json.choices?.[0]?.message?.content ?? "...";
    return { text };
  });