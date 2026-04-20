import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import euspanLogo from "@/assets/euspan-logo.jpg";
import { Award, Sparkles, Quote } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact Wall — Free LMS Graduates | Euspan Solutions" },
      { name: "description", content: "Celebrating learners who completed our free Pro Bono Digital Literacy training. Every graduate earns a golden medal on the Euspan Solutions Impact Wall." },
      { property: "og:title", content: "Our Impact Wall — Free LMS Graduates" },
      { property: "og:description", content: "Honoring every learner who completed Euspan Solutions' free training programs." },
    ],
  }),
  component: ImpactPage,
});

type Cert = { id: string; certificate_number: string; full_name: string; course_title: string; issued_at: string };
type Reco = { id: string; full_name: string; subject: string; body: string; created_at: string };

function ImpactPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [recos, setRecos] = useState<Reco[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: cs }, { data: rs }] = await Promise.all([
        supabase.from("lms_certificates").select("id, certificate_number, full_name, course_title, issued_at").eq("show_on_impact_wall", true).order("issued_at", { ascending: false }),
        supabase.from("complaints").select("id, full_name, subject, body, created_at").eq("type", "recommendation").eq("reposted", true).order("created_at", { ascending: false }),
      ]);
      setCerts((cs ?? []) as Cert[]);
      setRecos((rs ?? []) as Reco[]);
    })();
  }, []);

  return (
    <div>
      <section className="bg-gradient-hero text-primary-foreground py-20 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Our Impact Wall
          </span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-bold">Honoring Every Learner</h1>
          <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto">
            Each medal below represents a real person who completed our free Pro Bono digital training. You could be next.
          </p>
          <Link to="/learn" className="mt-6 inline-block rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground hover:bg-secondary/90">
            Start Free Training
          </Link>
        </div>
      </section>

      <section className="py-16 bg-warm-bg">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">🏆 Pro Bono Graduates</h2>
          {certs.length === 0 ? (
            <p className="text-center text-muted-foreground">Be the first graduate — your golden medal will appear here.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {certs.map((c) => (
                <div key={c.id} className="group relative rounded-2xl bg-card border-2 border-accent/30 p-5 text-center shadow-card hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="relative mx-auto h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-lg" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
                      <img src={euspanLogo} alt="Euspan medal" className="h-14 w-14 rounded-full object-cover ring-2 ring-white" />
                    </div>
                    <Award className="absolute -bottom-1 -right-1 h-7 w-7 text-amber-600 bg-white rounded-full p-1 shadow" />
                  </div>
                  <p className="mt-4 font-heading text-lg font-bold text-foreground">{c.full_name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.course_title}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-2">{c.certificate_number}</p>
                  <p className="text-xs text-muted-foreground">{new Date(c.issued_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {recos.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-heading text-2xl font-bold text-center mb-10">💬 Featured Recommendations</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {recos.map((r) => (
                <div key={r.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <Quote className="h-6 w-6 text-primary/40 mb-2" />
                  <p className="font-semibold">{r.subject}</p>
                  <p className="mt-2 text-sm text-muted-foreground italic">"{r.body}"</p>
                  <p className="mt-3 text-xs font-bold text-primary">— {r.full_name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
