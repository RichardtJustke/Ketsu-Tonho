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
import { Label } from "./ui/label.tsx";
import { Badge } from "./ui/badge.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { Trash2, Plus, Search, Loader2, Minus, AlertTriangle } from "lucide-react";

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
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [stockLoading, setStockLoading] = useState(false);

  // Load availability when modal opens
  useEffect(() => {
    if (open) {
      setEditItems(items.map((i) => ({ ...i })));
      setSearchQuery("");
      setSearchResults([]);

      if (order.event_date && order.platform === "tonho") {
        setStockLoading(true);
        supabase
          .rpc("get_available_stock_for_date", { target_date: order.event_date })
          .then(({ data }) => {
            const map: Record<string, number> = {};
            (data ?? []).forEach((row: any) => {
              map[row.product_key] = row.available;
            });
            setStockMap(map);
            setStockLoading(false);
          });
      } else {
        setStockMap({});
      }
    }
  }, [open, items, order.event_date, order.platform]);

  const newSubtotal = editItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const newTotal = Math.max(0, newSubtotal - Number(order.discount_amount));

  // Get available stock for a product, accounting for items already in the current order
  const getAvailableForProduct = (productKey: string): number | null => {
    if (!order.event_date || order.platform !== "tonho") return null;
    const base = stockMap[productKey];
    if (base === undefined) return null; // not tracked
    // Add back qty from original order items (they're already counted in the RPC result)
    const originalQty = items.find((i) => i.product_key === productKey)?.quantity ?? 0;
    return base + originalQty;
  };

  const getCurrentQtyInEdit = (productKey: string): number => {
    return editItems.find((i) => i.product_key === productKey)?.quantity ?? 0;
  };

  const canAddMore = (productKey: string, additionalQty: number = 1): boolean => {
    const available = getAvailableForProduct(productKey);
    if (available === null) return true; // not tracked or no date
    return getCurrentQtyInEdit(productKey) + additionalQty <= available;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);

    if (order.platform === "tonho") {
      const { data } = await supabase
        .from("equipment")
        .select("id, name, product_key, daily_price")
        .ilike("name", `%${searchQuery}%`)
        .eq("is_active", true)
        .limit(10);

      const { data: images } = await supabase
        .from("equipment_images")
        .select("equipment_id, image_url")
        .eq("is_primary", true)
        .in("equipment_id", (data ?? []).map((e) => e.id));

      const imageMap: Record<string, string> = {};
      (images ?? []).forEach((img) => {
        imageMap[img.equipment_id] = img.image_url;
      });

      setSearchResults(
        (data ?? []).map((e) => ({
          id: e.id,
          name: e.name,
          product_key: e.product_key ?? e.id,
          daily_price: e.daily_price,
          image_url: imageMap[e.id],
        }))
      );
    } else {
      const { data } = await supabase
        .from("menu_items")
        .select("id, name, price_per_serving")
        .ilike("name", `%${searchQuery}%`)
        .eq("is_active", true)
        .limit(10);

      const { data: images } = await supabase
        .from("menu_item_images")
        .select("menu_item_id, image_url")
        .eq("is_primary", true)
        .in("menu_item_id", (data ?? []).map((e) => e.id));

      const imageMap: Record<string, string> = {};
      (images ?? []).forEach((img) => {
        imageMap[img.menu_item_id] = img.image_url;
      });

      setSearchResults(
        (data ?? []).map((m) => ({
          id: m.id,
          name: m.name,
          product_key: m.id,
          price_per_serving: m.price_per_serving,
          image_url: imageMap[m.id],
        }))
      );
    }

    setSearching(false);
  };

  const addItem = (item: CatalogItem) => {
    const key = item.product_key ?? item.id;
    if (!canAddMore(key)) return;

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
          image: item.image_url ?? null,
        },
      ]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const updateQuantity = (idx: number, delta: number) => {
    const item = editItems[idx];
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    if (delta > 0 && !canAddMore(item.product_key, 0)) {
      // Check if new total would exceed available
      const available = getAvailableForProduct(item.product_key);
      if (available !== null && newQty > available) return;
    }
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

    await supabase.from("order_items").delete().eq("order_id", order.id);

    const insertItems = editItems.map((i) => ({
      order_id: order.id,
      name: i.name,
      product_key: i.product_key,
      quantity: i.quantity,
      unit_price: i.unit_price,
      image: i.image,
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

    setSaving(false);
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modificar Pedido</DialogTitle>
        </DialogHeader>

        {stockLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Carregando disponibilidade...
          </div>
        )}

        <div className="space-y-6">
          {/* Current Items */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground uppercase">
              Itens do Pedido
            </Label>
            <div className="mt-2 divide-y divide-border rounded-md border bg-background">
              {editItems.map((item, idx) => {
                const available = getAvailableForProduct(item.product_key);
                const overLimit = available !== null && item.quantity > available;
                return (
                  <div key={idx} className={`flex items-center gap-3 p-3 ${overLimit ? "bg-destructive/5" : ""}`}>
                    {item.image && (
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(item.unit_price)} / un
                        </p>
                        {available !== null && (
                          <span className="text-xs text-muted-foreground">
                            (disp: {available})
                          </span>
                        )}
                      </div>
                      {overLimit && (
                        <p className="text-xs text-destructive flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="h-3 w-3" />
                          Excede estoque disponível
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(idx, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(idx, 1)}
                        disabled={available !== null && item.quantity >= available}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-medium w-20 text-right">
                      {formatCurrency(item.unit_price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeItem(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              {editItems.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground text-center">
                  Nenhum item no pedido
                </p>
              )}
            </div>
          </div>

          {/* Add Item Search */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground uppercase">
              Adicionar Item
            </Label>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Buscar produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="secondary" onClick={handleSearch} disabled={searching}>
                {searching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-2 divide-y divide-border rounded-md border bg-background max-h-48 overflow-y-auto">
                {searchResults.map((item) => {
                  const key = item.product_key ?? item.id;
                  const available = getAvailableForProduct(key);
                  const currentInEdit = getCurrentQtyInEdit(key);
                  const isUnavailable = available !== null && currentInEdit >= available;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 ${
                        isUnavailable
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-accent cursor-pointer"
                      }`}
                      onClick={() => !isUnavailable && addItem(item)}
                    >
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="h-8 w-8 rounded object-cover" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                      </div>
                      {available !== null && (
                        <Badge variant={isUnavailable ? "destructive" : "secondary"} className="text-xs">
                          {isUnavailable ? "Indisponível" : `${available - currentInEdit} disp.`}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(item.daily_price ?? item.price_per_serving ?? 0)}
                      </span>
                      {!isUnavailable && <Plus className="h-4 w-4 text-primary" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="rounded-md bg-muted/50 p-4 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(newSubtotal)}</span>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Desconto</span>
                <span>-{formatCurrency(Number(order.discount_amount))}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(newTotal)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || editItems.length === 0}>
            {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Salvar Modificações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
