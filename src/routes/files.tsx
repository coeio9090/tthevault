import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { FILES } from "@/lib/vault";

export const Route = createFileRoute("/files")({ component: FilesPage });

function FilesPage() {
  return (
    <AuthGate><VaultShell>
      <h1 className="text-primary glow text-2xl mb-2">// FILE ARCHIVE</h1>
      <p className="text-xs text-muted-foreground mb-8">// {FILES.length} declassified for members</p>
      <div className="space-y-3">
        {FILES.map((f) => (
          <Link key={f.id} to="/files_/$id" params={{ id: f.id }} className="block border border-border hover:border-primary p-5 transition">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span className="text-destructive">[{f.classification}]</span>
              <span>{f.id} // {f.date}</span>
            </div>
            <h3 className="mt-2 text-lg text-primary">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.summary}</p>
          </Link>
        ))}
      </div>
    </VaultShell></AuthGate>
  );
}
