import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { COMMUNITY_URL } from "@/lib/vault";

export const Route = createFileRoute("/community")({ component: Community });

function Community() {
  useEffect(() => {
    window.location.replace(COMMUNITY_URL);
  }, []);
  return (
    <div className="scanlines min-h-screen bg-black text-foreground font-mono flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-primary glow text-lg">// REROUTING TO COMMUNITY NODE</div>
        <div className="text-xs text-muted-foreground mt-2">// secret-whisper-archive</div>
        <a href={COMMUNITY_URL} className="mt-6 inline-block text-primary text-xs underline">// CLICK IF NOT REDIRECTED</a>
        <div className="mt-12 text-[10px] text-muted-foreground">// VAULT-SEC-NODE-7</div>
      </div>
    </div>
  );
}
