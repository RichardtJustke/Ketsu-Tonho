import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;

    const { order_id } = await req.json();
    if (!order_id) {
      return new Response(JSON.stringify({ error: "Missing order_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch order & verify ownership
    const { data: order, error: orderError } = await adminClient
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (order.user_id !== userId) {
      return new Response(JSON.stringify({ error: "Forbidden: not your order" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build line items based on platform
    const items: Array<{ title: string; quantity: number; unit_price: number; currency_id: string }> = [];

    if (order.platform === "tonho") {
      const { data: bookings } = await adminClient
        .from("rental_bookings")
        .select("*, equipment(name)")
        .eq("order_id", order_id);

      for (const b of bookings || []) {
        items.push({
          title: (b.equipment as any)?.name || "Locação de equipamento",
          quantity: b.quantity,
          unit_price: Number(b.total_price) / b.quantity,
          currency_id: "BRL",
        });
      }
    } else {
      const { data: orderItems } = await adminClient
        .from("buffet_order_items")
        .select("*, menu_items(name)")
        .eq("order_id", order_id);

      for (const item of orderItems || []) {
        items.push({
          title: (item.menu_items as any)?.name || "Item de buffet",
          quantity: item.quantity,
          unit_price: Number(item.unit_price),
          currency_id: "BRL",
        });
      }
    }

    if (order.delivery_fee > 0) {
      items.push({
        title: "Taxa de entrega",
        quantity: 1,
        unit_price: Number(order.delivery_fee),
        currency_id: "BRL",
      });
    }

    // Create Mercado Pago preference
    const mpToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!mpToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mpToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        external_reference: order_id,
        back_urls: {
          success: `${Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovable.app")}/orders/${order_id}?status=success`,
          failure: `${Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovable.app")}/orders/${order_id}?status=failure`,
          pending: `${Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovable.app")}/orders/${order_id}?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mercado-pago-webhook`,
      }),
    });

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      console.error("Mercado Pago error:", mpData);
      return new Response(
        JSON.stringify({ error: "Failed to create preference", details: mpData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create payment record
    await adminClient.from("payments").insert({
      order_id,
      amount: Number(order.total_amount),
      status: "pending",
      mercado_pago_id: mpData.id,
    });

    return new Response(
      JSON.stringify({
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
        preference_id: mpData.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("create-mercado-pago-preference error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
