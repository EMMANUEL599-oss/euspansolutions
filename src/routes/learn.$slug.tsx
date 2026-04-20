import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateCertificatePDF } from "@/lib/pdf-generator";
import { CheckCircle2, Circle, ChevronRight, Award, Loader2, BookOpen, Sparkles, Download } from "lucide-react";

export const Route = createFileRoute("/learn/$slug")({
  component: CoursePage,
});

type Course = { id: string; slug: string; title: string; description: string };
type Module = { id: string; title: string; description: string | null; position: number };
type Lesson = { id: string; module_id: string; title: string; notes: string; image_url: string | null; practical_task: string | null; position: number };

const QUIZ: { q: string; options: string[]; answer: number }[] = [
  { q: "What is digital literacy?", options: ["Owning a smartphone", "The ability to find, evaluate, and use digital information", "Watching YouTube", "Coding in Python"], answer: 1 },
  { q: "Which is the brain of a computer?", options: ["Monitor", "Keyboard", "CPU", "Mouse"], answer: 2 },
  { q: "What does a browser do?", options: ["Cooks food", "Lets you visit websites", "Calls people", "Edits photos"], answer: 1 },
  { q: "Gmail is a ____ service.", options: ["Banking", "Email", "Music", "Shopping"], answer: 1 },
  { q: "A strong password should be at least how many characters?", options: ["4", "6", "12 or more", "2"], answer: 2 },
  { q: "Which is the safest action for a suspicious link?", options: ["Click immediately", "Share with friends", "Don't click it", "Reply with your password"], answer: 2 },
  { q: "Where do you install apps on Android?", options: ["Browser", "Play Store", "Calculator", "Camera"], answer: 1 },
  { q: "Folders help you ____ files.", options: ["Delete", "Organize", "Lose", "Print"], answer: 1 },
  { q: "Upwork and Fiverr are platforms for ____.", options: ["Music", "Freelancing", "Gaming", "Banking"], answer: 1 },
  { q: "Cloud storage helps you ____ files.", options: ["Burn", "Back up & access anywhere", "Crush", "Hide forever"], answer: 1 },
];

