import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { budgetStatusBadge } from "../components/StatusBagde.tsx";
import { budgets, getClientName, formatCurrency, formatDate } from "../data/mock-data.ts";

export default function ChicasOrcamentos() {
  const chicasBudgets = budgets.filter((b) => b.empresa === "chicas");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orçamentos — Chicas</h1>
        <p className="text-muted-foreground">Orçamentos em negociação</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chicasBudgets.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{formatDate(b.date)}</TableCell>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>{getClientName(b.clientId)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(b.value)}</TableCell>
                  <TableCell className="text-center">{budgetStatusBadge(b.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
