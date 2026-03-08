import { useEffect, useState } from "react";
import { MetricCard } from "./components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, orderStatusLabel } from "./data/utils.ts";
import { StatusBadge } from "./components/StatusBagde.tsx";
import { CalendarDays, FileText, ShoppingCart, Wrench, Clock, Loader2 } from "lucide-react";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ confirmedBookings: 0, pendingOrders: 0, tonhoRevenue: 0, chicasEvents: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split("T")[0];

      const [bookingsRes, ordersRes, tonhoOrdersRes, chicasEventsRes, recentRes, upcomingRes] = await Promise.all([
        supabase.from("rental_bookings").select("id", { count: "exact" }).eq("status", "confirmed"),
        supabase.from("orders").select("id", { count: "exact" }).in("status", ["pending", "confirmed"]),
        supabase.from("orders").select("total_amount").eq("platform", "tonho").eq("status", "completed"),
        supabase.from("buffet_events").select("id", { count: "exact" }).gte("event_date", today),
        supabase.from("orders").select("*, profiles!inner(name)").order("created_at", { ascending: false }).limit(5),
        supabase.from("rental_bookings").select("*, profiles!inner(name), equipment!inner(name)").gte("start_date", today).order("start_date").limit(5),
      ]);

      const revenue = (tonhoOrdersRes.data ?? []).reduce((sum, o) => sum + Number(o.total_amount), 0);

      setStats({
        confirmedBookings: bookingsRes.count ?? 0,
        pendingOrders: ordersRes.count ?? 0,
        tonhoRevenue: revenue,
        chicasEvents: chicasEventsRes.count ?? 0,
      });
      setRecentOrders(recentRes.data ?? []);
      setUpcomingBookings(upcomingRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Geral</h1>
        <p className="text-muted-foreground">Visão consolidada — Tonho & Chicas</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Reservas Confirmadas" value={stats.confirmedBookings} subtitle="Total ambas empresas" icon={<CalendarDays className="h-5 w-5" />} />
        <MetricCard title="Pedidos Pendentes" value={stats.pendingOrders} subtitle="Aguardando resposta" icon={<FileText className="h-5 w-5" />} />
        <MetricCard title="Receita Tonho" value={formatCurrency(stats.tonhoRevenue)} subtitle="Pedidos concluídos" icon={<ShoppingCart className="h-5 w-5" />} />
        <MetricCard title="Eventos Chicas" value={stats.chicasEvents} subtitle="Agendados" icon={<Wrench className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Clock className="h-4 w-4 text-primary" />Próximas Reservas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBookings.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma reserva futura.</p>}
            {upcomingBookings.map((b: any) => (
              <div key={b.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{(b.equipment as any)?.name}</p>
                  <p className="text-xs text-muted-foreground">{(b.profiles as any)?.name} · {formatDate(b.start_date)}</p>
                </div>
                <StatusBadge status={b.status === "confirmed" ? "success" : "neutral"} label={b.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4 text-primary" />Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.length === 0 && <p className="text-sm text-muted-foreground">Nenhum pedido encontrado.</p>}
            {recentOrders.map((o: any) => (
              <div key={o.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{(o.profiles as any)?.name}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(Number(o.total_amount))} · {o.platform}</p>
                </div>
                <StatusBadge status={o.status === "completed" ? "success" : o.status === "pending" ? "warning" : "neutral"} label={orderStatusLabel(o.status)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
