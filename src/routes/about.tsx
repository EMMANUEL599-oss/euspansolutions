import { createFileRoute } from "@tanstack/react-router";
import principalImg from "@/assets/principal.jpg";
import heroCampus from "@/assets/hero-campus.jpg";
import { Target, Eye, Heart, Lightbulb, Star, Shield, Zap, CheckCircle2, Users, BookOpen } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Maasai National Polytechnic" },
      { name: "description", content: "Learn about Maasai National Polytechnic — a premier TVET institution established in 1986, empowering youth with skills for life." },
      { property: "og:title", content: "About Us — Maasai National Polytechnic" },
      { property: "og:description", content: "Premier TVET institution empowering youth since 1986." },
    ],
  }),
  component: AboutPage,
});

const coreValues = [
  { icon: Heart, label: "Care & Concern", desc: "Compassionate approach to education and community." },
  { icon: Lightbulb, label: "Innovation & Creativity", desc: "Fostering new ideas and creative problem-solving." },
  { icon: Star, label: "Excellence", desc: "Commitment to the highest standards in everything we do." },
  { icon: Shield, label: "Self-discipline", desc: "Building character and personal responsibility." },
  { icon: Zap, label: "Purposeful & Motivated", desc: "Driven by purpose and passion for education." },
  { icon: CheckCircle2, label: "Integrity", desc: "Honesty and ethical conduct in all operations." },
];

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Campus" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">About Us</h1>
          <p className="mt-3 text-primary-foreground/80 text-lg">Empowering Knowledge Since 1986</p>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Story</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">A Legacy of Excellence</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                The Maasai National Polytechnic, established in 1986, is a premier government public Technical Vocational Education and Training (TVET) institution under the Ministry of Education. Our mission is to provide Competency-Based Education and Training (CBET) programs that equip the youth with relevant skills aligned with industry requirements, fostering economic growth and development.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nestled between Kajiado town and the county headquarters, our serene and learner-friendly environment nurtures creativity and innovation. With six academic departments and a team of qualified experts, we offer courses in Mechanical Engineering, Building & Civil Engineering, Business & Liberal Studies, ICT, Hospitality & Institutional Management, and Electrical & Electronics Engineering.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Maasai National Polytechnic is the successor to the Masai Technical Training Institute (MTTI). Since inception, the Polytechnic has produced numerous skilled and professional technicians whose utility in various sectors in the country is remarkable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary">1986</p>
                <p className="mt-1 text-sm text-muted-foreground">Established</p>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">6 Departments</p>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">CBET Programs</p>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 text-center">
                <p className="font-heading text-3xl font-bold text-primary">TVET</p>
                <p className="mt-1 text-sm text-muted-foreground">Institution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Empowering and inspiring our trainees with skills for life to serve in the communities distinctively with a high degree of mastery.
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Empowered and inspired graduates with high degree of mastery serving the communities with distinction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Stand For</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Core Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v) => (
              <div key={v.label} className="rounded-xl border border-border bg-card p-6 hover:shadow-card transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{v.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-gradient-maroon p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-maroon-foreground/70">Our Motto</p>
            <p className="mt-3 font-heading text-3xl font-bold italic text-maroon-foreground">"Skills for Life"</p>
          </div>
        </div>
      </section>

      {/* Principal */}
      <section className="bg-warm-bg py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Leadership</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">The Principal</h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-8">
              <img src={principalImg} alt="Dr. Rosebella Chukwu" className="h-56 w-44 rounded-xl object-cover shadow-sm shrink-0" loading="lazy" width={176} height={224} />
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground">Dr. Rosebella Chukwu</h3>
                <p className="text-sm text-primary font-medium">Principal, Maasai National Polytechnic</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  It is with great pleasure that I welcome you to the Maasai National Polytechnic, where we are dedicated to nurturing excellence and fostering a supportive community. Whether you are joining us for the first time or returning for another year, we are excited to embark on this journey together.
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  The Polytechnic has made tremendous progress in CBET Implementation by aligning its curriculum and assessment methods to the competency-based approach. We have established several linkages and collaborations with industries for DUAL-TVET training, preparing students for the dynamic demands of the job market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
