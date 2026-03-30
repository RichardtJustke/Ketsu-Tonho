import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { orderStatusLabel } from "../data/utils.ts";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-700",
  confirmed: "bg-blue-500/15 text-blue-700",
  paid: "bg-green-500/15 text-green-700",
  in_progress: "bg-orange-500/15 text-orange-700",
  completed: "bg-emerald-500/15 text-emerald-700",
  cancelled: "bg-muted text-muted-foreground line-through",
};

export default function ChicasCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const end = `${year}-${String(month + 1).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;

    supabase
      .from("orders")
      .select("*, profiles!orders_user_id_profiles_fkey(name)")
      .eq("platform", "chicas")
      .not("event_date", "is", null)
      .gte("event_date", start)
      .lte("event_date", end)
      .order("event_date")
      .then(({ data }) => {
        setOrders(data ?? []);
        setLoading(false);
      });
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const getOrdersForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return orders.filter((o) => o.event_date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendário — Chicas</h1>
        <p className="text-muted-foreground">Eventos de buffet agendados</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ChevronLeft className="h-4 w-4" /></Button>
            <CardTitle className="capitalize text-base">{monthName}</CardTitle>
            <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px">
            {DAYS.map((d) => <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">{d}</div>)}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="min-h-[80px]" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayOrders = getOrdersForDay(day);
              return (
                <div key={day} className="min-h-[80px] rounded-md border p-1.5">
                  <span className="text-xs font-medium">{day}</span>
                  {dayOrders.map((o) => (
                    <div key={o.id} className={`mt-1 truncate rounded px-1 py-0.5 text-[10px] ${statusColor[o.status] ?? "bg-pink-500/15 text-pink-700"}`}>
                      {(o.profiles as any)?.name ?? "Cliente"} · {orderStatusLabel(o.status)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
