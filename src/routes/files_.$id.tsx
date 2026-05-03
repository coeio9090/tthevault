import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { FILES } from "@/lib/vault";
import { useVaultFiles } from "@/hooks/useVaultData";

export const Route = createFileRoute("/files_/$id")({ component: FileReader });

function FileReader() {
  const { id } = Route.useParams();
  const { files: dbFiles } = useVaultFiles();
  const dbHit = dbFiles.find((f) => f.id === id);
  const staticHit = FILES.find((f) => f.id === id);
  const file = dbHit
    ? {
        id: dbHit.id,
        title: dbHit.title,
        classification: dbHit.classification,
        date: dbHit.created_at.slice(0, 10),
        body: dbHit.content,
        image_url: dbHit.image_url,
      }
    : staticHit
    ? { ...staticHit, image_url: null as string | null }
    : null;
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!file) {
    return (
      <AuthGate><VaultShell>
        <p className="text-destructive">// FILE {id} NOT FOUND</p>
        <Link to="/files" className="text-primary text-xs">// BACK TO ARCHIVE</Link>
      </VaultShell></AuthGate>
    );
  }

  function copy() {
    if (!file) return;
    navigator.clipboard.writeText(file.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <AuthGate><VaultShell>
      <div className="fixed top-[88px] left-0 h-[2px] bg-primary z-50 transition-all" style={{ width: `${progress}%` }} />
      <Link to="/files" className="text-xs text-muted-foreground hover:text-primary">← // ARCHIVE</Link>
      <div className="mt-4 border-2 border-destructive/60 p-6 md:p-10 relative">
        <div className="absolute top-2 right-2 text-[10px] text-destructive border border-destructive px-2 py-1 rotate-3">
          [{file.classification}]
        </div>
        <div className="text-[10px] text-muted-foreground">{file.id} // {file.date} // VAULT-SEC-NODE-7</div>
        <h1 className="mt-2 text-2xl md:text-3xl text-primary glow">{file.title}</h1>
        {file.image_url && (
          <img src={file.image_url} alt="" className="vault-img mt-6 w-full object-cover max-h-96" />
        )}
        <pre className="mt-6 whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed">{file.body}</pre>
        <div className="mt-6 flex gap-2">
          <button onClick={copy} className="border border-primary text-primary text-xs px-3 py-2 hover:bg-primary hover:text-primary-foreground">
            // COPY FILE
          </button>
        </div>
      </div>
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 border border-primary bg-black text-primary text-xs px-4 py-2 z-50">
          // FILE COPIED TO CLIPBOARD
        </div>
      )}
    </VaultShell></AuthGate>
  );
}
