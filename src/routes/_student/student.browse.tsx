import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Clock, Tag } from "lucide-react";

export const Route = createFileRoute("/_student/student/browse")({
  head: () => ({ meta: [{ title: "Browse Programs — Euspan Solutions" }] }),
  component: Browse,
});

type Program = { id: string; title: string; slug: string; description: string; category: string; duration: string | null; price: string | null };

function Browse() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    supabase.from("programs").select("*").eq("is_active", true).order("created_at")
      .then(({ data }) => setPrograms((data || []) as Program[]));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {programs.map((p) => (
        <div key={p.id} className="rounded-xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-32 bg-gradient-hero flex items-center justify-center">
            <GraduationCap className="h-16 w-16 text-primary-foreground/40" />
          </div>
          <div className="p-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.category}</span>
            <h3 className="font-heading font-bold text-foreground mt-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{p.description}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
              {p.duration && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.duration}</span>}
              {p.price && <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{p.price}</span>}
            </div>
            <Link to="/student/apply" className="mt-4 block w-full text-center rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Apply Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
