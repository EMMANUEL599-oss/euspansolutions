import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="MAANP Logo" className="h-12 w-12" width={48} height={48} loading="lazy" />
              <div>
                <h3 className="font-heading text-lg font-bold">Maasai National Polytechnic</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              A premier government public TVET institution under the Ministry of Education, empowering youth with industry-relevant skills since 1986.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Departments</Link></li>
              <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Departments</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="opacity-80">Building & Civil Engineering</li>
              <li className="opacity-80">Business & Liberal Studies</li>
              <li className="opacity-80">Electrical & Electronics</li>
              <li className="opacity-80">Hospitality & Tourism</li>
              <li className="opacity-80">Information Technology</li>
              <li className="opacity-80">Mechanical Engineering</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span className="opacity-80">Kajiado Town, Kajiado County, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 opacity-80" />
                <a href="tel:0723433333" className="opacity-80 hover:opacity-100 transition-opacity">0723 433 333</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 opacity-80" />
                <a href="mailto:info@maanp.ac.ke" className="opacity-80 hover:opacity-100 transition-opacity">info@maanp.ac.ke</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="https://www.facebook.com/share/1YBqCRvmma/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://x.com/MaasaiPoly" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/maasaipoly" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Maasai National Polytechnic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
