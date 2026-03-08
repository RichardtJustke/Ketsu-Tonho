import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Loader2 } from "lucide-react";

export default function ChicasOrcamentos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*, profiles!inner(name)").eq("platform", "chicas").in("status", ["pending", "confirmed", "paid"]).order("created_at", { ascending: false }).then(({ data }) => {
      setOrders(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orçamentos — Chicas</h1>
        <p className="text-muted-foreground">Pedidos em negociação</p>
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
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{formatDate(o.created_at)}</TableCell>
                  <TableCell className="font-medium">{(o.profiles as any)?.name}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(Number(o.total_amount))}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={o.status === "paid" ? "success" : o.status === "pending" ? "warning" : "primary"} label={orderStatusLabel(o.status)} />
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Nenhum orçamento pendente.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
