const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ShippingRequest {
  origin_zip: string;
  destination_zip: string;
  weight_kg: number;
  length_cm: number;
  width_cm: number;
  height_cm: number;
}

function sanitizeZip(zip: string): string {
  return zip.replace(/\D/g, "");
}

function validateInput(data: ShippingRequest): string | null {
  const originZip = sanitizeZip(data.origin_zip || "");
  const destZip = sanitizeZip(data.destination_zip || "");

  if (originZip.length !== 8) return "origin_zip must have 8 digits";
  if (destZip.length !== 8) return "destination_zip must have 8 digits";
  if (!data.weight_kg || data.weight_kg <= 0) return "weight_kg must be positive";
  if (!data.length_cm || data.length_cm <= 0) return "length_cm must be positive";
  if (!data.width_cm || data.width_cm <= 0) return "width_cm must be positive";
  if (!data.height_cm || data.height_cm <= 0) return "height_cm must be positive";

  // Correios limits
  if (data.weight_kg > 30) return "weight_kg max is 30kg";
  if (data.length_cm > 105) return "length_cm max is 105cm";
  if (data.width_cm > 105) return "width_cm max is 105cm";
  if (data.height_cm > 105) return "height_cm max is 105cm";

  const sum = data.length_cm + data.width_cm + data.height_cm;
  if (sum > 200) return "Sum of dimensions must be <= 200cm";

  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ShippingRequest = await req.json();
    const validationError = validateInput(data);

    if (validationError) {
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const originZip = sanitizeZip(data.origin_zip);
    const destZip = sanitizeZip(data.destination_zip);

    // Enforce minimum dimensions per Correios rules
    const length = Math.max(data.length_cm, 16);
    const width = Math.max(data.width_cm, 11);
    const height = Math.max(data.height_cm, 2);
    const weight = data.weight_kg;

    // Service codes: 04014 = SEDEX, 04510 = PAC
    const services = [
      { code: "04014", name: "SEDEX" },
      { code: "04510", name: "PAC" },
    ];

    const results = await Promise.allSettled(
      services.map(async (service) => {
        const params = new URLSearchParams({
          nCdEmpresa: "",
          sDsSenha: "",
          nCdServico: service.code,
          sCepOrigem: originZip,
          sCepDestino: destZip,
          nVlPeso: String(weight),
          nCdFormato: "1", // box/package
          nVlComprimento: String(length),
          nVlAltura: String(height),
          nVlLargura: String(width),
          nVlDiametro: "0",
          sCdMaoPropria: "N",
          nVlValorDeclarado: "0",
          sCdAvisoRecebimento: "N",
        });

        const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?${params}`;
        const res = await fetch(url);
        const text = await res.text();

        // Parse XML response
        const valueMatch = text.match(/<Valor>([\d.,]+)<\/Valor>/);
        const daysMatch = text.match(/<PrazoEntrega>(\d+)<\/PrazoEntrega>/);
        const errorMatch = text.match(/<MsgErro>([^<]*)<\/MsgErro>/);

        const errorMsg = errorMatch?.[1]?.trim();
        if (errorMsg) {
          return { service: service.name, error: errorMsg };
        }

        const price = valueMatch?.[1]?.replace(".", "").replace(",", ".") || "0";
        const days = daysMatch?.[1] || "0";

        return {
          service: service.name,
          price: parseFloat(price),
          delivery_days: parseInt(days),
          currency: "BRL",
        };
      })
    );

    const shipping_options = results.map((r, i) => {
      if (r.status === "fulfilled") return r.value;
      return { service: services[i].name, error: "Service unavailable" };
    });

    return new Response(
      JSON.stringify({ shipping_options }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("correios-shipping error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
