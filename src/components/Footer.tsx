import { Link } from "@tanstack/react-router";
import euspanLogo from "@/assets/euspan-logo.jpg";
import { Phone, Mail, MapPin, Smartphone, Download } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={euspanLogo} alt="Euspan Solutions Logo" className="h-12 w-12 rounded-full object-cover" width={48} height={48} loading="lazy" />
              <div>
                <h3 className="font-heading text-lg font-bold">Euspan Solutions</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              A Kenyan tech startup providing ICT and digital solutions, including technology services, products, and certified digital training programs — empowering individuals to succeed in the digital economy.
            </p>
            <a
              href="/euspan-brochure.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-4 py-2 text-xs font-semibold hover:bg-primary-foreground/20 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download Brochure
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Services & Training</Link></li>
              <li><Link to="/programs" className="opacity-80 hover:opacity-100 transition-opacity">Programs & Digital Club</Link></li>
              <li><Link to="/student/register" className="opacity-80 hover:opacity-100 transition-opacity">Student Registration</Link></li>
              <li><Link to="/blog" className="opacity-80 hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact Us</Link></li>
              <li><Link to="/support" className="opacity-80 hover:opacity-100 transition-opacity">Support Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">ICT Consultancy</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Software Development</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">AI Solutions</Link></li>
              <li><Link to="/programs" className="opacity-80 hover:opacity-100 transition-opacity">Digital Training Programs</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Cloud Services</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span className="opacity-80">Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 opacity-80" />
                <a href="tel:0769722940" className="opacity-80 hover:opacity-100 transition-opacity">0769722940</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 shrink-0 opacity-80" />
                <a href="https://wa.me/254769722940" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 opacity-80" />
                <a href="mailto:infoeuspansolutions@gmail.com" className="opacity-80 hover:opacity-100 transition-opacity">infoeuspansolutions@gmail.com</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61576634031946" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Euspan Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
