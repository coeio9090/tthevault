import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type VaultFile = {
  id: string;
  title: string;
  classification: string;
  week_number: number | null;
  content: string;
  image_url: string | null;
  created_at: string;
};

export type VaultIntel = {
  id: string;
  headline: string;
  category: string;
  author_codename: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export type VaultTicker = {
  id: string;
  message: string;
  created_at: string;
};

export function useVaultFiles() {
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("vault_files").select("*").order("created_at", { ascending: false });
      if (active) { setFiles((data as VaultFile[]) || []); setLoading(false); }
    };
    load();
    const ch = supabase.channel(`vault_files_rt_${crypto.randomUUID()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "vault_files" }, () => load())
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, []);
  return { files, loading };
}

export function useVaultIntel() {
  const [intel, setIntel] = useState<VaultIntel[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("vault_intelligence").select("*").order("created_at", { ascending: false });
      if (active) { setIntel((data as VaultIntel[]) || []); setLoading(false); }
    };
    load();
    const ch = supabase.channel(`vault_intel_rt_${crypto.randomUUID()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "vault_intelligence" }, () => load())
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, []);
  return { intel, loading };
}

export function useVaultTicker() {
  const [ticker, setTicker] = useState<VaultTicker[]>([]);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from("vault_ticker").select("*").order("created_at", { ascending: true });
      if (active) setTicker((data as VaultTicker[]) || []);
    };
    load();
    const ch = supabase.channel(`vault_ticker_rt_${crypto.randomUUID()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "vault_ticker" }, () => load())
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, []);
  return ticker;
}