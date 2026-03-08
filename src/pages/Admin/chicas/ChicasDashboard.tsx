import { useEffect, useState } from "react";
import { MetricCard } from "../components/MetricCard.tsx";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, CalendarDays, FileText, Loader2 } from "lucide-react";

export default function ChicasDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalServices: 0, monthEvents: 0, pendingOrders: 0 });

  useEffect(() => {
    async function load() {
      const now = new Date();
      const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      const monthEnd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()}`;

      const [servicesRes, eventsRes, ordersRes] = await Promise.all([
        supabase.from("services").select("id", { count: "exact" }),
        supabase.from("buffet_events").select("id", { count: "exact" }).gte("event_date", monthStart).lte("event_date", monthEnd),
        supabase.from("orders").select("id", { count: "exact" }).eq("platform", "chicas").in("status", ["pending", "confirmed"]),
      ]);

      setStats({
        totalServices: servicesRes.count ?? 0,
        monthEvents: eventsRes.count ?? 0,
        pendingOrders: ordersRes.count ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Chicas</h1>
        <p className="text-muted-foreground">Serviços & disponibilidade</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Serviços Cadastrados" value={stats.totalServices} icon={<Wrench className="h-5 w-5" />} />
        <MetricCard title="Eventos no Mês" value={stats.monthEvents} icon={<CalendarDays className="h-5 w-5" />} />
        <MetricCard title="Pedidos Pendentes" value={stats.pendingOrders} icon={<FileText className="h-5 w-5" />} />
      </div>
    </div>
  );
}
