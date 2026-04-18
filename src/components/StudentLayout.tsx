import { Link, useNavigate, useLocation, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import euspanLogo from "@/assets/euspan-logo.jpg";
import {
  LayoutDashboard, BookOpen, Search, DollarSign, Bell, UserCog, LogOut, GraduationCap, Menu, X,
} from "lucide-react";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/apply", label: "Apply Programs", icon: BookOpen },
  { to: "/student/browse", label: "Browse Programs", icon: Search },
  { to: "/student/earnings", label: "Report Earnings", icon: DollarSign },
  { to: "/student/notifications", label: "Notifications", icon: Bell },
  { to: "/student/profile", label: "Edit Profile", icon: UserCog },
] as const;

export function StudentLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/student/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name,email").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => data && setProfile(data));
    supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false)
      .then(({ count }) => setUnreadCount(count ?? 0));
  }, [user, location.pathname]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  const initial = (profile?.full_name || user.email || "S").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className={`${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-gradient-hero text-primary-foreground flex flex-col transition-transform`}>
        <div className="px-5 py-5 border-b border-primary-foreground/10 flex items-center gap-3">
          <img src={euspanLogo} alt="Euspan" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-heading font-bold text-base leading-tight">Euspan Solutions</p>
            <p className="text-xs text-primary-foreground/70">Student Portal</p>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-primary-foreground/10">
          <div className="bg-primary-foreground/10 rounded-lg p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{profile?.full_name || "Student"}</p>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold">
                <GraduationCap className="h-3 w-3" /> Student
              </span>
            </div>
          </div>
        </div>

        <p className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-wider text-primary-foreground/50 font-bold">Main Menu</p>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            const showBadge = item.to === "/student/notifications" && unreadCount > 0;
            return (
              <Link
                key={item.to} to={item.to} onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-primary-foreground/15 text-primary-foreground" : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" /> {item.label}
                </span>
                {showBadge && <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-primary-foreground/10">
          <button
            onClick={async () => { await signOut(); navigate({ to: "/student/login" }); }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-2.5 text-sm font-semibold transition-colors"
          >
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 bg-black/40 z-30" />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-card border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-muted">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="font-heading font-bold text-lg text-foreground">
              {navItems.find((n) => n.to === location.pathname)?.label ?? "Student Portal"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/student/notifications" className="relative p-2 rounded-full hover:bg-muted">
              <Bell className="h-5 w-5 text-foreground" />
              {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />}
            </Link>
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-muted">
              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{initial}</div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">{profile?.full_name?.split(" ")[0] || "Student"}</span>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
