import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { services, events, formatDate } from "../data/mock-data.tsx";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function ChicasDisponibilidade() {
  const [selectedDate, setSelectedDate] = useState("2026-02-20");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const chicasEvents = events.filter((e) => e.empresa === "chicas" && e.status !== "encerrado");

  const getServiceAvailability = (dateStr: string) => {
    return services.map((service) => {
      const blockingEvent = chicasEvents.find((e) => e.date === dateStr && e.services?.includes(service.id));
      return {
        ...service,
        available: !blockingEvent,
        blockedBy: blockingEvent?.title,
      };
    });
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));
  const monthName = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const availability = getServiceAvailability(selectedDate);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Disponibilidade — Chicas</h1>
        <p className="text-muted-foreground">Selecione uma data para ver a disponibilidade dos serviços</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Calendar */}
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
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const hasEvent = chicasEvents.some((e) => e.date === dateStr);
                const isSelected = dateStr === selectedDate;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-[40px] rounded-md text-sm transition-colors ${isSelected ? "bg-primary text-primary-foreground font-bold" : hasEvent ? "bg-destructive/10 text-destructive font-medium" : "hover:bg-accent"
                      }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Availability list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Serviços em {formatDate(selectedDate)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {availability.map((service) => (
              <div key={service.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  {!service.available && (
                    <p className="text-xs text-muted-foreground">Bloqueado: {service.blockedBy}</p>
                  )}
                </div>
                <StatusBadge status={service.available ? "success" : "danger"} label={service.available ? "Livre" : "Ocupado"} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
