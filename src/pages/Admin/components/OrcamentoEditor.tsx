import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Plus, Search } from "lucide-react";

interface OrcamentoEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
  orderItems: any[];
  onSave: () => void;
  mode?: "proposal" | "order"; // 'proposal' para TonhoOrcamentos/ChicasOrcamentos, 'order' para CentralOrcamentos
}

export function OrcamentoEditor({ open, onOpenChange, order, orderItems, onSave, mode = "proposal" }: OrcamentoEditorProps) {
  const [items, setItems] = useState<any[]>([]);
  const [discountAmount, setDiscountAmount] = useState(order?.discount_amount || 0);
  const [couponCode, setCouponCode] = useState(order?.coupon_code || "");
  const [notes, setNotes] = useState(order?.notes || "");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (order && orderItems) {
      setItems(orderItems);
      setDiscountAmount(order.discount_amount || 0);
      setCouponCode(order.coupon_code || "");
      setNotes(order.notes || "");
    }
  }, [order, orderItems]);

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    return Math.max(0, subtotal - Number(discountAmount));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, unit_price: 0, product_key: "" }]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);

    try {
      const platform = order?.platform || "tonho";
      
      if (platform === "tonho") {
        const { data } = await supabase
          .from("equipment")
          .select("id, name, product_key, daily_price")
          .ilike("name", `%${searchQuery}%`)
          .eq("is_active", true)
          .limit(10);

        const mappedResults = (data ?? []).map((e) => ({
          id: e.id,
          name: e.name,
          product_key: e.product_key || e.id,
          price: e.daily_price,
        }));
        setSearchResults(mappedResults);
      } else {
        const { data } = await supabase
          .from("menu_items")
          .select("id, name, price_per_serving")
          .ilike("name", `%${searchQuery}%`)
          .eq("is_active", true)
          .limit(10);

        const mappedResults = (data ?? []).map((m) => ({
          id: m.id,
          name: m.name,
          product_key: m.id,
          price: m.price_per_serving,
        }));
        setSearchResults(mappedResults);
      }
    } catch (error) {
      toast({ title: "Erro ao buscar produtos", variant: "destructive" });
    } finally {
      setSearching(false);
    }
  };

  const addProductFromSearch = (product: any) => {
    setItems([...items, { 
      name: product.name, 
      quantity: 1, 
      unit_price: product.price || 0, 
      product_key: product.product_key 
    }]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSave = async () => {
    if (!order) return;
    
    setLoading(true);
    try {
      const total = calculateTotal();

      // Update order
      const { error: orderError } = await supabase
        .from("orders")
        .update({
          discount_amount: Number(discountAmount),
          coupon_code: couponCode,
          notes,
          total_amount: total,
        })
        .eq("id", order.id);

      if (orderError) throw orderError;

      // Delete old items
      const { error: deleteError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", order.id);

      if (deleteError) throw deleteError;

      // Add new items
      for (const item of items) {
        if (item.name) {
          const { error: insertError } = await supabase
            .from("order_items")
            .insert({
              order_id: order.id,
              name: item.name,
              quantity: item.quantity,
              unit_price: item.unit_price,
              product_key: item.product_key,
              image: item.image,
            });

          if (insertError) throw insertError;
        }
      }

      toast({ title: "Orçamento atualizado com sucesso!" });
      onSave();
      onOpenChange(false);
    } catch (error) {
      toast({ title: "Erro ao salvar orçamento", variant: "destructive" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Orçamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Search Products Section */}
          <div className="space-y-2 p-3 border rounded-lg bg-muted/20">
            <label className="text-xs font-semibold text-muted-foreground">Buscar Produto</label>
            <div className="flex gap-2">
              <Input
                placeholder="Digite o nome do produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 h-9"
              />
              <Button 
                size="sm" 
                onClick={handleSearch}
                disabled={searching}
                className="h-9"
              >
                {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="border-t pt-2 space-y-1 max-h-[150px] overflow-y-auto">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProductFromSearch(product)}
                    className="w-full text-left p-2 text-sm border rounded hover:bg-accent transition-colors flex justify-between items-center"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(product.price)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Items Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase text-muted-foreground">Itens do Orçamento</h3>
              <Button size="sm" variant="outline" onClick={addItem} className="h-8 text-xs">
                <Plus className="h-4 w-4 mr-1" />
                Novo Item
              </Button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-3 space-y-2 bg-muted/20">
                  <div className="grid grid-cols-12 gap-2">
                    <Input
                      placeholder="Nome do produto"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                      className="col-span-4 h-8 text-xs"
                    />
                    <Input
                      placeholder="Chave/Ref"
                      value={item.product_key}
                      onChange={(e) => handleItemChange(idx, "product_key", e.target.value)}
                      className="col-span-2 h-8 text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Qtd"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                      className="col-span-2 h-8 text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Preço"
                      value={item.unit_price}
                      onChange={(e) => handleItemChange(idx, "unit_price", Number(e.target.value))}
                      className="col-span-2 h-8 text-xs"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="col-span-1 h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => removeItem(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right text-xs font-semibold text-muted-foreground">
                    Subtotal: {formatCurrency(item.quantity * item.unit_price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount Section */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="font-bold text-sm uppercase text-muted-foreground">Descontos & Notas</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Valor do Desconto</label>
                <Input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Código do Cupom</label>
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Notas / Observações</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full p-2 text-sm border rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Adicione notas sobre este orçamento..."
              />
            </div>
          </div>

          {/* Total Section */}
          <div className="border-t pt-4 bg-muted/30 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">{formatCurrency(items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0))}</span>
              </div>
              {Number(discountAmount) > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Desconto:</span>
                  <span className="font-semibold">-{formatCurrency(Number(discountAmount))}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t pt-2 text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end border-t pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Salvar Mudanças
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
