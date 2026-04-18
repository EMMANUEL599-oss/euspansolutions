import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Bell, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/_student/student/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Euspan Solutions" }] }),
  component: Notifications,
});

type N = { id: string; title: string; body: string; is_read: boolean; created_at: string };

function Notifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<N[]>([]);

  const load = () => {
    if (!user) return;
    supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setItems((data || []) as N[]));
  };
  useEffect(load, [user]);

  const markAll = async () => {
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    load();
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-foreground flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</h3>
        <button onClick={markAll} className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
          <CheckCheck className="h-4 w-4" /> Mark all read
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No notifications yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <div key={n.id} className={`rounded-lg border p-4 ${n.is_read ? "border-border bg-background" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
                </div>
                {!n.is_read && <span className="h-2 w-2 bg-accent rounded-full mt-1.5 shrink-0" />}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase mt-2">{new Date(n.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
