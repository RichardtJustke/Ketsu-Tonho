// ===== TYPES =====

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  minQuantity: number;
  category: string;
  status: "normal" | "baixo" | "esgotado";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stockItemId: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

export interface Event {
  id: string;
  clientId: string;
  date: string;
  empresa: "tonho" | "chicas";
  status: "confirmado" | "em_andamento" | "encerrado";
  title: string;
  products?: string[];
  services?: string[];
  value: number;
}

export interface Budget {
  id: string;
  clientId: string;
  empresa: "tonho" | "chicas";
  date: string;
  status: "recebido" | "em_edicao" | "enviado" | "aprovado" | "oficializado";
  title: string;
  items: string[];
  value: number;
}

export interface Sale {
  id: string;
  clientId: string;
  date: string;
  products: string[];
  value: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "gestor" | "equipe";
  permissions: string[];
}

// ===== MOCK DATA =====

export const clients: Client[] = [
  { id: "c1", name: "Maria Silva", email: "maria@email.com", phone: "(11) 99999-1111" },
  { id: "c2", name: "João Santos", email: "joao@email.com", phone: "(11) 99999-2222", company: "Santos Corp" },
  { id: "c3", name: "Ana Oliveira", email: "ana@email.com", phone: "(11) 99999-3333" },
  { id: "c4", name: "Pedro Costa", email: "pedro@email.com", phone: "(11) 99999-4444", company: "Costa & Cia" },
  { id: "c5", name: "Carla Mendes", email: "carla@email.com", phone: "(11) 99999-5555" },
  { id: "c6", name: "Lucas Ferreira", email: "lucas@email.com", phone: "(11) 99999-6666", company: "LF Eventos" },
  { id: "c7", name: "Beatriz Almeida", email: "beatriz@email.com", phone: "(11) 99999-7777" },
  { id: "c8", name: "Rafael Lima", email: "rafael@email.com", phone: "(11) 99999-8888" },
];

export const stockItems: StockItem[] = [
  { id: "s1", name: "Cadeira Dobrável", quantity: 150, minQuantity: 30, category: "Mobiliário", status: "normal" },
  { id: "s2", name: "Mesa Redonda", quantity: 25, minQuantity: 10, category: "Mobiliário", status: "normal" },
  { id: "s3", name: "Toalha de Mesa", quantity: 8, minQuantity: 20, category: "Decoração", status: "baixo" },
  { id: "s4", name: "Arranjo Floral", quantity: 0, minQuantity: 10, category: "Decoração", status: "esgotado" },
  { id: "s5", name: "Luminária LED", quantity: 40, minQuantity: 15, category: "Iluminação", status: "normal" },
  { id: "s6", name: "Caixa de Som", quantity: 5, minQuantity: 5, category: "Áudio", status: "baixo" },
  { id: "s7", name: "Microfone", quantity: 12, minQuantity: 4, category: "Áudio", status: "normal" },
  { id: "s8", name: "Tenda 5x5", quantity: 3, minQuantity: 2, category: "Estrutura", status: "normal" },
  { id: "s9", name: "Tapete Vermelho", quantity: 2, minQuantity: 3, category: "Decoração", status: "baixo" },
  { id: "s10", name: "Projetor", quantity: 4, minQuantity: 2, category: "Equipamentos", status: "normal" },
];

export const products: Product[] = [
  { id: "p1", name: "Kit Mobiliário Básico", price: 1500, category: "Mobiliário", stockItemId: "s1", description: "50 cadeiras + 5 mesas" },
  { id: "p2", name: "Kit Decoração Completa", price: 3500, category: "Decoração", stockItemId: "s3", description: "Toalhas, arranjos e acessórios" },
  { id: "p3", name: "Kit Iluminação", price: 2000, category: "Iluminação", stockItemId: "s5", description: "20 luminárias LED + instalação" },
  { id: "p4", name: "Kit Áudio Completo", price: 4000, category: "Áudio", stockItemId: "s6", description: "4 caixas de som + 2 microfones" },
  { id: "p5", name: "Tenda Grande", price: 5000, category: "Estrutura", stockItemId: "s8", description: "Tenda 5x5 com montagem" },
  { id: "p6", name: "Kit Projeção", price: 1800, category: "Equipamentos", stockItemId: "s10", description: "Projetor + tela + cabos" },
];

