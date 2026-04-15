import { createFileRoute, Link } from "@tanstack/react-router";
import principalImg from "@/assets/principal.jpg";
import heroCampus from "@/assets/hero-campus.jpg";
import { Target, Eye, Heart, Lightbulb, Star, Shield, Zap, CheckCircle2, Users, BookOpen, ArrowRight, GraduationCap, Globe, TrendingUp } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Euspan Solutions" },
      { name: "description", content: "Learn about Euspan Solutions — a Kenyan tech startup empowering individuals with digital skills, ICT solutions, and certified training programs." },
      { property: "og:title", content: "About Us — Euspan Solutions" },
      { property: "og:description", content: "Empowering digital futures through ICT solutions, training, and mentorship." },
    ],
  }),
  component: AboutPage,
});

const coreValues = [
  { icon: Heart, label: "Empowerment", desc: "Empowering individuals and communities with the skills and tools to thrive in the digital economy." },
  { icon: Lightbulb, label: "Innovation", desc: "Continuously pushing boundaries with creative technology solutions and digital programs." },
  { icon: Star, label: "Excellence", desc: "Committed to delivering high-quality services, products, and transformative training programs." },
  { icon: Users, label: "Community", desc: "Building a growing community of learners, innovators, and digital professionals." },
  { icon: Zap, label: "Impact", desc: "Creating meaningful, measurable impact in society through technology and education." },
  { icon: CheckCircle2, label: "Integrity", desc: "Transparency, honesty, and dedication in all our services and interactions." },
];

const impactItems = [
  "Trained many youth and community members in digital skills, freelancing, and online work opportunities",
  "Provided technology services and ICT consultations to individuals, businesses, and institutions",
  "Supported and mentored tech talents, helping them grow in the digital and technology field",
  "Delivered digital solutions, software systems, and ICT support services to improve productivity",
  "Conducted virtual and physical training sessions to make digital education accessible",
  "Promoted entrepreneurship and self-employment through technology skills",
  "Supplied guidance on digital tools, platforms, and ICT equipment usage",
  "Encouraged use of technology in business, education, agriculture, and community development",
  "Built a growing community of learners interested in technology, innovation, and digital careers",
];

const gaps = [
  { title: "Limited Tech Access", desc: "Limited access to technology services and ICT consultations for businesses, schools, farms, and communities." },
  { title: "Digital Equipment Gap", desc: "Lack of modern digital tools, computers, and equipment needed for learning, work, and innovation." },
  { title: "Few Digital Solutions", desc: "Few digital products and technology solutions that support personal, business, and community growth." },
  { title: "Training Shortage", desc: "Limited digital training programs and certifications to prepare individuals for technology careers." },
  { title: "Mentorship Gap", desc: "Lack of mentorship and guidance for tech talents who want to grow in the digital field." },
  { title: "Low Digital Awareness", desc: "Low awareness of digitally enabled jobs, freelancing, and online opportunities." },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <AnimatedSection animation="fade-up">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">About Us</h1>
            <p className="mt-3 text-primary-foreground/80 text-lg">Empowering Digital Futures in Kenya</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="fade-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Who We Are</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Euspan Solutions is a Kenyan tech startup providing ICT and Digital solutions, including technology services, products, and certified digital training programs. We tackle unemployment while nurturing tech careers and talents, empowering individuals to succeed in the digital economy.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Our programs are delivered through virtual platforms and in-person sessions, reaching as many people as possible while adapting to different learning environments. We operate with a small but dedicated team of staff members and volunteers, all committed to delivering high-quality services, products, and transformative training programs.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Based in Kenya, we serve individuals, businesses, institutions, and communities — helping them leverage technology for growth, innovation, and career development.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              <StaggerChildren staggerDelay={100} animation="scale">
                {[
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <GraduationCap className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm font-semibold text-foreground">Digital Training</p>
                    <p className="mt-1 text-xs text-muted-foreground">Certified Programs</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm font-semibold text-foreground">Tech Talents</p>
                    <p className="mt-1 text-xs text-muted-foreground">Mentored & Supported</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <Globe className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm font-semibold text-foreground">Communities</p>
                    <p className="mt-1 text-xs text-muted-foreground">Empowered with Tech</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm font-semibold text-foreground">Growing Impact</p>
                    <p className="mt-1 text-xs text-muted-foreground">Across Kenya</p>
                  </div>,
                ]}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatedSection animation="fade-left">
              <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  To empower individuals and communities with practical, job-ready digital skills, innovative technology products and solutions, and mentorship — bridging critical gaps and fostering entrepreneurship, self-employment, and tech careers.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={150}>
              <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  To establish a leading physical digital training academy and tech hub — where individuals can access dedicated training spaces, modern digital equipment, structured technology courses, innovation programs, and mentorship for real-world tech challenges.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Addressing Gaps */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why We Exist</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Addressing Gaps in Society</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              By addressing these gaps, we empower people with the skills, knowledge, and tools they need to grow their careers and make a meaningful impact.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={100} animation="fade-up">
              {gaps.map((gap) => (
                <div key={gap.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{gap.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{gap.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Impact So Far</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">What We've Achieved</h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={80} animation="fade-up">
              {impactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-card border border-border p-4">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Stand For</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Core Values</h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={100} animation="fade-up">
              {coreValues.map((v) => (
                <div key={v.label} className="rounded-xl border border-border bg-card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{v.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">The Founder</h2>
              <div className="mt-8 flex flex-col sm:flex-row gap-8">
                <img src={principalImg} alt="Founder, Euspan Solutions" className="h-56 w-44 rounded-xl object-cover shadow-sm shrink-0" loading="lazy" width={176} height={224} />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">Founder & CEO</h3>
                  <p className="text-sm text-primary font-medium">Euspan Solutions</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    With a passion for technology and a deep commitment to empowering communities, our Founder established Euspan Solutions to tackle unemployment, nurture tech careers, and bridge the digital divide in Kenya.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Under their leadership, Euspan Solutions has grown from a vision into a dedicated team delivering technology services, digital training programs, and mentorship to individuals and communities across Kenya.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection animation="fade-up">
        <section className="bg-gradient-hero py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">Partner With Us</h2>
            <p className="mt-3 text-primary-foreground/80">
              Partnering with us is more than a contribution — it is an investment in digital empowerment and community transformation.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/support" className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all">
                Support Us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
