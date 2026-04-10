import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Textarea } from "./ui/textarea.tsx";
import { Label } from "./ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover.tsx";
import { Calendar } from "./ui/calendar.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { Trash2, Plus, Search, Loader2, Minus, CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils.ts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CatalogItem {
  id: string;
  name: string;
  product_key?: string;
  daily_price?: number;
  price_per_serving?: number;
}

interface OrderItem {
  name: string;
  product_key: string;
  quantity: number;
  unit_price: number;
}

interface CustomerOption {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function CreateOrderModal({ open, onClose, onSave }: Props) {
  const [platform, setPlatform] = useState<"tonho" | "chicas">("tonho");
  const [status, setStatus] = useState<string>("confirmed");
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);

  // Customer search
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerOption | null>(null);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [showCustomerResults, setShowCustomerResults] = useState(false);

  // Item search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CatalogItem[]>([]);
  const [searching, setSearching] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setPlatform("tonho");
      setStatus("confirmed");
      setEventDate(undefined);
      setNotes("");
      setItems([]);
      setSelectedCustomer(null);
      setCustomerSearch("");
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [open]);

  // Search customers (exclude admins)
  const searchCustomers = async (query: string) => {
    setCustomerSearch(query);
    if (query.length < 2) {
      setCustomers([]);
      setShowCustomerResults(false);
      return;
    }
    setLoadingCustomers(true);
    try {
      const { data: adminRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");
      const adminIds = new Set((adminRoles ?? []).map((r: any) => r.user_id));

      const { data } = await supabase
        .from("profiles")
        .select("id, name, email, phone")
        .ilike("name", `%${query}%`)
        .limit(10);

      setCustomers((data ?? []).filter((p) => !adminIds.has(p.id)));
      setShowCustomerResults(true);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const selectCustomer = (c: CustomerOption) => {
    setSelectedCustomer(c);
    setCustomerSearch(c.name ?? c.email ?? "");
    setShowCustomerResults(false);
  };

  // Search catalog items
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      if (platform === "tonho") {
        const { data } = await supabase
          .from("equipment")
          .select("id, name, product_key, daily_price")
          .ilike("name", `%${searchQuery}%`)
          .eq("is_active", true)
          .limit(10);
        setSearchResults(
          (data ?? []).map((e) => ({
            id: e.id,
            name: e.name,
            product_key: e.product_key ?? e.id,
            daily_price: e.daily_price,
          }))
        );
      } else {
        const { data } = await supabase
          .from("menu_items")
          .select("id, name, price_per_serving")
          .ilike("name", `%${searchQuery}%`)
          .eq("is_active", true)
          .limit(10);
        setSearchResults(
          (data ?? []).map((m) => ({
            id: m.id,
            name: m.name,
            product_key: m.id,
            price_per_serving: m.price_per_serving,
          }))
        );
      }
    } finally {
      setSearching(false);
    }
  };

  const addItem = (item: CatalogItem) => {
    const key = item.product_key ?? item.id;
    const price = item.daily_price ?? item.price_per_serving ?? 0;
    const existing = items.find((i) => i.product_key === key);
    if (existing) {
      setItems(items.map((i) => (i.product_key === key ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setItems([...items, { name: item.name, product_key: key, quantity: 1, unit_price: price }]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const updateQuantity = (idx: number, delta: number) => {
    const newQty = items[idx].quantity + delta;
    if (newQty < 1) return;
    setItems(items.map((it, i) => (i === idx ? { ...it, quantity: newQty } : it)));
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const subtotal = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

  const handleSave = async () => {
    if (!selectedCustomer || items.length === 0) return;
    setSaving(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: selectedCustomer.id,
          platform,
          event_date: eventDate ? format(eventDate, "yyyy-MM-dd") : null,
          status: status as any,
          subtotal,
          total_amount: subtotal,
          notes: notes.trim() || null,
        })
        .select()
        .single();

      if (error || !order) throw error;

      const insertItems = items.map((i) => ({
        order_id: order.id,
        name: i.name,
        product_key: i.product_key,
        quantity: i.quantity,
        unit_price: i.unit_price,
      }));
      await supabase.from("order_items").insert(insertItems);

      onSave();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const canSave = !!selectedCustomer && items.length > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Pedido Manual</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cliente */}
          <div className="space-y-1.5 relative">
            <Label>Cliente *</Label>
            {selectedCustomer ? (
              <div className="flex items-center gap-2 p-2 border rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="font-medium text-sm">{selectedCustomer.name ?? "Sem nome"}</p>
                  <p className="text-xs text-muted-foreground">{selectedCustomer.email} {selectedCustomer.phone && `• ${selectedCustomer.phone}`}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setSelectedCustomer(null); setCustomerSearch(""); }}>
                  Trocar
                </Button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar cliente por nome..."
                    value={customerSearch}
                    onChange={(e) => searchCustomers(e.target.value)}
                    className="text-sm"
                  />
                  {loadingCustomers && <Loader2 className="h-4 w-4 animate-spin mt-2.5" />}
                </div>
                {showCustomerResults && customers.length > 0 && (
                  <div className="absolute z-10 top-full left-0 right-0 border rounded-lg bg-background shadow-lg max-h-32 overflow-y-auto mt-1">
                    {customers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => selectCustomer(c)}
                        className="w-full text-left p-2 hover:bg-muted/50 text-sm border-b last:border-b-0"
                      >
                        <span className="font-medium">{c.name ?? "Sem nome"}</span>
                        <span className="text-xs text-muted-foreground ml-2">{c.email}</span>
                      </button>
                    ))}
                  </div>
                )}
                {showCustomerResults && customers.length === 0 && customerSearch.length >= 2 && !loadingCustomers && (
                  <p className="text-xs text-muted-foreground mt-1">Nenhum cliente encontrado</p>
                )}
              </>
            )}
          </div>

          {/* Plataforma + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Plataforma *</Label>
              <Select value={platform} onValueChange={(v) => { setPlatform(v as any); setItems([]); setSearchResults([]); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tonho">Tonho</SelectItem>
                  <SelectItem value="chicas">Chicas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data do Evento */}
          <div className="space-y-1.5">
            <Label>Data do Evento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !eventDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {eventDate ? format(eventDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={eventDate}
                  onSelect={setEventDate}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Notas */}
          <div className="space-y-1.5">
            <Label>Notas (opcional)</Label>
            <Textarea
              placeholder="Observações internas..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="text-sm"
            />
          </div>

          {/* Itens */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Itens ({items.length})</p>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded-lg bg-background p-2">
              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">Nenhum item adicionado</p>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(item.unit_price)}/un</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(idx, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(idx, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-xs font-semibold min-w-fit">{formatCurrency(item.unit_price * item.quantity)}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeItem(idx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Buscar Item */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Adicionar Item</p>
            <div className="flex gap-2">
              <Input
                placeholder={platform === "tonho" ? "Buscar equipamento..." : "Buscar item do cardápio..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSearch} disabled={searching} variant="secondary">
                {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="border rounded-lg bg-background max-h-32 overflow-y-auto">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className="w-full text-left p-2 hover:bg-muted/50 text-sm border-b last:border-b-0 flex items-center justify-between"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(item.daily_price ?? item.price_per_serving ?? 0)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Resumo */}
          {items.length > 0 && (
            <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between font-bold text-base">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(subtotal)}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving || !canSave}>
            {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Criar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
