import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./components/ui/dialog.tsx";
import { Button } from "./components/ui/button.tsx";
import { Input } from "./components/ui/input.tsx";
import { Label } from "./components/ui/label.tsx";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "./components/ui/badge.tsx";
import { Users, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "./components/ui/use-toast.ts";

export default function Administracao() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const loadMembers = async () => {
    const { data: adminRoles } = await supabase.from("user_roles").select("user_id").eq("role", "admin");
    if (!adminRoles?.length) { setMembers([]); setLoading(false); return; }

    const adminIds = adminRoles.map((r) => r.user_id);
    const [profilesRes, permsRes] = await Promise.all([
      supabase.from("profiles").select("*").in("id", adminIds),
      supabase.from("admin_permissions").select("*").in("user_id", adminIds),
    ]);

    const permsMap = new Map((permsRes.data ?? []).map((p) => [p.user_id, p]));
    const combined = (profilesRes.data ?? []).map((p) => ({
      ...p,
      permissions: permsMap.get(p.id),
    }));
    setMembers(combined);
    setLoading(false);
  };

  useEffect(() => { loadMembers(); }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Preencha email e senha", variant: "destructive" });
      return;
    }
    setCreating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("create-admin-user", {
        body: { email: form.email, password: form.password, name: form.name },
      });
      if (res.error || res.data?.error) {
        toast({ title: "Erro ao criar admin", description: res.data?.error || res.error?.message, variant: "destructive" });
      } else {
        toast({ title: "Administrador criado com sucesso" });
        setDialogOpen(false);
        setForm({ name: "", email: "", password: "" });
        setLoading(true);
        await loadMembers();
      }
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
    setCreating(false);
  };

  const handleRemove = async (userId: string, name: string) => {
    if (!confirm(`Remover ${name || "este usuário"} como administrador?`)) return;
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
    if (error) {
      toast({ title: "Erro ao remover", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin removido" });
      setLoading(true);
      await loadMembers();
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Administração</h1>
          <p className="text-muted-foreground">Gestores do sistema</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Administrador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4 text-primary" />Administradores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Permissões</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {m.permissions?.can_manage_users && <Badge variant="secondary" className="text-xs">Usuários</Badge>}
                      {m.permissions?.can_manage_orders && <Badge variant="secondary" className="text-xs">Pedidos</Badge>}
                      {m.permissions?.can_edit_supply && <Badge variant="secondary" className="text-xs">Estoque</Badge>}
                      {m.permissions?.can_gen_email && <Badge variant="secondary" className="text-xs">Email</Badge>}
                      {!m.permissions && <span className="text-xs text-muted-foreground">Sem permissões definidas</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemove(m.id, m.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Nenhum administrador encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Administrador</DialogTitle>
            <DialogDescription>Crie uma conta de administrador com acesso ao painel.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 6 caracteres" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreate} disabled={creating}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Criar Administrador
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