export const services: Service[] = [
  { id: "sv1", name: "DJ Profissional", description: "DJ com equipamento completo", price: 3000, category: "Música" },
  { id: "sv2", name: "Buffet Completo", description: "Buffet para até 200 pessoas", price: 12000, category: "Alimentação" },
  { id: "sv3", name: "Fotografia", description: "Cobertura fotográfica completa", price: 2500, category: "Registro" },
  { id: "sv4", name: "Filmagem", description: "Filmagem + edição profissional", price: 4000, category: "Registro" },
  { id: "sv5", name: "Cerimonialista", description: "Planejamento e coordenação do evento", price: 5000, category: "Coordenação" },
  { id: "sv6", name: "Garçom (equipe)", description: "Equipe de 5 garçons", price: 2000, category: "Serviço" },
  { id: "sv7", name: "Bartender", description: "Bartender + bar móvel", price: 3500, category: "Bebidas" },
  { id: "sv8", name: "Segurança", description: "Equipe de segurança (4 profissionais)", price: 2800, category: "Segurança" },
];

export const events: Event[] = [
  { id: "e1", clientId: "c1", date: "2026-03-15", empresa: "tonho", status: "confirmado", title: "Casamento Maria", products: ["p1", "p2", "p3"], value: 7000 },
  { id: "e2", clientId: "c2", date: "2026-03-20", empresa: "chicas", status: "confirmado", title: "Aniversário João", services: ["sv1", "sv2", "sv6"], value: 17000 },
  { id: "e3", clientId: "c3", date: "2026-02-28", empresa: "tonho", status: "em_andamento", title: "Evento Corporativo Ana", products: ["p1", "p4", "p6"], value: 7300 },
  { id: "e4", clientId: "c4", date: "2026-04-10", empresa: "chicas", status: "confirmado", title: "Formatura Pedro", services: ["sv1", "sv2", "sv3", "sv5"], value: 22500 },
  { id: "e5", clientId: "c5", date: "2026-02-15", empresa: "tonho", status: "encerrado", title: "Feira Carla", products: ["p1", "p5"], value: 6500 },
  { id: "e6", clientId: "c6", date: "2026-03-25", empresa: "chicas", status: "confirmado", title: "Casamento Lucas", services: ["sv1", "sv2", "sv3", "sv4", "sv5", "sv6"], value: 28500 },
  { id: "e7", clientId: "c7", date: "2026-04-05", empresa: "tonho", status: "confirmado", title: "Workshop Beatriz", products: ["p3", "p6"], value: 3800 },
  { id: "e8", clientId: "c8", date: "2026-02-22", empresa: "chicas", status: "em_andamento", title: "Congresso Rafael", services: ["sv2", "sv5", "sv8"], value: 19800 },
];

