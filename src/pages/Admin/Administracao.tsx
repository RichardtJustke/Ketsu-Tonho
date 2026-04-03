import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./components/ui/dialog.tsx";
import { Button } from "./components/ui/button.tsx";
import { Input } from "./components/ui/input.tsx";
import { Label } from "./components/ui/label.tsx";
import { Switch } from "./components/ui/switch.tsx";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "./components/ui/badge.tsx";
import { Users, Plus, Trash2, Loader2, KeyRound, Eye, EyeOff } from "lucide-react";
import { toast } from "./components/ui/use-toast.ts";

const emptyForm = () => ({
  name: "", email: "", password: "",
  can_manage_users: false,
  can_manage_orders: true,
  can_edit_supply: false,
  can_gen_email: false,
});

export default function Administracao() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm());

  // Current user state
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [canManageUsers, setCanManageUsers] = useState(false);

  // Password change state
  const [pwdDialogOpen, setPwdDialogOpen] = useState(false);
  const [pwdTarget, setPwdTarget] = useState<any | null>(null);
  const [pwdForm, setPwdForm] = useState({ password: "", confirm: "" });
  const [changingPwd, setChangingPwd] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const loadCurrentUserPermissions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setCurrentUserId(user.id);
    const { data: perms } = await supabase
      .from("admin_permissions")
      .select("can_manage_users")
      .eq("user_id", user.id)
      .single();
    setCanManageUsers(perms?.can_manage_users ?? false);
  };

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

  useEffect(() => {
    loadCurrentUserPermissions();
    loadMembers();
  }, []);

  const handleCreate = async () => {
    if (!form.email || !form.password) {
      toast({ title: "Preencha email e senha", variant: "destructive" });
      return;
    }
    setCreating(true);
    try {
      const res = await supabase.functions.invoke("create-admin-user", {
        body: {
          email: form.email,
          password: form.password,
          name: form.name,
          permissions: {
            can_manage_users: form.can_manage_users,
            can_manage_orders: form.can_manage_orders,
            can_edit_supply: form.can_edit_supply,
            can_gen_email: form.can_gen_email,
          },
        },
      });
      if (res.error || res.data?.error) {
        toast({ title: "Erro ao criar admin", description: res.data?.error || res.error?.message, variant: "destructive" });
      } else {
        toast({ title: "Administrador criado com sucesso" });
        setDialogOpen(false);
        setForm(emptyForm());
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

  const openPwdDialog = (member: any) => {
    console.log("openPwdDialog called for:", member.name, member.id);
    setPwdTarget(member);
    setPwdForm({ password: "", confirm: "" });
    setShowPwd(false);
    setPwdDialogOpen(true);
  };

  const handleChangePassword = async () => {
    console.log("[PWD] handleChangePassword called");
    if (!pwdTarget) { console.log("[PWD] ABORT: no pwdTarget"); return; }
    if (!pwdForm.password || pwdForm.password.length < 6) {
      toast({ title: "A senha deve ter no mínimo 6 caracteres", variant: "destructive" });
      return;
    }
    if (pwdForm.password !== pwdForm.confirm) {
      toast({ title: "As senhas não coincidem", variant: "destructive" });
      return;
    }
    setChangingPwd(true);
    try {
      // Force token refresh to ensure valid JWT
      const { data: { session }, error: sessionErr } = await supabase.auth.refreshSession();
      console.log("[PWD] Session refreshed:", !!session, sessionErr?.message);
      if (!session) {
        toast({ title: "Sessão expirada", description: "Faça login novamente.", variant: "destructive" });
        setChangingPwd(false);
        return;
      }

      const res = await supabase.functions.invoke("change-admin-password", {
        body: { target_user_id: pwdTarget.id, new_password: pwdForm.password },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      console.log("[PWD] Edge function response:", res);
      if (res.error) {
        const msg = res.data?.error || res.error?.message || "Erro desconhecido";
        toast({ title: "Erro ao alterar senha", description: msg, variant: "destructive" });
      } else if (res.data?.error) {
        toast({ title: "Erro ao alterar senha", description: res.data.error, variant: "destructive" });
      } else {
        toast({ title: `Senha de ${pwdTarget.name || pwdTarget.email || "admin"} alterada com sucesso` });
        setPwdDialogOpen(false);
      }
    } catch (err: any) {
      console.error("[PWD] Exception:", err);
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
    setChangingPwd(false);
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
                <TableHead className="w-[100px]" />
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
                    <div className="flex items-center gap-1">
                      {canManageUsers && m.id !== currentUserId && (
                        <Button variant="ghost" size="icon" title="Alterar senha" onClick={() => openPwdDialog(m)}>
                          <KeyRound className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleRemove(m.id, m.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

      {/* Create Admin Dialog */}
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
            <div className="space-y-3 rounded-md border p-3">
              <Label className="text-sm font-semibold">Permissões</Label>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-orders" className="text-sm font-normal">Gerenciar Pedidos</Label>
                <Switch id="perm-orders" checked={form.can_manage_orders} onCheckedChange={(v) => setForm({ ...form, can_manage_orders: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-supply" className="text-sm font-normal">Editar Estoque</Label>
                <Switch id="perm-supply" checked={form.can_edit_supply} onCheckedChange={(v) => setForm({ ...form, can_edit_supply: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-email" className="text-sm font-normal">Gerar Emails</Label>
                <Switch id="perm-email" checked={form.can_gen_email} onCheckedChange={(v) => setForm({ ...form, can_gen_email: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-users" className="text-sm font-normal">Gerenciar Usuários</Label>
                <Switch id="perm-users" checked={form.can_manage_users} onCheckedChange={(v) => setForm({ ...form, can_manage_users: v })} />
              </div>
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

      {/* Change Password Dialog */}
      <Dialog open={pwdDialogOpen} onOpenChange={setPwdDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Definir nova senha para {pwdTarget?.name || pwdTarget?.email || "administrador"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPwd ? "text" : "password"}
                  value={pwdForm.password}
                  onChange={(e) => setPwdForm({ ...pwdForm, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPwd ? "text" : "password"}
                  value={pwdForm.confirm}
                  onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                  placeholder="Repita a senha"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPwdDialogOpen(false)}>Cancelar</Button>
            <Button type="button" onClick={() => { console.log("[PWD] Button clicked!"); handleChangePassword(); }} disabled={changingPwd}>
              {changingPwd ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Alterar Senha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
