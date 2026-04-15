import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import { Heart, ArrowRight, CheckCircle2, Phone, Mail, Smartphone, Monitor, Globe, Truck, Wifi, Users, GraduationCap, Lightbulb } from "lucide-react";
import { AnimatedSection, StaggerChildren } from "@/hooks/use-scroll-animation";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Us — Euspan Solutions" },
      { name: "description", content: "Support Euspan Solutions with a donation or equipment. Help us train more people, support tech talents, and deliver technology services in Kenya." },
      { property: "og:title", content: "Support Us — Euspan Solutions" },
      { property: "og:description", content: "Your support helps us empower digital futures and create impact in communities." },
    ],
  }),
  component: SupportPage,
});

const partnerBenefits = [
  "Equip individuals with practical, job-ready digital skills",
  "Provide innovative technology products and solutions",
  "Deliver technology services and training programs to bridge critical gaps",
  "Support entrepreneurship, self-employment, and tech careers",
  "Empower communities to leverage technology for growth",
  "Foster mentorship and guidance for future digital leaders",
];

const needsItems = [
  { icon: Monitor, label: "Modern computers, laptops, and digital training equipment" },
  { icon: Globe, label: "A better office space with equipment to support operations" },
  { icon: Truck, label: "A vehicle for training sessions, mentorship, and service delivery" },
  { icon: Wifi, label: "Reliable internet connectivity and digital infrastructure" },
  { icon: GraduationCap, label: "Funding to scale programs and provide learning resources" },
  { icon: Users, label: "Strategic partnerships for mentorship, technology support, and entrepreneurship programs" },
];

function SupportPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <AnimatedSection animation="fade-up">
            <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Support Us</h1>
            <p className="mt-3 text-primary-foreground/80 text-lg">Help Us Make Our Dream a Reality</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="fade-left">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why Partner With Us</p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">An Investment in Digital Empowerment</h2>
                <p className="mt-4 text-muted-foreground">
                  Partnering with Euspan Solutions is more than a contribution — it is an investment in digital empowerment and community transformation. Your support will help us:
                </p>
                <div className="mt-6 space-y-3">
                  {partnerBenefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Donate Card */}
            <AnimatedSection animation="fade-right" delay={200}>
              <div className="rounded-2xl bg-gradient-blue p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-foreground">Donate Now</h3>
                <p className="mt-3 text-sm text-primary-foreground/80">
                  You can support EUSPAN SOLUTIONS financially with any amount, or by donating equipment such as computers, laptops, digital training tools, office equipment, or any resources.
                </p>
                <div className="mt-6 rounded-xl bg-primary-foreground/10 p-6">
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">M-Pesa Paybill</p>
                  <p className="font-heading text-3xl font-bold text-primary-foreground">303030</p>
                  <p className="mt-2 text-sm text-primary-foreground/80">Account Number: <strong>2044855111</strong></p>
                </div>
                <p className="mt-4 text-xs text-primary-foreground/60">
                  After sending your support, please contact us for confirmation and appreciation.
                </p>
                <div className="mt-6 space-y-2">
                  <a href="tel:0769722940" className="flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                    <Phone className="h-4 w-4" /> Call: 0769722940
                  </a>
                  <a href="https://wa.me/254769722940" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                    <Smartphone className="h-4 w-4" /> WhatsApp: 0769722940
                  </a>
                  <a href="mailto:infoeuspansolutions@gmail.com" className="flex items-center justify-center gap-2 rounded-lg bg-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                    <Mail className="h-4 w-4" /> infoeuspansolutions@gmail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Need */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">The Need for Support</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">How You Can Help</h2>
            <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
              To expand our reach and increase our impact, Euspan Solutions requires the following support:
            </p>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StaggerChildren staggerDelay={100} animation="fade-up">
              {needsItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-6 hover:shadow-card transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </StaggerChildren>
          </div>
          <AnimatedSection animation="fade-up" delay={300} className="mt-8">
            <div className="rounded-xl bg-card border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Currently, we operate with a small but dedicated team of staff members and volunteers, all committed to delivering high-quality services, products, and transformative training programs. <strong className="text-foreground">With the right support, Euspan Solutions will be able to reach more people, train more tech talents, deliver more technology services, and create greater impact in society.</strong>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection animation="fade-up">
            <div className="rounded-2xl bg-gradient-green p-8 text-center">
              <Lightbulb className="h-12 w-12 text-secondary-foreground/80 mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-secondary-foreground">Our Future Vision</h2>
              <p className="mt-4 text-secondary-foreground/80 max-w-2xl mx-auto">
                We aim to establish a physical digital training academy — a hub where individuals can access dedicated training spaces, computers and modern digital equipment, structured technology courses, innovation and entrepreneurship programs, and mentorship and career development support.
              </p>
              <p className="mt-3 text-secondary-foreground/80 max-w-2xl mx-auto">
                This center will provide hands-on learning, structured programs, and opportunities for innovation, equipping individuals for real-world tech challenges.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <AnimatedSection animation="fade-up">
        <section className="bg-gradient-hero py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">
              We Appreciate Every Support, Big or Small
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Together, we can create greater impact in society. Help us make our dream a reality — support Euspan Solutions today!
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="tel:0769722940" className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 transition-all">
                <Phone className="h-5 w-5" /> Call Us Now
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
              >
                Send a Message <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
