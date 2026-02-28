import { MetricCard } from "./components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { budgetStatusBadge, eventStatusBadge } from "./components/StatusBagde.tsx";
import { events, budgets, sales, getClientName, formatCurrency, formatDate } from "./data/mock-data.ts";
import { CalendarDays, FileText, ShoppingCart, Wrench, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { month: "Out", tonho: 12000, chicas: 18000 },
  { month: "Nov", tonho: 15000, chicas: 22000 },
  { month: "Dez", tonho: 18000, chicas: 25000 },
  { month: "Jan", tonho: 14000, chicas: 20000 },
  { month: "Fev", tonho: 21000, chicas: 28000 },
];

const Admin = () => {
  const totalEvents = events.filter((e) => e.status === "confirmado").length;
  const pendingBudgets = budgets.filter((b) => ["recebido", "em_edicao"].includes(b.status)).length;
  const totalSales = sales.reduce((acc, s) => acc + s.value, 0);
  const chicasEvents = events.filter((e) => e.empresa === "chicas" && e.status === "confirmado").length;
  const upcomingEvents = events
    .filter((e) => e.status === "confirmado" && e.date >= "2026-02-20")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  const recentBudgets = budgets
    .filter((b) => ["recebido", "em_edicao", "enviado"].includes(b.status))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Geral</h1>
        <p className="text-muted-foreground">Visão consolidada — Tonho & Chicas</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Eventos Confirmados"
          value={totalEvents}
          subtitle="Total ambas empresas"
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <MetricCard
          title="Orçamentos Pendentes"
          value={pendingBudgets}
          subtitle="Aguardando resposta"
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricCard
          title="Vendas Tonho"
          value={formatCurrency(totalSales)}
          subtitle="Total acumulado"
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <MetricCard
          title="Serviços Chicas"
          value={chicasEvents}
          subtitle="Eventos agendados"
          icon={<Wrench className="h-5 w-5" />}
        />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Comparativo Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="tonho" name="Tonho" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="chicas" name="Chicas" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-primary" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {getClientName(event.clientId)} · {formatDate(event.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">{event.empresa}</span>
                  {eventStatusBadge(event.status)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Budgets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Orçamentos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBudgets.map((budget) => (
              <div key={budget.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{budget.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {getClientName(budget.clientId)} · {formatCurrency(budget.value)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase text-muted-foreground">{budget.empresa}</span>
                  {budgetStatusBadge(budget.status)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
