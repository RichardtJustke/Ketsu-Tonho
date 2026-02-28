import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { Button } from "./components/ui/button.tsx";
import { budgetStatusBadge } from "./components/StatusBagde.tsx";
import { budgets as initialBudgets, getClientName, formatCurrency, formatDate } from "./data/mock-data.ts";
import { type Budget } from "./data/mock-data.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.tsx";
import { ArrowRight, FileText } from "lucide-react";

const statusFlow: Budget["status"][] = ["recebido", "em_edicao", "enviado", "aprovado", "oficializado"];

export default function CentralOrcamentos() {
  const [budgetList, setBudgetList] = useState(initialBudgets);
  const [filterEmpresa, setFilterEmpresa] = useState<string>("todas");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  const filtered = budgetList
    .filter((b) => filterEmpresa === "todas" || b.empresa === filterEmpresa)
    .filter((b) => filterStatus === "todos" || b.status === filterStatus);

  const advanceStatus = (id: string) => {
    setBudgetList((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const idx = statusFlow.indexOf(b.status);
        if (idx < statusFlow.length - 1) return { ...b, status: statusFlow[idx + 1] };
        return b;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Central de Orçamentos</h1>
        <p className="text-muted-foreground">Todos os orçamentos — Tonho & Chicas</p>
      </div>

      {/* Flow visual */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {statusFlow.map((status, i) => (
              <div key={status} className="flex items-center gap-2">
                {budgetStatusBadge(status)}
                {i < statusFlow.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={filterEmpresa} onValueChange={setFilterEmpresa}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="tonho">Tonho</SelectItem>
            <SelectItem value="chicas">Chicas</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="recebido">Recebido</SelectItem>
            <SelectItem value="em_edicao">Em Edição</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="oficializado">Oficializado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{formatDate(b.date)}</TableCell>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell><span className="text-xs font-medium uppercase text-muted-foreground">{b.empresa}</span></TableCell>
                  <TableCell>{getClientName(b.clientId)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(b.value)}</TableCell>
                  <TableCell className="text-center">{budgetStatusBadge(b.status)}</TableCell>
                  <TableCell className="text-center">
                    {b.status !== "oficializado" && (
                      <Button variant="outline" size="sm" onClick={() => advanceStatus(b.id)}>
                        Avançar <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
