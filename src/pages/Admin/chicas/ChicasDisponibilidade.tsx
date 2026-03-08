import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function ChicasDisponibilidade() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const end = `${year}-${String(month + 1).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;

    supabase.from("buffet_events").select("*, profiles!inner(name)").gte("event_date", start).lte("event_date", end).then(({ data }) => {
      setEvents(data ?? []);
      setLoading(false);
    });
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const eventsForDate = events.filter((e) => e.event_date === selectedDate);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Disponibilidade — Chicas</h1>
        <p className="text-muted-foreground">Selecione uma data para ver os eventos agendados</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const hasEvent = events.some((e) => e.event_date === dateStr);
                const isSelected = dateStr === selectedDate;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-[40px] rounded-md text-sm transition-colors ${isSelected ? "bg-primary text-primary-foreground font-bold" : hasEvent ? "bg-destructive/10 text-destructive font-medium" : "hover:bg-accent"}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Eventos em {formatDate(selectedDate)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {eventsForDate.length === 0 && <p className="text-sm text-muted-foreground">Nenhum evento nesta data.</p>}
            {eventsForDate.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{(e.profiles as any)?.name}</p>
                  <p className="text-xs text-muted-foreground">{e.guest_count} convidados · {e.event_location ?? "Local não definido"}</p>
                </div>
                <StatusBadge status="danger" label="Ocupado" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
