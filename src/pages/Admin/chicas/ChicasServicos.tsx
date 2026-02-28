import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { services, events } from "../data/mock-data.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Wrench } from "lucide-react";
import { formatDate } from "../data/mock-data.ts";

export default function ChicasServicos() {
  const chicasEvents = events.filter((e) => e.empresa === "chicas" && e.status !== "encerrado");

  const serviceAvailability = services.map((service) => {
    const blockingEvent = chicasEvents.find((e) => e.services?.includes(service.id));
    return {
      ...service,
      available: !blockingEvent,
      blockedUntil: blockingEvent?.date,
      blockedBy: blockingEvent?.title,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Serviços — Chicas</h1>
        <p className="text-muted-foreground">Serviços oferecidos e disponibilidade</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceAvailability.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{service.name}</CardTitle>
                <Wrench className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">R$ {service.price.toLocaleString("pt-BR")}</span>
                <span className="text-xs text-muted-foreground">{service.category}</span>
              </div>
              <div className="border-t pt-2">
                {service.available ? (
                  <StatusBadge status="success" label="Disponível" />
                ) : (
                  <div className="space-y-1">
                    <StatusBadge status="danger" label="Indisponível" />
                    <p className="text-xs text-muted-foreground">
                      Bloqueado por: {service.blockedBy} ({service.blockedUntil && formatDate(service.blockedUntil)})
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
