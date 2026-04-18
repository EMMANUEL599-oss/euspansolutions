// Euspan Solutions chatbot edge function — Lovable AI Gateway + chat persistence
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "Euspan Bot", the friendly virtual assistant for EUSPAN SOLUTIONS — a Kenyan tech startup.

Services: ICT Consultancy, Software Development, AI Solutions, Digital Marketing, Web/App Development, Cybersecurity, Cloud, IT Support.
Training Programs: Digital Freelancing, Coding & Robotics (kids), Graphic Design, Web Development, Digital Marketing, AI & Data Skills.
Programs: Euspan Digital Club (schools/colleges/institutions), Corporate Training, Laptop/Equipment Access.
Contact: WhatsApp 0769722940 · Email infoeuspansolutions@gmail.com · Support Paybill 303030 (Acct: Euspan Solutions).
Pages: /student/register, /student/login, /student/dashboard, /programs, /departments, /support, /contact, /euspan-brochure.pdf

Tone: warm, concise, helpful. Use bullets for lists. Always link users to the right page (e.g. "Sign up at /student/register"). If unsure, suggest WhatsApp 0769722940.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, conversationId, visitorId } = await req.json();
    if (!Array.isArray(messages)) {
      return json({ error: "messages array required" }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "AI gateway not configured" }, 500);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

    // Identify user from auth header (optional)
    let userId: string | null = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const { data } = await admin.auth.getUser(authHeader.slice(7));
      userId = data.user?.id ?? null;
    }

    // Ensure conversation
    let convId = conversationId as string | null;
    if (!convId) {
      const { data: conv } = await admin.from("chat_conversations")
        .insert({ user_id: userId, visitor_id: visitorId ?? null })
        .select("id").single();
      convId = conv?.id ?? null;
    }

    // Persist last user message
    const lastUser = [...messages].reverse().find((m: any) => m.role === "user");
    if (convId && lastUser) {
      await admin.from("chat_messages").insert({ conversation_id: convId, role: "user", content: lastUser.content });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (response.status === 429) return json({ error: "Rate limit. Try again shortly.", conversationId: convId }, 429);
    if (response.status === 402) return json({ error: "AI credits exhausted. Please contact support.", conversationId: convId }, 402);
    if (!response.ok) {
      console.error("AI gateway error:", await response.text());
      return json({ error: "AI gateway error", conversationId: convId }, 500);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    if (convId) {
      await admin.from("chat_messages").insert({ conversation_id: convId, role: "assistant", content: reply });
    }

    return json({ reply, conversationId: convId });
  } catch (err) {
    console.error("euspan-chat error:", err);
    return json({ error: "Internal error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
