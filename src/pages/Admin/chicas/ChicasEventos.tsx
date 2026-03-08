import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "../data/utils.ts";
import { Loader2 } from "lucide-react";

export default function ChicasEventos() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("buffet_events").select("*, profiles!inner(name)").order("event_date", { ascending: false }).then(({ data }) => {
      setEvents(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Eventos — Chicas</h1>
        <p className="text-muted-foreground">Eventos de buffet agendados</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-center">Convidados</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{formatDate(e.event_date)}</TableCell>
                  <TableCell className="font-medium">{(e.profiles as any)?.name}</TableCell>
                  <TableCell className="text-center">{e.guest_count}</TableCell>
                  <TableCell className="text-muted-foreground">{e.event_location ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{e.notes ?? "—"}</TableCell>
                </TableRow>
              ))}
              {events.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Nenhum evento encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
