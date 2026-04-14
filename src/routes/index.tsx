import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import principalImg from "@/assets/principal.jpg";
import {
  BookOpen, GraduationCap, Building2, Users, FileText,
  Target, Eye, Heart, Star, Lightbulb, Shield, Zap,
  Calendar, ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maasai National Polytechnic — Skills for Life" },
      { name: "description", content: "A premier government public TVET institution offering Competency-Based Education and Training programs in Kajiado, Kenya. Established 1986." },
      { property: "og:title", content: "Maasai National Polytechnic — Skills for Life" },
      { property: "og:description", content: "Empowering youth with industry-relevant skills through quality TVET education since 1986." },
    ],
  }),
  component: HomePage,
});

const quickLinks = [
  { icon: BookOpen, label: "Our Courses", href: "/departments" },
  { icon: GraduationCap, label: "Admissions", href: "https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false", external: true },
  { icon: Building2, label: "Departments", href: "/departments" },
  { icon: Users, label: "Administration", href: "/about" },
  { icon: FileText, label: "Service Charter", href: "/about" },
];

const coreValues = [
  { icon: Heart, label: "Care & Concern" },
  { icon: Lightbulb, label: "Innovation & Creativity" },
  { icon: Star, label: "Excellence" },
  { icon: Shield, label: "Self-discipline" },
  { icon: Zap, label: "Purposeful & Motivated" },
  { icon: CheckCircle2, label: "Integrity" },
];

const departments = [
  { name: "Electrical & Electronics", desc: "Innovation meets excellence in Electrical and Electronic Engineering — equipping students with skills to thrive in the modern industrial landscape.", img: deptElectrical },
  { name: "Business & Liberal Studies", desc: "Dynamic diploma and certificate programs with over 200 enrolled trainees and a team of highly qualified staff committed to excellence.", img: deptBusiness },
  { name: "Hospitality & Institutional Management", desc: "Dedicated to fostering a learning environment that promotes student success and professional growth in the hospitality industry.", img: deptHospitality },
  { name: "Information Technology", desc: "Producing graduates who meet market demand with relevant knowledge, skills, attitudes, and values as professional ICT graduates.", img: deptIt },
];

const events = [
  { title: "January 2026 Intake Ongoing", desc: "Applications are now open for the January 2026 intake. Apply online through our student portal.", date: "Jan 2026" },
  { title: "Admissions Starting Monday 05/01/2026", desc: "New academic session begins with fresh enrollment opportunities across all departments.", date: "Jan 5, 2026" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Maasai National Polytechnic Campus" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Welcome to</p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Maasai National Polytechnic
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
            Empowering Knowledge · Skills for Life
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-20 -mt-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickLinks.map((q) => {
              const inner = (
                <div className="flex flex-col items-center gap-2.5 rounded-xl bg-card p-5 shadow-card text-center hover:shadow-lg transition-shadow border border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <q.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{q.label}</span>
                </div>
              );
              if (q.external) {
                return <a key={q.label} href={q.href} target="_blank" rel="noopener noreferrer">{inner}</a>;
              }
              return <Link key={q.label} to={q.href}>{inner}</Link>;
            })}
          </div>
        </div>
      </section>

      {/* News ticker */}
      <section className="mt-8 overflow-hidden bg-primary py-3">
        <div className="flex items-center">
          <span className="shrink-0 bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            Upcoming Events
          </span>
          <div className="overflow-hidden whitespace-nowrap ml-4">
            <span className="animate-ticker inline-block text-sm text-primary-foreground">
              🎓 January 2026 intake is ongoing — Apply now! &nbsp;&nbsp;|&nbsp;&nbsp; 📢 Welcome to Maasai National Polytechnic &nbsp;&nbsp;|&nbsp;&nbsp; 💼 Job opportunities available
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">About Us</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Empowering Youth Since 1986
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                The Maasai National Polytechnic is a premier government public Technical Vocational Education and Training (TVET) institution under the Ministry of Education. We provide Competency-Based Education and Training (CBET) programs that equip youth with relevant skills aligned with industry requirements, fostering economic growth and development.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nestled between Kajiado town and the county headquarters, our serene and learner-friendly environment nurtures creativity and innovation. With six academic departments and a team of qualified experts, we offer a diverse range of courses.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-base font-semibold">Mission</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Empowering and inspiring our trainees with skills for life to serve communities with distinction and mastery.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-base font-semibold">Vision</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Empowered and inspired graduates with a high degree of mastery serving communities with distinction.
                  </p>
                </div>
              </div>

              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold mb-6">Core Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {coreValues.map((v) => (
                  <div key={v.label} className="flex items-center gap-3 rounded-lg bg-warm-bg p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      <v.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{v.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-gradient-maroon p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-maroon-foreground/70">Our Motto</p>
                <p className="mt-2 font-heading text-2xl font-bold italic text-maroon-foreground">
                  "Skills for Life"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Programs</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Diploma & Certificate Courses
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Six academic departments offering diverse CBET programs aligned with industry requirements.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d) => (
              <Link to="/departments" key={d.name} className="group overflow-hidden rounded-xl bg-card shadow-card border border-border hover:shadow-lg transition-all">
                <div className="overflow-hidden h-48">
                  <img src={d.img} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{d.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/departments" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              View All Departments <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stay Updated</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Upcoming Events
              </h2>
              <div className="mt-8 space-y-4">
                {events.map((e) => (
                  <div key={e.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-card transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{e.date}</p>
                        <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{e.title}</h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">{e.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principal's Message */}
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">From the Principal</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                Principal's Message
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-6">
                <img
                  src={principalImg}
                  alt="Dr. Rosebella Chukwu, Principal"
                  className="h-48 w-36 rounded-xl object-cover shadow-sm shrink-0"
                  loading="lazy"
                  width={144}
                  height={192}
                />
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    It is with great pleasure that I welcome you to the Maasai National Polytechnic, where we are dedicated to nurturing excellence and fostering a supportive community. Whether you are joining us for the first time or returning for another year, we are excited to embark on this journey together.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The Polytechnic has made tremendous progress in CBET Implementation, aligning curriculum and assessment methods to the competency-based approach.
                  </p>
                  <div className="mt-4">
                    <p className="font-heading text-base font-semibold text-foreground">Dr. Rosebella Chukwu</p>
                    <p className="text-xs text-muted-foreground">The Principal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
            Start Your Journey Today
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of graduates who have built successful careers through quality TVET education.
          </p>
          <a
            href="https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          >
            Apply for January 2026 Intake <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
