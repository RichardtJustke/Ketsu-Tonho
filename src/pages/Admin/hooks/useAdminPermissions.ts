import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "../../../shared/contexts/AuthContext.jsx";

export interface AdminPermissions {
  can_manage_orders: boolean;
  can_edit_supply: boolean;
  can_manage_users: boolean;
  can_gen_email: boolean;
}

const defaultPerms: AdminPermissions = {
  can_manage_orders: false,
  can_edit_supply: false,
  can_manage_users: false,
  can_gen_email: false,
};

interface PermissionsContextValue {
  permissions: AdminPermissions;
  loading: boolean;
}

export const AdminPermissionsContext = createContext<PermissionsContextValue>({
  permissions: defaultPerms,
  loading: true,
});

export function useAdminPermissions() {
  return useContext(AdminPermissionsContext);
}

export function useAdminPermissionsLoader(): PermissionsContextValue {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<AdminPermissions>(defaultPerms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from("admin_permissions")
      .select("can_manage_orders, can_edit_supply, can_manage_users, can_gen_email")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setPermissions(data as AdminPermissions);
        setLoading(false);
      });
  }, [user?.id]);

  return { permissions, loading };
}
