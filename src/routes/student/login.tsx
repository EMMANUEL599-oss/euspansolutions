import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import euspanLogo from "@/assets/euspan-logo.jpg";
import { GraduationCap, Mail, Lock, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/student/login")({
  head: () => ({ meta: [{ title: "Student Login — Euspan Solutions" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/student/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else navigate({ to: "/student/dashboard" });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 text-center max-w-md">
          <GraduationCap className="h-20 w-20 text-primary-foreground mx-auto mb-6 opacity-90" />
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">Welcome to the Student Portal</h2>
          <p className="mt-4 text-primary-foreground/80">Log in to apply for programs, report your digital earnings, and receive notifications from your mentors.</p>
          <ul className="mt-8 space-y-3 text-left">
            {["Apply for Digital Programs","Report & Track Your Earnings","Receive Verification Notifications","Access Learning Resources"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-primary-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={euspanLogo} alt="Euspan" className="h-16 w-16 rounded-full object-cover mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Euspan Solutions</h1>
            <span className="inline-block mt-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5 inline mr-1" /> Student Portal
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h2 className="font-heading text-xl font-bold text-foreground text-center">Sign In</h2>
            <p className="mt-1 text-sm text-muted-foreground text-center">Enter your credentials to access your dashboard</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {error && <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2.5 text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button disabled={loading} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Signing in..." : <><ArrowRight className="h-4 w-4" /> Sign In to Portal</>}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/student/register" className="font-semibold text-primary hover:underline">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
