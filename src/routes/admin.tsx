import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ADMIN_PASSWORD, isAdmin, setAdmin } from "@/lib/vault";
import { VaultShell } from "@/components/VaultShell";
import { supabase } from "@/integrations/supabase/client";
import { useVaultFiles, useVaultIntel, useVaultTicker } from "@/hooks/useVaultData";

export const Route = createFileRoute("/admin")({ component: Admin });

const CATEGORIES = ["GEOPOLITICS", "CENTRAL BANKS", "SHADOW GOVERNMENT", "POWER MOVEMENTS", "CONSPIRACY"] as const;

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
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-primary glow text-2xl">// ADMIN PUBLISHER</h1>
        <button
          onClick={() => { setAdmin(false); setAuthed(false); }}
          className="text-xs text-destructive hover:underline"
        >// LOGOUT</button>
      </div>
      <p className="text-xs text-muted-foreground mb-10">// VAULT-SEC-NODE-7 // ELEVATED CLEARANCE</p>

      <div className="space-y-12">
        <PublishFile />
        <PublishIntel />
        <ManageFiles />
        <ManageIntel />
        <TickerControl />
      </div>
    </VaultShell>
  );
}

async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("vault-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("vault-media").getPublicUrl(path);
  return data.publicUrl;
}

function pathFromPublicUrl(url: string): string | null {
  const marker = "/vault-media/";
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return url.slice(i + marker.length);
}

function ImageField({
  imageFile, setImageFile,
}: { imageFile: File | null; setImageFile: (f: File | null) => void }) {
  const preview = imageFile ? URL.createObjectURL(imageFile) : null;
  return (
    <div className="mt-2">
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="text-xs text-muted-foreground file:mr-3 file:border file:border-primary file:bg-black file:text-primary file:px-3 file:py-1 file:text-xs file:cursor-pointer"
      />
      {preview && (
        <img src={preview} alt="preview" className="vault-img mt-3 max-h-40 border border-border" />
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border p-5">
      <h2 className="text-primary text-sm mb-4">{title}</h2>
      {children}
    </section>
  );
}

function PublishFile() {
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("TOP SECRET");
  const [week, setWeek] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("// TITLE AND CONTENT REQUIRED");
      return;
    }
    setBusy(true);
    try {
      let image_url: string | null = null;
      if (imageFile) image_url = await uploadImage(imageFile);
      const { error } = await supabase.from("vault_files").insert({
        title: title.trim(),
        classification: classification.trim() || "CLASSIFIED",
        week_number: week ? parseInt(week, 10) : null,
        content: content.trim(),
        image_url,
      });
      if (error) throw error;
      toast.success("// FILE PUBLISHED");
      setTitle(""); setClassification("TOP SECRET"); setWeek(""); setContent(""); setImageFile(null);
    } catch (e: any) {
      toast.error(`// PUBLISH FAILED — ${e.message ?? "unknown"}`);
    } finally { setBusy(false); }
  };

  return (
    <Section title="// PUBLISH NEW FILE">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="// title" className="w-full bg-input border border-border px-3 py-2 text-xs" />
      <div className="grid md:grid-cols-2 gap-2 mt-2">
        <input value={classification} onChange={(e) => setClassification(e.target.value)} placeholder="// classification" className="bg-input border border-border px-3 py-2 text-xs" />
        <input value={week} onChange={(e) => setWeek(e.target.value)} placeholder="// week number" type="number" className="bg-input border border-border px-3 py-2 text-xs" />
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="// body" rows={8} className="mt-2 w-full bg-input border border-border px-3 py-2 text-xs" />
      <ImageField imageFile={imageFile} setImageFile={setImageFile} />
      <button disabled={busy} onClick={submit} className="mt-3 border border-primary text-primary px-4 py-2 text-xs hover:bg-primary hover:text-primary-foreground disabled:opacity-50">
        {busy ? "// PUBLISHING..." : "// PUBLISH"}
      </button>
    </Section>
  );
}

function PublishIntel() {
  const [headline, setHeadline] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!headline.trim() || !content.trim()) {
      toast.error("// HEADLINE AND CONTENT REQUIRED");
      return;
    }
    setBusy(true);
    try {
      let image_url: string | null = null;
      if (imageFile) image_url = await uploadImage(imageFile);
      const { error } = await supabase.from("vault_intelligence").insert({
        headline: headline.trim(),
        category,
        author_codename: author.trim() || "ANON",
        content: content.trim(),
        image_url,
      });
      if (error) throw error;
      toast.success("// INTELLIGENCE PUBLISHED");
      setHeadline(""); setAuthor(""); setContent(""); setImageFile(null); setCategory(CATEGORIES[0]);
    } catch (e: any) {
      toast.error(`// PUBLISH FAILED — ${e.message ?? "unknown"}`);
    } finally { setBusy(false); }
  };

  return (
    <Section title="// PUBLISH INTELLIGENCE">
      <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="// headline" className="w-full bg-input border border-border px-3 py-2 text-xs" />
      <div className="grid md:grid-cols-2 gap-2 mt-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-input border border-border px-3 py-2 text-xs text-foreground">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="// author codename" className="bg-input border border-border px-3 py-2 text-xs" />
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="// full article" rows={10} className="mt-2 w-full bg-input border border-border px-3 py-2 text-xs" />
      <ImageField imageFile={imageFile} setImageFile={setImageFile} />
      <button disabled={busy} onClick={submit} className="mt-3 border border-primary text-primary px-4 py-2 text-xs hover:bg-primary hover:text-primary-foreground disabled:opacity-50">
        {busy ? "// PUBLISHING..." : "// PUBLISH INTELLIGENCE"}
      </button>
    </Section>
  );
}

