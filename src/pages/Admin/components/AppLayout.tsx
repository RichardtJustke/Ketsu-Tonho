import { AppSidebar } from "./AppSidebar.tsx";
import { AdminPermissionsContext, useAdminPermissionsLoader } from "../hooks/useAdminPermissions.ts";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const permsValue = useAdminPermissionsLoader();

  return (
    <AdminPermissionsContext.Provider value={permsValue}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 pt-16 md:p-6 md:pt-6">{children}</div>
        </main>
      </div>
    </AdminPermissionsContext.Provider>
  );
}
