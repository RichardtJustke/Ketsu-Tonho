
-- Create order_items table for storing individual items within an order
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_key text not null,
  name text not null,
  unit_price numeric not null default 0,
  quantity integer not null default 1,
  image text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.order_items enable row level security;

-- Admins full access
create policy "Admins can manage order items"
on public.order_items for all
to authenticated
using (has_role(auth.uid(), 'admin'::app_role));

-- Users can view their own order items (via orders join)
create policy "Users can view own order items"
on public.order_items for select
to authenticated
using (exists (
  select 1 from public.orders
  where orders.id = order_items.order_id
  and orders.user_id = auth.uid()
));

-- Users can insert order items for their own orders
create policy "Users can insert own order items"
on public.order_items for insert
to authenticated
with check (exists (
  select 1 from public.orders
  where orders.id = order_items.order_id
  and orders.user_id = auth.uid()
));