function CoursePage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [learnerName, setLearnerName] = useState("");
  const [progress, setProgress] = useState<Set<string>>(new Set());
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>(Array(QUIZ.length).fill(-1));
  const [quizResult, setQuizResult] = useState<{ score: number; certNumber: string } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase.from("lms_courses").select("*").eq("slug", slug).maybeSingle();
      if (!c) return;
      setCourse(c as Course);
      const { data: ms } = await supabase.from("lms_modules").select("*").eq("course_id", c.id).order("position");
      setModules((ms ?? []) as Module[]);
      const moduleIds = (ms ?? []).map((m) => m.id);
      if (moduleIds.length) {
        const { data: ls } = await supabase.from("lms_lessons").select("*").in("module_id", moduleIds).order("position");
        setLessons((ls ?? []) as Lesson[]);
        if (ls && ls.length) setActiveLesson(ls[0].id);
      }

      const stored = typeof window !== "undefined" ? localStorage.getItem(`euspan_enroll_${slug}`) : null;
      if (stored) {
        const parsed = JSON.parse(stored) as { id: string; name: string };
        setEnrollmentId(parsed.id);
        setLearnerName(parsed.name);
        const { data: prog } = await supabase.from("lms_lesson_progress").select("lesson_id").eq("enrollment_id", parsed.id);
        setProgress(new Set((prog ?? []).map((p) => p.lesson_id)));
      }
    })();
  }, [slug]);

  const enroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !course) return;
    setEnrolling(true);
    const { data, error: err } = await supabase.from("lms_enrollments").insert({
      course_id: course.id,
      full_name: name.trim(),
      email: email.trim(),
    }).select("id").single();
    setEnrolling(false);
    if (err || !data) { setError(err?.message ?? "Could not enroll"); return; }
    localStorage.setItem(`euspan_enroll_${slug}`, JSON.stringify({ id: data.id, name: name.trim() }));
    setEnrollmentId(data.id);
    setLearnerName(name.trim());
  };

  const markComplete = async (lessonId: string) => {
    if (!enrollmentId || progress.has(lessonId)) return;
    await supabase.from("lms_lesson_progress").insert({ enrollment_id: enrollmentId, lesson_id: lessonId });
    const next = new Set(progress);
    next.add(lessonId);
    setProgress(next);
    const pct = Math.round((next.size / lessons.length) * 100);
    await supabase.from("lms_enrollments").update({ progress_percent: pct }).eq("id", enrollmentId);
  };

  const allDone = lessons.length > 0 && progress.size === lessons.length;
  const lessonsByModule = (mid: string) => lessons.filter((l) => l.module_id === mid);
  const active = lessons.find((l) => l.id === activeLesson) ?? null;

  const submitQuiz = async () => {
    if (!enrollmentId || !course) return;
    const score = quizAnswers.reduce((acc, a, i) => acc + (a === QUIZ[i].answer ? 1 : 0), 0);
    setGenerating(true);
    const certNumber = `EUS-CERT-${Date.now().toString(36).toUpperCase()}`;
    await supabase.from("lms_enrollments").update({ completed: true, completed_at: new Date().toISOString(), quiz_score: score, progress_percent: 100 }).eq("id", enrollmentId);
    await supabase.from("lms_certificates").insert({
      enrollment_id: enrollmentId,
      certificate_number: certNumber,
      full_name: learnerName,
      course_title: course.title,
    });
    setGenerating(false);
    setQuizResult({ score, certNumber });
  };

  const downloadCert = async () => {
    if (!quizResult || !course) return;
    const pdf = await generateCertificatePDF({
      certificateNumber: quizResult.certNumber,
      fullName: learnerName,
      courseTitle: course.title,
      issuedAt: new Date(),
    });
    pdf.save(`Certificate-${learnerName.replace(/\s+/g, "-")}.pdf`);
  };

  if (!course) return <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">Loading course…</div>;

  // Enrollment gate
  if (!enrollmentId) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-accent/15 text-accent px-2 py-1 rounded-full">
            <Sparkles className="h-3 w-3" /> Free Pro Bono
          </span>
          <h1 className="mt-3 font-heading text-2xl font-bold">{course.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
          <form onSubmit={enroll} className="mt-6 space-y-3">
            <div>
              <label className="text-xs font-semibold">Full name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={enrolling} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 inline-flex items-center justify-center gap-2">
              {enrolling && <Loader2 className="h-4 w-4 animate-spin" />} Start Learning — Free
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Quiz result
  if (quizResult) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-secondary/30 bg-card p-8 shadow-card text-center">
          <Award className="h-16 w-16 mx-auto text-accent" />
          <h1 className="mt-4 font-heading text-3xl font-bold">Congratulations, {learnerName}!</h1>
          <p className="mt-2 text-muted-foreground">You scored <span className="font-bold text-foreground">{quizResult.score}/{QUIZ.length}</span> on the final quiz.</p>
          <p className="mt-4 text-sm text-muted-foreground">Your Certificate of Appreciation is ready.</p>
          <p className="text-xs text-muted-foreground">ID: <span className="font-mono">{quizResult.certNumber}</span></p>
          <button onClick={downloadCert} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" /> Download My Certificate (PDF)
          </button>
          <button onClick={() => navigate({ to: "/impact" })} className="mt-3 w-full text-sm font-semibold text-primary hover:underline">
            See your golden medal on the Impact Wall →
          </button>
        </div>
      </div>
    );
  }

  // Quiz
  if (showQuiz) {
    const allAnswered = quizAnswers.every((a) => a >= 0);
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold mb-2">Final Quiz</h1>
        <p className="text-sm text-muted-foreground mb-8">Answer all 10 questions to earn your certificate.</p>
        <div className="space-y-6">
          {QUIZ.map((q, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <p className="font-semibold mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <label key={j} className={`flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm ${quizAnswers[i] === j ? "bg-primary/10 border border-primary" : "hover:bg-muted"}`}>
                    <input type="radio" name={`q${i}`} checked={quizAnswers[i] === j} onChange={() => {
                      const next = [...quizAnswers]; next[i] = j; setQuizAnswers(next);
                    }} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={submitQuiz} disabled={!allAnswered || generating}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {generating && <Loader2 className="h-4 w-4 animate-spin" />} Submit Quiz & Generate Certificate
        </button>
      </div>
    );
  }

  // Course view
  const pct = Math.round((progress.size / Math.max(lessons.length, 1)) * 100);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-4 self-start rounded-xl border border-border bg-card p-4 shadow-card max-h-[calc(100vh-2rem)] overflow-y-auto">
        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Welcome</p>
        <p className="font-bold">{learnerName}</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1"><span>Progress</span><span className="font-bold">{pct}%</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-secondary transition-all" style={{ width: `${pct}%` }} /></div>
        </div>
        <nav className="mt-5 space-y-3">
          {modules.map((m, mi) => (
            <div key={m.id}>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Module {mi + 1}: {m.title}</p>
              <ul className="mt-2 space-y-1">
                {lessonsByModule(m.id).map((l) => {
                  const done = progress.has(l.id);
                  const isActive = activeLesson === l.id;
                  return (
                    <li key={l.id}>
                      <button onClick={() => setActiveLesson(l.id)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-sm ${isActive ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}>
                        {done ? <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /> : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <span className="line-clamp-1">{l.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        {allDone && (
          <button onClick={() => setShowQuiz(true)}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90">
            <Award className="h-4 w-4" /> Take Final Quiz
          </button>
        )}
      </aside>

      <main>
        {active && (
          <article className="rounded-xl border border-border bg-card p-6 lg:p-10 shadow-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <BookOpen className="h-3.5 w-3.5" /> Lesson
            </div>
            <h1 className="font-heading text-3xl font-bold mb-4">{active.title}</h1>
            {active.image_url && <img src={active.image_url} alt={active.title} className="rounded-lg mb-6 w-full max-h-80 object-cover" />}
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground leading-relaxed">{active.notes}</div>
            {active.practical_task && (
              <div className="mt-6 rounded-lg bg-secondary/10 border border-secondary/20 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">🎯 Practical Task</p>
                <p className="text-sm">{active.practical_task}</p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {progress.has(active.id) ? (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/15 text-secondary text-sm font-bold">
                  <CheckCircle2 className="h-4 w-4" /> Completed
                </span>
              ) : (
                <button onClick={() => markComplete(active.id)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                  Mark as Complete <CheckCircle2 className="h-4 w-4" />
                </button>
              )}
              {(() => {
                const idx = lessons.findIndex((l) => l.id === active.id);
                const next = lessons[idx + 1];
                return next ? (
                  <button onClick={() => setActiveLesson(next.id)} className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">
                    Next Lesson <ChevronRight className="h-4 w-4" />
                  </button>
                ) : null;
              })()}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
