import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, bookingStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Loader2 } from "lucide-react";

export default function TonhoEventos() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("rental_bookings").select("*, profiles!inner(name), equipment!inner(name)").order("start_date", { ascending: false }).then(({ data }) => {
      setBookings(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Eventos / Reservas — Tonho</h1>
        <p className="text-muted-foreground">Reservas de equipamentos</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Período</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="text-sm">{formatDate(b.start_date)} — {formatDate(b.end_date)}</TableCell>
                  <TableCell className="font-medium">{(b.equipment as any)?.name}</TableCell>
                  <TableCell>{(b.profiles as any)?.name}</TableCell>
                  <TableCell className="text-center">{b.quantity}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(Number(b.total_price))}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={b.status === "confirmed" ? "success" : b.status === "pending" ? "warning" : "neutral"} label={bookingStatusLabel(b.status)} />
                  </TableCell>
                </TableRow>
              ))}
              {bookings.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhuma reserva encontrada.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
