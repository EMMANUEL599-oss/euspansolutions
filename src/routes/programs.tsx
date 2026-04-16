import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import {
  ArrowRight, GraduationCap, Users, Brain, Code, Shield,
  Smartphone, Monitor, Lightbulb, BookOpen, Play, Briefcase,
  Globe, Download, School, CheckCircle2, Laptop,
} from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Digital Club — Euspan Solutions" },
      { name: "description", content: "Explore Euspan Solutions training programs, Digital Club for institutions, and corporate training services." },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    name: "Certified Technology & Digital Skills",
    icon: GraduationCap,
    desc: "Industry-recognized certification programs in web development, data analysis, graphic design, digital marketing, and more.",
    duration: "3-6 Months",
    mode: "Virtual & In-Person",
  },
  {
    name: "Freelancing & Online Work Preparation",
    icon: Lightbulb,
    desc: "Comprehensive training to prepare individuals for freelancing and online work opportunities on platforms like Upwork, Fiverr, and more.",
    duration: "2-4 Months",
    mode: "Virtual",
  },
  {
    name: "AI, Robotics & Programming for All Ages",
    icon: Brain,
    desc: "Hands-on courses in AI, robotics, Python, JavaScript, and coding designed for kids, teens, and adults.",
    duration: "3-6 Months",
    mode: "Virtual & In-Person",
  },
  {
    name: "Mobile & Web Application Development",
    icon: Smartphone,
    desc: "Learn to build professional mobile and web applications using modern technologies like React, Flutter, and Node.js.",
    duration: "4-6 Months",
    mode: "Virtual & In-Person",
  },
  {
    name: "Cybersecurity Fundamentals",
    icon: Shield,
    desc: "Learn cybersecurity essentials including network security, ethical hacking, and data protection practices.",
    duration: "3-4 Months",
    mode: "Virtual",
  },
  {
    name: "Entrepreneurship & Career Coaching",
    icon: Users,
    desc: "Coaching programs for aspiring tech entrepreneurs and professionals seeking career growth in the digital field.",
    duration: "2-3 Months",
    mode: "Virtual & In-Person",
  },
];

const digitalClubFeatures = [
  "Weekly coding and digital skills workshops",
  "Access to Euspan's learning resources and platforms",
  "Mentorship from industry professionals",
  "Participation in hackathons and tech competitions",
  "Certificates of completion for members",
  "Career guidance and tech talent nurturing",
  "Robotics and AI hands-on sessions",
  "Annual digital skills exhibition",
];

const corporateTraining = [
  { name: "ICT Skills for Staff", icon: Monitor, desc: "Upskill your team with essential ICT and digital literacy skills." },
  { name: "Cybersecurity Awareness", icon: Shield, desc: "Train employees on cybersecurity best practices and data protection." },
  { name: "Digital Transformation", icon: Globe, desc: "Help your organization embrace digital tools and processes." },
  { name: "Custom Training Programs", icon: BookOpen, desc: "Tailored training solutions designed for your organization's specific needs." },
];

function ProgramsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions Programs" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <AnimatedSection animation="fade-up">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Programs & Training</h1>
            <p className="mt-3 text-primary-foreground/80 text-lg">Digital Skills · Corporate Training · Digital Club</p>
            <nav className="mt-4 flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
              <Link to="/" className="hover:text-primary-foreground">Home</Link>
              <span>/</span>
              <span className="text-primary-foreground">Programs</span>
            </nav>
          </AnimatedSection>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Programs</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Training Programs</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Certified digital skills programs delivered through virtual platforms and in-person sessions, reaching as many people as possible.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={100} animation="fade-up">
              {programs.map((p) => (
                <div key={p.name} className="rounded-xl border border-border bg-card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Play className="h-3 w-3" /> {p.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                      <Globe className="h-3 w-3" /> {p.mode}
                    </span>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>

          <AnimatedSection animation="fade-up" delay={400} className="mt-10 text-center">
            <Link
              to="/student/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Register for a Program <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Digital Club */}
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="fade-left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold text-accent uppercase tracking-wider mb-4">
                  <School className="h-4 w-4" /> For Institutions
                </span>
                <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
                  Euspan Digital Club
                </h2>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  We bring our <strong>Euspan Solutions Digital Club</strong> to institutions, schools, and colleges to nurture digital talents. Our club provides students with structured learning in technology, coding, robotics, AI, and digital skills — right within their school environment.
                </p>
                <p className="mt-3 text-primary-foreground/80 leading-relaxed">
                  Partner with us to establish a Digital Club in your institution and give your students a head start in the digital economy.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors"
                  >
                    Partner With Us <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="/euspan-brochure.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                  >
                    <Download className="h-4 w-4" /> Download Brochure
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div className="space-y-3">
                {digitalClubFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-primary-foreground/5 backdrop-blur-sm p-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-sm text-primary-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Corporate Training */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Corporate Solutions</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Corporate Training</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              We provide customized corporate training solutions to help organizations build digital capacity and stay competitive.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerChildren staggerDelay={100} animation="scale">
              {corporateTraining.map((t) => (
                <div key={t.name} className="rounded-2xl bg-card border border-border p-8 text-center shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-5">
                    <t.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{t.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Laptop Access / Equipment Program */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="fade-left">
              <img src={deptBusiness} alt="Digital Equipment Access" className="rounded-2xl shadow-lg w-full h-80 object-cover" loading="lazy" />
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-4">
                  <Laptop className="h-4 w-4" /> Equipment Access
                </span>
                <h2 className="font-heading text-3xl font-bold text-foreground">Digital Equipment Access Program</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We understand that access to modern digital equipment is critical for learning and innovation. Our Equipment Access Program helps students and trainees access computers, laptops, and digital tools they need for training and work.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Affordable laptop access for enrolled students",
                    "Digital tools and software for learning",
                    "Equipment support for institutions and schools",
                    "Donation-supported device program",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Inquire About This Program <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground">Our Training in Action</h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerChildren staggerDelay={100} animation="scale">
              {[
                { img: deptElectrical, label: "Coding Workshops" },
                { img: deptBusiness, label: "Digital Skills Training" },
                { img: deptHospitality, label: "Corporate Sessions" },
                { img: deptIt, label: "AI & Robotics Lab" },
              ].map((item) => (
                <div key={item.label} className="group relative overflow-hidden rounded-xl">
                  <img src={item.img} alt={item.label} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                  </div>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection animation="fade-up">
        <section className="bg-gradient-green py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-secondary-foreground">Ready to Start Learning?</h2>
            <p className="mt-3 text-secondary-foreground/80">Register today and take the first step toward your digital career.</p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/student/register"
                className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 text-sm font-semibold text-primary shadow-lg hover:bg-card/90 transition-all"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/euspan-brochure.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg border-2 border-secondary-foreground/30 px-8 py-3.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary-foreground/10 transition-all"
              >
                <Download className="h-4 w-4" /> Download Brochure
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
