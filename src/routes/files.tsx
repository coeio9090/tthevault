import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { FILES } from "@/lib/vault";
import { useVaultFiles } from "@/hooks/useVaultData";

export const Route = createFileRoute("/files")({ component: FilesPage });

function FilesPage() {
  const { files: dbFiles } = useVaultFiles();
  const dbItems = dbFiles.map((f) => ({
    id: f.id,
    title: f.title,
    classification: f.classification,
    date: f.created_at.slice(0, 10),
    summary: f.content.slice(0, 200),
    image_url: f.image_url,
  }));
  const staticItems = FILES.map((f) => ({ ...f, image_url: null as string | null }));
  const items = [...dbItems, ...staticItems];
  return (
    <AuthGate><VaultShell>
      <h1 className="text-primary glow text-2xl mb-2">// FILE ARCHIVE</h1>
      <p className="text-xs text-muted-foreground mb-8">// {items.length} declassified for members</p>
      <div className="space-y-3">
        {items.map((f) => (
          <Link key={f.id} to="/files/$id" params={{ id: f.id }} className="block border border-border hover:border-primary p-5 transition">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span className="text-destructive">[{f.classification}]</span>
              <span>{f.id.slice(0, 8)} // {f.date}</span>
            </div>
            {f.image_url && (
              <img src={f.image_url} alt="" className="vault-img mt-3 max-h-48 w-full object-cover" />
            )}
            <h3 className="mt-2 text-lg text-primary">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.summary}</p>
          </Link>
        ))}
      </div>
    </VaultShell></AuthGate>
  );
}
