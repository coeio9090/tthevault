import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { INTEL } from "@/lib/vault";

export const Route = createFileRoute("/intelligence_/$id")({ component: IntelReader });

function IntelReader() {
  const { id } = Route.useParams();
  const item = INTEL.find((i) => i.id === id);
  if (!item) {
    return <AuthGate><VaultShell><p className="text-destructive">// INTEL {id} NOT FOUND</p></VaultShell></AuthGate>;
  }
  return (
    <AuthGate><VaultShell>
      <Link to="/intelligence" className="text-xs text-muted-foreground hover:text-primary">← // FEED</Link>
      <article className="mt-4 border border-border p-6 md:p-10">
        <div className="text-[10px] text-muted-foreground">{item.id} // {item.date} // VAULT-SEC-NODE-7</div>
        <h1 className="mt-2 text-2xl md:text-3xl text-primary glow">{item.title}</h1>
        <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed">{item.body}</pre>
      </article>
    </VaultShell></AuthGate>
  );
}
