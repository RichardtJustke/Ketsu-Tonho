import { MetricCard } from "../components/MetricCard.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { events, budgets, services } from "../data/mock-data.ts";
import { Wrench, CalendarDays, FileText, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Set", agendamentos: 4 },
  { month: "Out", agendamentos: 6 },
  { month: "Nov", agendamentos: 8 },
  { month: "Dez", agendamentos: 5 },
  { month: "Jan", agendamentos: 7 },
  { month: "Fev", agendamentos: 9 },
];

export default function ChicasDashboard() {
  const today = "2026-02-20";
  const chicasEvents = events.filter((e) => e.empresa === "chicas");
  const busyServiceIds = new Set(chicasEvents.filter((e) => e.date === today && e.status !== "encerrado").flatMap((e) => e.services ?? []));
  const availableToday = services.length - busyServiceIds.size;
  const monthEvents = chicasEvents.filter((e) => e.date.startsWith("2026-02") && e.status === "confirmado").length;
  const pending = budgets.filter((b) => b.empresa === "chicas" && ["recebido", "em_edicao"].includes(b.status)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Chicas</h1>
        <p className="text-muted-foreground">Serviços & disponibilidade</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Serviços Disponíveis Hoje" value={availableToday} subtitle={`de ${services.length} totais`} icon={<Wrench className="h-5 w-5" />} />
        <MetricCard title="Eventos no Mês" value={monthEvents} icon={<CalendarDays className="h-5 w-5" />} />
        <MetricCard title="Orçamentos Pendentes" value={pending} icon={<FileText className="h-5 w-5" />} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-primary" />Agendamentos por Período</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)" }} />
              <Area type="monotone" dataKey="agendamentos" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
