import { Link, useNavigate, useLocation, Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import euspanLogo from "@/assets/euspan-logo.jpg";
import { LayoutDashboard, ClipboardList, MessageSquare, GraduationCap, Award, LogOut, Shield, Menu, X, Users } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/requests", label: "Service Requests", icon: ClipboardList },
  { to: "/admin/feedback", label: "Complaints & Recommendations", icon: MessageSquare },
  { to: "/admin/students", label: "Students & Applications", icon: Users },
  { to: "/admin/lms", label: "LMS Enrollments", icon: GraduationCap },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
] as const;

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/student/login" });
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, loading, navigate]);

  if (loading || isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center rounded-2xl border border-border bg-card p-8 shadow-card">
          <Shield className="h-12 w-12 mx-auto text-destructive" />
          <h1 className="mt-4 font-heading text-2xl font-bold">Access Denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">This area is reserved for the administrator.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-gradient-hero text-primary-foreground flex flex-col transition-transform`}>
        <div className="px-5 py-5 border-b border-primary-foreground/10 flex items-center gap-3">
          <img src={euspanLogo} alt="Euspan" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-heading font-bold text-base leading-tight">Admin Portal</p>
            <p className="text-xs text-primary-foreground/70">Euspan Solutions</p>
          </div>
        </div>
        <div className="px-5 py-4 border-b border-primary-foreground/10">
          <div className="bg-primary-foreground/10 rounded-lg p-3">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold">
              <Shield className="h-3 w-3" /> Founder & CEO
            </span>
            <p className="mt-2 text-sm font-semibold truncate">Emmanuel Ndunda</p>
            <p className="text-xs text-primary-foreground/60 truncate">{user?.email}</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary-foreground/15" : "text-primary-foreground/80 hover:bg-primary-foreground/10"}`}>
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-primary-foreground/10">
          <button onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-2.5 text-sm font-semibold transition-colors">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 bg-black/40 z-30" />}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-card border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-muted">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="font-heading font-bold text-lg text-foreground">
              {navItems.find((n) => n.to === location.pathname)?.label ?? "Admin"}
            </h1>
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
