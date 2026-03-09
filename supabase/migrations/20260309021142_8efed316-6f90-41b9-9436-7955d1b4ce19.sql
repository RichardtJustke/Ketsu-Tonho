CREATE OR REPLACE FUNCTION public.auto_complete_past_events()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE orders
  SET status = 'completed', updated_at = now()
  WHERE event_date < CURRENT_DATE
    AND status IN ('confirmed', 'paid', 'in_progress');
END;
$$;