import { Badge } from "./ui/badge.tsx";
import { cn } from "../lib/utils.ts";

type StatusType = "success" | "warning" | "danger" | "neutral" | "primary";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusStyles: Record<StatusType, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/15 text-primary border-primary/30",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[status])}>
      {label}
    </Badge>
  );
}

// Helpers for mapping data statuses to badge variants
export function stockStatusBadge(status: "normal" | "baixo" | "esgotado") {
  const map: Record<string, { status: StatusType; label: string }> = {
    normal: { status: "success", label: "Normal" },
    baixo: { status: "warning", label: "Baixo" },
    esgotado: { status: "danger", label: "Esgotado" },
  };
  return <StatusBadge {...map[status]} />;
}

export function budgetStatusBadge(status: string) {
  const map: Record<string, { status: StatusType; label: string }> = {
    recebido: { status: "neutral", label: "Recebido" },
    em_edicao: { status: "warning", label: "Em Edição" },
    enviado: { status: "primary", label: "Enviado" },
    aprovado: { status: "success", label: "Aprovado" },
    oficializado: { status: "success", label: "Oficializado" },
  };
  return <StatusBadge {...(map[status] ?? { status: "neutral", label: status })} />;
}

export function eventStatusBadge(status: string) {
  const map: Record<string, { status: StatusType; label: string }> = {
    confirmado: { status: "success", label: "Confirmado" },
    em_andamento: { status: "primary", label: "Em Andamento" },
    encerrado: { status: "neutral", label: "Encerrado" },
  };
  return <StatusBadge {...(map[status] ?? { status: "neutral", label: status })} />;
}
