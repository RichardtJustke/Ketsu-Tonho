import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { supabase } from "@/integrations/supabase/client";
import { StatusBadge } from "./components/StatusBagde.tsx";
import { Badge } from "./components/ui/badge.tsx";
import { Shield, Users, Loader2 } from "lucide-react";

export default function Administracao() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Get all admin users
      const { data: adminRoles } = await supabase.from("user_roles").select("user_id").eq("role", "admin");
      if (!adminRoles?.length) { setLoading(false); return; }

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
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Administração</h1>
        <p className="text-muted-foreground">Gestores do sistema</p>
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
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">Nenhum administrador encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Shield className="h-4 w-4 text-primary" />Níveis de Acesso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border p-4">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">Acesso completo ao painel administrativo</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm font-medium">Customer</p>
            <p className="text-xs text-muted-foreground">Acesso ao site público — pedidos e perfil</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
