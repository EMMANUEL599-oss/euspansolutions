import { Link } from "@tanstack/react-router";
import { useState } from "react";
import euspanLogo from "@/assets/euspan-logo.jpg";
import { Phone, Mail, Menu, X, ChevronDown, GraduationCap, Download } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

const serviceLinks = [
  { name: "ICT Consultancy", path: "/departments" },
  { name: "Software Development", path: "/departments" },
  { name: "AI Solutions", path: "/departments" },
  { name: "Cloud Services", path: "/departments" },
  { name: "Cybersecurity", path: "/departments" },
  { name: "Digital Training", path: "/departments" },
];

const aboutLinks = [
  { name: "Our Story", path: "/about" },
  { name: "Our Impact", path: "/about" },
  { name: "Core Values", path: "/about" },
];

const programLinks = [
  { name: "Training Programs", path: "/programs" },
  { name: "Digital Club", path: "/programs" },
  { name: "Corporate Training", path: "/programs" },
  { name: "Equipment Access", path: "/programs" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:0769722940" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>0769722940</span>
            </a>
            <a href="mailto:infoeuspansolutions@gmail.com" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>infoeuspansolutions@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={euspanLogo} alt="Euspan Solutions Logo" className="h-14 w-14 rounded-full object-cover" width={56} height={56} />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground font-heading">
                Euspan Solutions
              </h1>
              <p className="text-xs text-muted-foreground">ICT & Digital Solutions</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted" activeProps={{ className: "text-primary bg-muted/50" }}>
              Home
            </Link>

            <div className="relative group" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
              <Link to="/about" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                About Us <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {aboutOpen && (
                <div className="absolute left-0 top-full z-50 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {aboutLinks.map((l) => (
                    <Link key={l.name} to={l.path} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <Link to="/departments" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Services <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {servicesOpen && (
                <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {serviceLinks.map((d) => (
                    <Link key={d.name} to={d.path} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
              <Link to="/programs" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Programs <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {programsOpen && (
                <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {programLinks.map((p) => (
                    <Link key={p.name} to={p.path} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      {p.name}
                    </Link>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <a href="/euspan-brochure.pdf" download className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-primary font-semibold hover:bg-muted transition-colors">
                      <Download className="h-3.5 w-3.5" /> Download Brochure
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Contact Us
            </Link>

            <Link to="/blog" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Blog
            </Link>

            <Link
              to="/student/login"
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <GraduationCap className="h-4 w-4" /> Login
            </Link>

            <Link
              to="/support"
              className="ml-1 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Support Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-md"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card px-4 pb-4 pt-2 space-y-1">
            <Link to="/" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/about" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link to="/departments" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Services & Training</Link>
            <Link to="/programs" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Programs & Digital Club</Link>
            <Link to="/contact" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            <Link to="/blog" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link
              to="/student/login"
              className="block rounded-lg border-2 border-primary px-3 py-2.5 text-center text-sm font-semibold text-primary"
              onClick={() => setMobileOpen(false)}
            >
              <GraduationCap className="h-4 w-4 inline mr-1" /> Student Portal
            </Link>
            <Link
              to="/support"
              className="block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Support Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
