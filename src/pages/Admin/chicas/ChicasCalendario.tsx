import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function ChicasCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const end = `${year}-${String(month + 1).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;

    supabase
      .from("orders")
      .select("id, event_date, customer_name, total_amount, status")
      .eq("platform", "chicas")
      .gte("event_date", start)
      .lte("event_date", end)
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.event_date === dateStr);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendário — Chicas</h1>
        <p className="text-muted-foreground">Eventos de buffet</p>
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
              const dayEvents = getEventsForDay(day);
              return (
                <div key={day} className="min-h-[80px] rounded-md border p-1.5">
                  <span className="text-xs font-medium">{day}</span>
                  {dayEvents.map((e) => (
                    <div key={e.id} className="mt-1 truncate rounded bg-pink-100 px-1 py-0.5 text-[10px] text-pink-700">
                      {e.customer_name}
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
