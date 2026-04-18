import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Save } from "lucide-react";

export const Route = createFileRoute("/_student/student/profile")({
  head: () => ({ meta: [{ title: "Edit Profile — Euspan Solutions" }] }),
  component: Profile,
});

function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ full_name: "", phone: "", institution: "", age_group: "", course_interest: "" });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => data && setForm({
        full_name: data.full_name || "", phone: data.phone || "", institution: data.institution || "",
        age_group: data.age_group || "", course_interest: data.course_interest || "",
      }));
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setMsg("");
    const { error } = await supabase.from("profiles").update(form).eq("user_id", user.id);
    setSaving(false);
    setMsg(error ? error.message : "Profile saved ✓");
  };

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={save} className="max-w-2xl rounded-xl bg-card border border-border p-6 space-y-4">
      <h3 className="font-heading font-bold text-foreground">Edit Profile</h3>
      {msg && <div className={`rounded-lg p-3 text-sm ${msg.includes("✓") ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"}`}>{msg}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={user?.email || ""} disabled className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input required value={form.full_name} onChange={upd("full_name")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input value={form.phone} onChange={upd("phone")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age Group</label>
          <select value={form.age_group} onChange={upd("age_group")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="">—</option><option>Under 18</option><option>18-24</option><option>25-34</option><option>35-44</option><option>45+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Institution / School</label>
        <input value={form.institution} onChange={upd("institution")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Course Interest</label>
        <input value={form.course_interest} onChange={upd("course_interest")} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button disabled={saving} className="rounded-lg bg-primary py-2.5 px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2">
        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
