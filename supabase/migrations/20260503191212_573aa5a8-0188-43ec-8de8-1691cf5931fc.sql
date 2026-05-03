
-- Tables
CREATE TABLE public.vault_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  classification text NOT NULL DEFAULT 'CLASSIFIED',
  week_number int,
  content text NOT NULL DEFAULT '',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.vault_intelligence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  category text NOT NULL DEFAULT 'GEOPOLITICS',
  author_codename text NOT NULL DEFAULT 'ANON',
  content text NOT NULL DEFAULT '',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.vault_ticker (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS — public read, public write (admin gated client-side via password)
ALTER TABLE public.vault_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_ticker ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read files" ON public.vault_files FOR SELECT USING (true);
CREATE POLICY "public write files" ON public.vault_files FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete files" ON public.vault_files FOR DELETE USING (true);

CREATE POLICY "public read intel" ON public.vault_intelligence FOR SELECT USING (true);
CREATE POLICY "public write intel" ON public.vault_intelligence FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete intel" ON public.vault_intelligence FOR DELETE USING (true);

CREATE POLICY "public read ticker" ON public.vault_ticker FOR SELECT USING (true);
CREATE POLICY "public write ticker" ON public.vault_ticker FOR INSERT WITH CHECK (true);
CREATE POLICY "public delete ticker" ON public.vault_ticker FOR DELETE USING (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.vault_files;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vault_intelligence;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vault_ticker;

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('vault-media', 'vault-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read vault-media" ON storage.objects FOR SELECT
  USING (bucket_id = 'vault-media');
CREATE POLICY "public upload vault-media" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'vault-media');
CREATE POLICY "public delete vault-media" ON storage.objects FOR DELETE
  USING (bucket_id = 'vault-media');

-- Seed default ticker
INSERT INTO public.vault_ticker (message) VALUES
  ('// NEW FILE DROPPED — WEEK 19 · FEDERAL RESERVE SHADOW BOARD //'),
  ('// INTELLIGENCE UPDATE — GLOBAL MONETARY POLICY SHIFT DETECTED //');
