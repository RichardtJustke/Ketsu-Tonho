import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  LogOut,
  Ticket,
  UtensilsCrossed,
} from "lucide-react";
import { NavLink } from "./NavLink.tsx";
import { cn } from "../lib/utils.ts";
import { useAuth } from "../../../shared/contexts/AuthContext.jsx";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const tonhoItems: NavItem[] = [
  { title: "Dashboard", url: "/admin/tonho", icon: LayoutDashboard },
  // { title: "Estoque", url: "/admin/tonho/estoque", icon: Warehouse },
  { title: "Produtos", url: "/admin/tonho/produtos", icon: Package },
  { title: "Vendas", url: "/admin/tonho/vendas", icon: ShoppingCart },
  { title: "Eventos Fechados", url: "/admin/tonho/eventos", icon: CalendarDays },
  { title: "Orçamentos", url: "/admin/tonho/orcamentos", icon: FileText },
  { title: "Calendário", url: "/admin/tonho/calendario", icon: CalendarDays },
];

const chicasItems: NavItem[] = [
  { title: "Dashboard", url: "/admin/chicas", icon: LayoutDashboard },
  { title: "Cardápio", url: "/admin/chicas/cardapio", icon: UtensilsCrossed },
  { title: "Serviços", url: "/admin/chicas/servicos", icon: Wrench },
  // { title: "Disponibilidade", url: "/admin/chicas/disponibilidade", icon: Clock },
  { title: "Eventos Fechados", url: "/admin/chicas/eventos", icon: CalendarDays },
  { title: "Orçamentos", url: "/admin/chicas/orcamentos", icon: FileText },
  { title: "Calendário", url: "/admin/chicas/calendario", icon: CalendarDays },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [tonhoOpen, setTonhoOpen] = useState(location.pathname.startsWith("/admin/tonho"));
  const [chicasOpen, setChicasOpen] = useState(location.pathname.startsWith("/admin/chicas"));
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

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-1 p-4 flex-1">
      <NavLink to="/admin" end className={linkClass("/admin")}>
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard Geral</span>
      </NavLink>

      <div className="mt-4">
        <button
          onClick={() => setTonhoOpen(!tonhoOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            isGroupActive("/admin/tonho") ? "text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
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

      <div className="mt-2">
        <button
          onClick={() => setChicasOpen(!chicasOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            isGroupActive("/admin/chicas") ? "text-primary" : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
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

      <div className="mt-4 flex flex-col gap-0.5">
        <NavLink to="/admin/orcamentos" end className={linkClass("/admin/orcamentos")}>
          <BarChart3 className="h-4 w-4" />
          <span>Central de Orçamentos</span>
        </NavLink>
        <NavLink to="/admin/clientes" end className={linkClass("/admin/clientes")}>
          <Users className="h-4 w-4" />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/admin/cupons" end className={linkClass("/admin/cupons")}>
          <Ticket className="h-4 w-4" />
          <span>Cupons</span>
        </NavLink>
        <NavLink to="/admin/administracao" end className={linkClass("/admin/administracao")}>
          <Settings className="h-4 w-4" />
          <span>Administração</span>
        </NavLink>
      </div>

      <div className="mt-auto border-t border-sidebar-border pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md bg-sidebar-accent p-2 text-foreground md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

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
