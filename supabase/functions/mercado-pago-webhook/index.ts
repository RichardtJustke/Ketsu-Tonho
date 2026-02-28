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
    const body = await req.json();
    console.log("Webhook received:", JSON.stringify(body));

    // Mercado Pago sends different notification formats
    const type = body.type || body.topic;
    const dataId = body.data?.id || body.id;

    if (type !== "payment" && type !== "merchant_order") {
      // Acknowledge non-payment notifications
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!dataId) {
      return new Response(JSON.stringify({ error: "No data ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const mpToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!mpToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    // Fetch payment details from Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
      headers: { Authorization: `Bearer ${mpToken}` },
    });

    if (!mpRes.ok) {
      console.error("Failed to fetch payment from MP:", await mpRes.text());
      return new Response(JSON.stringify({ error: "Failed to fetch payment" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const mpPayment = await mpRes.json();
    const externalReference = mpPayment.external_reference; // order_id
    const mpStatus = mpPayment.status; // approved, rejected, pending, in_process, etc.
    const mpPaymentMethod = mpPayment.payment_method_id;

    // Map MP status to our payment_status enum
    const statusMap: Record<string, string> = {
      approved: "approved",
      authorized: "approved",
      rejected: "rejected",
      cancelled: "cancelled",
      refunded: "refunded",
      in_process: "pending",
      pending: "pending",
    };

    const paymentStatus = statusMap[mpStatus] || "pending";

    // Map to order_status
    const orderStatusMap: Record<string, string> = {
      approved: "paid",
      rejected: "cancelled",
      cancelled: "cancelled",
      refunded: "refunded",
      pending: "pending",
    };

    const orderStatus = orderStatusMap[paymentStatus] || "pending";

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Update or create payment record
    const { data: existingPayment } = await adminClient
      .from("payments")
      .select("id")
      .eq("order_id", externalReference)
      .maybeSingle();

    if (existingPayment) {
      await adminClient
        .from("payments")
        .update({
          status: paymentStatus,
          mercado_pago_id: String(dataId),
          payment_method: mpPaymentMethod,
          raw_response: mpPayment,
        })
        .eq("id", existingPayment.id);
    } else {
      await adminClient.from("payments").insert({
        order_id: externalReference,
        amount: mpPayment.transaction_amount || 0,
        status: paymentStatus,
        mercado_pago_id: String(dataId),
        payment_method: mpPaymentMethod,
        raw_response: mpPayment,
      });
    }

    // Update order status
    await adminClient
      .from("orders")
      .update({ status: orderStatus })
      .eq("id", externalReference);

    console.log(`Payment ${dataId} processed: ${paymentStatus}, order ${externalReference} -> ${orderStatus}`);

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("mercado-pago-webhook error:", err);
    // Always return 200 to Mercado Pago to prevent retries on our errors
    return new Response(JSON.stringify({ received: true, error: message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
