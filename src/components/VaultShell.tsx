import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { clearSession, getSession } from "@/lib/vault";

function useUTC() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toISOString().replace("T", " ").slice(0, 19) + " UTC");
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

const TICKER = [
  "// SIGNAL INTERCEPTED — GENEVA RELAY 03:44 UTC",
  "// 14 SOVEREIGN BANKS REGISTER MICRO-OUTAGE",
  "// VLT-007 DECLASSIFIED FOR MEMBERS",
  "// ANCHOR PROTOCOL UPDATED",
  "// THREE NAMES SCRUBBED FROM REGISTRY",
  "// PROJECT GREYFIELD — SITE 3 EXPANSION CONFIRMED",
  "// UNDERSEA CABLE TELEMETRY ANOMALY +7m",
  "// CAPITAL FLOW: SHADOW TREASURIES REBALANCING",
];

export function VaultShell({ children }: { children: React.ReactNode }) {
  const utc = useUTC();
  const nav = useNavigate();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const session = typeof window !== "undefined" ? getSession() : null;
  const path = router.state.location.pathname;

  return (
    <div className="scanlines min-h-screen bg-black text-foreground font-mono">
      {/* Top bar */}
      <header className="border-b border-border sticky top-0 z-40 bg-black/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 text-xs">
          <Link to="/" className="text-primary glow font-bold tracking-widest">// THE VAULT</Link>
          <div className="hidden md:flex gap-6 text-muted-foreground">
            <Link to="/" className={path === "/" ? "text-primary" : "hover:text-primary"}>HOME</Link>
            <Link to="/files" className={path.startsWith("/files") ? "text-primary" : "hover:text-primary"}>FILES</Link>
            <Link to="/intelligence" className={path.startsWith("/intelligence") ? "text-primary" : "hover:text-primary"}>INTELLIGENCE</Link>
            <Link to="/minds" className={path.startsWith("/minds") ? "text-primary" : "hover:text-primary"}>MINDS</Link>
            <Link to="/community" className="hover:text-primary">COMMUNITY</Link>
            <Link to="/admin" className="hover:text-primary">ADMIN</Link>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="hidden sm:inline">{utc}</span>
            {session && (
              <button
                onClick={() => { clearSession(); nav({ to: "/login" }); }}
                className="hover:text-destructive"
              >// LOGOUT</button>
            )}
            <button className="md:hidden text-primary" onClick={() => setOpen(!open)}>// MENU</button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-2 text-xs">
            <Link to="/" onClick={() => setOpen(false)}>// HOME</Link>
            <Link to="/files" onClick={() => setOpen(false)}>// FILES</Link>
            <Link to="/intelligence" onClick={() => setOpen(false)}>// INTELLIGENCE</Link>
            <Link to="/minds" onClick={() => setOpen(false)}>// MINDS</Link>
            <Link to="/community" onClick={() => setOpen(false)}>// COMMUNITY</Link>
            <Link to="/admin" onClick={() => setOpen(false)}>// ADMIN</Link>
          </div>
        )}
        {/* Ticker */}
        <div className="border-t border-border overflow-hidden bg-black">
          <div className="ticker py-1 text-[10px] text-primary/80">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="px-6">{t}</span>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">{children}</main>

      <footer className="border-t border-border mt-16 py-6 px-4 text-[10px] text-muted-foreground flex flex-wrap justify-between gap-2">
        <span>// VAULT-SEC-NODE-7</span>
        <span>// {utc}</span>
        <span>// UNAUTHORIZED ACCESS WILL BE LOGGED</span>
      </footer>
    </div>
  );
}
