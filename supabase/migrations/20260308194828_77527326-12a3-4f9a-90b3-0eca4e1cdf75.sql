
CREATE OR REPLACE FUNCTION public.get_available_stock_for_date(target_date date)
RETURNS TABLE(product_key text, available integer)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    e.product_key,
    GREATEST(
      0,
      e.stock_total - COALESCE(
        (
          SELECT SUM(oi.quantity)::integer
          FROM order_items oi
          JOIN orders o ON o.id = oi.order_id
          WHERE oi.product_key = e.product_key
            AND o.event_date = target_date
            AND o.status IN ('pending', 'confirmed', 'paid', 'in_progress', 'completed')
        ),
        0
      )
    )::integer AS available
  FROM equipment e
  WHERE e.product_key IS NOT NULL
    AND e.is_active = true;
$$;
