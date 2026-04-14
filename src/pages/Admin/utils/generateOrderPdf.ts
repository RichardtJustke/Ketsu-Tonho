import { jsPDF } from "jspdf";

const COMPANY_TONHO = {
  fantasia: "Tonho Locações",
  subtitulo: "Locação de equipamentos para eventos",
  razao: "JUNGLE SERVIÇOS LTDA",
  cnpj: "17.765.610/0001-89",
  endereco: "Passagem São João, 94, Guamá, Belém - PA, CEP 66.077-075",
};

const COMPANY_CHICAS = {
  fantasia: "Chicas Eventos",
  subtitulo: "Buffet e eventos",
  razao: "JUNGLE SERVIÇOS LTDA",
  cnpj: "17.765.610/0001-89",
  endereco: "Passagem São João, 94, Guamá, Belém - PA, CEP 66.077-075",
};

const ORANGE: [number, number, number] = [255, 95, 31];
const BLACK: [number, number, number] = [0, 0, 0];
const GRAY: [number, number, number] = [100, 100, 100];
const LIGHT_GRAY: [number, number, number] = [200, 200, 200];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

interface OrderProfile {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
}

interface OrderData {
  id: string;
  created_at: string;
  event_date?: string | null;
  status: string;
  platform: string;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  coupon_code?: string | null;
  notes?: string | null;
}

interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
  product_key?: string;
}

export function generateOrderPdf(
  profile: OrderProfile,
  order: OrderData,
  items: OrderItem[]
) {
  const company = order.platform === "chicas" ? COMPANY_CHICAS : COMPANY_TONHO;
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

  // Header bar
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, pw, 38, "F");

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(company.fantasia.toUpperCase(), pw / 2, 16, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(company.subtitulo, pw / 2, 24, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(...ORANGE);
  doc.text(`CNPJ: ${company.cnpj}  |  ${company.endereco}`, pw / 2, 33, { align: "center" });

  // Orange accent line
  doc.setFillColor(...ORANGE);
  doc.rect(0, 38, pw, 3, "F");

  y = 50;

  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BLACK);
  doc.text("RESUMO DO PEDIDO", pw / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY);
  doc.text(`Pedido #${order.id.slice(0, 8).toUpperCase()}  •  Emitido em ${formatDate(order.created_at)}`, pw / 2, y, { align: "center" });

  y += 12;

  // Section helper
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

  // Dados do Pedido
  sectionTitle("DADOS DO PEDIDO");
  fieldLine("Pedido", `#${order.id.slice(0, 8).toUpperCase()}`);
  fieldLine("Data Emissão", formatDate(order.created_at));
  if (order.event_date) fieldLine("Data Evento", formatDate(order.event_date));
  fieldLine("Status", order.status.charAt(0).toUpperCase() + order.status.slice(1));
  fieldLine("Plataforma", order.platform === "tonho" ? "Tonho Locações" : "Chicas Eventos");

  y += 4;

  // Dados do Cliente
  sectionTitle("DADOS DO CLIENTE");
  fieldLine("Nome", profile.name || "Não informado");
  fieldLine("E-mail", profile.email || "Não informado");
  if (profile.phone) fieldLine("Telefone", profile.phone);
  if (profile.cpf) fieldLine("CPF", profile.cpf);

  y += 4;

  // Itens do Pedido
  sectionTitle("ITENS DO PEDIDO");

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

  // Notes
  if (order.notes) {
    y += 4;
    checkPage(16);
    sectionTitle("OBSERVAÇÕES");
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

  // Footer bar on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const ph = doc.internal.pageSize.getHeight();
    doc.setFillColor(...BLACK);
    doc.rect(0, ph - 14, pw, 14, "F");
    doc.setFontSize(7);
    doc.setTextColor(...ORANGE);
    doc.text(`${company.fantasia}  •  ${company.cnpj}  •  ${company.endereco}`, pw / 2, ph - 7, { align: "center" });
    doc.setTextColor(180, 180, 180);
    doc.text(`Página ${i} de ${pageCount}`, pw - margin, ph - 7, { align: "right" });
  }

  // Trigger download
  doc.save(`pedido-${order.id.slice(0, 8).toUpperCase()}.pdf`);
}
