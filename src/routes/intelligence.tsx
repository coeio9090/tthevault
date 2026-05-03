import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { INTEL } from "@/lib/vault";

export const Route = createFileRoute("/intelligence")({ component: IntelPage });

function IntelPage() {
  return (
    <AuthGate><VaultShell>
      <h1 className="text-primary glow text-2xl mb-2">// INTELLIGENCE FEED</h1>
      <p className="text-xs text-muted-foreground mb-8">// LIVE STREAM // {INTEL.length} entries</p>
      <div className="space-y-3">
        {INTEL.map((i) => (
          <Link key={i.id} to="/intelligence/$id" params={{ id: i.id }} className="block border border-border hover:border-primary p-5 transition">
            <div className="text-[10px] text-muted-foreground">{i.id} // {i.date}</div>
            <h3 className="mt-1 text-lg text-primary">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.summary}</p>
          </Link>
        ))}
      </div>
    </VaultShell></AuthGate>
  );
}
