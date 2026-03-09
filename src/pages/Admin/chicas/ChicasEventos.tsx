import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, orderStatusLabel } from "../data/utils.ts";
import { StatusBadge } from "../components/StatusBagde.tsx";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 12;

export default function ChicasEventos() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    supabase
      .from("buffet_events")
      .select("*, profiles!inner(name), orders!buffet_events_order_id_fkey(status, total_amount)")
      .order("event_date", { ascending: false })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = events.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getStatusBadge = (event: any) => {
    const orderStatus = (event.orders as any)?.status;
    if (!orderStatus) return <span className="text-xs text-muted-foreground">Sem pedido</span>;
    const variant = ["confirmed", "paid", "completed"].includes(orderStatus) ? "success" : orderStatus === "cancelled" ? "neutral" : "warning";
    return <StatusBadge status={variant} label={orderStatusLabel(orderStatus)} />;
  };

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
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{formatDate(e.event_date)}</TableCell>
                  <TableCell className="font-medium">{(e.profiles as any)?.name}</TableCell>
                  <TableCell className="text-center">{e.guest_count}</TableCell>
                  <TableCell className="text-muted-foreground">{e.event_location ?? "—"}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(e)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{e.notes ?? "—"}</TableCell>
                </TableRow>
              ))}
              {events.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Nenhum evento encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setPage(Math.max(1, currentPage - 1)); }} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink href="#" isActive={p === currentPage} onClick={(e) => { e.preventDefault(); setPage(p); }}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, currentPage + 1)); }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}