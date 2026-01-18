import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onOpenQuotePopup: () => void;
}

const serviceLinks = [
  { title: "Steel Shot Blasting", href: "/services/steel-shot-blasting", description: "High-performance cleaning for steel structures" },
  { title: "Concrete Preparation", href: "/services/concrete-preparation", description: "Surface profiling for optimal coating adhesion" },
  { title: "Automotive Restoration", href: "/services/automotive-restoration", description: "Precision cleaning for vehicle restoration" },
  { title: "Marine Services", href: "/services/marine-services", description: "Hull and deck surface preparation" },
  { title: "Agricultural Equipment", href: "/services/agricultural-equipment", description: "Restoring farm machinery and implements" },
  { title: "Infrastructure Projects", href: "/services/infrastructure-projects", description: "Large-scale surface preparation" },
  { title: "Gate Restoration", href: "/services/gate-restoration", description: "Expert metal gate blasting and restoration" },
];

export function Header({ onOpenQuotePopup }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <header className="bg-[#2C5F7F] text-white sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
            <span className="text-xl font-bold">CSB</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</h1>
            <p className="text-xs text-white/80">Professional Surface Preparation</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Services Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center gap-1 hover:text-white/80 transition py-2"
              onClick={() => setServicesOpen(!servicesOpen)}
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                servicesOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              }`}
              style={{ zIndex: 99999 }}
            >
              <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                <div className="py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-3 hover:bg-[#2C5F7F] hover:text-white transition-colors group"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-medium text-gray-900 group-hover:text-white">{service.title}</div>
                      <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5">{service.description}</div>
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <a
                      href="/#services"
                      className="block px-4 py-2 text-[#2C5F7F] font-medium hover:bg-[#2C5F7F]/10 transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="/#about" className="hover:text-white/80 transition">About</a>
          <a href="/#industries" className="hover:text-white/80 transition">Industries</a>
          <Link href="/gallery" className="hover:text-white/80 transition">Gallery</Link>
          <a href="/#contact" className="hover:text-white/80 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:07970566409" className="hidden lg:flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            07970 566409
          </a>
          <Button className="hidden sm:flex bg-white text-[#2C5F7F] hover:bg-white/90" onClick={onOpenQuotePopup}>
            Get a Quote
          </Button>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-4 border-t border-white/20">
          <div className="flex flex-col gap-2">
            {/* Services with Sub-menu */}
            <div className="border-b border-white/10">
              <button
                className="w-full py-3 flex items-center justify-between hover:text-white/80 transition"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                type="button"
              >
                <span>Services</span>
                {mobileServicesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {/* Mobile Services Sub-menu */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 pb-3 space-y-1">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm"
                      onClick={closeMobileMenu}
                    >
                      {service.title}
                    </Link>
                  ))}
                  <a
                    href="/#services"
                    className="block py-2 px-3 text-white/80 hover:text-white hover:bg-white/10 rounded transition text-sm font-medium"
                    onClick={closeMobileMenu}
                  >
                    View All Services →
                  </a>
                </div>
              </div>
            </div>

            <a href="/#about" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">About</a>
            <a href="/#industries" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Industries</a>
            <Link href="/gallery" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Gallery</Link>
            <a href="/#contact" onClick={closeMobileMenu} className="py-3 hover:text-white/80 transition border-b border-white/10">Contact</a>
            
            <div className="flex flex-col gap-3 pt-4">
              <a href="tel:07970566409" className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                07970 566409
              </a>
              <Button 
                className="bg-white text-[#2C5F7F] hover:bg-white/90 w-full" 
                onClick={() => { closeMobileMenu(); onOpenQuotePopup(); }}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
