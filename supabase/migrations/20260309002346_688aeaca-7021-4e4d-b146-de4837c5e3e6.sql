-- Function that restores stock_available when an order is cancelled
CREATE OR REPLACE FUNCTION public.handle_order_cancellation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.status <> 'cancelled' AND NEW.status = 'cancelled' THEN
    UPDATE equipment e
    SET stock_available = stock_available + oi.quantity
    FROM order_items oi
    WHERE oi.order_id = NEW.id
      AND e.product_key = oi.product_key;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger fires on status change
CREATE TRIGGER on_order_cancelled
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION public.handle_order_cancellation();