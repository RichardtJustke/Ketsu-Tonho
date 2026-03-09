import { Fragment, useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { Button } from "./components/ui/button.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./components/ui/pagination.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "./data/utils.ts";
import { StatusBadge } from "./components/StatusBagde.tsx";
import { ArrowRight, ChevronDown, ChevronUp, Loader2, MoreVertical, Check, Pencil, DollarSign, XCircle } from "lucide-react";
import { OrderModifyModal } from "./components/OrderModifyModal.tsx";

const PAGE_SIZE = 12;
const statusFlow = ["pending", "confirmed", "paid", "completed"];

export default function CentralOrcamentos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [filterPlatform, setFilterPlatform] = useState("todas");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  
  // Modal state
  const [editingOrder, setEditingOrder] = useState<any | null>(null);

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

      <div className="flex flex-wrap gap-3">
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
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((o) => (
                <Fragment key={o.id}>
                  <TableRow className="cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                    <TableCell className="px-2">
                      {orderItems[o.id]?.length ? (
                        expandedOrder === o.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : null}
                    </TableCell>
                    <TableCell>{formatDate(o.created_at)}</TableCell>
                    <TableCell><span className="text-xs font-medium uppercase text-muted-foreground">{o.platform}</span></TableCell>
                    <TableCell className="font-medium">{(o.profiles as any)?.name ?? "Cliente desconhecido"}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(Number(o.total_amount))}</TableCell>
                    <TableCell className="text-center">{statusBadge(o.status, o.was_modified)}</TableCell>
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      {(o.status === "pending" || o.status === "confirmed" || o.status === "paid") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {o.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleApproveOrder(o)}>
                                  <Check className="mr-2 h-4 w-4 text-green-600" />
                                  Aprovar Pedido
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleModifyOrder(o)}>
                                  <Pencil className="mr-2 h-4 w-4 text-amber-600" />
                                  Modificar Pedido
                                </DropdownMenuItem>
                              </>
                            )}
                            {o.status === "confirmed" && (
                              <DropdownMenuItem onClick={() => advanceStatus(o.id, o.status)}>
                                <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                                Confirmar Pagamento
                              </DropdownMenuItem>
                            )}
                            {o.status === "paid" && (
                              <DropdownMenuItem onClick={() => advanceStatus(o.id, o.status)}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Marcar como Concluído
                              </DropdownMenuItem>
                            )}
                            {(o.status === "pending" || o.status === "confirmed") && (
                              <DropdownMenuItem onClick={() => cancelOrder(o.id)} className="text-destructive focus:text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancelar Pedido
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedOrder === o.id && orderItems[o.id] && (
                    <TableRow key={`${o.id}-items`}>
                      <TableCell colSpan={7} className="bg-muted/50 p-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-4 mb-3">
                            {o.event_date && (
                              <p className="text-xs text-muted-foreground">📅 Data do evento: <span className="font-semibold text-foreground">{formatDate(o.event_date)}</span></p>
                            )}
                            {(o.profiles as any)?.phone && (
                              <p className="text-xs text-muted-foreground">📞 Telefone: <span className="font-semibold text-foreground">{(o.profiles as any).phone}</span></p>
                            )}
                            {Number(o.discount_amount) > 0 && (
                              <p className="text-xs text-muted-foreground">🏷️ Cupom: <span className="font-semibold text-foreground">{o.coupon_code}</span> — Desconto: <span className="font-semibold text-green-600">-{formatCurrency(Number(o.discount_amount))}</span></p>
                            )}
                            {o.was_modified && (
                              <p className="text-xs text-amber-600 font-medium">✏️ Pedido modificado pelo admin</p>
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
                </Fragment>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
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
    </div>
  );
}
