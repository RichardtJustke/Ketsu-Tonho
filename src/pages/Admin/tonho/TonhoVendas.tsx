import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Input } from "../components/ui/input.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Search, Loader2 } from "lucide-react";

export default function TonhoVendas() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.from("orders").select("*, profiles!inner(name)").eq("platform", "tonho").eq("status", "completed").order("created_at", { ascending: false }).then(({ data }) => {
      setOrders(data ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = orders.filter((o) => (o.profiles as any)?.name?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vendas — Tonho</h1>
        <p className="text-muted-foreground">Pedidos concluídos</p>
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
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{formatDate(o.created_at)}</TableCell>
                  <TableCell className="font-medium">{(o.profiles as any)?.name}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(Number(o.total_amount))}</TableCell>
                  <TableCell className="text-center"><StatusBadge status="success" label={orderStatusLabel(o.status)} /></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Nenhuma venda encontrada.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
