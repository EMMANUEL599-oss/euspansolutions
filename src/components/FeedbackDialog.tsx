import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, X, CheckCircle2, MessageSquare } from "lucide-react";

export function FeedbackDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      type: String(fd.get("type") || "complaint") as "complaint" | "recommendation",
      subject: String(fd.get("subject") || "").trim(),
      body: String(fd.get("body") || "").trim(),
    };
    if (!payload.full_name || !payload.subject || !payload.body) {
      setError("Please fill in your name, subject, and message.");
      setSubmitting(false);
      return;
    }
    const { error: insertErr } = await supabase.from("complaints").insert(payload);
    setSubmitting(false);
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    setDone(true);
  };

  const handleClose = () => {
    setDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={handleClose}>
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> Complaint or Recommendation
          </h3>
          <button onClick={handleClose} className="p-1 rounded-md hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-6 text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto text-secondary" />
            <p className="mt-3 font-semibold text-foreground">Thank you for your feedback!</p>
            <p className="text-xs text-muted-foreground mt-1">If your recommendation is great, our admin may feature it on our public site.</p>
            <button onClick={handleClose} className="mt-4 text-sm font-semibold text-primary hover:underline">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Full name *</label>
                <input name="full_name" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Email (optional)</label>
                <input name="email" type="email" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Type *</label>
              <select name="type" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="complaint">Complaint</option>
                <option value="recommendation">Recommendation</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Subject *</label>
              <input name="subject" required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">Message *</label>
              <textarea name="body" required rows={4} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