export const budgets: Budget[] = [
  { id: "b1", clientId: "c1", empresa: "tonho", date: "2026-02-10", status: "aprovado", title: "Casamento Maria", items: ["p1", "p2", "p3"], value: 7000 },
  { id: "b2", clientId: "c2", empresa: "chicas", date: "2026-02-12", status: "enviado", title: "Aniversário João", items: ["sv1", "sv2", "sv6"], value: 17000 },
  { id: "b3", clientId: "c3", empresa: "tonho", date: "2026-02-14", status: "em_edicao", title: "Evento Corporativo Ana", items: ["p1", "p4", "p6"], value: 7300 },
  { id: "b4", clientId: "c4", empresa: "chicas", date: "2026-02-16", status: "recebido", title: "Formatura Pedro", items: ["sv1", "sv2", "sv3", "sv5"], value: 22500 },
  { id: "b5", clientId: "c5", empresa: "tonho", date: "2026-01-20", status: "oficializado", title: "Feira Carla", items: ["p1", "p5"], value: 6500 },
  { id: "b6", clientId: "c6", empresa: "chicas", date: "2026-02-18", status: "aprovado", title: "Casamento Lucas", items: ["sv1", "sv2", "sv3", "sv4", "sv5", "sv6"], value: 28500 },
  { id: "b7", clientId: "c7", empresa: "tonho", date: "2026-02-19", status: "enviado", title: "Workshop Beatriz", items: ["p3", "p6"], value: 3800 },
  { id: "b8", clientId: "c8", empresa: "chicas", date: "2026-02-20", status: "recebido", title: "Congresso Rafael", items: ["sv2", "sv5", "sv8"], value: 19800 },
  { id: "b9", clientId: "c1", empresa: "tonho", date: "2026-02-21", status: "recebido", title: "Outro evento Maria", items: ["p2", "p4"], value: 7500 },
  { id: "b10", clientId: "c3", empresa: "chicas", date: "2026-02-22", status: "em_edicao", title: "Festa Ana", items: ["sv1", "sv3", "sv7"], value: 9000 },
];

export const sales: Sale[] = [
  { id: "v1", clientId: "c1", date: "2026-02-05", products: ["p1", "p2"], value: 5000 },
  { id: "v2", clientId: "c3", date: "2026-02-08", products: ["p3"], value: 2000 },
  { id: "v3", clientId: "c5", date: "2026-01-28", products: ["p1", "p5"], value: 6500 },
  { id: "v4", clientId: "c7", date: "2026-02-12", products: ["p4", "p6"], value: 5800 },
  { id: "v5", clientId: "c2", date: "2026-02-15", products: ["p1"], value: 1500 },
  { id: "v6", clientId: "c4", date: "2026-01-15", products: ["p2", "p3"], value: 5500 },
  { id: "v7", clientId: "c6", date: "2026-02-18", products: ["p1", "p3", "p4"], value: 7500 },
  { id: "v8", clientId: "c8", date: "2026-01-20", products: ["p5", "p6"], value: 6800 },
];

export const teamMembers: TeamMember[] = [
  { id: "t1", name: "Carlos Admin", email: "carlos@admin.com", role: "gestor", permissions: ["tudo"] },
  { id: "t2", name: "Fernanda Gestora", email: "fernanda@admin.com", role: "gestor", permissions: ["tudo"] },
  { id: "t3", name: "Diego Equipe", email: "diego@equipe.com", role: "equipe", permissions: ["visualizar", "editar_orcamentos"] },
  { id: "t4", name: "Juliana Equipe", email: "juliana@equipe.com", role: "equipe", permissions: ["visualizar"] },
  { id: "t5", name: "Roberto Equipe", email: "roberto@equipe.com", role: "equipe", permissions: ["visualizar", "editar_orcamentos", "editar_estoque"] },
];

// ===== HELPERS =====

export const getClientName = (clientId: string): string => {
  return clients.find((c) => c.id === clientId)?.name ?? "Cliente desconhecido";
};

export const getProductName = (productId: string): string => {
  return products.find((p) => p.id === productId)?.name ?? "Produto desconhecido";
};

export const getServiceName = (serviceId: string): string => {
  return services.find((s) => s.id === serviceId)?.name ?? "Serviço desconhecido";
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatDate = (dateStr: string): string => {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

export const budgetStatusLabels: Record<Budget["status"], string> = {
  recebido: "Recebido",
  em_edicao: "Em Edição",
  enviado: "Enviado",
  aprovado: "Aprovado",
  oficializado: "Oficializado",
};

export const eventStatusLabels: Record<Event["status"], string> = {
  confirmado: "Confirmado",
  em_andamento: "Em Andamento",
  encerrado: "Encerrado",
};
