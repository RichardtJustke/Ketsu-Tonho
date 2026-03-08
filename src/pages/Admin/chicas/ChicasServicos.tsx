import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, Loader2 } from "lucide-react";

export default function ChicasServicos() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("services").select("*").order("ordem").then(({ data }) => {
      setServices(data ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Serviços — Chicas</h1>
        <p className="text-muted-foreground">Serviços oferecidos</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{s.titulo}</CardTitle>
                <Wrench className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{s.descricao_breve ?? "Sem descrição"}</p>
              <span className="text-xs text-muted-foreground">{s.categoria}</span>
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">Nenhum serviço cadastrado.</p>}
      </div>
    </div>
  );
}
