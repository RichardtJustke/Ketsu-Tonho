import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { jsPDF } from "https://esm.sh/jspdf@2.5.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const COMPANY_CC_EMAIL = "rj.justke@gmail.com";

const COMPANY = {
  fantasia: "Tonho Locações",
  razao: "JUNGLE SERVIÇOS LTDA",
  cnpj: "17.765.610/0001-89",
  endereco: "Passagem São João, 94, Guamá, Belém - PA, CEP 66.077-075",
  representante: "Otavio Dutra Leite",
};

const ORANGE = [255, 95, 31] as const;
const BLACK = [0, 0, 0] as const;
const GRAY = [100, 100, 100] as const;
const LIGHT_GRAY = [200, 200, 200] as const;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

// ─── Contract PDF Generator ─────────────────────────────────────────

function generateContractPdf(
  profile: { name: string | null; email: string; phone?: string | null; cpf?: string | null },
  address: { street?: string | null; number?: string | null; neighborhood?: string | null; city?: string | null; state?: string | null; zip_code?: string | null } | null,
  order: any,
  items: any[]
): string {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pw - margin * 2;
  let y = 15;

  const checkPage = (needed: number) => {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  };

  // ── Header bar ──
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, pw, 38, "F");

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("TONHO LOCAÇÕES", pw / 2, 16, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Locação de equipamentos para eventos", pw / 2, 24, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(...ORANGE);
  doc.text(`CNPJ: ${COMPANY.cnpj}  |  ${COMPANY.endereco}`, pw / 2, 33, { align: "center" });

  // ── Orange accent line ──
  doc.setFillColor(...ORANGE);
  doc.rect(0, 38, pw, 3, "F");

  y = 50;

  // ── Title ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BLACK);
  doc.text("CONTRATO DE LOCAÇÃO DE EQUIPAMENTOS", pw / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text(`Pedido #${order.id.slice(0, 8).toUpperCase()}  •  Emitido em ${formatDate(order.created_at)}`, pw / 2, y, { align: "center" });

  y += 12;

  // ── Section helper ──
  const sectionTitle = (title: string) => {
    checkPage(18);
    doc.setFillColor(...ORANGE);
    doc.rect(margin, y, 4, 10, "F");
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLACK);
    doc.text(title, margin + 8, y + 7);
    y += 16;
  };

  const fieldLine = (label: string, value: string) => {
    checkPage(8);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...GRAY);
    doc.text(`${label}:`, margin + 4, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BLACK);
    doc.text(value, margin + 42, y);
    y += 6;
  };

  // ── 1. CONTRATADO ──
  sectionTitle("1. CONTRATADO (LOCADOR)");
  fieldLine("Razão Social", COMPANY.razao);
  fieldLine("Nome Fantasia", COMPANY.fantasia);
  fieldLine("CNPJ", COMPANY.cnpj);
  fieldLine("Endereço", COMPANY.endereco);
  fieldLine("Representante", COMPANY.representante);

  y += 4;

  // ── 2. CONTRATANTE ──
  sectionTitle("2. CONTRATANTE (LOCATÁRIO)");
  fieldLine("Nome", profile.name || "Não informado");
  fieldLine("E-mail", profile.email);
  if (profile.phone) fieldLine("Telefone", profile.phone);
  if (profile.cpf) fieldLine("CPF", profile.cpf);
  if (address) {
    const parts = [address.street, address.number, address.neighborhood, address.city, address.state].filter(Boolean);
    if (parts.length > 0) {
      fieldLine("Endereço", parts.join(", ") + (address.zip_code ? ` - CEP ${address.zip_code}` : ""));
    }
  }

  y += 4;

  // ── 3. OBJETO DO CONTRATO ──
  sectionTitle("3. OBJETO DO CONTRATO — ITENS LOCADOS");

  // Table header
  checkPage(14);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 4, contentW, 10, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GRAY);
  doc.text("ITEM", margin + 4, y + 2);
  doc.text("QTD", margin + contentW * 0.65, y + 2, { align: "center" });
  doc.text("UNIT.", margin + contentW * 0.78, y + 2, { align: "right" });
  doc.text("TOTAL", margin + contentW - 2, y + 2, { align: "right" });
  y += 10;

  // Items
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...BLACK);
  items.forEach((item) => {
    checkPage(10);
    const itemTotal = Number(item.unit_price) * item.quantity;
    doc.setFontSize(9);
    doc.text(item.name.substring(0, 45), margin + 4, y);
    doc.text(String(item.quantity), margin + contentW * 0.65, y, { align: "center" });
    doc.text(formatCurrency(Number(item.unit_price)), margin + contentW * 0.78, y, { align: "right" });
    doc.text(formatCurrency(itemTotal), margin + contentW - 2, y, { align: "right" });

    // Subtle divider
    doc.setDrawColor(...LIGHT_GRAY);
    doc.setLineWidth(0.2);
    y += 2;
    doc.line(margin + 4, y, margin + contentW - 2, y);
    y += 6;
  });

  // Totals box
  checkPage(30);
  y += 4;
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.5);
  doc.rect(margin + contentW * 0.5, y, contentW * 0.5, Number(order.discount_amount) > 0 ? 28 : 18, "S");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("Subtotal:", margin + contentW * 0.55, y + 6);
  doc.setTextColor(...BLACK);
  doc.text(formatCurrency(Number(order.subtotal)), margin + contentW - 4, y + 6, { align: "right" });

  if (Number(order.discount_amount) > 0) {
    doc.setTextColor(0, 128, 0);
    doc.text(`Desconto${order.coupon_code ? ` (${order.coupon_code})` : ""}:`, margin + contentW * 0.55, y + 14);
    doc.text(`-${formatCurrency(Number(order.discount_amount))}`, margin + contentW - 4, y + 14, { align: "right" });
    doc.setTextColor(...BLACK);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...ORANGE);
    doc.text("TOTAL:", margin + contentW * 0.55, y + 24);
    doc.text(formatCurrency(Number(order.total_amount)), margin + contentW - 4, y + 24, { align: "right" });
    y += 34;
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...ORANGE);
    doc.text("TOTAL:", margin + contentW * 0.55, y + 14);
    doc.text(formatCurrency(Number(order.total_amount)), margin + contentW - 4, y + 14, { align: "right" });
    y += 24;
  }

  doc.setTextColor(...BLACK);

  // Event date
  if (order.event_date) {
    y += 4;
    checkPage(10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`📅 Data do Evento: ${formatDate(order.event_date)}`, margin, y);
    y += 10;
  }

  // ── 4. CLÁUSULAS ──
  sectionTitle("4. CLÁUSULAS E CONDIÇÕES");

  const clauses = [
    {
      title: "4.1. Objeto",
      text: "O presente contrato tem por objeto a locação dos equipamentos descritos na cláusula 3, pelo LOCADOR ao LOCATÁRIO, para uso exclusivo no evento especificado.",
    },
    {
      title: "4.2. Prazo",
      text: "A locação tem início na data de entrega dos equipamentos e término na data de devolução, conforme acordado entre as partes. Atrasos na devolução poderão acarretar cobrança proporcional de diárias adicionais.",
    },
    {
      title: "4.3. Responsabilidade do Locatário",
      text: "O LOCATÁRIO se compromete a: (a) utilizar os equipamentos conforme suas finalidades; (b) zelar pela conservação dos bens; (c) restituir os equipamentos nas mesmas condições em que foram recebidos, salvo desgaste natural de uso.",
    },
    {
      title: "4.4. Danos e Perdas",
      text: "Em caso de dano, perda ou extravio, o LOCATÁRIO será responsável pelo reparo ou reposição, conforme valor de mercado vigente. O valor do caução poderá ser utilizado para cobrir parcial ou integralmente tais custos.",
    },
    {
      title: "4.5. Cancelamento",
      text: "O LOCATÁRIO poderá cancelar a locação com até 7 (sete) dias de antecedência da data do evento, sem ônus. Cancelamentos fora deste prazo poderão acarretar cobrança de 50% do valor total.",
    },
    {
      title: "4.6. Entrega e Retirada",
      text: "A entrega e retirada dos equipamentos serão realizadas pelo LOCADOR no endereço informado pelo LOCATÁRIO. Os custos de transporte, quando aplicáveis, estão inclusos no valor total do contrato.",
    },
    {
      title: "4.7. Força Maior",
      text: "Nenhuma das partes será responsabilizada por descumprimento do contrato em casos de força maior ou caso fortuito, nos termos do Código Civil.",
    },
  ];

  clauses.forEach((clause) => {
    checkPage(22);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLACK);
    doc.text(clause.title, margin + 4, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    const lines = doc.splitTextToSize(clause.text, contentW - 8);
    lines.forEach((line: string) => {
      checkPage(6);
      doc.text(line, margin + 4, y);
      y += 4.5;
    });
    y += 4;
  });

  // Notes
  if (order.notes) {
    checkPage(16);
    sectionTitle("5. OBSERVAÇÕES");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    const noteLines = doc.splitTextToSize(order.notes, contentW - 8);
    noteLines.forEach((line: string) => {
      checkPage(6);
      doc.text(line, margin + 4, y);
      y += 5;
    });
    y += 4;
  }

  // ── Signatures ──
  checkPage(40);
  y += 10;
  doc.setDrawColor(...BLACK);
  doc.setLineWidth(0.4);

  const sigW = (contentW - 20) / 2;
  // Left: Locador
  doc.line(margin, y, margin + sigW, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BLACK);
  doc.text(COMPANY.fantasia, margin + sigW / 2, y + 5, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("LOCADOR", margin + sigW / 2, y + 10, { align: "center" });

  // Right: Locatário
  const rx = margin + sigW + 20;
  doc.setDrawColor(...BLACK);
  doc.line(rx, y, rx + sigW, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BLACK);
  doc.text(profile.name || profile.email, rx + sigW / 2, y + 5, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text("LOCATÁRIO", rx + sigW / 2, y + 10, { align: "center" });

  y += 18;
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text(`Belém - PA, ${formatDate(new Date().toISOString())}`, pw / 2, y, { align: "center" });

  // ── Footer bar ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const ph = doc.internal.pageSize.getHeight();
    doc.setFillColor(...BLACK);
    doc.rect(0, ph - 14, pw, 14, "F");
    doc.setFontSize(7);
    doc.setTextColor(...ORANGE);
    doc.text(`${COMPANY.fantasia}  •  ${COMPANY.cnpj}  •  ${COMPANY.endereco}`, pw / 2, ph - 7, { align: "center" });
    doc.setTextColor(180, 180, 180);
    doc.text(`Página ${i} de ${pageCount}`, pw - margin, ph - 7, { align: "right" });
  }

  return doc.output("datauristring").split(",")[1];
}

