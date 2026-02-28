import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events, sales, formatDate } from "@/data/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function TonhoCalendario() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const tonhoEvents = events.filter((e) => e.empresa === "tonho");

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = tonhoEvents.filter((e) => e.date === dateStr);
    const daySales = sales.filter((s) => s.date === dateStr);
    return { events: dayEvents, sales: daySales };
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendário — Tonho</h1>
        <p className="text-muted-foreground">Eventos e vendas</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
            <CardTitle className="capitalize text-base">{monthName}</CardTitle>
            <Button variant="outline" size="icon" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px">
            {DAYS.map((d) => (
              <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px]" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const { events: dayEvents, sales: daySales } = getEventsForDay(day);
              return (
                <div key={day} className="min-h-[80px] rounded-md border p-1.5">
                  <span className="text-xs font-medium">{day}</span>
                  {dayEvents.map((e) => (
                    <div key={e.id} className="mt-1 truncate rounded bg-primary/15 px-1 py-0.5 text-[10px] text-primary">{e.title}</div>
                  ))}
                  {daySales.map((s) => (
                    <div key={s.id} className="mt-1 truncate rounded bg-success/15 px-1 py-0.5 text-[10px] text-success">Venda</div>
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
