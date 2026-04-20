import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Award, Clock, Users, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Free Digital Skills Training (Pro Bono) — Euspan Solutions" },
      { name: "description", content: "Enroll for free in Euspan Solutions' Pro Bono Digital Literacy training. Earn a downloadable certificate signed by the CEO. No payment required." },
      { property: "og:title", content: "Free Digital Skills Training — Pro Bono" },
      { property: "og:description", content: "Free self-paced courses with downloadable certificates. Empowering digital futures." },
    ],
  }),
  component: LearnHome,
});

type Course = { id: string; slug: string; title: string; description: string; cover_image: string | null; is_free: boolean };

function LearnHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState({ enrolled: 0, certs: 0 });

  useEffect(() => {
    (async () => {
      const [{ data: cs }, e, c] = await Promise.all([
        supabase.from("lms_courses").select("*").eq("is_active", true),
        supabase.from("lms_enrollments").select("id", { count: "exact", head: true }),
        supabase.from("lms_certificates").select("id", { count: "exact", head: true }),
      ]);
      setCourses((cs ?? []) as Course[]);
      setStats({ enrolled: e.count ?? 0, certs: c.count ?? 0 });
    })();
  }, []);

  return (
    <div>
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> Pro Bono — 100% Free
          </span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-bold">Free Digital Skills Training</h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Self-paced learning. Real practical tasks. Earn a downloadable certificate signed by our CEO. Open to everyone — no payment, no login.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" /> {stats.enrolled} learners enrolled</div>
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-accent" /> {stats.certs} certificates issued</div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">Available Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Link key={c.id} to="/learn/$slug" params={{ slug: c.slug }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Start Learning <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Self-paced</span>
                  <span className="inline-flex items-center gap-1 text-secondary font-bold"><Award className="h-3 w-3" /> Certificate included</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/impact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              See our Impact Wall — celebrate every learner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
