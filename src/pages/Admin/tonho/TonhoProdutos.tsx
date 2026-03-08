import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Switch } from "../components/ui/switch.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Search, Loader2, Pencil, Plus } from "lucide-react";

const PAGE_SIZE = 12;

export default function TonhoProdutos() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Edit dialog state
  const [editItem, setEditItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      supabase.from("equipment").select("*, equipment_categories(name)").order("name"),
      supabase.from("equipment_categories").select("*").order("name"),
    ]).then(([eqRes, catRes]) => {
      setItems(eqRes.data ?? []);
      setCategories(catRes.data ?? []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = categoryFilter === "all" || i.category_id === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [items, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, categoryFilter]);

  const openEdit = (item: any) => {
    setEditItem({ ...item });
    setIsNew(false);
  };

  const openNew = () => {
    setEditItem({
      name: "", description: "", daily_price: 0, deposit_amount: 0,
      stock_total: 0, stock_available: 0, category_id: categories[0]?.id ?? null, is_active: true,
    });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    const payload = {
      name: editItem.name,
      description: editItem.description || null,
      daily_price: Number(editItem.daily_price),
      deposit_amount: Number(editItem.deposit_amount),
      stock_total: Number(editItem.stock_total),
      stock_available: Number(editItem.stock_available),
      category_id: editItem.category_id || null,
      is_active: editItem.is_active,
    };

    if (isNew) {
      await supabase.from("equipment").insert(payload);
    } else {
      await supabase.from("equipment").update(payload).eq("id", editItem.id);
    }
    setSaving(false);
    setEditItem(null);
    fetchData();
  };

  const getStatus = (item: any) => {
    if (!item.is_active) return { status: "danger" as const, label: "Inativo" };
    if (item.stock_available === 0) return { status: "danger" as const, label: "Esgotado" };
    if (item.stock_available < 5) return { status: "warning" as const, label: "Baixo" };
    return { status: "success" as const, label: "Normal" };
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos — Tonho</h1>
          <p className="text-muted-foreground">{filtered.length} equipamentos</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Novo Produto
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar produto..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço/dia</TableHead>
                <TableHead className="text-center">Estoque</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((item) => {
                const st = getStatus(item);
                return (
                  <TableRow key={item.id} className={!item.is_active ? "opacity-50" : ""}>
                    <TableCell className="font-medium max-w-[250px] truncate">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{(item.equipment_categories as any)?.name ?? "—"}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">{formatCurrency(Number(item.daily_price))}</TableCell>
                    <TableCell className="text-center">{item.stock_available}/{item.stock_total}</TableCell>
                    <TableCell className="text-center"><StatusBadge status={st.status} label={st.label} /></TableCell>
                    <TableCell className="text-center">
                      <button onClick={() => openEdit(item)} className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
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

      {/* Edit / New Dialog */}
      <Dialog open={!!editItem} onOpenChange={(open) => { if (!open) setEditItem(null); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Novo Produto" : "Editar Produto"}</DialogTitle>
          </DialogHeader>
          {editItem && (
            <div className="grid gap-4 py-2">
              <div className="space-y-1.5">
                <Label>Nome</Label>
                <Input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Descrição</Label>
                <Textarea value={editItem.description ?? ""} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Preço/dia (R$)</Label>
                  <Input type="number" step="0.01" value={editItem.daily_price} onChange={(e) => setEditItem({ ...editItem, daily_price: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Caução (R$)</Label>
                  <Input type="number" step="0.01" value={editItem.deposit_amount} onChange={(e) => setEditItem({ ...editItem, deposit_amount: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Estoque Total</Label>
                  <Input type="number" value={editItem.stock_total} onChange={(e) => setEditItem({ ...editItem, stock_total: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Disponível</Label>
                  <Input type="number" value={editItem.stock_available} onChange={(e) => setEditItem({ ...editItem, stock_available: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Categoria</Label>
                <Select value={editItem.category_id ?? ""} onValueChange={(v) => setEditItem({ ...editItem, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={editItem.is_active} onCheckedChange={(v) => setEditItem({ ...editItem, is_active: v })} />
                <Label>Ativo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <button onClick={() => setEditItem(null)} className="rounded-md border px-4 py-2 text-sm hover:bg-muted">Cancelar</button>
            <button onClick={handleSave} disabled={saving || !editItem?.name} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Salvar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
