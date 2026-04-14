import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Euspan Solutions Logo" className="h-12 w-12 object-contain" width={48} height={48} loading="lazy" />
              <div>
                <h3 className="font-heading text-lg font-bold">Euspan Solutions</h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              A leading tech company delivering innovative software development, cloud solutions, and IT consulting services to businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/departments" className="opacity-80 hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="opacity-80">Software Development</li>
              <li className="opacity-80">Cloud Solutions</li>
              <li className="opacity-80">IT Consulting</li>
              <li className="opacity-80">Cybersecurity</li>
              <li className="opacity-80">Data Analytics</li>
              <li className="opacity-80">AI & Machine Learning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading text-base font-semibold">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 opacity-80" />
                <span className="opacity-80">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 opacity-80" />
                <a href="tel:+254700000000" className="opacity-80 hover:opacity-100 transition-opacity">+254 700 000 000</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 opacity-80" />
                <a href="mailto:info@euspansolutions.com" className="opacity-80 hover:opacity-100 transition-opacity">info@euspansolutions.com</a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
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
