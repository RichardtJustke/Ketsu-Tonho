import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Verify caller authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: corsHeaders }
      );
    }

    const anonClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user: caller }, error: userErr } =
      await anonClient.auth.getUser();
    if (userErr || !caller) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: corsHeaders }
      );
    }

    const callerId = caller.id;

    // 2. Verify caller is admin
    const { data: isAdmin } = await anonClient.rpc("has_role", {
      _user_id: callerId,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Acesso negado" }),
        { status: 403, headers: corsHeaders }
      );
    }

    // 3. Verify caller has can_manage_users permission
    const { data: perms } = await anonClient
      .from("admin_permissions")
      .select("can_manage_users")
      .eq("user_id", callerId)
      .single();

    if (!perms?.can_manage_users) {
      return new Response(
        JSON.stringify({
          error: "Você não tem permissão para gerenciar usuários",
        }),
        { status: 403, headers: corsHeaders }
      );
    }

    // 4. Parse and validate request body
    const { target_user_id, new_password } = await req.json();

    if (!target_user_id || !new_password) {
      return new Response(
        JSON.stringify({ error: "user_id e nova senha são obrigatórios" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (new_password.length < 6) {
      return new Response(
        JSON.stringify({ error: "A senha deve ter no mínimo 6 caracteres" }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (target_user_id === callerId) {
      return new Response(
        JSON.stringify({
          error: "Use o fluxo normal para alterar sua própria senha",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 5. Verify target user is also an admin (safety check)
    const { data: targetIsAdmin } = await anonClient.rpc("has_role", {
      _user_id: target_user_id,
      _role: "admin",
    });
    if (!targetIsAdmin) {
      return new Response(
        JSON.stringify({ error: "Usuário alvo não é um administrador" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 6. Use service role to update the password
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: updateErr } = await adminClient.auth.admin.updateUserById(
      target_user_id,
      { password: new_password }
    );

    if (updateErr) {
      return new Response(
        JSON.stringify({ error: updateErr.message }),
        { status: 400, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
