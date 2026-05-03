import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { MINDS } from "@/lib/vault";
import { mindChat } from "@/server/mind-chat.functions";

export const Route = createFileRoute("/minds_/$slug")({ component: MindChat });

type Msg = { role: "user" | "mind"; text: string };

function MindChat() {
  const { slug } = Route.useParams();
  const mind = MINDS.find((m) => m.slug === slug);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  if (!mind) {
    return <AuthGate><VaultShell><p className="text-destructive">// MIND NOT FOUND</p></VaultShell></AuthGate>;
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!mind) return;
    if (!input.trim() || busy) return;
    const userText = input.trim();
    const next: Msg[] = [...msgs, { role: "user", text: userText }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await mindChat({
        data: {
          slug: mind.slug,
          messages: next.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
        },
      });
      setMsgs((m) => [...m, { role: "mind", text: res.text }]);
    } catch (err) {
      setMsgs((m) => [...m, { role: "mind", text: err instanceof Error ? err.message : "// TRANSMISSION FAILED" }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthGate><VaultShell>
      <Link to="/minds" className="text-xs text-muted-foreground hover:text-primary">← // MINDS</Link>
      <div className="mt-4 border border-border">
        <div className="border-b border-border p-4">
          <h1 className="text-primary glow text-lg">// {mind.name}</h1>
          <p className="text-[11px] text-muted-foreground">{mind.desc}</p>
        </div>
        <div className="p-4 space-y-3 min-h-[300px] max-h-[50vh] overflow-y-auto">
          {msgs.length === 0 && <div className="text-xs text-muted-foreground">// CHANNEL OPEN. SPEAK.</div>}
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-foreground" : "text-primary"}>
              <span className="text-[10px] text-muted-foreground mr-2">{m.role === "user" ? "// YOU" : `// ${mind.name}`}</span>
              <div className="text-sm whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
          {busy && <div className="text-primary text-sm"><span className="blink">█</span></div>}
        </div>
        <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
          <span className="text-primary">{">"}</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="// transmit..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button className="text-xs text-primary border border-primary px-3 py-1 hover:bg-primary hover:text-primary-foreground">SEND</button>
        </form>
      </div>
    </VaultShell></AuthGate>
  );
}
