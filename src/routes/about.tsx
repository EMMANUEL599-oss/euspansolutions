import { createFileRoute, Link } from "@tanstack/react-router";
import principalImg from "@/assets/principal.jpg";
import heroCampus from "@/assets/hero-campus.jpg";
import { Target, Eye, Heart, Lightbulb, Star, Shield, Zap, CheckCircle2, Users, BookOpen } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Euspan Solutions" },
      { name: "description", content: "Learn about Euspan Solutions — a leading tech company delivering innovative software, cloud, and AI solutions." },
      { property: "og:title", content: "About Us — Euspan Solutions" },
      { property: "og:description", content: "Leading tech company delivering innovative solutions." },
    ],
  }),
  component: AboutPage,
});

const coreValues = [
  { icon: Heart, label: "Client-Centric", desc: "We put our clients at the center of everything we do." },
  { icon: Lightbulb, label: "Innovation", desc: "Continuously pushing boundaries with creative solutions." },
  { icon: Star, label: "Excellence", desc: "Committed to the highest standards in every project." },
  { icon: Shield, label: "Security First", desc: "Protecting data and systems is our top priority." },
  { icon: Zap, label: "Agility", desc: "Rapid delivery and adaptability to changing needs." },
  { icon: CheckCircle2, label: "Integrity", desc: "Transparency and honesty in all our dealings." },
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
            <p className="mt-3 text-primary-foreground/80 text-lg">Innovation Driven, Results Focused</p>
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
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Building the Future of Technology</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Euspan Solutions was founded with a vision to bridge the gap between business challenges and technology solutions. As a tech company rooted in innovation, we specialize in delivering custom software, cloud infrastructure, cybersecurity, and AI-powered solutions.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Our team of experienced engineers, data scientists, and consultants brings deep expertise across multiple technology domains. We work closely with businesses — from startups to enterprises — helping them leverage technology to drive operational efficiency, reduce costs, and unlock new revenue streams.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Based in Nairobi, Kenya, we serve clients across Africa and beyond, building long-term partnerships founded on trust, transparency, and measurable results.
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              <StaggerChildren staggerDelay={100} animation="scale">
                {[
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-primary">50+</p>
                    <p className="mt-1 text-sm text-muted-foreground">Clients Served</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <Users className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm text-muted-foreground">Expert Team</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <BookOpen className="h-8 w-8 text-primary mx-auto" />
                    <p className="mt-2 text-sm text-muted-foreground">6 Service Lines</p>
                  </div>,
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-primary">100+</p>
                    <p className="mt-1 text-sm text-muted-foreground">Projects Delivered</p>
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
                  To empower businesses with innovative, scalable, and secure technology solutions that drive growth, efficiency, and competitive advantage in the digital era.
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
                  To be Africa's most trusted technology partner, leading digital transformation and enabling businesses to thrive in an increasingly connected world.
                </p>
              </div>
            </AnimatedSection>
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
          <AnimatedSection animation="scale" delay={300} className="mt-12">
            <div className="rounded-2xl bg-gradient-blue p-8 text-center">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Our Tagline</p>
              <p className="mt-3 font-heading text-3xl font-bold italic text-primary-foreground">"Innovation. Solutions. Growth."</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CEO */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">The CEO</h2>
              <div className="mt-8 flex flex-col sm:flex-row gap-8">
                <img src={principalImg} alt="CEO, Euspan Solutions" className="h-56 w-44 rounded-xl object-cover shadow-sm shrink-0" loading="lazy" width={176} height={224} />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">Founder & CEO</h3>
                  <p className="text-sm text-primary font-medium">Euspan Solutions</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    With a passion for technology and a vision for innovation, our CEO founded Euspan Solutions to help businesses navigate the complexities of digital transformation. Under their leadership, the company has grown to serve clients across multiple industries and countries.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Their commitment to excellence, client success, and continuous innovation drives the company's culture and strategic direction, ensuring Euspan Solutions remains at the forefront of technology.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
