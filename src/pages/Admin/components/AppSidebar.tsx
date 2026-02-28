import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  CalendarDays,
  FileText,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Warehouse,
  Wrench,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "./NavLink.tsx";
import { cn } from "../lib/utils.ts";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const tonhoItems: NavItem[] = [
  { title: "Dashboard", url: "/tonho", icon: LayoutDashboard },
  { title: "Estoque", url: "/tonho/estoque", icon: Warehouse },
  { title: "Produtos", url: "/tonho/produtos", icon: Package },
  { title: "Vendas", url: "/tonho/vendas", icon: ShoppingCart },
  { title: "Eventos Fechados", url: "/tonho/eventos", icon: CalendarDays },
  { title: "Orçamentos", url: "/tonho/orcamentos", icon: FileText },
  { title: "Calendário", url: "/tonho/calendario", icon: CalendarDays },
];

const chicasItems: NavItem[] = [
  { title: "Dashboard", url: "/chicas", icon: LayoutDashboard },
  { title: "Serviços", url: "/chicas/servicos", icon: Wrench },
  { title: "Disponibilidade", url: "/chicas/disponibilidade", icon: Clock },
  { title: "Eventos Fechados", url: "/chicas/eventos", icon: CalendarDays },
  { title: "Orçamentos", url: "/chicas/orcamentos", icon: FileText },
  { title: "Calendário", url: "/chicas/calendario", icon: CalendarDays },
];

export function AppSidebar() {
  const location = useLocation();
  const [tonhoOpen, setTonhoOpen] = useState(location.pathname.startsWith("/tonho"));
  const [chicasOpen, setChicasOpen] = useState(location.pathname.startsWith("/chicas"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (prefix: string) => location.pathname.startsWith(prefix);

  const linkClass = (url: string) =>
    cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      isActive(url)
        ? "bg-sidebar-accent text-primary font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    );

  const sidebarContent = (
    <nav className="flex flex-col gap-1 p-4">
      {/* Dashboard Geral */}
      <NavLink to="/" end className={linkClass("/")}>
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard Geral</span>
      </NavLink>

      {/* Tonho */}
      <div className="mt-4">
        <button
          onClick={() => setTonhoOpen(!tonhoOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            isGroupActive("/tonho") ? "text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
          )}
        >
          <span>Tonho</span>
          {tonhoOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>
        {tonhoOpen && (
          <div className="ml-2 flex flex-col gap-0.5 border-l border-sidebar-border pl-2">
            {tonhoItems.map((item) => (
              <NavLink key={item.url} to={item.url} end className={linkClass(item.url)}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Chicas */}
      <div className="mt-2">
        <button
          onClick={() => setChicasOpen(!chicasOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            isGroupActive("/chicas") ? "text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
          )}
        >
          <span>Chicas</span>
          {chicasOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </button>
        {chicasOpen && (
          <div className="ml-2 flex flex-col gap-0.5 border-l border-sidebar-border pl-2">
            {chicasItems.map((item) => (
              <NavLink key={item.url} to={item.url} end className={linkClass(item.url)}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Shared */}
      <div className="mt-4 flex flex-col gap-0.5">
        <NavLink to="/orcamentos" end className={linkClass("/orcamentos")}>
          <BarChart3 className="h-4 w-4" />
          <span>Central de Orçamentos</span>
        </NavLink>
        <NavLink to="/clientes" end className={linkClass("/clientes")}>
          <Users className="h-4 w-4" />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/administracao" end className={linkClass("/administracao")}>
          <Settings className="h-4 w-4" />
          <span>Administração</span>
        </NavLink>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-sidebar-accent p-2 text-foreground md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground transition-transform md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-4">
          <h1 className="text-lg font-bold text-sidebar-accent-foreground">
            T<span className="text-primary">&</span>C Admin
          </h1>
          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
