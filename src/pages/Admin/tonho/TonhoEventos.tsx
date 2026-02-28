import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { eventStatusBadge } from "@/components/StatusBadge";
import { events, getClientName, getProductName, formatCurrency, formatDate } from "@/data/mock-data";

export default function TonhoEventos() {
  const tonhoEvents = events.filter((e) => e.empresa === "tonho");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Eventos Fechados — Tonho</h1>
        <p className="text-muted-foreground">Eventos confirmados e realizados</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Evento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tonhoEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{getClientName(event.clientId)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{event.products?.map(getProductName).join(", ")}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(event.value)}</TableCell>
                  <TableCell className="text-center">{eventStatusBadge(event.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
