import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Star, StarOff } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/feedback")({
  component: AdminFeedback,
});

type Item = {
  id: string;
  full_name: string;
  email: string | null;
  type: "complaint" | "recommendation";
  subject: string;
  body: string;
  status: string;
  reposted: boolean;
  created_at: string;
};

function AdminFeedback() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "complaint" | "recommendation">("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as Item[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    await supabase.from("complaints").update({ status }).eq("id", id);
    load();
  };
  const toggleRepost = async (id: string, reposted: boolean) => {
    await supabase.from("complaints").update({ reposted: !reposted }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await supabase.from("complaints").delete().eq("id", id);
    load();
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["all", "complaint", "recommendation"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No items.</p>}
        {filtered.map((i) => (
          <div key={i.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${i.type === "complaint" ? "bg-destructive/10 text-destructive" : "bg-secondary/15 text-secondary"}`}>
                    {i.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</span>
                  {i.reposted && <span className="text-xs font-semibold text-accent">★ Reposted</span>}
                </div>
                <p className="font-semibold">{i.subject}</p>
                <p className="text-sm text-muted-foreground mt-1">{i.body}</p>
                <p className="text-xs text-muted-foreground mt-2">— {i.full_name}{i.email && ` (${i.email})`}</p>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value)}
                  className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
                {i.type === "recommendation" && (
                  <button onClick={() => toggleRepost(i.id, i.reposted)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${i.reposted ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-muted/70"}`}>
                    {i.reposted ? <><StarOff className="h-3 w-3" /> Unfeature</> : <><Star className="h-3 w-3" /> Repost</>}
                  </button>
                )}
                <button onClick={() => remove(i.id)} className="inline-flex items-center justify-center gap-1 rounded-md bg-destructive/10 text-destructive px-2 py-1 text-xs font-semibold hover:bg-destructive/20">
                  <Trash2 className="h-3 w-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
