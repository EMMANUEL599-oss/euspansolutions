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
  ArrowRight, CheckCircle2, Users, GraduationCap,
  Smartphone, Monitor, Briefcase, Wrench, ShoppingCart,
  Globe, TrendingUp, Award,
} from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Euspan Solutions — ICT & Digital Solutions | Kenya" },
      { name: "description", content: "Euspan Solutions is a Kenyan tech startup providing ICT consultancy, digital solutions, software development, AI solutions, and certified digital training programs." },
      { property: "og:title", content: "Euspan Solutions — ICT & Digital Solutions" },
      { property: "og:description", content: "Empowering individuals and businesses with technology services, products, and certified digital training programs." },
    ],
  }),
  component: HomePage,
});

const quickLinks = [
  { icon: Briefcase, label: "ICT Consultancy", href: "/departments" },
  { icon: Code, label: "Software Dev", href: "/departments" },
  { icon: Cloud, label: "Cloud Services", href: "/departments" },
  { icon: Brain, label: "AI Solutions", href: "/departments" },
  { icon: GraduationCap, label: "Digital Training", href: "/departments" },
];

const coreValues = [
  { icon: Heart, label: "Empowerment" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: Star, label: "Excellence" },
  { icon: Users, label: "Community" },
  { icon: Zap, label: "Impact" },
  { icon: CheckCircle2, label: "Integrity" },
];

const services = [
  { name: "ICT Consultancy & Digital Solutions", desc: "Technology services and digital solutions for business, education, and agriculture — helping organizations leverage technology for growth.", img: deptElectrical },
  { name: "Software & App Development", desc: "Custom software development, mobile & web applications, systems, and e-commerce solutions built to solve real-world challenges.", img: deptBusiness },
  { name: "AI & Cybersecurity Solutions", desc: "Artificial intelligence solutions and cybersecurity services to protect your business and unlock intelligent automation.", img: deptHospitality },
  { name: "Digital Training & Mentorship", desc: "Certified technology & digital skills programs, freelancing preparation, AI & robotics courses, and tech career coaching for all ages.", img: deptIt },
];

const impactStats = [
  { value: "100+", label: "Youth & Community Members Trained" },
  { value: "50+", label: "Businesses & Institutions Served" },
  { value: "20+", label: "Tech Talents Mentored" },
  { value: "10+", label: "Training Programs Delivered" },
];

