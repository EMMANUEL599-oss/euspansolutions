import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import euspanLogo from "@/assets/euspan-logo.jpg";
import {
  GraduationCap, CheckCircle2, User, Mail, Phone, BookOpen, Lock,
  School, MessageSquare, ArrowRight, Users, Eye, EyeOff,
} from "lucide-react";
import { AnimatedSection } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/student/register")({
  head: () => ({
    meta: [
      { title: "Student Registration — Euspan Solutions" },
      { name: "description", content: "Register for Euspan Solutions digital training programs, courses, and mentorship." },
    ],
  }),
  component: StudentRegisterPage,
});

const courses = [
  "Certified Technology & Digital Skills",
  "Freelancing & Online Work Preparation",
  "AI, Robotics & Programming",
  "Mobile & Web Development",
  "Cybersecurity Fundamentals",
  "Digital Marketing & E-commerce",
  "Entrepreneurship & Career Coaching",
  "Euspan Digital Club (Institutions)",
];

function StudentRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", phone: "",
    course_interest: "", institution: "", age_group: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");

    if (!form.full_name || !form.email || !form.password || !form.phone) {
      setError("Please fill in all required fields."); setLoading(false); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters."); setLoading(false); return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/student/dashboard`,
        data: {
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          institution: form.institution || null,
          age_group: form.age_group || null,
          course_interest: form.course_interest || null,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message.includes("registered") ? "This email is already registered. Try logging in instead." : signUpError.message);
      setLoading(false); return;
    }

    // Also keep a record in the legacy students table for backend visibility
    await supabase.from("students").insert({
      full_name: form.full_name.trim(), email: form.email.trim(), phone: form.phone.trim(),
      course_interest: form.course_interest || null, institution: form.institution || null,
      age_group: form.age_group || null, message: form.message || null,
    });

    setSuccess(true);
    setLoading(false);
    setTimeout(() => navigate({ to: "/student/dashboard" }), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Registration Successful!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for registering with Euspan Solutions. We will contact you shortly with your enrollment details.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/student/login" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Go to Login <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 text-center max-w-md">
          <GraduationCap className="h-20 w-20 text-primary-foreground mx-auto mb-6 opacity-90" />
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">Join Euspan Solutions Academy</h2>
          <p className="mt-4 text-primary-foreground/80">
            Register to access our digital training programs, track your progress, and connect with mentors.
          </p>
          <ul className="mt-8 space-y-3 text-left">
            {[
              "Access Certified Digital Programs",
              "Learn AI, Robotics & Programming",
              "Get Freelancing & Career Coaching",
              "Join Euspan Digital Club",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-primary-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <img src={euspanLogo} alt="Euspan Solutions" className="h-16 w-16 rounded-full object-cover mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-foreground">Euspan Solutions</h1>
            <span className="inline-block mt-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              <Users className="h-3.5 w-3.5 inline mr-1" /> Student Registration
            </span>
          </div>

          <AnimatedSection animation="fade-up">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    name="full_name" value={form.full_name} onChange={handleChange} required
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange} required
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password * (min. 6 characters)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} required minLength={6}
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-12 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone / WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    name="phone" value={form.phone} onChange={handleChange} required
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="0769722940"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Course of Interest</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    name="course_interest" value={form.course_interest} onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                  >
                    <option value="">Select a course</option>
                    {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Institution/School</label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      name="institution" value={form.institution} onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your institution"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Age Group</label>
                  <select
                    name="age_group" value={form.age_group} onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="Under 18">Under 18</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36+">36+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Any additional information..."
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Registering..." : <><ArrowRight className="h-4 w-4" /> Register Now</>}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/student/login" className="font-semibold text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
