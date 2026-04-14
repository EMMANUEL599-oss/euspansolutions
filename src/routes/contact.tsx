import { createFileRoute } from "@tanstack/react-router";
import heroCampus from "@/assets/hero-campus.jpg";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Euspan Solutions" },
      { name: "description", content: "Get in touch with Euspan Solutions. We're here to help with your technology needs." },
      { property: "og:title", content: "Contact Us — Euspan Solutions" },
      { property: "og:description", content: "Reach out for a free consultation on your tech project." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src={heroCampus} alt="Euspan Solutions" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl font-bold text-primary-foreground sm:text-5xl">Contact Us</h1>
          <p className="mt-3 text-primary-foreground/80 text-lg">Let's Build Something Great Together</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Get in Touch</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Contact Information</h2>
              <p className="mt-4 text-muted-foreground">
                Have a project in mind or need a consultation? Reach out to us through any of the channels below.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">Location</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">Phone</h3>
                    <a href="tel:+254700000000" className="mt-1 text-sm text-primary hover:underline">+254 700 000 000</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">Email</h3>
                    <a href="mailto:info@euspansolutions.com" className="mt-1 text-sm text-primary hover:underline">info@euspansolutions.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">Office Hours</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Monday – Friday: 8:00 AM – 6:00 PM</p>
                    <p className="text-sm text-muted-foreground">Saturday: 9:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-heading text-base font-semibold text-foreground mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <FacebookIcon className="h-5 w-5 text-primary" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <TwitterIcon className="h-5 w-5 text-primary" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                    <InstagramIcon className="h-5 w-5 text-primary" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
              <h2 className="font-heading text-2xl font-bold text-foreground">Send us a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">Fill in the form below and we'll get back to you within 24 hours.</p>

              <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input type="text" placeholder="John Doe" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input type="email" placeholder="john@example.com" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <input type="tel" placeholder="+254 7XX XXX XXX" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Service Interested In</label>
                  <select className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring">
                    <option>Software Development</option>
                    <option>Cloud Solutions</option>
                    <option>IT Consulting</option>
                    <option>Cybersecurity</option>
                    <option>Data Analytics</option>
                    <option>AI & Machine Learning</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Project Details</label>
                  <textarea rows={5} placeholder="Tell us about your project..." className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="rounded-xl overflow-hidden border border-border shadow-card h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.87!2d36.82!3d-1.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMjQuMCJTIDM2wrA0OSczMi4wIkU!5e0!3m2!1sen!2ske!4v1!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Euspan Solutions Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
