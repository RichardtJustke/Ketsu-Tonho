import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Search, Loader2, Eye } from "lucide-react";

const PAGE_SIZE = 12;

export default function TonhoVendas() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detailOrder, setDetailOrder] = useState<any | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      const { data } = await supabase.from("orders").select("*, profiles!inner(name, phone)").eq("platform", "tonho").eq("status", "completed").order("created_at", { ascending: false });
      setOrders(data ?? []);
      setLoading(false);

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
    };
    loadOrders();
  }, []);

  useEffect(() => { setPage(1); }, [search]);

  const filtered = useMemo(() => orders.filter((o) => (o.profiles as any)?.name?.toLowerCase().includes(search.toLowerCase())), [orders, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
            {paged.map((o) => (
              <div key={o.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-background space-y-3">
                {/* Header Info */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-xs text-muted-foreground uppercase font-medium">{formatDate(o.created_at)}</p>
                    <p className="font-bold text-base text-foreground">{(o.profiles as any)?.name}</p>
                  </div>
                  <StatusBadge status="success" label={orderStatusLabel(o.status)} />
                </div>

                {/* Amount */}
                <div className="border-t pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Valor total:</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(Number(o.total_amount))}</span>
                  </div>
                </div>

                {/* Extra info */}
                <div className="text-xs space-y-1 border-t pt-3">
                  {o.event_date && (
                    <p className="text-muted-foreground">📅 Evento: <span className="font-semibold text-foreground">{formatDate(o.event_date)}</span></p>
                  )}
                  {(o.profiles as any)?.phone && (
                    <p className="text-muted-foreground">📞 <span className="font-semibold text-foreground">{(o.profiles as any).phone}</span></p>
                  )}
                  {Number(o.discount_amount) > 0 && (
                    <p className="text-green-600">🏷️ Desconto: <span className="font-semibold">-{formatCurrency(Number(o.discount_amount))}</span></p>
                  )}
                </div>

                <div className="pt-2 space-y-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => setDetailOrder(o)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes {orderItems[o.id]?.length > 0 ? `(${orderItems[o.id].length} itens)` : ""}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-12 px-6">
              Nenhuma venda encontrada.
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, currentPage - 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" isActive={p === currentPage} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, currentPage + 1)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Order Details Modal */}
      <Dialog open={!!detailOrder} onOpenChange={(open) => { if (!open) setDetailOrder(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="font-semibold text-foreground">{(detailOrder.profiles as any)?.name ?? "Cliente desconhecido"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data da Venda</p>
                  <p className="font-semibold text-foreground">{formatDate(detailOrder.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1"><StatusBadge status="success" label={orderStatusLabel(detailOrder.status)} /></div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                {(detailOrder.profiles as any)?.phone && (
                  <div>
                    <p className="text-xs text-muted-foreground">📞 Telefone</p>
                    <p className="font-semibold text-foreground">{(detailOrder.profiles as any).phone}</p>
                  </div>
                )}
                {detailOrder.event_date && (
                  <div>
                    <p className="text-xs text-muted-foreground">📅 Data do Evento</p>
                    <p className="font-semibold text-foreground">{formatDate(detailOrder.event_date)}</p>
                  </div>
                )}
                {detailOrder.notes && (
                  <div>
                    <p className="text-xs text-muted-foreground">📝 Notas</p>
                    <p className="font-semibold text-foreground">{detailOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-semibold uppercase text-muted-foreground">Itens do Pedido</p>
                <div className="space-y-2">
                  {orderItems[detailOrder.id]?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.product_key}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Qtd: <span className="font-semibold text-foreground">{item.quantity}</span></p>
                        <p className="font-semibold text-primary">{formatCurrency(Number(item.unit_price) * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 bg-muted/50 p-4 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(Number(detailOrder.subtotal))}</span>
                </div>
                {Number(detailOrder.discount_amount) > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Desconto ({detailOrder.coupon_code}):</span>
                    <span className="font-semibold">-{formatCurrency(Number(detailOrder.discount_amount))}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t pt-2 text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-primary">{formatCurrency(Number(detailOrder.total_amount))}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}