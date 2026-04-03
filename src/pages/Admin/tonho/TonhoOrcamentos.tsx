import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { OrderModifyModal } from "../components/OrderModifyModal.tsx";
import { Search, Loader2, Eye, Calendar, Phone, Clock, FileEdit, Download, Send, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAGE_SIZE = 12;

export default function TonhoOrcamentos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [detailOrder, setDetailOrder] = useState<any | null>(null);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [editingOrderItems, setEditingOrderItems] = useState<any[]>([]);
  const { toast } = useToast();

  const loadOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*, profiles!orders_user_id_profiles_fkey(name, phone)")
      .eq("platform", "tonho")
      .in("status", ["pending", "confirmed", "paid"])
      .order("created_at", { ascending: false });
    
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

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => { setPage(1); }, [search]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
      if (error) throw error;
      
      setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      toast({ title: "Status atualizado com sucesso!" });
    } catch (error) {
      toast({ title: "Erro ao atualizar status", variant: "destructive" });
    }
  };

  const filtered = useMemo(() => orders.filter((o) => (o.profiles as any)?.name?.toLowerCase().includes(search.toLowerCase())), [orders, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (loading && orders.length === 0) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orçamentos — Tonho</h1>
        <p className="text-muted-foreground">Pedidos em negociação e propostas abertas</p>
      </div>
      
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por cliente..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6">
            {paged.map((o) => (
              <div key={o.id} className="border border-border/60 rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all bg-card flex flex-col space-y-4">
                {/* Header Info */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(o.created_at)}
                    </p>
                    <p className="font-bold text-base text-foreground line-clamp-1" title={(o.profiles as any)?.name}>
                      {(o.profiles as any)?.name ?? "Cliente desconhecido"}
                    </p>
                  </div>
                  <StatusBadge 
                    status={o.status === "paid" ? "success" : o.status === "pending" ? "warning" : o.status === "confirmed" ? "primary" : "neutral"} 
                    label={orderStatusLabel(o.status)} 
                  />
                </div>

                {/* Amount */}
                <div className="pb-3 border-b border-border/50">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Valor total do pedido:</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(Number(o.total_amount))}</span>
                  </div>
                </div>

                {/* Extra info */}
                <div className="text-xs space-y-2 flex-1">
                  {o.event_date && (
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 mr-2" />
                      Data: <span className="font-semibold text-foreground ml-1">{formatDate(o.event_date)}</span>
                    </div>
                  )}
                  {(o.profiles as any)?.phone && (
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      <span className="font-semibold text-foreground">{(o.profiles as any).phone}</span>
                    </div>
                  )}
                  {Number(o.discount_amount) > 0 && (
                    <div className="flex items-center text-green-600 font-medium">
                      🏷️ Desconto: -{formatCurrency(Number(o.discount_amount))} ({o.coupon_code})
                    </div>
                  )}
                </div>

                <div className="pt-3 flex flex-col gap-2 border-t border-border/50">
                  {/* Select for Editing Status in Card */}
                  <Select value={o.status} onValueChange={(val) => updateStatus(o.id, val)}>
                    <SelectTrigger className="h-8 text-xs w-full border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                      <SelectValue placeholder="Alterar Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente (Proposta)</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="paid">Pago</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2 w-full justify-between items-center">
                    <div className="flex gap-1.5">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        disabled={o.status !== "pending"} 
                        className="h-8 w-8 disabled:opacity-40 disabled:cursor-not-allowed" 
                        onClick={() => {
                          if (o.status === "pending") {
                            setEditingOrder(o);
                            setEditingOrderItems(orderItems[o.id] || []);
                          }
                        }} 
                        title={o.status === "pending" ? "Editar Orçamento" : "Disponível apenas para Propostas"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground" 
                        onClick={() => toast({ title: "Baixar Orçamento", description: "Geração de PDF em breve." })} 
                        title="Baixar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground" 
                        onClick={() => toast({ title: "Enviar Orçamento", description: "Compartilhamento em breve." })} 
                        title="Enviar para Cliente"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white" onClick={() => setDetailOrder(o)}>
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Detalhes</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-16 px-6 flex flex-col items-center">
              <FileEdit className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="font-medium text-lg">Nenhum orçamento encontrado.</p>
              <p className="text-sm">Não há nenhum pedido em negociação correspondente à sua busca.</p>
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
          items={editingOrderItems}
          onSave={loadOrders}
        />
      )}

      {/* Detail Dialog */}
      <Dialog open={!!detailOrder} onOpenChange={(open) => !open && setDetailOrder(null)}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalhes do Orçamento</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-6 pt-4">
              <div className="flex items-start justify-between bg-muted/30 p-4 rounded-lg border">
                <div>
                  <p className="font-bold text-lg">{(detailOrder.profiles as any)?.name}</p>
                  <p className="text-sm text-muted-foreground">ID do Pedido: {detailOrder.id.split('-')[0]}</p>
                </div>
                <StatusBadge 
                  status={detailOrder.status === "paid" ? "success" : detailOrder.status === "pending" ? "warning" : detailOrder.status === "confirmed" ? "primary" : "neutral"} 
                  label={orderStatusLabel(detailOrder.status)} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/10 p-4 rounded-lg border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">📅 Data de Criação</p>
                  <p className="font-medium">{formatDate(detailOrder.created_at)}</p>
                </div>
                {detailOrder.event_date && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">📅 Data do Evento</p>
                    <p className="font-medium text-primary">{formatDate(detailOrder.event_date)}</p>
                  </div>
                )}
                {(detailOrder.profiles as any)?.phone && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">📞 Telefone / Contato</p>
                    <p className="font-semibold text-foreground">{(detailOrder.profiles as any).phone}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">✏️ Editar Status (Atualizar andamento)</p>
                  <Select value={detailOrder.status} onValueChange={(val) => { updateStatus(detailOrder.id, val); setDetailOrder({...detailOrder, status: val}); }}>
                    <SelectTrigger className="h-9 w-full sm:w-[200px] mt-1 bg-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente (Proposta)</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="paid">Pago</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {detailOrder.notes && (
                  <div className="col-span-2 mt-2">
                    <p className="text-xs text-muted-foreground uppercase mb-1">📝 Notas / Observações</p>
                    <p className="font-semibold text-foreground bg-muted/30 p-2 rounded text-sm italic">{detailOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 space-y-3">
                <p className="text-sm font-bold uppercase text-muted-foreground tracking-wider flex items-center justify-between">
                  <span>Itens Solicitados</span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{orderItems[detailOrder.id]?.length || 0} itens</span>
                </p>
                <div className="space-y-2">
                  {orderItems[detailOrder.id]?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      {item.image && (
                         <div className="w-12 h-12 rounded overflow-hidden shrink-0 border bg-muted flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">{item.product_key || "Item de orçamento"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Qtd: <span className="font-bold text-foreground">{item.quantity}</span></p>
                        <p className="font-bold text-primary flex items-end justify-end gap-1">
                          <span className="text-[10px] text-muted-foreground font-normal">Subtotal:</span>
                          {formatCurrency(Number(item.unit_price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-primary/20 bg-primary/5 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Subtotal dos itens:</span>
                  <span className="font-bold">{formatCurrency(Number(detailOrder.subtotal))}</span>
                </div>
                {Number(detailOrder.discount_amount) > 0 && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span className="font-medium">Desconto aplicado ({detailOrder.coupon_code}):</span>
                    <span className="font-bold">-{formatCurrency(Number(detailOrder.discount_amount))}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-primary/20 pt-3 mt-1">
                  <span className="font-black text-lg text-primary uppercase">Valor Final:</span>
                  <span className="font-black text-2xl text-primary">{formatCurrency(Number(detailOrder.total_amount))}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
