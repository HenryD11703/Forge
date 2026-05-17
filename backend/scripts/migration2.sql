-- =============================================
-- Launchpad: Migration 2 — Módulos + Tipos
-- Corre este SQL en: https://supabase.com/dashboard/project/ltneibwdfvimyvzoyjvm/sql/new
-- =============================================

-- 1. Tabla de módulos
CREATE TABLE IF NOT EXISTS public.modules (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT NOT NULL,
  description TEXT,
  icon       TEXT DEFAULT '📚',
  sort_order INT  DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar RLS y política de lectura pública
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read modules"
  ON public.modules FOR SELECT
  USING (true);

-- 3. Agregar columnas a exercises
ALTER TABLE public.exercises
  ADD COLUMN IF NOT EXISTS module_id  UUID REFERENCES public.modules(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS sort_order INT  DEFAULT 0,
  ADD COLUMN IF NOT EXISTS type       TEXT DEFAULT 'html'
    CHECK (type IN ('html', 'js', 'terminal'));

-- 4. Borrar los ejercicios viejos (serán reemplazados por el seed)
TRUNCATE TABLE public.user_progress;
DELETE FROM public.exercises;
