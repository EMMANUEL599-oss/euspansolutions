import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/SocialIcons";

const departments = [
  { name: "Building & Civil Engineering", path: "/departments" },
  { name: "Business & Liberal Studies", path: "/departments" },
  { name: "Electrical & Electronics", path: "/departments" },
  { name: "Hospitality & Tourism", path: "/departments" },
  { name: "Mechanical Engineering", path: "/departments" },
  { name: "Information Technology", path: "/departments" },
];

const aboutLinks = [
  { name: "Governing Council", path: "/about" },
  { name: "Principal", path: "/about" },
  { name: "Deputy Principal", path: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-secondary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm text-secondary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:0723433333" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span>0723 433 333</span>
            </a>
            <a href="mailto:info@maanp.ac.ke" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span>info@maanp.ac.ke</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/share/1YBqCRvmma/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://x.com/MaasaiPoly" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/maasaipoly" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Maasai National Polytechnic Logo" className="h-14 w-14" width={56} height={56} />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground font-heading">
                Maasai National Polytechnic
              </h1>
              <p className="text-xs text-muted-foreground italic">Skills for Life</p>
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

            <div className="relative group" onMouseEnter={() => setDeptOpen(true)} onMouseLeave={() => setDeptOpen(false)}>
              <Link to="/departments" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
                Departments <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {deptOpen && (
                <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {departments.map((d) => (
                    <Link key={d.name} to={d.path} className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors">
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted">
              Contact Us
            </Link>

            <a
              href="https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Apply Now
            </a>
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
            <Link to="/departments" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Departments</Link>
            <Link to="/contact" className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            <a
              href="https://masaitech.mycampuscura.com/Campuscura/?TenantID=mtti#login;TenantID=mtti;Apply=false"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Apply Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
