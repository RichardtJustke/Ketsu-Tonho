import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PlusCircle, Pencil, Trash2, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Switch } from "../components/ui/switch.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../components/ui/dialog.tsx";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../components/ui/alert-dialog.tsx";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select.tsx";

interface Package {
  id: string;
  type: string;
  tier: string;
  slug: string;
  description: string | null;
  base_price: number;
  item_limit: number | null;
  category_limits: Record<string, number> | null;
  display_order: number;
  is_active: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  coquetel: "Coquetel",
  coffeeBreak: "Coffee Break",
  brunch: "Brunch",
};
const TYPES = Object.keys(TYPE_LABELS);

function slugify(type: string, tier: string) {
  return `${type}_${tier}`
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

interface FormState {
  type: string;
  tier: string;
  description: string;
  base_price: number;
  item_limit: string;
  category_limits: { key: string; value: string }[];
  display_order: number;
  is_active: boolean;
}

const emptyForm = (): FormState => ({
  type: "coquetel",
  tier: "",
  description: "",
  base_price: 0,
  item_limit: "",
  category_limits: [],
  display_order: 0,
  is_active: true,
});

function jsonToKv(obj: Record<string, number> | null): { key: string; value: string }[] {
  if (!obj) return [];
  return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
}

function kvToJson(arr: { key: string; value: string }[]): Record<string, number> | null {
  const filtered = arr.filter((r) => r.key.trim());
  if (filtered.length === 0) return null;
  const obj: Record<string, number> = {};
  for (const r of filtered) obj[r.key.trim()] = parseInt(r.value) || 0;
  return obj;
}

export default function ChicasServicos() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Package | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("buffet_packages")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) { toast.error("Erro ao carregar pacotes"); return; }
    setPackages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPackages(); }, []);

  const openNew = (type: string) => {
    setEditId(null);
    setForm({ ...emptyForm(), type });
    setDialogOpen(true);
  };

  const openEdit = (pkg: Package) => {
    setEditId(pkg.id);
    setForm({
      type: pkg.type,
      tier: pkg.tier,
      description: pkg.description || "",
      base_price: pkg.base_price,
      item_limit: pkg.item_limit != null ? String(pkg.item_limit) : "",
      category_limits: jsonToKv(pkg.category_limits),
      display_order: pkg.display_order,
      is_active: pkg.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.tier.trim()) { toast.error("Tier é obrigatório"); return; }
    setSaving(true);
    const payload = {
      type: form.type,
      tier: form.tier.trim(),
      slug: slugify(form.type, form.tier),
      description: form.description.trim() || null,
      base_price: form.base_price,
      item_limit: form.item_limit ? parseInt(form.item_limit) : null,
      category_limits: kvToJson(form.category_limits),
      display_order: form.display_order,
      is_active: form.is_active,
    };

    if (editId) {
      const { error } = await supabase.from("buffet_packages").update(payload).eq("id", editId);
      if (error) toast.error("Erro ao atualizar");
      else toast.success("Pacote atualizado");
    } else {
      const { error } = await supabase.from("buffet_packages").insert(payload);
      if (error) toast.error("Erro ao criar pacote");
      else toast.success("Pacote criado");
    }
    setSaving(false);
    setDialogOpen(false);
    fetchPackages();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("buffet_packages").delete().eq("id", deleteTarget.id);
    if (error) toast.error("Erro ao excluir");
    else toast.success("Pacote excluído");
    setDeleteTarget(null);
    fetchPackages();
  };

  const handleToggle = async (pkg: Package) => {
    const { error } = await supabase.from("buffet_packages").update({ is_active: !pkg.is_active }).eq("id", pkg.id);
    if (error) toast.error("Erro ao atualizar status");
    else setPackages((prev) => prev.map((p) => p.id === pkg.id ? { ...p, is_active: !p.is_active } : p));
  };

  const updateCatLimit = (idx: number, field: "key" | "value", val: string) => {
    const next = [...form.category_limits];
    next[idx] = { ...next[idx], [field]: val };
    setForm({ ...form, category_limits: next });
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
        <h1 className="text-2xl font-bold text-foreground">Pacotes do Buffet</h1>
        <p className="text-muted-foreground">Gerencie os pacotes oferecidos pelo Chicas Eventos</p>
      </div>

      <Tabs defaultValue="coquetel">
        <TabsList className="w-full justify-start">
          {TYPES.map((t) => (
            <TabsTrigger key={t} value={t}>{TYPE_LABELS[t]}</TabsTrigger>
          ))}
        </TabsList>

        {TYPES.map((type) => {
          const typePackages = packages.filter((p) => p.type === type);
          return (
            <TabsContent key={type} value={type} className="space-y-4 mt-4">
              <div className="flex justify-end">
                <Button size="sm" variant="outline" onClick={() => openNew(type)}>
                  <PlusCircle className="mr-1 h-4 w-4" /> Novo Pacote
                </Button>
              </div>

              {typePackages.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">Nenhum pacote neste tipo.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {typePackages.map((pkg) => (
                    <Card key={pkg.id} className={!pkg.is_active ? "opacity-60" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{pkg.tier}</CardTitle>
                            <p className="text-xs text-muted-foreground font-mono">{pkg.slug}</p>
                          </div>
                          <div className="flex gap-1">
                            <Switch checked={pkg.is_active} onCheckedChange={() => handleToggle(pkg)} />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {pkg.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
                        )}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                          <span>R$ {Number(pkg.base_price).toFixed(2)}</span>
                          <span>{pkg.item_limit != null ? `${pkg.item_limit} itens` : "Ilimitado"}</span>
                          <span className="text-muted-foreground">Ordem: {pkg.display_order}</span>
                        </div>
                        {pkg.category_limits && Object.keys(pkg.category_limits).length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(pkg.category_limits).map(([k, v]) => (
                              <span key={k} className="rounded bg-muted px-2 py-0.5 text-xs">
                                {k}: {String(v)}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-end gap-1 pt-1">
                          <Button size="icon" variant="ghost" onClick={() => openEdit(pkg)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(pkg)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Editar Pacote" : "Novo Pacote"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{TYPE_LABELS[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tier</Label>
                <Input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} placeholder="Ex: Básico" />
              </div>
            </div>

            <div>
              <Label>Slug</Label>
              <Input value={slugify(form.type, form.tier)} readOnly className="bg-muted font-mono text-sm" />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição do pacote" rows={3} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Preço base (R$)</Label>
                <Input type="number" min={0} step={0.01} value={form.base_price} onChange={(e) => setForm({ ...form, base_price: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <Label>Limite de itens</Label>
                <Input type="number" min={0} value={form.item_limit} onChange={(e) => setForm({ ...form, item_limit: e.target.value })} placeholder="Vazio = ilimitado" />
              </div>
              <div>
                <Label>Ordem</Label>
                <Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label>{form.is_active ? "Ativo" : "Inativo"}</Label>
            </div>

            {/* Category limits editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Limites por categoria</Label>
                <Button type="button" size="sm" variant="outline" onClick={() => setForm({ ...form, category_limits: [...form.category_limits, { key: "", value: "" }] })}>
                  <Plus className="mr-1 h-3 w-3" /> Adicionar
                </Button>
              </div>
              {form.category_limits.length === 0 && (
                <p className="text-xs text-muted-foreground">Nenhum limite por categoria definido.</p>
              )}
              {form.category_limits.map((row, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input className="flex-1" placeholder="Categoria (ex: Salgados)" value={row.key} onChange={(e) => updateCatLimit(idx, "key", e.target.value)} />
                  <Input className="w-20" type="number" placeholder="Qtd" value={row.value} onChange={(e) => updateCatLimit(idx, "value", e.target.value)} />
                  <Button type="button" size="icon" variant="ghost" className="text-destructive" onClick={() => setForm({ ...form, category_limits: form.category_limits.filter((_, i) => i !== idx) })}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir pacote</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o pacote "{deleteTarget?.tier}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
