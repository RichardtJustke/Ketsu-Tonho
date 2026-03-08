import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildConfirmationEmailHtml(confirmUrl: string, name: string) {
  const displayName = name || "Cliente";
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
            <h2 style="margin:0 0 8px;font-size:24px;color:#000000;font-weight:700;">Confirme seu cadastro</h2>
            <p style="margin:0 0 24px;font-size:15px;color:#666;line-height:1.6;">
              Olá <strong style="color:#FF5F1F;">${displayName}</strong>, obrigado por se cadastrar na Tonho Locações! Clique no botão abaixo para ativar sua conta.
            </p>

            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:8px 0 24px;">
                  <a href="${confirmUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background-color:#FF5F1F;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;border-radius:12px;">
                    Confirmar Email
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:13px;color:#999;line-height:1.5;">
              Se você não criou uma conta na Tonho Locações, ignore este email.
            </p>
            <p style="margin:0;font-size:13px;color:#999;line-height:1.5;">
              Este link expira em 24 horas.
            </p>
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
    const { email, name, redirect_url } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const redirectTo = redirect_url || Deno.env.get("SUPABASE_URL")!.replace('.supabase.co', '');

    const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
      type: "signup",
      email,
      options: { redirectTo },
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error("generateLink error:", linkError?.message || "No action_link returned");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const confirmUrl = linkData.properties.action_link;
    const html = buildConfirmationEmailHtml(confirmUrl, name || "");

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
        to: [email],
        subject: "Confirme seu cadastro — Tonho Locações",
        html,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-signup-confirmation error:", err);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
