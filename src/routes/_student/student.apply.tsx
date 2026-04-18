import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_student/student/apply")({
  head: () => ({ meta: [{ title: "Apply for Programs — Euspan Solutions" }] }),
  component: Apply,
});

type Program = { id: string; title: string; category: string; duration: string | null; price: string | null };
type App = { id: string; program_id: string; status: string; created_at: string };

function Apply() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [selected, setSelected] = useState("");
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const refresh = () => {
    if (!user) return;
    supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setApps((data || []) as App[]));
  };

  useEffect(() => {
    supabase.from("programs").select("id,title,category,duration,price").eq("is_active", true)
      .then(({ data }) => setPrograms((data || []) as Program[]));
    refresh();
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selected) return;
    setLoading(true); setMsg("");
    const { error } = await supabase.from("applications").insert({ user_id: user.id, program_id: selected, motivation });
    setLoading(false);
    if (error) setMsg(error.message.includes("duplicate") ? "You already applied to this program." : error.message);
    else { setMsg("Application submitted! 🎉"); setSelected(""); setMotivation(""); refresh(); }
  };

  const programTitle = (id: string) => programs.find((p) => p.id === id)?.title || "—";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-xl bg-card border border-border p-6">
        <h3 className="font-heading font-bold text-foreground">Submit New Application</h3>
        <form onSubmit={submit} className="mt-4 space-y-4">
          {msg && (
            <div className={`rounded-lg p-3 text-sm ${msg.includes("🎉") ? "bg-green-500/10 text-green-700 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
              {msg}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">Select Program *</label>
            <select required value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm">
              <option value="">— Choose a program —</option>
              {programs.map((p) => <option key={p.id} value={p.id}>{p.title} {p.price ? `(${p.price})` : ""}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Why do you want to join? (optional)</label>
            <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm" placeholder="Tell us about your goals..." />
          </div>
          <button disabled={loading} className="rounded-lg bg-primary py-2.5 px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="font-heading font-bold text-foreground">My Applications</h3>
        <div className="mt-4 space-y-3">
          {apps.length === 0 && <p className="text-sm text-muted-foreground">No applications yet.</p>}
          {apps.map((a) => (
            <div key={a.id} className="rounded-lg border border-border p-3">
              <p className="text-sm font-semibold text-foreground">{programTitle(a.program_id)}</p>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${a.status === "approved" ? "bg-green-500/10 text-green-700" : a.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-orange-500/10 text-orange-600"}`}>{a.status}</span>
                <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
