import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { DollarSign, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/_student/student/earnings")({
  head: () => ({ meta: [{ title: "Report Earnings — Euspan Solutions" }] }),
  component: Earnings,
});

type Earning = { id: string; amount: number; source: string; description: string | null; earned_at: string };

function Earnings() {
  const { user } = useAuth();
  const [items, setItems] = useState<Earning[]>([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    if (!user) return;
    supabase.from("earnings").select("*").eq("user_id", user.id).order("earned_at", { ascending: false })
      .then(({ data }) => setItems((data || []) as Earning[]));
  };
  useEffect(refresh, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await supabase.from("earnings").insert({ user_id: user.id, amount: Number(amount), source, description });
    setAmount(""); setSource(""); setDescription("");
    setLoading(false); refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("earnings").delete().eq("id", id);
    refresh();
  };

  const total = items.reduce((s, r) => s + Number(r.amount), 0);

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gradient-hero text-primary-foreground p-6 flex items-center gap-4">
        <DollarSign className="h-12 w-12" />
        <div>
          <p className="text-sm opacity-80">Total Reported Earnings</p>
          <p className="text-3xl font-bold">KSh {total.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={submit} className="lg:col-span-1 rounded-xl bg-card border border-border p-6 space-y-3">
          <h3 className="font-heading font-bold text-foreground">Report New Earning</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Amount (KSh) *</label>
            <input required type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Source *</label>
            <input required value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Upwork, Fiverr, Local client" className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <button disabled={loading} className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> {loading ? "Saving..." : "Report Earning"}
          </button>
        </form>

        <div className="lg:col-span-2 rounded-xl bg-card border border-border p-6">
          <h3 className="font-heading font-bold text-foreground mb-3">Earnings History</h3>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No earnings reported yet. Start by submitting your first earning!</p>
          ) : (
            <div className="space-y-2">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">KSh {Number(it.amount).toLocaleString()} · {it.source}</p>
                    {it.description && <p className="text-xs text-muted-foreground mt-0.5">{it.description}</p>}
                    <p className="text-[10px] text-muted-foreground uppercase mt-0.5">{new Date(it.earned_at).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => remove(it.id)} className="p-2 rounded-md hover:bg-destructive/10 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
