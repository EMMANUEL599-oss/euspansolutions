import { createFileRoute, Link } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import { ArrowRight, Code, Cloud, Briefcase, UtensilsCrossed, Monitor, Shield } from "lucide-react";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Services — Euspan Solutions" },
      { name: "description", content: "Explore our technology services: software development, cloud solutions, IT consulting, cybersecurity, data analytics, and AI." },
      { property: "og:title", content: "Services — Euspan Solutions" },
      { property: "og:description", content: "End-to-end technology services for modern businesses." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    name: "Software Development",
    icon: Code,
    img: deptElectrical,
    desc: "We build custom web applications, mobile apps, and enterprise software using modern technologies like React, Node.js, Python, and cloud-native architectures. Our agile development process ensures rapid delivery without compromising quality.",
    offerings: ["Custom Web Applications", "Mobile App Development (iOS & Android)", "Enterprise Software Solutions", "API Development & Integration"],
  },
  {
    name: "Cloud Solutions",
    icon: Cloud,
    img: deptBusiness,
    desc: "Our cloud experts help businesses migrate, optimize, and manage their cloud infrastructure. We work with AWS, Azure, and Google Cloud to deliver scalable, cost-effective solutions tailored to your needs.",
    offerings: ["Cloud Migration & Strategy", "Infrastructure as Code (IaC)", "Cloud Cost Optimization", "DevOps & CI/CD Pipelines"],
  },
  {
    name: "IT Consulting",
    icon: Briefcase,
    img: deptHospitality,
    desc: "Strategic technology advisory to help businesses align their IT investments with business goals. We provide roadmaps, architecture reviews, and digital transformation strategies.",
    offerings: ["Digital Transformation Strategy", "Technology Architecture Review", "IT Roadmap & Planning", "Process Automation Consulting"],
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    img: deptIt,
    desc: "Protect your business with our comprehensive cybersecurity services. From vulnerability assessments to incident response, we ensure your data and systems remain secure against evolving threats.",
    offerings: ["Security Audits & Assessments", "Penetration Testing", "Incident Response Planning", "Compliance & Risk Management"],
  },
  {
    name: "Data Analytics",
    icon: Monitor,
    img: null,
    desc: "Turn your data into actionable insights with our analytics services. We build dashboards, data pipelines, and business intelligence solutions that help you make data-driven decisions.",
    offerings: ["Business Intelligence Dashboards", "Data Pipeline Engineering", "Predictive Analytics", "Data Visualization & Reporting"],
  },
  {
    name: "AI & Machine Learning",
    icon: UtensilsCrossed,
    img: null,
    desc: "Leverage the power of artificial intelligence to automate processes, enhance decision-making, and unlock new business opportunities. Our ML engineers build custom models tailored to your specific use cases.",
    offerings: ["Custom ML Model Development", "Natural Language Processing", "Computer Vision Solutions", "Intelligent Automation"],
  },
];

function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Our Services</h1>
          <p className="mt-3 text-primary-foreground/80 text-lg">End-to-End Technology Solutions</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-base leading-relaxed text-muted-foreground">
            We offer a comprehensive suite of technology services designed to help businesses innovate, scale, and stay ahead of the competition. Each service is tailored to your unique challenges and goals.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          {services.map((d, i) => (
            <div key={d.name} className={`rounded-2xl bg-card border border-border shadow-card overflow-hidden ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="grid lg:grid-cols-2">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {d.img ? (
                    <img src={d.img} alt={d.name} className="h-64 lg:h-full w-full object-cover" loading="lazy" width={800} height={600} />
                  ) : (
                    <div className="h-64 lg:h-full w-full bg-gradient-blue flex items-center justify-center">
                      <d.icon className="h-24 w-24 text-primary-foreground/30" />
                    </div>
                  )}
                </div>
                <div className={`p-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <d.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{d.name}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-foreground mb-3">What We Offer:</h3>
                    <ul className="space-y-2">
                      {d.offerings.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-green py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-secondary-foreground">Ready to Get Started?</h2>
          <p className="mt-3 text-secondary-foreground/80">Let's discuss how we can help your business grow with technology.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 text-sm font-semibold text-primary shadow-lg hover:bg-card/90 transition-all"
          >
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
