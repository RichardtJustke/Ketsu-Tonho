export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("pt-BR");
};

export const orderStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    pending: "Pendente",
    confirmed: "Confirmado",
    paid: "Pago",
    in_progress: "Em Andamento",
    completed: "Concluído",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
  };
  return map[status] ?? status;
};

export const bookingStatusLabel = (status: string): string => {
  const map: Record<string, string> = {
    pending: "Pendente",
    confirmed: "Confirmado",
    in_progress: "Em Andamento",
    returned: "Devolvido",
    cancelled: "Cancelado",
  };
  return map[status] ?? status;
};
