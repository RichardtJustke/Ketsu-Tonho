import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "./components/ui/card.tsx";
import { Button } from "./components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "./data/utils.ts";
import { StatusBadge } from "./components/StatusBagde.tsx";
import { ArrowRight, Loader2, MoreVertical, Check, Pencil, DollarSign, XCircle, Eye, Plus, Download } from "lucide-react";
import { OrderModifyModal } from "./components/OrderModifyModal.tsx";
import { CreateOrderModal } from "./components/CreateOrderModal.tsx";
import { generateOrderPdf } from "./utils/generateOrderPdf.ts";

const PAGE_SIZE = 12;
const statusFlow = ["pending", "confirmed", "paid", "completed"];

export default function CentralOrcamentos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [filterPlatform, setFilterPlatform] = useState("todas");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [page, setPage] = useState(1);
  
  // Modal states
  const [detailOrder, setDetailOrder] = useState<any | null>(null);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadOrders = async () => {
    const { data } = await supabase.from("orders").select("*, profiles!orders_user_id_profiles_fkey(name, phone)").order("created_at", { ascending: false });
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

  useEffect(() => { loadOrders(); }, []);
  useEffect(() => { setPage(1); }, [filterPlatform, filterStatus]);

  const filtered = useMemo(() => orders
    .filter((o) => filterPlatform === "todas" || o.platform === filterPlatform)
    .filter((o) => filterStatus === "todos" || o.status === filterStatus),
  [orders, filterPlatform, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const advanceStatus = async (id: string, currentStatus: string, wasModified?: boolean) => {
    const idx = statusFlow.indexOf(currentStatus);
    if (idx < statusFlow.length - 1) {
      const nextStatus = statusFlow[idx + 1];
      await supabase.from("orders").update({ status: nextStatus }).eq("id", id);

      if (currentStatus === "pending" && nextStatus === "confirmed") {
        const notificationType = wasModified ? "order_confirmed_modified" : "order_confirmed";
        supabase.functions.invoke("send-order-notification", {
          body: { order_id: id, type: notificationType },
        }).catch((err) => console.warn("Email notification failed:", err));
      }

      loadOrders();
    }
  };

  const cancelOrder = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja cancelar este pedido? O estoque será restaurado automaticamente.")) return;
    await supabase.from("orders").update({ status: "cancelled" }).eq("id", id);
    loadOrders();
  };

  const handleApproveOrder = (order: any) => {
    advanceStatus(order.id, order.status, order.was_modified);
  };

  const handleModifyOrder = (order: any) => {
    setEditingOrder(order);
  };

  const statusBadge = (status: string, wasModified?: boolean) => {
    const map: Record<string, "success" | "warning" | "primary" | "neutral"> = {
      pending: "warning", confirmed: "primary", paid: "success", in_progress: "primary", completed: "success", cancelled: "danger" as any, refunded: "neutral",
    };
    return (
      <div className="flex items-center gap-1 justify-center">
        <StatusBadge status={map[status] ?? "neutral"} label={orderStatusLabel(status)} />
        {wasModified && <span className="text-xs text-amber-600" title="Pedido modificado">✏️</span>}
      </div>
    );
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Central de Pedidos</h1>
        <p className="text-muted-foreground">Todos os pedidos — Tonho & Chicas</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select value={filterPlatform} onValueChange={setFilterPlatform}>
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
            {statusFlow.map((s) => <SelectItem key={s} value={s}>{orderStatusLabel(s)}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button onClick={() => setShowCreateModal(true)} className="ml-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
            {paged.map((o) => (
              <div key={o.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-background space-y-3">
                {/* Header: Status Badge */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-xs text-muted-foreground uppercase font-medium">{formatDate(o.created_at)}</p>
                    <p className="font-bold text-base text-foreground">{(o.profiles as any)?.name ?? "Cliente desconhecido"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground bg-muted px-2 py-1 rounded">
                      {o.platform}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <div>{statusBadge(o.status, o.was_modified)}</div>
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

                {/* Items count + Action buttons */}
                <div className="pt-2 space-y-2 border-t">
                  <div className="flex gap-2">
                    {orderItems[o.id]?.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => setDetailOrder(o)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Detalhes ({orderItems[o.id].length})
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => generateOrderPdf(
                        {
                          name: (o.profiles as any)?.name,
                          email: (o.profiles as any)?.email,
                          phone: (o.profiles as any)?.phone,
                          cpf: (o.profiles as any)?.cpf,
                        },
                        {
                          id: o.id,
                          created_at: o.created_at,
                          event_date: o.event_date,
                          status: o.status,
                          platform: o.platform,
                          subtotal: Number(o.subtotal),
                          discount_amount: Number(o.discount_amount),
                          total_amount: Number(o.total_amount),
                          coupon_code: o.coupon_code,
                          notes: o.notes,
                        },
                        orderItems[o.id] ?? []
                      )}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Actions Menu */}
                  {(o.status === "pending" || o.status === "confirmed" || o.status === "paid") && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          <MoreVertical className="h-4 w-4 mr-2" />
                          Ações
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {o.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApproveOrder(o)} className="text-green-600">
                              <Check className="mr-2 h-4 w-4" />
                              Aprovar Pedido
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleModifyOrder(o)} className="text-amber-600">
                              <Pencil className="mr-2 h-4 w-4" />
                              Modificar Pedido
                            </DropdownMenuItem>
                          </>
                        )}
                        {o.status === "confirmed" && (
                          <DropdownMenuItem onClick={() => advanceStatus(o.id, o.status)} className="text-green-600">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Confirmar Pagamento
                          </DropdownMenuItem>
                        )}
                        {o.status === "paid" && (
                          <DropdownMenuItem onClick={() => advanceStatus(o.id, o.status)} className="text-green-600">
                            <Check className="mr-2 h-4 w-4" />
                            Marcar Concluído
                          </DropdownMenuItem>
                        )}
                        {(o.status === "pending" || o.status === "confirmed") && (
                          <DropdownMenuItem onClick={() => cancelOrder(o.id)} className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancelar Pedido
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-12 px-6">
              Nenhum pedido encontrado.
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
            <DialogTitle>Detalhes do Pedido</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-6 py-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="font-semibold text-foreground">{(detailOrder.profiles as any)?.name ?? "Cliente desconhecido"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Data do Pedido</p>
                  <p className="font-semibold text-foreground">{formatDate(detailOrder.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Plataforma</p>
                  <p className="font-semibold uppercase text-sm text-foreground">{detailOrder.platform}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="mt-1">{statusBadge(detailOrder.status, detailOrder.was_modified)}</div>
                </div>
              </div>

              {/* Contact & Event Info */}
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

              {/* Items Section */}
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

              {/* Pricing Summary */}
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

      {/* Order Modify Modal */}
      {editingOrder && (
        <OrderModifyModal
          open={!!editingOrder}
          onClose={() => setEditingOrder(null)}
          order={{
            id: editingOrder.id,
            platform: editingOrder.platform,
            discount_amount: Number(editingOrder.discount_amount),
            subtotal: Number(editingOrder.subtotal),
            total_amount: Number(editingOrder.total_amount),
            event_date: editingOrder.event_date,
          }}
          items={orderItems[editingOrder.id] ?? []}
          onSave={loadOrders}
        />
      )}
      {/* Create Order Modal */}
      <CreateOrderModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={() => { setShowCreateModal(false); loadOrders(); }}
      />
    </div>
  );
}
