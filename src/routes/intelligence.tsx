import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { INTEL } from "@/lib/vault";
import { useVaultIntel } from "@/hooks/useVaultData";

export const Route = createFileRoute("/intelligence")({ component: IntelPage });

function IntelPage() {
  const { intel: dbIntel } = useVaultIntel();
  const dbItems = dbIntel.map((i) => ({
    id: i.id,
    title: i.headline,
    date: i.created_at.slice(0, 10),
    summary: i.content.slice(0, 220),
    image_url: i.image_url,
    category: i.category,
  }));
  const staticItems = INTEL.map((i) => ({ ...i, image_url: null as string | null, category: "ARCHIVE" }));
  const items = [...dbItems, ...staticItems];
  return (
    <AuthGate><VaultShell>
      <h1 className="text-primary glow text-2xl mb-2">// INTELLIGENCE FEED</h1>
      <p className="text-xs text-muted-foreground mb-8">// LIVE STREAM // {items.length} entries</p>
      <div className="space-y-3">
        {items.map((i) => (
          <Link key={i.id} to="/intelligence/$id" params={{ id: i.id }} className="block border border-border hover:border-primary p-5 transition">
            <div className="text-[10px] text-muted-foreground">{i.id.slice(0, 8)} // {i.date} // [{i.category}]</div>
            {i.image_url && (
              <img src={i.image_url} alt="" className="vault-img mt-3 max-h-48 w-full object-cover" />
            )}
            <h3 className="mt-1 text-lg text-primary">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.summary}</p>
          </Link>
        ))}
      </div>
    </VaultShell></AuthGate>
  );
}
