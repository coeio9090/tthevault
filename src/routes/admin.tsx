import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ADMIN_PASSWORD, isAdmin, setAdmin } from "@/lib/vault";
import { VaultShell } from "@/components/VaultShell";

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  const [authed, setAuthed] = useState(typeof window !== "undefined" ? isAdmin() : false);
  const [pw, setPw] = useState("");
  const [denied, setDenied] = useState(false);

  if (!authed) {
    if (denied) {
      return (
        <div className="scanlines min-h-screen bg-black text-destructive font-mono flex items-center justify-center">
          <div className="text-2xl glow">// ACCESS DENIED</div>
        </div>
      );
    }
    return (
      <div className="scanlines min-h-screen bg-black text-foreground font-mono flex items-center justify-center p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === ADMIN_PASSWORD) { setAdmin(true); setAuthed(true); }
            else setDenied(true);
          }}
          className="border border-border p-6 w-full max-w-sm space-y-4"
        >
          <h1 className="text-primary glow">// ADMIN // RESTRICTED</h1>
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="// password"
            className="w-full bg-input border border-border px-3 py-2 text-sm text-primary outline-none focus:border-primary"
          />
          <button className="w-full border border-primary text-primary py-2 text-sm hover:bg-primary hover:text-primary-foreground">
            // AUTHENTICATE
          </button>
          <p className="text-[10px] text-muted-foreground">// VAULT-SEC-NODE-7</p>
        </form>
      </div>
    );
  }

  return (
    <VaultShell>
      <h1 className="text-primary glow text-2xl">// ADMIN PUBLISHER</h1>
      <p className="text-xs text-muted-foreground mt-1 mb-8">// VAULT-SEC-NODE-7 // ELEVATED CLEARANCE</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-border p-5">
          <h2 className="text-primary text-sm">// PUBLISH FILE</h2>
          <input placeholder="// title" className="mt-3 w-full bg-input border border-border px-3 py-2 text-xs" />
          <input placeholder="// classification" className="mt-2 w-full bg-input border border-border px-3 py-2 text-xs" />
          <textarea placeholder="// body" rows={6} className="mt-2 w-full bg-input border border-border px-3 py-2 text-xs" />
          <button className="mt-3 border border-primary text-primary px-3 py-1 text-xs hover:bg-primary hover:text-primary-foreground">// PUBLISH</button>
        </div>
        <div className="border border-border p-5">
          <h2 className="text-primary text-sm">// PUBLISH INTEL</h2>
          <input placeholder="// title" className="mt-3 w-full bg-input border border-border px-3 py-2 text-xs" />
          <textarea placeholder="// body" rows={6} className="mt-2 w-full bg-input border border-border px-3 py-2 text-xs" />
          <button className="mt-3 border border-primary text-primary px-3 py-1 text-xs hover:bg-primary hover:text-primary-foreground">// PUBLISH</button>
        </div>
      </div>
      <button
        onClick={() => { setAdmin(false); setAuthed(false); }}
        className="mt-6 text-xs text-destructive hover:underline"
      >// LOGOUT ADMIN</button>
    </VaultShell>
  );
}
