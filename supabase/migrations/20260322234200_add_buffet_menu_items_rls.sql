-- Add missing RLS policies for buffet_menu_items table
-- This table was created via Supabase dashboard and is missing RLS policies,
-- which prevents admin users from deleting (and potentially other operations).

-- Enable RLS (idempotent — no-op if already enabled)
ALTER TABLE public.buffet_menu_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read menu items (public storefront)
CREATE POLICY "Public can view buffet menu items"
  ON public.buffet_menu_items
  FOR SELECT
  USING (true);

-- Allow admins full CRUD (insert, update, delete)
CREATE POLICY "Admins can manage buffet menu items"
  ON public.buffet_menu_items
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
