import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { MINDS } from "@/lib/vault";

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
    setMsgs((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setBusy(true);
    // Offline canned response in character
    setTimeout(() => {
      const replies: Record<string, string> = {
        "the-archivist": `// FILE 1973-11/${Math.floor(Math.random()*999)} cross-references your query. See decree A-${Math.floor(Math.random()*99)}. The document was withdrawn 14 March 1981. No copies survive. Officially.`,
        "the-strategist": `Predictable opening. The board moved 2019. Capital flowed east, attention flowed west. Your question is six moves behind. Reposition.`,
        "the-whisper": `they were... already there. before the question. you noticed... that's why they noticed you...`,
        "the-oracle": `Probability matrix: 71% — the pattern holds through Q3. 22% — premature exposure. 7% — irrelevant. Watch the 71%.`,
        "the-cipher": `0x4E4F = NO. 0x4D41594245 = MAYBE. The space between is where you live now. What's your hex?`,
        "the-witness": `Seen it. 1987. 2008. Now. Same hands. Different gloves.`,
      };
      setMsgs((m) => [...m, { role: "mind", text: replies[mind.slug] || "..." }]);
      setBusy(false);
    }, 800 + Math.random() * 600);
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
