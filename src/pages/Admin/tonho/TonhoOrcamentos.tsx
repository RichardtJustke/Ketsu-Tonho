import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

export default function TonhoOrcamentos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("orders").select("*, profiles!orders_user_id_profiles_fkey(name, phone)").eq("platform", "tonho").in("status", ["pending", "confirmed", "paid"]).order("created_at", { ascending: false });
      setOrders(data ?? []);

      if (data && data.length > 0) {
        const orderIds = data.map((o: any) => o.id);
        const { data: items } = await supabase.from("order_items").select("*").in("order_id", orderIds);
        const grouped: Record<string, any[]> = {};
        (items ?? []).forEach((item: any) => {
          if (!grouped[item.order_id]) grouped[item.order_id] = [];
          grouped[item.order_id].push(item);
        });
        setOrderItems(grouped);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orçamentos — Tonho</h1>
        <p className="text-muted-foreground">Pedidos em negociação</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <>
                  <TableRow key={o.id} className="cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                    <TableCell className="px-2">
                      {orderItems[o.id]?.length ? (
                        expandedOrder === o.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : null}
                    </TableCell>
                    <TableCell>{formatDate(o.created_at)}</TableCell>
                    <TableCell className="font-medium">{(o.profiles as any)?.name ?? "Cliente desconhecido"}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(Number(o.total_amount))}</TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={o.status === "paid" ? "success" : o.status === "pending" ? "warning" : "primary"} label={orderStatusLabel(o.status)} />
                    </TableCell>
                  </TableRow>
                  {expandedOrder === o.id && orderItems[o.id] && (
                    <TableRow key={`${o.id}-items`}>
                      <TableCell colSpan={5} className="bg-muted/50 p-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-4 mb-3">
                            {o.event_date && (
                              <p className="text-xs text-muted-foreground">📅 Data do evento: <span className="font-semibold text-foreground">{formatDate(o.event_date)}</span></p>
                            )}
                            {(o.profiles as any)?.phone && (
                              <p className="text-xs text-muted-foreground">📞 Telefone: <span className="font-semibold text-foreground">{(o.profiles as any).phone}</span></p>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Itens do pedido</p>
                          {o.notes && <p className="text-xs text-muted-foreground mb-2">📝 {o.notes}</p>}
                          <div className="divide-y divide-border rounded-md border bg-background">
                            {orderItems[o.id].map((item: any) => (
                              <div key={item.id} className="flex items-center gap-3 p-3">
                                {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.product_key}</p>
                                </div>
                                <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                                <span className="text-sm font-medium">{formatCurrency(Number(item.unit_price) * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              {orders.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhum orçamento pendente.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