async function confirmDelete(): Promise<boolean> {
  return typeof window !== "undefined" && window.confirm("// CONFIRM DELETION — THIS ACTION IS PERMANENT");
}

function ManageFiles() {
  const { files } = useVaultFiles();
  const remove = async (id: string, image_url: string | null) => {
    if (!(await confirmDelete())) return;
    try {
      if (image_url) {
        const path = pathFromPublicUrl(image_url);
        if (path) await supabase.storage.from("vault-media").remove([path]);
      }
      const { error } = await supabase.from("vault_files").delete().eq("id", id);
      if (error) throw error;
      toast.success("// FILE DELETED");
    } catch (e: any) {
      toast.error(`// DELETE FAILED — ${e.message ?? "unknown"}`);
    }
  };
  return (
    <Section title="// MANAGE FILES">
      {files.length === 0 ? (
        <p className="text-xs text-muted-foreground">// NO PUBLISHED FILES</p>
      ) : (
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f.id} className="flex items-center justify-between border border-border px-3 py-2 text-xs">
              <div>
                <div className="text-primary">{f.title}</div>
                <div className="text-muted-foreground text-[10px]">{f.created_at.slice(0, 10)} // [{f.classification}]</div>
              </div>
              <button onClick={() => remove(f.id, f.image_url)} className="border border-destructive text-destructive px-2 py-1 hover:bg-destructive hover:text-destructive-foreground">
                // DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function ManageIntel() {
  const { intel } = useVaultIntel();
  const remove = async (id: string, image_url: string | null) => {
    if (!(await confirmDelete())) return;
    try {
      if (image_url) {
        const path = pathFromPublicUrl(image_url);
        if (path) await supabase.storage.from("vault-media").remove([path]);
      }
      const { error } = await supabase.from("vault_intelligence").delete().eq("id", id);
      if (error) throw error;
      toast.success("// INTEL DELETED");
    } catch (e: any) {
      toast.error(`// DELETE FAILED — ${e.message ?? "unknown"}`);
    }
  };
  return (
    <Section title="// MANAGE INTELLIGENCE">
      {intel.length === 0 ? (
        <p className="text-xs text-muted-foreground">// NO PUBLISHED INTELLIGENCE</p>
      ) : (
        <ul className="space-y-2">
          {intel.map((i) => (
            <li key={i.id} className="flex items-center justify-between border border-border px-3 py-2 text-xs">
              <div>
                <div className="text-primary">{i.headline}</div>
                <div className="text-muted-foreground text-[10px]">{i.created_at.slice(0, 10)} // [{i.category}] // {i.author_codename}</div>
              </div>
              <button onClick={() => remove(i.id, i.image_url)} className="border border-destructive text-destructive px-2 py-1 hover:bg-destructive hover:text-destructive-foreground">
                // DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function TickerControl() {
  const ticker = useVaultTicker();
  const [text, setText] = useState("");
  const add = async () => {
    if (!text.trim()) return;
    try {
      const { error } = await supabase.from("vault_ticker").insert({ message: text.trim() });
      if (error) throw error;
      setText("");
      toast.success("// TICKER UPDATED");
    } catch (e: any) {
      toast.error(`// FAILED — ${e.message ?? "unknown"}`);
    }
  };
  const remove = async (id: string) => {
    try {
      const { error } = await supabase.from("vault_ticker").delete().eq("id", id);
      if (error) throw error;
    } catch (e: any) {
      toast.error(`// FAILED — ${e.message ?? "unknown"}`);
    }
  };
  return (
    <Section title="// TICKER CONTROL">
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="// new ticker message" className="flex-1 bg-input border border-border px-3 py-2 text-xs" />
        <button onClick={add} className="border border-primary text-primary px-3 py-2 text-xs hover:bg-primary hover:text-primary-foreground">
          // ADD TO TICKER
        </button>
      </div>
      {ticker.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">// NO TICKER MESSAGES</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {ticker.map((t) => (
            <li key={t.id} className="flex items-center justify-between border border-border px-3 py-2 text-xs">
              <span className="text-primary/80">{t.message}</span>
              <button onClick={() => remove(t.id)} className="border border-destructive text-destructive px-2 py-1 hover:bg-destructive hover:text-destructive-foreground">
                // DELETE
              </button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}