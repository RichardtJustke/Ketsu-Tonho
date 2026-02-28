import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { teamMembers } from "./data/mock-data.ts";
import { StatusBadge } from "./components/StatusBagde.tsx";
import { Badge } from "./components/ui/badge.tsx";
import { Shield, Users } from "lucide-react";

export default function Administracao() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Administração</h1>
        <p className="text-muted-foreground">Gestores e equipe do sistema</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Users className="h-4 w-4 text-primary" />Membros</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead>Permissões</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge
                      status={member.role === "gestor" ? "primary" : "neutral"}
                      label={member.role === "gestor" ? "Gestor" : "Equipe"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.permissions.map((p) => (
                        <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><Shield className="h-4 w-4 text-primary" />Configurações de Acesso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border p-4">
            <p className="text-sm font-medium">Gestores</p>
            <p className="text-xs text-muted-foreground">Acesso completo ao sistema — gerenciar equipe, dados e configurações</p>
          </div>
          <div className="rounded-md border p-4">
            <p className="text-sm font-medium">Equipe</p>
            <p className="text-xs text-muted-foreground">Acesso limitado — visualizar dados e editar conforme permissões</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
