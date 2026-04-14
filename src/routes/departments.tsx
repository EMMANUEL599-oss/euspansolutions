import { createFileRoute } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import deptElectrical from "@/assets/dept-electrical.jpg";
import deptBusiness from "@/assets/dept-business.jpg";
import deptHospitality from "@/assets/dept-hospitality.jpg";
import deptIt from "@/assets/dept-it.jpg";
import { ArrowRight, Wrench, Cpu, Briefcase, UtensilsCrossed, Monitor, HardHat } from "lucide-react";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Maasai National Polytechnic" },
      { name: "description", content: "Explore our six academic departments offering diploma and certificate CDACC courses in engineering, business, IT, and hospitality." },
      { property: "og:title", content: "Departments — Maasai National Polytechnic" },
      { property: "og:description", content: "Six academic departments offering CBET programs." },
    ],
  }),
  component: DepartmentsPage,
});

const departments = [
  {
    name: "Electrical & Electronics Engineering",
    icon: Cpu,
    img: deptElectrical,
    desc: "A department where innovation meets excellence in Electrical and Electronic Engineering. Our programs are designed to equip you with the skills and knowledge to thrive in the modern industrial landscape. We are actively engaged in industry collaborations and projects.",
    courses: ["Diploma in Electrical & Electronics Engineering (Power Option)", "Diploma in Electrical & Electronics Engineering (Telecommunication)", "Certificate in Electrical Installation"],
  },
  {
    name: "Business & Liberal Studies",
    icon: Briefcase,
    img: deptBusiness,
    desc: "The Business & Liberal Studies Department offers a dynamic range of diploma and certificate programs. With over 200 enrolled trainees and a team of highly qualified staff, our department stands out for its commitment to excellence and adaptability.",
    courses: ["Diploma in Business Management", "Diploma in Supply Chain Management", "Certificate in Business Management", "Certificate in Human Resource Management"],
  },
  {
    name: "Hospitality & Institutional Management",
    icon: UtensilsCrossed,
    img: deptHospitality,
    desc: "Dedicated to fostering a learning environment that promotes student success and professional growth in the hospitality industry. Our hands-on training approach prepares graduates for careers in hotels, restaurants, and institutional food service.",
    courses: ["Diploma in Food & Beverage Management", "Diploma in Accommodation Management", "Certificate in Food & Beverage", "Certificate in Catering"],
  },
  {
    name: "Information Technology",
    icon: Monitor,
    img: deptIt,
    desc: "The department's objective is to produce graduates who meet the market demand and equip trainees with relevant knowledge, skills, attitudes, and values to enable them serve as professional ICT graduates.",
    courses: ["Diploma in Information Communication Technology", "Certificate in Information Communication Technology", "Certificate in Cyber Security"],
  },
  {
    name: "Mechanical Engineering",
    icon: Wrench,
    img: null,
    desc: "Our Mechanical Engineering department provides comprehensive training in motor vehicle technology, welding, and fabrication. Students gain hands-on experience with modern equipment and industry-standard tools.",
    courses: ["Diploma in Mechanical Engineering (Production)", "Diploma in Automotive Engineering", "Certificate in Motor Vehicle Mechanics", "Certificate in Welding & Fabrication"],
  },
  {
    name: "Building & Civil Engineering",
    icon: HardHat,
    img: null,
    desc: "Training future builders and civil engineers with practical skills in construction, surveying, and structural design. Our graduates are equipped to handle modern construction challenges.",
    courses: ["Diploma in Building Technology", "Diploma in Civil Engineering", "Certificate in Building Technology", "Certificate in Masonry"],
  },
];

function DepartmentsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Campus" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Our Departments</h1>
          <p className="mt-3 text-primary-foreground/80 text-lg">Diploma & Certificate CDACC Courses</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-base leading-relaxed text-muted-foreground">
            With six academic departments and a team of qualified experts, we offer a diverse range of Competency-Based Education and Training (CBET) programs structured to ensure that students gain the competencies needed for their respective fields.
          </p>
        </div>
      </section>

      {/* Departments */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          {departments.map((d, i) => (
            <div key={d.name} className={`rounded-2xl bg-card border border-border shadow-card overflow-hidden ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="grid lg:grid-cols-2">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {d.img ? (
                    <img src={d.img} alt={d.name} className="h-64 lg:h-full w-full object-cover" loading="lazy" width={800} height={600} />
                  ) : (
                    <div className="h-64 lg:h-full w-full bg-gradient-navy flex items-center justify-center">
                      <d.icon className="h-24 w-24 text-navy-foreground/30" />
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
                    <h3 className="text-sm font-semibold text-foreground mb-3">Courses Offered:</h3>
                    <ul className="space-y-2">
                      {d.courses.map((c) => (
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
      <section className="bg-gradient-maroon py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-maroon-foreground">Ready to Enroll?</h2>
          <p className="mt-3 text-maroon-foreground/80">January 2026 intake is currently ongoing. Apply now!</p>
          <a
            href="https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 text-sm font-semibold text-primary shadow-lg hover:bg-card/90 transition-all"
          >
            Apply Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
