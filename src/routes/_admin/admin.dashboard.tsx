import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ClipboardList, MessageSquare, GraduationCap, Users, Award } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ requests: 0, pendingReq: 0, feedback: 0, students: 0, enrollments: 0, certs: 0 });

  useEffect(() => {
    (async () => {
      const [r, rp, f, s, e, c] = await Promise.all([
        supabase.from("service_requests").select("id", { count: "exact", head: true }),
        supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("complaints").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("lms_enrollments").select("id", { count: "exact", head: true }),
        supabase.from("lms_certificates").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        requests: r.count ?? 0,
        pendingReq: rp.count ?? 0,
        feedback: f.count ?? 0,
        students: s.count ?? 0,
        enrollments: e.count ?? 0,
        certs: c.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Total Service Requests", value: stats.requests, icon: ClipboardList, color: "text-primary" },
    { label: "Pending Requests", value: stats.pendingReq, icon: ClipboardList, color: "text-secondary" },
    { label: "Feedback Items", value: stats.feedback, icon: MessageSquare, color: "text-accent" },
    { label: "Registered Students", value: stats.students, icon: Users, color: "text-primary" },
    { label: "LMS Enrollments", value: stats.enrollments, icon: GraduationCap, color: "text-secondary" },
    { label: "Certificates Issued", value: stats.certs, icon: Award, color: "text-accent" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Welcome back, Emmanuel 👋</h2>
        <p className="text-sm text-muted-foreground">Here's what's happening across Euspan Solutions today.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{c.label}</p>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
