import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/lms")({
  component: AdminLms,
});

type Enr = { id: string; full_name: string; email: string; progress_percent: number; completed: boolean; quiz_score: number | null; created_at: string; course_id: string };

function AdminLms() {
  const [items, setItems] = useState<Enr[]>([]);
  const load = async () => {
    const { data } = await supabase.from("lms_enrollments").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as Enr[]);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this enrollment and all its progress?")) return;
    await supabase.from("lms_enrollments").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{items.length} enrollment{items.length !== 1 && "s"} in the free LMS</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Learner</th><th className="text-left p-3">Email</th><th className="text-left p-3">Progress</th><th className="text-left p-3">Quiz</th><th className="text-left p-3">Status</th><th className="text-left p-3">Joined</th><th></th></tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No enrollments yet.</td></tr>}
            {items.map((e) => (
              <tr key={e.id} className="border-t border-border">
                <td className="p-3 font-semibold">{e.full_name}</td>
                <td className="p-3 text-muted-foreground">{e.email}</td>
                <td className="p-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: `${e.progress_percent}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{e.progress_percent}%</p>
                </td>
                <td className="p-3 text-xs">{e.quiz_score !== null ? `${e.quiz_score}/10` : "—"}</td>
                <td className="p-3">{e.completed ? <span className="text-secondary font-semibold text-xs">✓ Completed</span> : <span className="text-muted-foreground text-xs">In progress</span>}</td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => remove(e.id)} className="inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive px-2 py-1 text-xs font-semibold hover:bg-destructive/20">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
