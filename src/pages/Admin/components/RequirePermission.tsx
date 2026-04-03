import { useAdminPermissions, type AdminPermissions } from "../hooks/useAdminPermissions.ts";
import { ShieldX } from "lucide-react";

interface Props {
  permission: keyof AdminPermissions;
  children: React.ReactNode;
}

export function RequirePermission({ permission, children }: Props) {
  const { permissions, loading } = useAdminPermissions();

  if (loading) return null;
  if (!permissions[permission]) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
        <ShieldX className="h-12 w-12" />
        <h2 className="text-xl font-semibold">Acesso Negado</h2>
        <p className="text-sm">Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return <>{children}</>;
}
