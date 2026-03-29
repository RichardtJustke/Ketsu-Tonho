import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate } from "../data/utils.ts";
import { Loader2, Calendar, User, Clock } from "lucide-react";

export default function TonhoEventos() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*, profiles!orders_user_id_profiles_fkey(name)")
      .eq("platform", "tonho")
      .order("event_date", { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const columns = [
    {
      id: "pending",
      title: "Propostas",
      headerColor: "bg-gray-100 text-gray-800 border-gray-200",
      cardStyle: "border-l-4 border-l-gray-400 bg-white",
      allowedStatuses: ["pending"]
    },
    {
      id: "confirmed",
      title: "Confirmados",
      headerColor: "bg-blue-100 text-blue-800 border-blue-200",
      cardStyle: "border-l-4 border-l-blue-400 bg-blue-50/30",
      allowedStatuses: ["confirmed"]
    },
    {
      id: "paid",
      title: "Pagos",
      headerColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      cardStyle: "border-l-4 border-l-indigo-400 bg-indigo-50/30",
      allowedStatuses: ["paid"]
    },
    {
      id: "completed",
      title: "Concluídos",
      headerColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cardStyle: "border-l-4 border-l-emerald-400 bg-emerald-50/30",
      allowedStatuses: ["in_progress", "completed"]
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">Eventos & Propostas — Tonho</h1>
        <p className="text-muted-foreground">Todos os orçamentos e eventos separados por status</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 items-start flex-1 min-h-[65vh]">
        {columns.map(column => {
          const colOrders = orders.filter(o => column.allowedStatuses.includes(o.status));
          
          return (
            <div key={column.id} className="flex-1 min-w-[320px] max-w-[360px] bg-slate-50 border rounded-xl flex flex-col h-full shadow-sm max-h-[75vh]">
              {/* Kanban Column Header */}
              <div className={`p-4 font-bold text-sm tracking-wide uppercase flex justify-between items-center bg-gray-50 border-b rounded-t-xl shrink-0`}>
                <span className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.headerColor.split(' ')[0]}`} />
                  {column.title}
                </span>
                <Badge variant="outline" className="bg-white px-2 py-0.5 font-bold shadow-sm">
                  {colOrders.length}
                </Badge>
              </div>
              
              {/* Kanban Cards Container */}
              <div className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {colOrders.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center py-8">Nenhum evento no momento.</p>
                  </div>
                ) : (
                  colOrders.map(order => (
                    <Card key={order.id} className={`shadow-sm hover:shadow-md transition-shadow cursor-default shrink-0 ${column.cardStyle}`}>
                      <CardContent className="p-4 space-y-4">
                        {/* Data e Valor */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center text-sm font-semibold text-gray-900 bg-white/50 px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                            <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                            {order.event_date ? formatDate(order.event_date) : "Data a definir"}
                          </div>
                          <span className="text-sm font-bold text-gray-900 bg-white/50 px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                            {formatCurrency(Number(order.total_amount))}
                          </span>
                        </div>
                        
                        {/* Cliente */}
                        <div className="flex items-center text-[15px] font-medium text-foreground px-1">
                          <User className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="truncate">{(order.profiles as any)?.name ?? "Cliente Não Informado"}</span>
                        </div>

                        {/* Info extras */}
                        <div className="flex justify-between items-center pt-3 border-t border-black/5 px-1">
                           <div className="flex items-center text-[11px] font-medium text-muted-foreground" title="Criado em">
                             <Clock className="w-3 h-3 mr-1" />
                             {new Date(order.created_at).toLocaleDateString("pt-BR")}
                           </div>
                           <span className="text-[10px] uppercase font-bold text-muted-foreground/60 bg-gray-100/50 px-1.5 py-0.5 rounded">
                             #{order.id.slice(0, 6)}
                           </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}