import { useEffect, useState, useRef, useMemo } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Input } from "../components/ui/input.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { supabase } from "@/integrations/supabase/client";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Search, Loader2, Check, X } from "lucide-react";

const PAGE_SIZE = 12;

type EditingCell = { id: string; field: "stock_total" | "stock_available"; value: number } | null;

export default function TonhoEstoque() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EditingCell>(null);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchItems = () => {
    supabase.from("equipment").select("*, equipment_categories(name)").order("name").then(({ data }) => {
      setItems(data ?? []);
      setLoading(false);
    });
  };

  useEffect(() => { fetchItems(); }, []);
  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);
  useEffect(() => { setPage(1); }, [search]);

  const filtered = useMemo(() => items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())), [items, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getStatus = (item: any) => {
    if (item.stock_available === 0) return { status: "danger" as const, label: "Esgotado" };
    if (item.stock_available < 5) return { status: "warning" as const, label: "Baixo" };
    return { status: "success" as const, label: "Normal" };
  };

  const startEdit = (id: string, field: "stock_total" | "stock_available", currentValue: number) => {
    setEditing({ id, field, value: currentValue });
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing) return;
    const item = items.find((i) => i.id === editing.id);
    if (!item) return;

    const oldValue = item[editing.field] as number;
    const newValue = Number(editing.value);
    if (newValue === oldValue) { cancelEdit(); return; }

    setSaving(true);
    const quantityChange = newValue - oldValue;

    await supabase.from("equipment").update({ [editing.field]: newValue }).eq("id", editing.id);

    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("equipment_inventory_log").insert({
      equipment_id: editing.id,
      action: "adjustment",
      quantity_change: quantityChange,
      notes: `${editing.field === "stock_total" ? "Estoque total" : "Disponível"}: ${oldValue} → ${newValue}`,
      performed_by: user?.id ?? null,
    });

    setSaving(false);
    setEditing(null);
    fetchItems();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Estoque — Tonho</h1>
        <p className="text-muted-foreground">Clique nos números para editar</p>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar item..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Disponível</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((item) => {
                const st = getStatus(item);
                const isEditingTotal = editing?.id === item.id && editing.field === "stock_total";
                const isEditingAvail = editing?.id === item.id && editing.field === "stock_available";

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{(item.equipment_categories as any)?.name ?? "—"}</TableCell>
                    <TableCell className="text-center">
                      {isEditingTotal ? (
                        <span className="inline-flex items-center gap-1">
                          <Input ref={inputRef} type="number" value={editing!.value} onChange={(e) => setEditing({ ...editing!, value: Number(e.target.value) })} onKeyDown={handleKeyDown} className="h-7 w-16 text-center" />
                          <button onClick={saveEdit} disabled={saving} className="text-green-600 hover:text-green-700"><Check className="h-4 w-4" /></button>
                          <button onClick={cancelEdit} className="text-destructive hover:text-destructive/80"><X className="h-4 w-4" /></button>
                        </span>
                      ) : (
                        <button onClick={() => startEdit(item.id, "stock_total", item.stock_total)} className="rounded px-2 py-0.5 hover:bg-muted">{item.stock_total}</button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {isEditingAvail ? (
                        <span className="inline-flex items-center gap-1">
                          <Input ref={inputRef} type="number" value={editing!.value} onChange={(e) => setEditing({ ...editing!, value: Number(e.target.value) })} onKeyDown={handleKeyDown} className="h-7 w-16 text-center" />
                          <button onClick={saveEdit} disabled={saving} className="text-green-600 hover:text-green-700"><Check className="h-4 w-4" /></button>
                          <button onClick={cancelEdit} className="text-destructive hover:text-destructive/80"><X className="h-4 w-4" /></button>
                        </span>
                      ) : (
                        <button onClick={() => startEdit(item.id, "stock_available", item.stock_available)} className="rounded px-2 py-0.5 hover:bg-muted">{item.stock_available}</button>
                      )}
                    </TableCell>
                    <TableCell className="text-center"><StatusBadge status={st.status} label={st.label} /></TableCell>
                  </TableRow>
                );
              })}
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
    </div>
  );
}