import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function buildOrderEmailHtml(
  type: "order_received" | "order_confirmed",
  profile: { name: string | null; email: string },
  order: any,
  items: any[]
) {
  const isReceived = type === "order_received";
  const title = isReceived ? "Recebemos seu pedido!" : "Seu pedido foi confirmado! ✅";
  const subtitle = isReceived
    ? "Obrigado por escolher a Tonho Locações. Seu orçamento foi recebido e em breve nossa equipe entrará em contato."
    : "Ótima notícia! Seu pedido foi confirmado pela nossa equipe e estamos preparando tudo para o seu evento.";

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#333;">
          ${item.name}
        </td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#666;text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#333;text-align:right;">
          ${formatCurrency(Number(item.unit_price) * item.quantity)}
        </td>
      </tr>`
    )
    .join("");

  const notesHtml = order.notes
    ? `<p style="font-size:13px;color:#666;margin:16px 0 0;">📝 <strong>Observações:</strong> ${order.notes}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Figtree',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background-color:#000000;padding:32px 40px;text-align:center;">
            <img src="https://res.cloudinary.com/dqvldq2ku/image/upload/f_auto,q_auto,w_200/logo/logo%20original" alt="Tonho Locações" height="50" style="height:50px;width:auto;" />
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;font-size:24px;color:#000000;font-weight:700;">${title}</h2>
            <p style="margin:0 0 24px;font-size:15px;color:#666;line-height:1.6;">${subtitle}</p>

            <p style="font-size:14px;color:#333;margin:0 0 4px;">
              <strong>Pedido:</strong> #${order.id.slice(0, 8).toUpperCase()}
            </p>
            <p style="font-size:14px;color:#333;margin:0 0 16px;">
              <strong>Cliente:</strong> ${profile.name || profile.email}
            </p>

            <!-- Items Table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <thead>
                <tr style="background-color:#f8f9fa;">
                  <th style="padding:10px 8px;text-align:left;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Item</th>
                  <th style="padding:10px 8px;text-align:center;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Qtd</th>
                  <th style="padding:10px 8px;text-align:right;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Valor</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <!-- Total -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:16px;background-color:#FFF7ED;border-radius:8px;text-align:right;">
                  <span style="font-size:14px;color:#666;">Total: </span>
                  <span style="font-size:20px;font-weight:700;color:#FF5F1F;">${formatCurrency(Number(order.total_amount))}</span>
                </td>
              </tr>
            </table>

            ${notesHtml}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#f8f9fa;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#999;">Tonho Locações — Locação de equipamentos para eventos</p>
            <p style="margin:8px 0 0;font-size:12px;color:#bbb;">Este é um email automático, por favor não responda.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, type } = await req.json();

    if (!order_id || !type || !["order_received", "order_confirmed"].includes(type)) {
      return new Response(
        JSON.stringify({ error: "Missing order_id or invalid type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch order
    const { data: order, error: orderError } = await adminClient
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch items
    const { data: items } = await adminClient
      .from("order_items")
      .select("*")
      .eq("order_id", order_id);

    // Fetch profile
    const { data: profile } = await adminClient
      .from("profiles")
      .select("name, email")
      .eq("id", order.user_id)
      .single();

    if (!profile?.email) {
      return new Response(
        JSON.stringify({ error: "User email not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subject = type === "order_received"
      ? `Pedido recebido — #${order.id.slice(0, 8).toUpperCase()}`
      : `Pedido confirmado — #${order.id.slice(0, 8).toUpperCase()}`;

    const html = buildOrderEmailHtml(type, profile, order, items ?? []);

    // Send via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY not configured");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Tonho Locações <noreply@tonholocacao.com.br>",
        to: [profile.email],
        subject,
        html,
      }),
    });

    const resendData = await resendRes.json();
    const status = resendRes.ok ? "sent" : "failed";

    // Log email
    await adminClient.from("email_logs").insert({
      recipient_email: profile.email,
      recipient_user_id: order.user_id,
      platform: order.platform,
      subject,
      status,
      error_message: resendRes.ok ? null : JSON.stringify(resendData),
    });

    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resendData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message_id: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("send-order-notification error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
