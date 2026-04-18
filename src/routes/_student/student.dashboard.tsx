import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { GraduationCap, DollarSign, Bell, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_student/student/dashboard")({
  head: () => ({ meta: [{ title: "Student Dashboard — Euspan Solutions" }] }),
  component: Dashboard,
});

type Program = { id: string; title: string; slug: string; description: string; category: string; duration: string | null; price: string | null };

function Dashboard() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState({ programs: 0, earnings: 0, notifications: 0 });
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("programs").select("*").eq("is_active", true).order("created_at"),
      supabase.from("earnings").select("amount").eq("user_id", user.id),
      supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false),
      supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle(),
    ]).then(([p, e, n, pr]) => {
      const list = (p.data || []) as Program[];
      setPrograms(list);
      const total = (e.data || []).reduce((s, r) => s + Number(r.amount), 0);
      setStats({ programs: list.length, earnings: total, notifications: n.count ?? 0 });
      setName(pr.data?.full_name?.split(" ")[0] || "Student");
    });
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
        <h2 className="font-heading font-bold text-foreground">Welcome to Euspan Solutions, {name}!</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your student account is active. Browse programs, apply, and report your digital earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} value={stats.programs} label="Available Programs" color="bg-primary/10 text-primary" />
        <StatCard icon={DollarSign} value={`KSh ${stats.earnings.toLocaleString()}`} label="Total Reported Earnings" color="bg-accent/10 text-accent-foreground" />
        <StatCard icon={Bell} value={stats.notifications} label="Notifications" color="bg-orange-500/10 text-orange-600" />
        <StatCard icon={CheckCircle2} value="Active" label="Account Status" color="bg-green-500/10 text-green-600" />
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> Available Programs
          </h3>
          <Link to="/student/browse" className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline">
            Explore More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.slice(0, 4).map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any; value: string | number; label: string; color: string }) {
  return (
    <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function ProgramCard({ p }: { p: Program }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.category}</span>
        {p.price && <span className="text-xs font-semibold text-foreground">{p.price}</span>}
      </div>
      <h4 className="font-heading font-bold text-foreground">{p.title}</h4>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-muted-foreground">{p.duration}</span>
        <Link to="/student/apply" className="text-xs font-bold text-primary uppercase">Apply Now →</Link>
      </div>
    </div>
  );
}
