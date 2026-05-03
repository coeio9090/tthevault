import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { INTEL } from "@/lib/vault";
import { useVaultIntel } from "@/hooks/useVaultData";

export const Route = createFileRoute("/intelligence_/$id")({ component: IntelReader });

function IntelReader() {
  const { id } = Route.useParams();
  const { intel: dbIntel } = useVaultIntel();
  const dbHit = dbIntel.find((i) => i.id === id);
  const staticHit = INTEL.find((i) => i.id === id);
  const item = dbHit
    ? {
        id: dbHit.id,
        title: dbHit.headline,
        date: dbHit.created_at.slice(0, 10),
        body: dbHit.content,
        image_url: dbHit.image_url,
        category: dbHit.category,
        author: dbHit.author_codename,
      }
    : staticHit
    ? { ...staticHit, title: staticHit.title, image_url: null as string | null, category: "ARCHIVE", author: "VAULT" }
    : null;
  if (!item) {
    return <AuthGate><VaultShell><p className="text-destructive">// INTEL {id} NOT FOUND</p></VaultShell></AuthGate>;
  }
  return (
    <AuthGate><VaultShell>
      <Link to="/intelligence" className="text-xs text-muted-foreground hover:text-primary">← // FEED</Link>
      <article className="mt-4 border border-border p-6 md:p-10">
        <div className="text-[10px] text-muted-foreground">{item.id.slice(0, 8)} // {item.date} // [{item.category}] // {item.author}</div>
        <h1 className="mt-2 text-2xl md:text-3xl text-primary glow">{item.title}</h1>
        {item.image_url && (
          <img src={item.image_url} alt="" className="vault-img mt-6 w-full object-cover max-h-96" />
        )}
        <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed">{item.body}</pre>
      </article>
    </VaultShell></AuthGate>
  );
}
