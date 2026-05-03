import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Banner = { text: string; key: number };

export function PublishBanner() {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const mount = Date.now();
    const show = (text: string) => setBanner({ text, key: Date.now() });

    const ch = supabase.channel("vault_publish_banner")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "vault_files" }, (p) => {
        const row = p.new as { title: string; created_at: string };
        if (new Date(row.created_at).getTime() < mount - 5000) return;
        show(`// NEW CLASSIFIED FILE PUBLISHED — ${row.title.toUpperCase()}`);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "vault_intelligence" }, (p) => {
        const row = p.new as { headline: string; created_at: string };
        if (new Date(row.created_at).getTime() < mount - 5000) return;
        show(`// NEW INTELLIGENCE REPORT RELEASED — ${row.headline.toUpperCase()}`);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  useEffect(() => {
    if (!banner) return;
    const t = setTimeout(() => setBanner(null), 10000);
    return () => clearTimeout(t);
  }, [banner]);

  if (!banner) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-black border-b border-white/40 text-white font-mono text-xs md:text-sm px-4 py-3 text-center tracking-wider">
      {banner.text}
    </div>
  );
}