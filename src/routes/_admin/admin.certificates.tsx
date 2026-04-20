import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateCertificatePDF } from "@/lib/pdf-generator";
import { Download, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/certificates")({
  component: AdminCertificates,
});

type Cert = { id: string; certificate_number: string; full_name: string; course_title: string; issued_at: string; show_on_impact_wall: boolean };

function AdminCertificates() {
  const [items, setItems] = useState<Cert[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("lms_certificates").select("*").order("issued_at", { ascending: false });
    setItems((data ?? []) as Cert[]);
  };
  useEffect(() => { load(); }, []);

  const toggleWall = async (id: string, show: boolean) => {
    await supabase.from("lms_certificates").update({ show_on_impact_wall: !show }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await supabase.from("lms_certificates").delete().eq("id", id);
    load();
  };
  const download = async (c: Cert) => {
    setBusy(c.id);
    const pdf = await generateCertificatePDF({
      certificateNumber: c.certificate_number,
      fullName: c.full_name,
      courseTitle: c.course_title,
      issuedAt: new Date(c.issued_at),
    });
    pdf.save(`Certificate-${c.certificate_number}.pdf`);
    setBusy(null);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{items.length} certificate{items.length !== 1 && "s"} issued</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Cert #</th><th className="text-left p-3">Holder</th><th className="text-left p-3">Course</th><th className="text-left p-3">Issued</th><th className="text-left p-3">Impact Wall</th><th className="text-right p-3">Actions</th></tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No certificates yet.</td></tr>}
            {items.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{c.certificate_number}</td>
                <td className="p-3 font-semibold">{c.full_name}</td>
                <td className="p-3 text-muted-foreground">{c.course_title}</td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(c.issued_at).toLocaleDateString()}</td>
                <td className="p-3">
                  <button onClick={() => toggleWall(c.id, c.show_on_impact_wall)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${c.show_on_impact_wall ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"}`}>
                    {c.show_on_impact_wall ? <><Eye className="h-3 w-3" /> Visible</> : <><EyeOff className="h-3 w-3" /> Hidden</>}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => download(c)} disabled={busy === c.id}
                      className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                      {busy === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />} PDF
                    </button>
                    <button onClick={() => remove(c.id)} className="inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive px-2 py-1 text-xs font-semibold hover:bg-destructive/20">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
