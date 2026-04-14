import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import principalImg from "@/assets/principal.jpg";
import {
  Code, Cloud, Shield, BarChart3, Brain, Cpu,
  Target, Eye, Heart, Star, Lightbulb, Zap,
  Calendar, ArrowRight, CheckCircle2, Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Euspan Solutions — Innovative Tech Solutions" },
      { name: "description", content: "Euspan Solutions is a leading tech company offering software development, cloud solutions, IT consulting, cybersecurity, and AI services." },
      { property: "og:title", content: "Euspan Solutions — Innovative Tech Solutions" },
      { property: "og:description", content: "Empowering businesses with cutting-edge technology solutions." },
    ],
  }),
  component: HomePage,
});

const quickLinks = [
  { icon: Code, label: "Software Dev", href: "/departments" },
  { icon: Cloud, label: "Cloud Solutions", href: "/departments" },
  { icon: Shield, label: "Cybersecurity", href: "/departments" },
  { icon: BarChart3, label: "Data Analytics", href: "/departments" },
  { icon: Brain, label: "AI & ML", href: "/departments" },
];

const coreValues = [
  { icon: Heart, label: "Client-Centric" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: Star, label: "Excellence" },
  { icon: Shield, label: "Security First" },
  { icon: Zap, label: "Agility" },
  { icon: CheckCircle2, label: "Integrity" },
];

const services = [
  { name: "Software Development", desc: "Custom web, mobile, and enterprise applications built with modern technologies to solve real business challenges.", img: deptElectrical },
  { name: "Cloud Solutions", desc: "Scalable cloud infrastructure, migration, and management services to accelerate your digital transformation.", img: deptBusiness },
  { name: "IT Consulting", desc: "Strategic technology advisory to help businesses optimize operations and drive growth through innovation.", img: deptHospitality },
  { name: "AI & Machine Learning", desc: "Intelligent automation, predictive analytics, and machine learning solutions to unlock data-driven insights.", img: deptIt },
];

const news = [
  { title: "New AI Partnership Announced", desc: "Euspan Solutions partners with leading AI platforms to deliver next-gen intelligent solutions.", date: "Q1 2026" },
  { title: "Cloud Migration Success", desc: "Successfully migrated 50+ enterprise clients to modern cloud infrastructure this quarter.", date: "Q1 2026" },
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions Office" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Welcome to</p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Euspan Solutions
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
            Innovative Technology · Transformative Results
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-20 -mt-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickLinks.map((q) => (
              <Link key={q.label} to={q.href}>
                <div className="flex flex-col items-center gap-2.5 rounded-xl bg-card p-5 shadow-card text-center hover:shadow-lg transition-shadow border border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <q.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{q.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News ticker */}
      <section className="mt-8 overflow-hidden bg-primary py-3">
        <div className="flex items-center">
          <span className="shrink-0 bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            Latest News
          </span>
          <div className="overflow-hidden whitespace-nowrap ml-4">
            <span className="animate-ticker inline-block text-sm text-primary-foreground">
              🚀 New AI & ML services launched! &nbsp;&nbsp;|&nbsp;&nbsp; ☁️ 50+ successful cloud migrations this quarter &nbsp;&nbsp;|&nbsp;&nbsp; 🔒 ISO 27001 certified cybersecurity solutions
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
                Driving Digital Transformation
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Euspan Solutions is a forward-thinking tech company specializing in innovative software development, cloud infrastructure, and IT consulting. We partner with businesses of all sizes to deliver scalable, secure, and cutting-edge technology solutions that drive growth and efficiency.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                With a team of skilled engineers, data scientists, and consultants, we bring deep expertise across multiple technology domains. From startups to enterprises, we help organizations harness the power of technology to transform their operations.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-base font-semibold">Mission</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <h3 className="font-heading text-base font-semibold">Vision</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    To be the leading technology partner for businesses seeking digital transformation across Africa and beyond.
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
              <div className="mt-6 rounded-xl bg-gradient-blue p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Our Tagline</p>
                <p className="mt-2 font-heading text-2xl font-bold italic text-primary-foreground">
                  "Innovation. Solutions. Growth."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Do</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              End-to-end technology solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((d) => (
              <Link to="/departments" key={d.name} className="group overflow-hidden rounded-xl bg-card shadow-card border border-border hover:shadow-lg transition-all">
                <div className="overflow-hidden h-48">
                  <img src={d.img} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{d.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/departments" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* News & CEO */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Stay Updated</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                Latest News
              </h2>
              <div className="mt-8 space-y-4">
                {news.map((e) => (
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

            {/* CEO Message */}
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                CEO's Message
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-6">
                <img
                  src={principalImg}
                  alt="CEO, Euspan Solutions"
                  className="h-48 w-36 rounded-xl object-cover shadow-sm shrink-0"
                  loading="lazy"
                  width={144}
                  height={192}
                />
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    At Euspan Solutions, we believe technology is the catalyst for meaningful change. Our commitment is to deliver solutions that not only meet today's demands but anticipate tomorrow's challenges. We partner with our clients to build a future powered by innovation.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    With a growing team of talented professionals and expanding partnerships across the continent, we are poised to lead the next wave of digital transformation in Africa and beyond.
                  </p>
                  <div className="mt-4">
                    <p className="font-heading text-base font-semibold text-foreground">The CEO</p>
                    <p className="text-xs text-muted-foreground">Founder & Chief Executive Officer</p>
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
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Let's build something extraordinary together. Get in touch for a free consultation.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all"
          >
            Get a Free Consultation <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
