import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ACCESS_CODE, setSession } from "@/lib/vault";

export const Route = createFileRoute("/login")({ component: Login });

const BOOT_LINES = [
  "> initializing secure node...",
  "> handshake: VAULT-SEC-NODE-7",
  "> verifying perimeter...",
  "> ENCRYPTION: AES-256 // ACTIVE",
  "> awaiting credentials.",
];

function Login() {
  const nav = useNavigate();
  const [booted, setBooted] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setShown((s) => [...s, BOOT_LINES[i]]);
      i++;
      if (i >= BOOT_LINES.length) {
        clearInterval(t);
        setTimeout(() => setBooted(true), 400);
      }
    }, 250);
    return () => clearInterval(t);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() !== ACCESS_CODE) {
      setErr("// ACCESS Denied");
      return;
    }
    if (!name.trim()) {
      setErr("// IDENTIFIER REQUIRED");
      return;
    }
    setSession(name.trim());
    nav({ to: "/" });
  }

  return (
    <div className="scanlines min-h-screen bg-black text-foreground font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-xs text-primary/80 leading-relaxed">
          {shown.map((l, i) => (<div key={i} className="boot-line">{l}</div>))}
          <span className="blink text-primary">█</span>
        </div>
        {booted && (
          <form onSubmit={submit} className="border border-border p-6 space-y-4 bg-black">
            <h1 className="text-primary glow text-lg">// THE VAULT // RESTRICTED</h1>
            <p className="text-[11px] text-muted-foreground">Enter access code and chosen identifier.</p>
            <div>
              <label className="block text-[10px] text-muted-foreground mb-1">// ACCESS CODE</label>
              <input
                value={code}
                onChange={(e) => { setCode(e.target.value); setErr(""); }}
                type="password"
                autoFocus
                className="w-full bg-input border border-border px-3 py-2 text-sm text-primary outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-muted-foreground mb-1">// CHOSEN NAME</label>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); setErr(""); }}
                className="w-full bg-input border border-border px-3 py-2 text-sm text-primary outline-none focus:border-primary"
              />
            </div>
            {err && <div className="text-destructive text-xs">{err}</div>}
            <button className="w-full border border-primary text-primary py-2 text-sm hover:bg-primary hover:text-primary-foreground transition">
              // AUTHENTICATE
            </button>
            <p className="text-[10px] text-muted-foreground">// VAULT-SEC-NODE-7</p>
          </form>
        )}
      </div>
    </div>
  );
}
