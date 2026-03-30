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
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { Trash2, Plus, Search, Loader2, Minus } from "lucide-react";

interface OrderItem {
  id?: string;
  name: string;
  product_key: string;
  quantity: number;
  unit_price: number;
  image?: string | null;
}

interface Order {
  id: string;
  platform: "tonho" | "chicas";
  discount_amount: number;
  subtotal: number;
  total_amount: number;
  event_date?: string | null;
  customer_name?: string;
  notes?: string;
  coupon_code?: string;
}

interface CatalogItem {
  id: string;
  name: string;
  product_key?: string;
  daily_price?: number;
  price_per_serving?: number;
  image_url?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  order: Order;
  items: OrderItem[];
  onSave: () => void;
}

export function OrderModifyModal({ open, onClose, order, items, onSave }: Props) {
  const [editItems, setEditItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CatalogItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setEditItems(items.map((i) => ({ ...i })));
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [open, items]);

  const originalSubtotal = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const newSubtotal = editItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const discount = Number(order.discount_amount) || 0;
  const newTotal = Math.max(0, newSubtotal - discount);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);

    try {
      if (order.platform === "tonho") {
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
    
    const existing = editItems.find((i) => i.product_key === key);
    if (existing) {
      setEditItems(
        editItems.map((i) =>
          i.product_key === key ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setEditItems([
        ...editItems,
        {
          name: item.name,
          product_key: key,
          quantity: 1,
          unit_price: price,
        },
      ]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const updateQuantity = (idx: number, delta: number) => {
    const newQty = editItems[idx].quantity + delta;
    if (newQty < 1) return;
    setEditItems(
      editItems.map((it, i) =>
        i === idx ? { ...it, quantity: newQty } : it
      )
    );
  };

  const removeItem = (idx: number) => {
    setEditItems(editItems.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (editItems.length === 0) return;
    setSaving(true);

    try {
      await supabase.from("order_items").delete().eq("order_id", order.id);

      const insertItems = editItems.map((i) => ({
        order_id: order.id,
        name: i.name,
        product_key: i.product_key,
        quantity: i.quantity,
        unit_price: i.unit_price,
      }));
      await supabase.from("order_items").insert(insertItems);

      await supabase
        .from("orders")
        .update({
          subtotal: newSubtotal,
          total_amount: newTotal,
          was_modified: true,
        })
        .eq("id", order.id);

      onSave();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modificar Pedido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cliente Info */}
          <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
            {order.customer_name && (
              <p><span className="font-medium">Cliente:</span> {order.customer_name}</p>
            )}
            {order.coupon_code && (
              <p className="text-green-600"><span className="font-medium">Cupom:</span> {order.coupon_code}</p>
            )}
          </div>

          {/* Items Lista */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Itens ({editItems.length})</p>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded-lg bg-background p-2">
              {editItems.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">Nenhum item</p>
              ) : (
                editItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(item.unit_price)}/un</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(idx, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(idx, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-xs font-semibold min-w-fit">{formatCurrency(item.unit_price * item.quantity)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeItem(idx)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Buscar e Adicionar Item */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Adicionar Item</p>
            <div className="flex gap-2">
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="text-sm"
              />
              <Button 
                size="sm" 
                onClick={handleSearch} 
                disabled={searching}
                variant="secondary"
              >
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

          {/* Notas */}
          {order.notes && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Notas do Cliente</p>
              <p>{order.notes}</p>
            </div>
          )}

          {/* Valores */}
          <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Original:</span>
              <span className="line-through text-xs">{formatCurrency(originalSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{formatCurrency(newSubtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto:</span>
                <span className="font-medium">-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-base font-bold">
              <span>Total:</span>
              <span className="text-primary">{formatCurrency(newTotal)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || editItems.length === 0}>
            {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Salvar Mudanças
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
