import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Switch } from "../components/ui/switch.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.tsx";

interface MenuItem {
  id: string;
  name: string;
  type: string;
  subcategory: string;
  display_order: number;
  is_active: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  brunch: "Brunch",
  coffeeBreak: "Coffee Break",
  coquetel: "Coquetel",
};

const SUBCATEGORY_LABELS: Record<string, string> = {
  entradas: "Entradas",
  doces: "Doces",
  bebidas: "Bebidas",
};

const TYPES = Object.keys(TYPE_LABELS);
const SUBCATEGORIES = Object.keys(SUBCATEGORY_LABELS);

const emptyForm = (): Omit<MenuItem, "id"> => ({
  name: "",
  type: "brunch",
  subcategory: "entradas",
  display_order: 0,
  is_active: true,
});

export default function ChicasCardapio() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("buffet_menu_items")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      toast.error("Erro ao carregar itens");
      return;
    }
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = (type: string, subcategory: string) => {
    setEditId(null);
    setForm({ ...emptyForm(), type, subcategory });
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      type: item.type,
      subcategory: item.subcategory,
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      type: form.type,
      subcategory: form.subcategory,
      display_order: form.display_order,
      is_active: form.is_active,
    };

    if (editId) {
      const { error } = await supabase
        .from("buffet_menu_items")
        .update(payload)
        .eq("id", editId);
      if (error) toast.error("Erro ao atualizar");
      else toast.success("Item atualizado");
    } else {
      const { error } = await supabase
        .from("buffet_menu_items")
        .insert(payload);
      if (error) toast.error("Erro ao criar item");
      else toast.success("Item criado");
    }

    setSaving(false);
    setDialogOpen(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase
      .from("buffet_menu_items")
      .delete()
      .eq("id", deleteTarget.id);
    if (error) toast.error("Erro ao excluir");
    else toast.success("Item excluído");
    setDeleteTarget(null);
    fetchItems();
  };

  const handleToggle = async (item: MenuItem) => {
    const { error } = await supabase
      .from("buffet_menu_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    if (error) toast.error("Erro ao atualizar status");
    else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_active: !i.is_active } : i
        )
      );
    }
  };

  const grouped = (type: string) => {
    const typeItems = items.filter((i) => i.type === type);
    const groups: Record<string, MenuItem[]> = {};
    for (const sub of SUBCATEGORIES) {
      const subItems = typeItems.filter((i) => i.subcategory === sub);
      if (subItems.length > 0) groups[sub] = subItems;
    }
    // Include subcategories with no items so admin can add
    for (const sub of SUBCATEGORIES) {
      if (!groups[sub]) groups[sub] = [];
    }
    return groups;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cardápio do Buffet</h1>
        <p className="text-muted-foreground">
          Gerencie os itens do cardápio do Chicas Eventos
        </p>
      </div>

      <Tabs defaultValue="brunch">
        <TabsList className="w-full justify-start">
          {TYPES.map((t) => (
            <TabsTrigger key={t} value={t}>
              {TYPE_LABELS[t]}
            </TabsTrigger>
          ))}
        </TabsList>

        {TYPES.map((type) => (
          <TabsContent key={type} value={type} className="space-y-4 mt-4">
            {Object.entries(grouped(type)).map(([sub, subItems]) => (
              <Card key={sub}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">
                    {SUBCATEGORY_LABELS[sub] || sub}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openNew(type, sub)}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  {subItems.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">
                      Nenhum item nesta categoria.
                    </p>
                  ) : (
                    <div className="divide-y divide-border">
                      {subItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 py-2"
                        >
                          <span className="text-xs text-muted-foreground w-8 text-center font-mono">
                            {item.display_order}
                          </span>
                          <span
                            className={`flex-1 text-sm ${
                              item.is_active
                                ? "text-foreground"
                                : "text-muted-foreground line-through"
                            }`}
                          >
                            {item.name}
                          </span>
                          <Switch
                            checked={item.is_active}
                            onCheckedChange={() => handleToggle(item)}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Editar Item" : "Novo Item"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Croissant de presunto e queijo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) => setForm({ ...form, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subcategoria</Label>
                <Select
                  value={form.subcategory}
                  onValueChange={(v) => setForm({ ...form, subcategory: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBCATEGORIES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {SUBCATEGORY_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ordem de exibição</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(e) =>
                    setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="flex items-end gap-2 pb-1">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                />
                <Label>{form.is_active ? "Ativo" : "Inativo"}</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir item</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deleteTarget?.name}"? Esta ação
              não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
