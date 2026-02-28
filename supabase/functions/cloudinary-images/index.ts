const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { folder } = await req.json()
    if (!folder || typeof folder !== 'string') {
      return new Response(JSON.stringify({ error: 'folder is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Sanitize folder name to prevent injection
    const safeFolder = folder.replace(/[^a-zA-Z0-9_\-\/\s]/g, '')

    const cloudName = 'dqvldq2ku'
    const apiKey = Deno.env.get('CLOUDINARY_API_KEY')
    const apiSecret = Deno.env.get('CLOUDINARY_API_SECRET')

    if (!apiKey || !apiSecret) {
      return new Response(JSON.stringify({ error: 'Cloudinary credentials not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Use Cloudinary Admin API to list resources in folder
    const auth = btoa(`${apiKey}:${apiSecret}`)
    const searchUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`
    const expression = `folder:${safeFolder}`

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression,
        max_results: 100,
        sort_by: [{ public_id: 'asc' }],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Cloudinary API error:', errText)
      return new Response(JSON.stringify({ error: 'Cloudinary API error', details: errText }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await response.json()
    const images = (data.resources || []).map((r: { secure_url: string }) => r.secure_url)

    return new Response(JSON.stringify({ images }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Edge function error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
