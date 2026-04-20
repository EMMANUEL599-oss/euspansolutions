import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/students")({
  component: AdminStudents,
});

type Profile = { id: string; user_id: string; full_name: string; email: string; phone: string | null; institution: string | null; created_at: string };
type App = { id: string; user_id: string; status: string; motivation: string | null; created_at: string; program_id: string };

function AdminStudents() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [tab, setTab] = useState<"students" | "applications">("students");

  const load = async () => {
    const [{ data: ps }, { data: as }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("applications").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles((ps ?? []) as Profile[]);
    setApps((as ?? []) as App[]);
  };
  useEffect(() => { load(); }, []);

  const updateAppStatus = async (id: string, status: string) => {
    await supabase.from("applications").update({ status }).eq("id", id);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["students", "applications"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
            {t} ({t === "students" ? profiles.length : apps.length})
          </button>
        ))}
      </div>

      {tab === "students" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Institution</th><th className="text-left p-3">Joined</th></tr>
            </thead>
            <tbody>
              {profiles.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No students yet.</td></tr>}
              {profiles.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3 font-semibold">{p.full_name}</td>
                  <td className="p-3 text-muted-foreground">{p.email}</td>
                  <td className="p-3 text-muted-foreground">{p.phone ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">{p.institution ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "applications" && (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-3">User ID</th><th className="text-left p-3">Motivation</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr>
            </thead>
            <tbody>
              {apps.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No applications yet.</td></tr>}
              {apps.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="p-3 font-mono text-xs">{a.user_id.slice(0, 8)}…</td>
                  <td className="p-3 text-muted-foreground max-w-md">{a.motivation ?? "—"}</td>
                  <td className="p-3">
                    <select value={a.status} onChange={(e) => updateAppStatus(a.id, e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
