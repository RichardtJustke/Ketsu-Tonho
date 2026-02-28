import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table.tsx";
import { Input } from "./components/ui/input.tsx";
import { Button } from "./components/ui/button.tsx";
import { clients, events, budgets, getClientName, formatCurrency, formatDate } from "./data/mock-data.ts";
import { budgetStatusBadge, eventStatusBadge } from "./components/StatusBagde.tsx";
import { Search, ArrowLeft, User, Mail, Phone, Building } from "lucide-react";

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const selectedClient = clients.find((c) => c.id === selectedId);

  if (selectedClient) {
    const clientEvents = events.filter((e) => e.clientId === selectedClient.id);
    const clientBudgets = budgets.filter((b) => b.clientId === selectedClient.id);

    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setSelectedId(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{selectedClient.name}</h1>
            <p className="text-muted-foreground">{selectedClient.company ?? "Pessoa Física"}</p>
          </div>
        </div>

        {/* Contact info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Dados Cadastrais</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /> {selectedClient.email}</div>
            <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /> {selectedClient.phone}</div>
            {selectedClient.company && <div className="flex items-center gap-2 text-sm"><Building className="h-4 w-4 text-muted-foreground" /> {selectedClient.company}</div>}
          </CardContent>
        </Card>

        {/* Events */}
        <Card>
          <CardHeader><CardTitle className="text-base">Eventos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {clientEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum evento encontrado.</p>
            ) : clientEvents.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(e.date)} · {e.empresa.toUpperCase()} · {formatCurrency(e.value)}</p>
                </div>
                {eventStatusBadge(e.status)}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budgets */}
        <Card>
          <CardHeader><CardTitle className="text-base">Histórico de Orçamentos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {clientBudgets.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum orçamento encontrado.</p>
            ) : clientBudgets.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="font-medium text-sm">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(b.date)} · {b.empresa.toUpperCase()} · {formatCurrency(b.value)}</p>
                </div>
                {budgetStatusBadge(b.status)}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Photo gallery placeholder */}
        <Card>
          <CardHeader><CardTitle className="text-base">Galeria de Fotos</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                  Foto {i}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-muted-foreground">Base de clientes</p>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.email}</TableCell>
                  <TableCell className="text-muted-foreground">{client.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{client.company ?? "—"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedId(client.id)}>Ver detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