const gaps = [
  "Limited access to technology services and ICT consultations",
  "Lack of modern digital tools and equipment for learning and work",
  "Few digital solutions that support personal and community growth",
  "Limited digital training programs and certifications",
  "Low awareness of freelancing and online opportunities",
  "Insufficient support for innovation and entrepreneurship",
];

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions Office" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center">
          <AnimatedSection animation="fade" delay={0}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Welcome to</p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Euspan Solutions
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={400}>
            <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
              ICT & Digital Solutions Providers
            </p>
            <p className="mt-2 text-base text-primary-foreground/70 max-w-2xl mx-auto">
              A Kenyan tech startup tackling unemployment while nurturing tech careers and talents, empowering individuals to succeed in the digital economy.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
              >
                Support Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative z-20 -mt-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StaggerChildren staggerDelay={80} animation="fade-up">
              {quickLinks.map((q) => (
                <Link key={q.label} to={q.href}>
                  <div className="flex flex-col items-center gap-2.5 rounded-xl bg-card p-5 shadow-card text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <q.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{q.label}</span>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* News ticker */}
      <section className="mt-8 overflow-hidden bg-primary py-3">
        <div className="flex items-center">
          <span className="shrink-0 bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-secondary-foreground">
            Latest
          </span>
          <div className="overflow-hidden whitespace-nowrap ml-4">
            <span className="animate-ticker inline-block text-sm text-primary-foreground">
              🚀 Digital Training Programs Now Open! &nbsp;&nbsp;|&nbsp;&nbsp; 💡 AI & Robotics Courses for All Ages &nbsp;&nbsp;|&nbsp;&nbsp; 🌍 Empowering Tech Talents Across Kenya &nbsp;&nbsp;|&nbsp;&nbsp; 📱 Call 0769722940 to Get Started
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection animation="fade-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Who We Are</p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Digital Empowerment & Community Transformation
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Euspan Solutions is a Kenyan tech startup providing ICT and digital solutions, including technology services, products, and certified digital training programs. We tackle unemployment while nurturing tech careers and talents, empowering individuals to succeed in the digital economy.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Our programs are delivered through virtual platforms and in-person sessions, reaching as many people as possible while adapting to different learning environments.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-heading text-base font-semibold">Mission</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To empower individuals and communities with practical digital skills, innovative technology solutions, and mentorship for the digital economy.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <h3 className="font-heading text-base font-semibold">Vision</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To establish a leading digital training academy and tech hub, equipping individuals for real-world tech challenges and innovation.
                    </p>
                  </div>
                </div>

                <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-6">Core Values</h3>
                <div className="grid grid-cols-2 gap-4">
                  <StaggerChildren staggerDelay={100} animation="scale">
                    {coreValues.map((v) => (
                      <div key={v.label} className="flex items-center gap-3 rounded-lg bg-warm-bg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <v.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{v.label}</span>
                      </div>
                    ))}
                  </StaggerChildren>
                </div>
                <div className="mt-6 rounded-xl bg-gradient-blue p-6 text-center">
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Our Tagline</p>
                  <p className="mt-2 font-heading text-2xl font-bold italic text-primary-foreground">
                    "Empowering Digital Futures"
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Offer</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Services, Products & Trainings
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              Comprehensive ICT and digital solutions tailored for businesses, education, agriculture, and communities.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerChildren staggerDelay={120} animation="fade-up">
              {services.map((d) => (
                <Link to="/departments" key={d.name} className="group overflow-hidden rounded-xl bg-card shadow-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="overflow-hidden h-48">
                    <img src={d.img} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{d.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          </div>

          <AnimatedSection animation="fade-up" delay={400} className="mt-10 text-center">
            <Link to="/departments" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Impact</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Making a Difference
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <StaggerChildren staggerDelay={100} animation="scale">
              {impactStats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                  <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* Addressing Gaps */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="fade-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why We Exist</p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Addressing Gaps in Society</h2>
                <p className="mt-4 text-muted-foreground">
                  By addressing these critical gaps, Euspan Solutions empowers people and tech talents with the skills, knowledge, and tools they need to grow their careers, create opportunities, and make a meaningful impact.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="space-y-3">
                {gaps.map((gap, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-card border border-border p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{gap}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Future Vision & Founder */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection animation="fade-left">
              <div className="rounded-2xl bg-gradient-blue p-8">
                <p className="text-xs uppercase tracking-widest text-primary-foreground/70">Future Vision</p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-primary-foreground">
                  Digital Training Academy
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                  We aim to establish a physical digital training academy — a hub where individuals can access dedicated training spaces, computers and modern digital equipment, structured technology courses, innovation and entrepreneurship programs, and mentorship and career development support.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                  This center will provide hands-on learning, structured programs, and opportunities for innovation, equipping individuals for real-world tech challenges.
                </p>
                <Link to="/support" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-foreground/20 px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                  Help Us Build This <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</p>
                <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
                  Founder's Message
                </h2>
                <div className="mt-6 flex flex-col sm:flex-row gap-6">
                  <img
                    src={principalImg}
                    alt="Founder, Euspan Solutions"
                    className="h-48 w-36 rounded-xl object-cover shadow-sm shrink-0"
                    loading="lazy"
                    width={144}
                    height={192}
                  />
                  <div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      At Euspan Solutions, we believe technology is the catalyst for meaningful change. We are committed to empowering individuals with practical digital skills, providing innovative technology solutions, and bridging critical gaps in our communities.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      With the right support, we will reach more people, train more tech talents, deliver more technology services, and create greater impact in society. Together, we can empower digital futures.
                    </p>
                    <div className="mt-4">
                      <p className="font-heading text-base font-semibold text-foreground">The Founder</p>
                      <p className="text-xs text-muted-foreground">Founder & CEO, Euspan Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection animation="fade-up">
        <section className="bg-gradient-hero py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              Support Euspan Solutions Today
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Your support will help us train more people, support tech talents, deliver technology services, and create more opportunities in the digital economy.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all"
              >
                Support Us <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
