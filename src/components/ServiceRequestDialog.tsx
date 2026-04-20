import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateReceiptPDF, generateBrochurePDF } from "@/lib/pdf-generator";
import { Loader2, X, Download, CheckCircle2 } from "lucide-react";

type RequestType = "service" | "product" | "training";

export function ServiceRequestDialog({
  open,
  onClose,
  defaultType = "service",
  defaultItem = "",
}: {
  open: boolean;
  onClose: () => void;
  defaultType?: RequestType;
  defaultItem?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ receiptNumber: string; fullName: string; email: string; phone: string; itemName: string; type: RequestType; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || null,
      request_type: String(fd.get("request_type") || "service") as RequestType,
      item_name: String(fd.get("item_name") || "").trim(),
      message: String(fd.get("message") || "").trim() || null,
    };
    if (!payload.full_name || !payload.email || !payload.item_name) {
      setError("Please fill in your name, email, and what you need.");
      setSubmitting(false);
      return;
    }
    const { data, error: insertErr } = await supabase
      .from("service_requests")
      .insert(payload)
      .select("receipt_number")
      .single();
    setSubmitting(false);
    if (insertErr || !data) {
      setError(insertErr?.message ?? "Could not submit. Please try again.");
      return;
    }
    setDone({
      receiptNumber: data.receipt_number ?? "",
      fullName: payload.full_name,
      email: payload.email,
      phone: payload.phone ?? "",
      itemName: payload.item_name,
      type: payload.request_type,
      message: payload.message ?? "",
    });
  };

  const downloadReceipt = async () => {
    if (!done) return;
    setDownloadingReceipt(true);
    const pdf = await generateReceiptPDF({
      receiptNumber: done.receiptNumber,
      fullName: done.fullName,
      email: done.email,
      phone: done.phone,
      requestType: done.type,
      itemName: done.itemName,
      message: done.message,
      amount: 0,
      currency: "KES",
      issuedAt: new Date(),
    });
    pdf.save(`Euspan-Receipt-${done.receiptNumber}.pdf`);
    setDownloadingReceipt(false);
  };

  const downloadBrochure = async () => {
    setDownloadingBrochure(true);
    const pdf = await generateBrochurePDF();
    pdf.save("Euspan-Solutions-Brochure.pdf");
    setDownloadingBrochure(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {done ? "Request Received ✓" : "Request a Service / Product / Training"}
          </h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!done ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Full name *</label>
                <input name="full_name" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Email *</label>
                <input name="email" type="email" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Phone</label>
                <input name="phone" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Type *</label>
                <select name="request_type" defaultValue={defaultType} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                  <option value="training">Training</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">What do you need? *</label>
              <input name="item_name" required defaultValue={defaultItem} placeholder="e.g. Website development, AI consultation, Cybersecurity audit" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Additional details</label>
              <textarea name="message" rows={3} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit Request
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-4 text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto text-secondary" />
              <p className="mt-2 font-semibold text-foreground">Thank you, {done.fullName}!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Receipt No: <span className="font-mono font-semibold">{done.receiptNumber}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">Our team will reach out shortly. Download your receipt and brochure below.</p>
            </div>
            <button onClick={downloadReceipt} disabled={downloadingReceipt} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              {downloadingReceipt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Download Receipt (PDF)
            </button>
            <button onClick={downloadBrochure} disabled={downloadingBrochure} className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 disabled:opacity-60">
              {downloadingBrochure ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Download Brochure (PDF, with CEO signature)
            </button>
            <button onClick={onClose} className="w-full text-sm text-muted-foreground hover:text-foreground">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
