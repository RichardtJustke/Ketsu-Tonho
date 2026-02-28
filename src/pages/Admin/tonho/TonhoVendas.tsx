import { useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Input } from "../components/ui/input.tsx";
import { sales, getClientName, getProductName, formatCurrency, formatDate } from "../data/mock-data.ts";
import { Search } from "lucide-react";

export default function TonhoVendas() {
  const [search, setSearch] = useState("");
  const filtered = sales.filter((s) => getClientName(s.clientId).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendas — Tonho</h1>
        <p className="text-muted-foreground">Histórico de vendas</p>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por cliente..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell className="font-medium">{getClientName(sale.clientId)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{sale.products.map(getProductName).join(", ")}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(sale.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
