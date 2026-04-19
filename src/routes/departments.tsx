import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import {
  ArrowRight, Briefcase, Globe, Code, Brain, Shield, Smartphone,
  Cloud, Wrench, ShoppingCart, Monitor, Package, GraduationCap,
  Users, Lightbulb, Play, BookOpen,
} from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Services, Products & Training — Euspan Solutions" },
      { name: "description", content: "Explore Euspan Solutions' ICT consultancy, software development, AI solutions, digital training programs, and tech products." },
      { property: "og:title", content: "Services, Products & Training — Euspan Solutions" },
      { property: "og:description", content: "Comprehensive ICT services, digital products, and certified training programs." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { name: "ICT Consultancy", icon: Briefcase, desc: "Expert technology consulting for businesses, institutions, and organizations looking to leverage ICT for growth and efficiency." },
  { name: "Digital Solutions for Business, Education & Agriculture", icon: Globe, desc: "Tailored digital solutions that transform operations across business, education, and agriculture sectors." },
  { name: "Software Development & Systems", icon: Code, desc: "Custom software development, system design, and integration services built to solve real-world challenges." },
  { name: "Artificial Intelligence Solutions", icon: Brain, desc: "AI-powered solutions for automation, decision-making, and intelligent business processes." },
  { name: "Digital Job Linkages & Career Coaching", icon: Users, desc: "Connecting tech talents with opportunities and providing career coaching for growth in the digital field." },
  { name: "Cybersecurity Solutions", icon: Shield, desc: "Comprehensive cybersecurity services to protect your data, systems, and digital infrastructure." },
  { name: "Mobile & Web Application Development", icon: Smartphone, desc: "Professional mobile and web application development for startups, businesses, and institutions." },
  { name: "Cloud Services & Solutions", icon: Cloud, desc: "Scalable cloud infrastructure, migration, and management services for modern businesses." },
  { name: "IT Support & Maintenance", icon: Wrench, desc: "Reliable IT support, maintenance, and technical assistance to keep your systems running smoothly." },
  { name: "E-commerce Solutions", icon: ShoppingCart, desc: "End-to-end e-commerce platforms and solutions to help businesses sell online effectively." },
];

const products = [
  { name: "ICT Equipment & Supply", icon: Monitor, desc: "Quality computers, laptops, networking equipment, and digital tools for businesses and individuals." },
  { name: "Software, Systems & Applications", icon: Package, desc: "Ready-to-use software solutions, business systems, and productivity applications." },
  { name: "Digital Tools & Platforms", icon: Globe, desc: "Digital platforms and tools designed to enhance productivity, learning, and collaboration." },
];

const trainings = [
  { name: "Certified Technology & Digital Skills Programs", icon: GraduationCap, desc: "Industry-recognized certification programs in various technology and digital skills." },
  { name: "Freelancing & Online Work Preparation", icon: Lightbulb, desc: "Comprehensive training to prepare individuals for freelancing and online work opportunities." },
  { name: "Entrepreneurship, Talent & Tech Career Coaching", icon: Users, desc: "Coaching programs for aspiring tech entrepreneurs and professionals seeking career growth." },
  { name: "AI, Robotics, Programming & Coding for All Ages", icon: Brain, desc: "Hands-on courses in AI, robotics, and programming designed for learners of all ages." },
  { name: "Online Digital Classes, Training & Webinars", icon: Play, desc: "Virtual learning sessions and webinars accessible from anywhere, anytime." },
  { name: "Digital Freelancing Training & Mentorship", icon: BookOpen, desc: "Structured mentorship and training programs for aspiring digital freelancers." },
];

function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <AnimatedSection animation="fade-up">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Our Services, Products & Trainings</h1>
            <p className="mt-3 text-primary-foreground/80 text-lg">ICT & Digital Solutions Providers</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Technology Services</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              End-to-end ICT and digital solutions for businesses, education, agriculture, and communities.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={80} animation="fade-up">
              {services.map((s) => (
                <div key={s.name} className="rounded-xl border border-border bg-card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Products</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Technology Products</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Quality ICT equipment, software, and digital tools for learning, work, and innovation.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-3">
            <StaggerChildren staggerDelay={120} animation="scale">
              {products.map((p) => (
                <div key={p.name} className="rounded-2xl bg-card border border-border p-8 text-center shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-5">
                    <p.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Trainings */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Digital Training</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Training Programs</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Certified digital skills programs, mentorship, and career coaching delivered through virtual and in-person sessions.
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={100} animation="fade-up">
              {trainings.map((t) => (
                <div key={t.name} className="rounded-xl border-2 border-primary/20 bg-card p-6 hover:border-primary/40 hover:shadow-card transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 mb-4">
                    <t.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{t.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground">What We Do</h2>
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerChildren staggerDelay={100} animation="scale">
              {[
                { img: deptElectrical, label: "Software Development" },
                { img: deptBusiness, label: "Cloud & Digital Solutions" },
                { img: deptHospitality, label: "Consulting & Training" },
                { img: deptIt, label: "AI & Innovation" },
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
            <h2 className="font-heading text-3xl font-bold text-secondary-foreground">Ready to Get Started?</h2>
            <p className="mt-3 text-secondary-foreground/80">Contact us for a consultation or enroll in our training programs today.</p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 text-sm font-semibold text-primary shadow-lg hover:bg-card/90 transition-all"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-secondary-foreground/30 px-8 py-3.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary-foreground/10 transition-all"
              >
                Support Us
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
