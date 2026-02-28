import { AppSidebar } from "./AppSidebar.tsx";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 pt-16 md:p-6 md:pt-6">{children}</div>
      </main>
    </div>
  );
}
