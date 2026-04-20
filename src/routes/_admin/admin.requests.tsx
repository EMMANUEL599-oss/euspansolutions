import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateReceiptPDF } from "@/lib/pdf-generator";
import { Download, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/requests")({
  component: AdminRequests,
});

type Req = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  request_type: string;
  item_name: string;
  message: string | null;
  amount: number | null;
  currency: string | null;
  status: string;
  receipt_number: string | null;
  created_at: string;
};

function AdminRequests() {
  const [items, setItems] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("service_requests").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as Req[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("service_requests").update({ status }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this request permanently?")) return;
    await supabase.from("service_requests").delete().eq("id", id);
    load();
  };
  const downloadReceipt = async (r: Req) => {
    setBusy(r.id);
    const pdf = await generateReceiptPDF({
      receiptNumber: r.receipt_number ?? "EUS-XXXX",
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      requestType: r.request_type,
      itemName: r.item_name,
      message: r.message,
      amount: Number(r.amount ?? 0),
      currency: r.currency ?? "KES",
      issuedAt: new Date(r.created_at),
    });
    pdf.save(`Receipt-${r.receipt_number ?? r.id}.pdf`);
    setBusy(null);
  };

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{items.length} request{items.length !== 1 && "s"} total</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Receipt #</th>
              <th className="text-left p-3">Name / Contact</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Item</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No requests yet.</td></tr>
            )}
            {items.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{r.receipt_number}</td>
                <td className="p-3">
                  <p className="font-semibold">{r.full_name}</p>
                  <p className="text-xs text-muted-foreground">{r.email}</p>
                  {r.phone && <p className="text-xs text-muted-foreground">{r.phone}</p>}
                </td>
                <td className="p-3"><span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">{r.request_type}</span></td>
                <td className="p-3 max-w-xs">
                  <p className="font-medium">{r.item_name}</p>
                  {r.message && <p className="text-xs text-muted-foreground line-clamp-2">{r.message}</p>}
                </td>
                <td className="p-3">
                  <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => downloadReceipt(r)} disabled={busy === r.id}
                      className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                      {busy === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />} Receipt
                    </button>
                    <button onClick={() => remove(r.id)} className="inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive px-2 py-1 text-xs font-semibold hover:bg-destructive/20">
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