// ─── Email HTML Builder ─────────────────────────────────────────────

function buildOrderEmailHtml(
  type: "order_received" | "order_confirmed" | "order_confirmed_modified",
  profile: { name: string | null; email: string },
  order: any,
  items: any[]
) {
  const isReceived = type === "order_received";
  const isModified = type === "order_confirmed_modified";

  let title: string;
  let subtitle: string;

  if (isReceived) {
    title = "Recebemos seu pedido!";
    subtitle = "Obrigado por escolher a Tonho Locações. Seu orçamento foi recebido e em breve nossa equipe entrará em contato.";
  } else if (isModified) {
    title = "Seu pedido foi confirmado! ✅";
    subtitle = "Ótima notícia! Seu pedido foi confirmado pela nossa equipe.";
  } else {
    title = "Seu pedido foi confirmado! ✅";
    subtitle = "Ótima notícia! Seu pedido foi confirmado pela nossa equipe e estamos preparando tudo para o seu evento.";
  }

  const modificationWarning = isModified ? `
    <div style="background-color:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;margin:16px 0;border-radius:4px;">
      <p style="margin:0;font-size:14px;color:#92400E;font-weight:600;">⚠️ Atenção: Alguns itens foram ajustados</p>
      <p style="margin:8px 0 0;font-size:13px;color:#B45309;">Nossa equipe fez algumas modificações no seu pedido para melhor atender ao seu evento. Por favor, revise os itens abaixo.</p>
    </div>
  ` : "";

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#333;">${item.name}</td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#666;text-align:center;">${item.quantity}</td>
        <td style="padding:12px 8px;border-bottom:1px solid #eee;font-size:14px;color:#333;text-align:right;">${formatCurrency(Number(item.unit_price) * item.quantity)}</td>
      </tr>`
    )
    .join("");

  const notesHtml = order.notes
    ? `<p style="font-size:13px;color:#666;margin:16px 0 0;">📝 <strong>Observações:</strong> ${order.notes}</p>`
    : "";

  const pdfNote = !isReceived
    ? `<p style="font-size:13px;color:#666;margin:16px 0 0;">📎 Em anexo, você encontra o contrato de locação do seu pedido.</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Figtree',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background-color:#000000;padding:32px 40px;text-align:center;">
            <img src="https://res.cloudinary.com/dqvldq2ku/image/upload/f_auto,q_auto,w_200/logo/logo%20original" alt="Tonho Locações" height="50" style="height:50px;width:auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;font-size:24px;color:#000000;font-weight:700;">${title}</h2>
            <p style="margin:0 0 24px;font-size:15px;color:#666;line-height:1.6;">${subtitle}</p>
            ${modificationWarning}
            <p style="font-size:14px;color:#333;margin:0 0 4px;"><strong>Pedido:</strong> #${order.id.slice(0, 8).toUpperCase()}</p>
            <p style="font-size:14px;color:#333;margin:0 0 16px;"><strong>Cliente:</strong> ${profile.name || profile.email}</p>
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
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:16px;background-color:#FFF7ED;border-radius:8px;text-align:right;">
                  <span style="font-size:14px;color:#666;">Total: </span>
                  <span style="font-size:20px;font-weight:700;color:#FF5F1F;">${formatCurrency(Number(order.total_amount))}</span>
                </td>
              </tr>
            </table>
            ${notesHtml}
            ${pdfNote}
          </td>
        </tr>
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

// ─── Main Handler ───────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, type } = await req.json();

    if (!order_id || !type || !["order_received", "order_confirmed", "order_confirmed_modified"].includes(type)) {
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

    // Fetch profile (with phone and cpf for contract)
    const { data: profile } = await adminClient
      .from("profiles")
      .select("name, email, phone, cpf")
      .eq("id", order.user_id)
      .single();

    if (!profile?.email) {
      return new Response(
        JSON.stringify({ error: "User email not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch client address (default or first)
    const { data: address } = await adminClient
      .from("addresses")
      .select("street, number, neighborhood, city, state, zip_code")
      .eq("user_id", order.user_id)
      .order("is_default", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Determine subject
    let subject: string;
    if (type === "order_received") {
      subject = `Pedido recebido — #${order.id.slice(0, 8).toUpperCase()}`;
    } else if (type === "order_confirmed_modified") {
      subject = `Pedido confirmado (modificado) — #${order.id.slice(0, 8).toUpperCase()}`;
    } else {
      subject = `Pedido confirmado — #${order.id.slice(0, 8).toUpperCase()}`;
    }

    const html = buildOrderEmailHtml(type, profile, order, items ?? []);

    // Generate contract PDF for confirmed orders
    let pdfBase64: string | null = null;
    if (type === "order_confirmed" || type === "order_confirmed_modified") {
      try {
        pdfBase64 = generateContractPdf(profile, address, order, items ?? []);
      } catch (pdfErr) {
        console.error("Contract PDF generation failed:", pdfErr);
      }
    }

    // Send via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY not configured");

    const emailPayload: any = {
      from: "Tonho Locações <noreply@tonholocacao.com.br>",
      to: [profile.email],
      cc: [COMPANY_CC_EMAIL],
      subject,
      html,
    };

    if (pdfBase64) {
      emailPayload.attachments = [
        {
          filename: `contrato-locacao-${order.id.slice(0, 8).toUpperCase()}.pdf`,
          content: pdfBase64,
        },
      ];
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendRes.json();
    const status = resendRes.ok ? "sent" : "failed";

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
