import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/AuthGate";
import { VaultShell } from "@/components/VaultShell";
import { FILES, INTEL, getSession } from "@/lib/vault";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <AuthGate>
      <VaultShell>
        <Home />
      </VaultShell>
    </AuthGate>
  );
}

function Home() {
  const s = typeof window !== "undefined" ? getSession() : null;
  const latest = FILES[0];
  return (
    <div className="space-y-12">
      <section className="border border-border p-6 md:p-10">
        <div className="text-[10px] text-muted-foreground mb-2">// CLEARANCE: MEMBER // {s?.name ?? "OPERATIVE"}</div>
        <h1 className="text-3xl md:text-5xl text-primary glow flicker tracking-tight">
          {">"} WHAT THEY HIDE, WE ARCHIVE.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          // THE VAULT is a private intelligence node. Weekly classified files, deep political analysis, and unfiltered movements of global power. No headlines. No spin. Only the record.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <Link to="/files" className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground">// OPEN ARCHIVE</Link>
          <Link to="/intelligence" className="border border-border text-foreground px-4 py-2 hover:border-primary">// INTEL FEED</Link>
          <Link to="/minds" className="border border-border text-foreground px-4 py-2 hover:border-primary">// CONSULT MINDS</Link>
        </div>
      </section>

      <section>
        <h2 className="text-xs text-muted-foreground mb-3">// LATEST CLASSIFIED FILE</h2>
        <Link to="/files_/$id" params={{ id: latest.id }} className="block border border-border hover:border-primary p-6 transition">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span className="text-destructive">[{latest.classification}]</span>
            <span>{latest.id} // {latest.date}</span>
          </div>
          <h3 className="mt-2 text-2xl text-primary">{latest.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{latest.summary}</p>
          <div className="mt-4 text-xs text-primary">// READ FILE →</div>
        </Link>
      </section>

      <section>
        <h2 className="text-xs text-muted-foreground mb-3">// RECENT INTELLIGENCE</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {INTEL.slice(0, 3).map((i) => (
            <Link key={i.id} to="/intelligence_/$id" params={{ id: i.id }} className="border border-border hover:border-primary p-4 transition">
              <div className="text-[10px] text-muted-foreground">{i.id} // {i.date}</div>
              <h3 className="mt-1 text-sm text-primary">{i.title}</h3>
              <p className="mt-2 text-[11px] text-muted-foreground line-clamp-3">{i.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border border-border p-6">
        <h2 className="text-primary text-lg">// THE COMMUNITY</h2>
        <p className="mt-2 text-sm text-muted-foreground">A separate encrypted node. Whispers. Fragments. Members only.</p>
        <Link to="/community" className="mt-4 inline-block border border-primary text-primary px-4 py-2 text-xs hover:bg-primary hover:text-primary-foreground">
          // ENTER COMMUNITY →
        </Link>
      </section>
    </div>
  );
}
