import { MetricCard } from "../components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { events, budgets, sales, stockItems, formatCurrency } from "../data/mock-data.ts";
import { ShoppingCart, Package, CalendarDays, AlertTriangle, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Set", vendas: 8000 },
  { month: "Out", vendas: 12000 },
  { month: "Nov", vendas: 15000 },
  { month: "Dez", vendas: 18000 },
  { month: "Jan", vendas: 14000 },
  { month: "Fev", vendas: 21000 },
];

export default function TonhoDashboard() {
  const monthSales = sales.filter((s) => s.date.startsWith("2026-02")).reduce((a, s) => a + s.value, 0);
  const lowStock = stockItems.filter((s) => s.status !== "normal").length;
  const confirmedEvents = events.filter((e) => e.empresa === "tonho" && e.status === "confirmado").length;
  const pendingBudgets = budgets.filter((b) => b.empresa === "tonho" && ["recebido", "em_edicao"].includes(b.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Tonho</h1>
        <p className="text-muted-foreground">Produtos & eventos</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Vendas do Mês" value={formatCurrency(monthSales)} icon={<ShoppingCart className="h-5 w-5" />} />
        <MetricCard title="Estoque Baixo" value={lowStock} subtitle="itens em alerta" icon={<AlertTriangle className="h-5 w-5" />} />
        <MetricCard title="Eventos Confirmados" value={confirmedEvents} icon={<CalendarDays className="h-5 w-5" />} />
        <MetricCard title="Orçamentos Pendentes" value={pendingBudgets} icon={<Package className="h-5 w-5" />} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-primary" />Vendas por Período</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }} formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="vendas" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
