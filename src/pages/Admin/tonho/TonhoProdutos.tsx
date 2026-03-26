import { useEffect, useState, useMemo, useRef } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Switch } from "../components/ui/switch.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog.tsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Search, Loader2, Pencil, Plus, Upload, X, Trash2, AlertTriangle, PlusCircle, MinusCircle } from "lucide-react";

const generateProductKey = (name: string) =>
  name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

interface SpecRow { key: string; value: string }
interface BenefitRow { title: string; description: string }
import { toast } from "sonner";

const PAGE_SIZE = 12;

interface EquipmentImage {
  id: string;
  equipment_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export default function TonhoProdutos() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Images map: equipment_id -> primary image_url
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  // Edit dialog state
  const [editItem, setEditItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // Image upload state
  const [editImages, setEditImages] = useState<EquipmentImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Specs & Benefits editors
  const [specRows, setSpecRows] = useState<SpecRow[]>([]);
  const [benefitRows, setBenefitRows] = useState<BenefitRow[]>([]);

  // Delete state
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [eqRes, catRes, imgRes] = await Promise.all([
      supabase.from("equipment").select("*, equipment_categories(name)").order("name"),
      supabase.from("equipment_categories").select("*").order("name"),
      supabase.from("equipment_images").select("id, equipment_id, image_url, is_primary, display_order").eq("is_primary", true),
    ]);
    setItems(eqRes.data ?? []);
    setCategories(catRes.data ?? []);
    const map: Record<string, string> = {};
    (imgRes.data ?? []).forEach((img: any) => { map[img.equipment_id] = img.image_url; });
    setImageMap(map);
    setLoading(false);
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

  const fetchEditImages = async (equipmentId: string) => {
    const { data } = await supabase.from("equipment_images").select("*").eq("equipment_id", equipmentId).order("display_order");
    setEditImages((data as EquipmentImage[]) ?? []);
  };

  const openEdit = (item: any) => {
    setEditItem({ ...item });
    setIsNew(false);
    setPendingFiles([]);
    fetchEditImages(item.id);
    // Parse specs JSONB object into rows
    const specs = item.specs && typeof item.specs === "object" && !Array.isArray(item.specs)
      ? Object.entries(item.specs).map(([key, value]) => ({ key, value: String(value) }))
      : [];
    setSpecRows(specs);
    // Parse benefits JSONB array into rows
    const benefits = Array.isArray(item.benefits)
      ? item.benefits.map((b: any) => ({ title: b.title || "", description: b.description || "" }))
      : [];
    setBenefitRows(benefits);
  };

  const openNew = () => {
    setEditItem({
      name: "", daily_price: 0, deposit_amount: 0,
      stock_total: 0, stock_available: 0, category_id: "", is_active: true,
      dimension: "", short_description: "", full_description: "", description: "",
    });
    setIsNew(true);
    setEditImages([]);
    setPendingFiles([]);
    setSpecRows([]);
    setBenefitRows([]);
  };

  const uploadFiles = async (equipmentId: string, files: File[]) => {
    const errors: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${equipmentId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("equipment-images").upload(path, file);
      if (uploadErr) {
        console.error("Upload error:", uploadErr);
        errors.push(file.name);
        continue;
      }
      const { data: urlData } = supabase.storage.from("equipment-images").getPublicUrl(path);
      const hasPrimary = editImages.length > 0 || files.indexOf(file) > 0;
      await supabase.from("equipment_images").insert({
        equipment_id: equipmentId,
        image_url: urlData.publicUrl,
        is_primary: !hasPrimary,
        display_order: editImages.length + files.indexOf(file),
      });
    }
    return errors;
  };

  const handleSave = async () => {
    if (!editItem) return;
    setSaving(true);
    // Build specs object from rows
    const specsObj: Record<string, string> = {};
    specRows.filter(r => r.key.trim()).forEach(r => { specsObj[r.key.trim()] = r.value; });
    // Build benefits array from rows
    const benefitsArr = benefitRows.filter(r => r.title.trim()).map(r => ({ title: r.title.trim(), description: r.description.trim() }));

    const payload: any = {
      name: editItem.name,
      daily_price: Number(editItem.daily_price),
      deposit_amount: Number(editItem.deposit_amount),
      stock_total: Number(editItem.stock_total),
      stock_available: Number(editItem.stock_available),
      category_id: editItem.category_id || null,
      is_active: editItem.is_active,
      dimension: editItem.dimension || null,
      short_description: editItem.short_description || null,
      full_description: editItem.full_description || null,
      description: editItem.description || null,
      specs: Object.keys(specsObj).length > 0 ? specsObj : null,
      benefits: benefitsArr.length > 0 ? benefitsArr : null,
    };
    if (isNew) {
      payload.product_key = generateProductKey(editItem.name);
    }

    let equipmentId = editItem.id;
    const wasNew = isNew;

    if (isNew) {
      const { data, error } = await supabase.from("equipment").insert(payload).select("id").single();
      if (error) {
        toast.error("Erro ao criar produto: " + error.message);
        setSaving(false);
        return;
      }
      equipmentId = data?.id;
    } else {
      const { error } = await supabase.from("equipment").update(payload).eq("id", editItem.id);
      if (error) {
        toast.error("Erro ao salvar produto: " + error.message);
        setSaving(false);
        return;
      }
    }

    let uploadErrors: string[] = [];
    if (equipmentId && pendingFiles.length > 0) {
      setUploading(true);
      uploadErrors = await uploadFiles(equipmentId, pendingFiles);
      setUploading(false);
    }

    setSaving(false);
    setEditItem(null);
    fetchData();

    if (uploadErrors.length > 0) {
      toast.warning(`Produto salvo, mas ${uploadErrors.length} imagem(ns) falharam: ${uploadErrors.join(", ")}`);
    } else {
      toast.success(wasNew ? "Produto criado com sucesso!" : "Produto atualizado com sucesso!");
    }
  };

  const handleDeleteImage = async (img: EquipmentImage) => {
    const urlParts = img.image_url.split("/equipment-images/");
    if (urlParts[1]) {
      await supabase.storage.from("equipment-images").remove([decodeURIComponent(urlParts[1])]);
    }
    const { error } = await supabase.from("equipment_images").delete().eq("id", img.id);
    if (error) {
      toast.error("Erro ao remover imagem");
      return;
    }
    setEditImages((prev) => prev.filter((i) => i.id !== img.id));
    toast.success("Imagem removida");
  };

  const handleSetPrimary = async (img: EquipmentImage) => {
    await supabase.from("equipment_images").update({ is_primary: false }).eq("equipment_id", img.equipment_id);
    await supabase.from("equipment_images").update({ is_primary: true }).eq("id", img.id);
    setEditImages((prev) => prev.map((i) => ({ ...i, is_primary: i.id === img.id })));
  };

  const handleDeleteProduct = async () => {
    if (!editItem?.id) return;
    setDeleting(true);
    const productName = editItem.name;
    const { data: imgs } = await supabase.from("equipment_images").select("image_url").eq("equipment_id", editItem.id);
    if (imgs && imgs.length > 0) {
      const paths = imgs.map((i: any) => {
        const parts = i.image_url.split("/equipment-images/");
        return parts[1] ? decodeURIComponent(parts[1]) : null;
      }).filter(Boolean);
      if (paths.length > 0) await supabase.storage.from("equipment-images").remove(paths);
    }
    await supabase.from("equipment_images").delete().eq("equipment_id", editItem.id);
    const { error } = await supabase.from("equipment").delete().eq("id", editItem.id);
    setDeleting(false);
    if (error) {
      toast.error("Erro ao excluir produto: " + error.message);
      return;
    }
    setEditItem(null);
    fetchData();
    toast.success(`Produto "${productName}" excluído com sucesso`);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPendingFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePendingFile = (idx: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== idx));
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

      {/* Cards Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paged.map((item) => {
          const st = getStatus(item);
          return (
            <Card 
              key={item.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer group ${!item.is_active ? "opacity-50" : ""}`}
              onClick={() => openEdit(item)}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3 z-10">
                <StatusBadge status={st.status} label={st.label} />
              </div>

              {/* Content */}
              <CardContent className="p-4 space-y-3 relative">
                {/* Category */}
                {(item.equipment_categories as any)?.name && (
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    {(item.equipment_categories as any).name}
                  </div>
                )}
                
                {/* Product Name */}
                <div className="min-h-[2.5rem]">
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">Diária:</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(Number(item.daily_price))}
                  </span>
                </div>

                {/* Stock */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Estoque:</span>
                  <span className={`font-semibold ${
                    item.stock_available === 0 ? 'text-red-500' :
                    item.stock_available < 5 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {item.stock_available}/{item.stock_total}
                  </span>
                </div>

                {/* Edit Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(item);
                  }} 
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" /> 
                  Editar
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
              {/* Images Section */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Imagens</Label>
                {editImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img src={img.image_url} alt="" className={`h-20 w-20 rounded-md border object-cover ${img.is_primary ? "ring-2 ring-primary" : ""}`} />
                        <div className="absolute inset-0 flex items-center justify-center gap-1 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!img.is_primary && (
                            <button onClick={() => handleSetPrimary(img)} className="rounded bg-primary p-1 text-[10px] text-primary-foreground" title="Definir como principal">★</button>
                          )}
                          <button onClick={() => handleDeleteImage(img)} className="rounded bg-destructive p-1 text-destructive-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        {img.is_primary && <span className="absolute -top-1 -right-1 rounded-full bg-primary px-1 text-[9px] text-primary-foreground">Principal</span>}
                      </div>
                    ))}
                  </div>
                )}
                {/* Pending file previews */}
                {pendingFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {pendingFiles.map((file, idx) => (
                      <div key={idx} className="relative group">
                        <img src={URL.createObjectURL(file)} alt="" className="h-20 w-20 rounded-md border object-cover opacity-70" />
                        <button onClick={() => removePendingFile(idx)} className="absolute -top-1 -right-1 rounded-full bg-destructive p-0.5 text-destructive-foreground">
                          <X className="h-3 w-3" />
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 rounded-b-md bg-black/60 text-center text-[9px] text-white">Novo</span>
                      </div>
                    ))}
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileSelect} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted">
                  <Upload className="h-4 w-4" /> Adicionar imagem
                </button>
              </div>

              <div className="space-y-1.5">
                <Label>Nome</Label>
                <Input value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
              </div>
              {/* Auto-generated product_key: shown read-only on edit */}
              {!isNew && editItem.product_key && (
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs">Chave do produto (automática)</Label>
                  <Input value={editItem.product_key} disabled className="bg-muted text-muted-foreground text-xs" />
                </div>
              )}
              {isNew && editItem.name && (
                <p className="text-xs text-muted-foreground">
                  Chave gerada: <code className="rounded bg-muted px-1 py-0.5">{generateProductKey(editItem.name)}</code>
                </p>
              )}
              <div className="space-y-1.5">
                <Label>Dimensão</Label>
                <Input value={editItem.dimension ?? ""} onChange={(e) => setEditItem({ ...editItem, dimension: e.target.value })} placeholder="ex: 5x5m" />
              </div>
              <div className="space-y-1.5">
                <Label>Descrição (geral)</Label>
                <Textarea value={editItem.description ?? ""} onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} rows={2} placeholder="Descrição geral do produto" />
              </div>
              <div className="space-y-1.5">
                <Label>Descrição curta (exibida nos cards)</Label>
                <Textarea value={editItem.short_description ?? ""} onChange={(e) => setEditItem({ ...editItem, short_description: e.target.value })} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Descrição completa (página do produto)</Label>
                <Textarea value={editItem.full_description ?? ""} onChange={(e) => setEditItem({ ...editItem, full_description: e.target.value })} rows={4} />
              </div>

              {/* Specs editor */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Especificações</Label>
                {specRows.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input placeholder="Chave (ex: Comprimento)" value={row.key} onChange={(e) => {
                      const next = [...specRows]; next[idx] = { ...next[idx], key: e.target.value }; setSpecRows(next);
                    }} className="flex-1" />
                    <Input placeholder="Valor (ex: 5 metros)" value={row.value} onChange={(e) => {
                      const next = [...specRows]; next[idx] = { ...next[idx], value: e.target.value }; setSpecRows(next);
                    }} className="flex-1" />
                    <button type="button" onClick={() => setSpecRows(specRows.filter((_, i) => i !== idx))} className="text-destructive hover:text-destructive/80">
                      <MinusCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setSpecRows([...specRows, { key: "", value: "" }])} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <PlusCircle className="h-3.5 w-3.5" /> Adicionar especificação
                </button>
              </div>

              {/* Benefits editor */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Benefícios</Label>
                {benefitRows.map((row, idx) => (
                  <div key={idx} className="space-y-1 rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Título" value={row.title} onChange={(e) => {
                        const next = [...benefitRows]; next[idx] = { ...next[idx], title: e.target.value }; setBenefitRows(next);
                      }} className="flex-1" />
                      <button type="button" onClick={() => setBenefitRows(benefitRows.filter((_, i) => i !== idx))} className="text-destructive hover:text-destructive/80">
                        <MinusCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <Textarea placeholder="Descrição do benefício" value={row.description} onChange={(e) => {
                      const next = [...benefitRows]; next[idx] = { ...next[idx], description: e.target.value }; setBenefitRows(next);
                    }} rows={2} />
                  </div>
                ))}
                <button type="button" onClick={() => setBenefitRows([...benefitRows, { title: "", description: "" }])} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                  <PlusCircle className="h-3.5 w-3.5" /> Adicionar benefício
                </button>
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
                <Select value={editItem.category_id || ""} onValueChange={(v) => setEditItem({ ...editItem, category_id: v || null })}>
                  <SelectTrigger><SelectValue placeholder="Selecione uma categoria..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled className="text-muted-foreground">Selecione uma categoria...</SelectItem>
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
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              {!isNew && editItem && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="inline-flex items-center gap-1 rounded-md border border-destructive px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-4 w-4" /> Excluir
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. O produto "{editItem?.name}" e todas as suas imagens serão removidos permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteProduct} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditItem(null)} className="rounded-md border px-4 py-2 text-sm hover:bg-muted">Cancelar</button>
              <button onClick={handleSave} disabled={saving || uploading || !editItem?.name} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {(saving || uploading) && <Loader2 className="h-4 w-4 animate-spin" />}
                {uploading ? "Enviando imagens…" : "Salvar"}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
