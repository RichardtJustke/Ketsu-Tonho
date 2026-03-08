import { useEffect, useState } from "react";
import { MetricCard } from "../components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { ShoppingCart, Package, CalendarDays, AlertTriangle, Loader2 } from "lucide-react";

export default function TonhoDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ monthRevenue: 0, lowStock: 0, confirmedBookings: 0, pendingOrders: 0 });

  useEffect(() => {
    async function load() {
      const now = new Date();
      const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

      const [revenueRes, lowStockRes, bookingsRes, ordersRes] = await Promise.all([
        supabase.from("orders").select("total_amount").eq("platform", "tonho").eq("status", "completed").gte("created_at", monthStart),
        supabase.from("equipment").select("id", { count: "exact" }).lt("stock_available", 5),
        supabase.from("rental_bookings").select("id", { count: "exact" }).eq("status", "confirmed"),
        supabase.from("orders").select("id", { count: "exact" }).eq("platform", "tonho").in("status", ["pending", "confirmed"]),
      ]);

      const revenue = (revenueRes.data ?? []).reduce((sum, o) => sum + Number(o.total_amount), 0);

      setStats({
        monthRevenue: revenue,
        lowStock: lowStockRes.count ?? 0,
        confirmedBookings: bookingsRes.count ?? 0,
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
        <h1 className="text-2xl font-bold">Dashboard Tonho</h1>
        <p className="text-muted-foreground">Produtos & eventos</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Receita do Mês" value={formatCurrency(stats.monthRevenue)} icon={<ShoppingCart className="h-5 w-5" />} />
        <MetricCard title="Estoque Baixo" value={stats.lowStock} subtitle="itens com < 5 unidades" icon={<AlertTriangle className="h-5 w-5" />} />
        <MetricCard title="Reservas Confirmadas" value={stats.confirmedBookings} icon={<CalendarDays className="h-5 w-5" />} />
        <MetricCard title="Pedidos Pendentes" value={stats.pendingOrders} icon={<Package className="h-5 w-5" />} />
      </div>
    </div>
  );
}
