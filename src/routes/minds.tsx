import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { MINDS } from "@/lib/vault";

export const Route = createFileRoute("/minds")({ component: MindsPage });

function MindsPage() {
  return (
    <AuthGate><VaultShell>
      <h1 className="text-primary glow text-2xl mb-2">// THE MINDS</h1>
      <p className="text-xs text-muted-foreground mb-8">// SIX OPERATIVES // SELECT TO CONSULT</p>
      <div className="grid md:grid-cols-2 gap-4">
        {MINDS.map((m) => (
          <Link key={m.slug} to="/minds_/$slug" params={{ slug: m.slug }} className="block border border-border hover:border-primary p-5 transition">
            <h3 className="text-primary text-lg">// {m.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            <div className="mt-3 text-[10px] text-primary">// CONSULT →</div>
          </Link>
        ))}
      </div>
    </VaultShell></AuthGate>
  );
}
