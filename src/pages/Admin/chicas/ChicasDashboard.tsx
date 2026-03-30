import { useEffect, useState } from "react";
import { MetricCard } from "../components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from "../data/utils.ts";
import { Wrench, CalendarDays, FileText, ShoppingCart, Loader2, Utensils } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ChicasDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ monthRevenue: 0, buffetsVendidos: 0, monthEvents: 0, pendingOrders: 0 });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const now = new Date();
      const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
      const monthEnd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()}`;

      const [revenueRes, servicesRes, eventsRes, ordersRes, buffetsSoldRes] = await Promise.all([
        supabase.from("orders").select("total_amount, created_at").eq("platform", "chicas").in("status", ["completed", "paid"]).gte("created_at", monthStart),
        supabase.from("services").select("id", { count: "exact" }),
        supabase.from("buffet_events").select("id", { count: "exact" }).gte("event_date", monthStart).lte("event_date", monthEnd),
        supabase.from("orders").select("id", { count: "exact" }).eq("platform", "chicas").in("status", ["pending", "confirmed"]),
        supabase.from("orders").select("id", { count: "exact" }).eq("platform", "chicas").in("status", ["completed", "paid"])
      ]);

      const revenueData = revenueRes.data ?? [];
      const revenue = revenueData.reduce((sum, o) => sum + Number(o.total_amount), 0);

      // Agrupar dados de vendas por dia para o gráfico
      const dailyData = {} as Record<string, number>;
      revenueData.forEach((o) => {
        const dateStr = new Date(o.created_at).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' });
        dailyData[dateStr] = (dailyData[dateStr] || 0) + Number(o.total_amount);
      });

      const formattedChartData = Object.entries(dailyData)
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => {
          const [dayA, monthA] = a.date.split('/');
          const [dayB, monthB] = b.date.split('/');
          return new Date(now.getFullYear(), Number(monthA)-1, Number(dayA)).getTime() - new Date(now.getFullYear(), Number(monthB)-1, Number(dayB)).getTime();
        });

      setStats({
        monthRevenue: revenue,
        buffetsVendidos: buffetsSoldRes.count ?? 0,
        monthEvents: eventsRes.count ?? 0,
        pendingOrders: ordersRes.count ?? 0,
      });
      setChartData(formattedChartData);
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Receita do Mês" value={formatCurrency(stats.monthRevenue)} icon={<ShoppingCart className="h-5 w-5 text-chicas-500" />} />
        <MetricCard title="Buffets Vendidos" value={stats.buffetsVendidos} icon={<Utensils className="h-5 w-5 text-chicas-500" />} />
        <MetricCard title="Eventos Marcados" value={stats.monthEvents} subtitle="neste mês" icon={<CalendarDays className="h-5 w-5 text-chicas-500" />} />
        <MetricCard title="Pedidos Pendentes" value={stats.pendingOrders} icon={<FileText className="h-5 w-5 text-chicas-500" />} />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Vendas do Mês — Chicas</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotalChicas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="date" tick={{fontSize: 12}} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(val) => `R$${val}`} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Vendas"]}
                    labelStyle={{ color: 'black' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#ec4899" fillOpacity={1} fill="url(#colorTotalChicas)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground border border-dashed rounded-lg bg-muted/20">
              Nenhum dado de venda para este mês ainda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
