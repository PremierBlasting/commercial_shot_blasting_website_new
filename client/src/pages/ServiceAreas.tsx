import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { QuotePopup } from "@/components/QuotePopup";
import { Link } from "wouter";
import { 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Building2, 
  Factory, 
  Warehouse,
  ArrowRight,
  Clock,
  Shield,
  Award
} from "lucide-react";

const serviceAreas = [
  {
    id: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    description: "As the UK's second-largest city, Birmingham has a rich industrial heritage and thriving manufacturing sector. Our shot blasting services support businesses across Birmingham's diverse industries, from automotive suppliers in Longbridge to engineering firms in Digbeth.",
    highlights: [
      "Central Birmingham & City Centre",
      "Digbeth Industrial Area",
      "Longbridge & Northfield",
      "Erdington & Aston",
      "Tyseley Industrial Estate",
      "Witton & Perry Barr"
    ],
    industries: [
      "Automotive manufacturing",
      "Aerospace components",
      "Construction & civil engineering",
      "Heritage restoration projects",
      "Commercial property maintenance"
    ],
    stats: {
      projects: "500+",
      years: "15+",
      clients: "200+"
    }
  },
  {
    id: "west-midlands",
    name: "West Midlands",
    region: "Greater Region",
    description: "The West Midlands region is the heartland of British manufacturing. We provide comprehensive shot blasting coverage across the entire region, serving industrial clients from Coventry to Dudley and everywhere in between.",
    highlights: [
      "Coventry & Warwickshire",
      "Solihull & Shirley",
      "Dudley & Stourbridge",
      "Sandwell & West Bromwich",
      "Walsall & Aldridge",
      "Sutton Coldfield"
    ],
    industries: [
      "Heavy engineering",
      "Steel fabrication",
      "Agricultural machinery",
      "Rail infrastructure",
      "Industrial equipment refurbishment"
    ],
    stats: {
      projects: "1,200+",
      years: "15+",
      clients: "450+"
    }
  },
  {
    id: "wolverhampton",
    name: "Wolverhampton",
    region: "Black Country",
    description: "Wolverhampton and the Black Country have been at the heart of British metalworking for centuries. Our shot blasting expertise perfectly complements the region's engineering excellence, serving foundries, fabricators, and manufacturers throughout the area.",
    highlights: [
      "Wolverhampton City Centre",
      "Bilston & Bradley",
      "Willenhall & Darlaston",
      "Wednesfield & Heath Town",
      "Tettenhall & Compton",
      "Bushbury Industrial Estate"
    ],
    industries: [
      "Foundry & casting",
      "Metal fabrication",
      "Lock & key manufacturing",
      "Tube & pipe processing",
      "Structural steelwork"
    ],
    stats: {
      projects: "350+",
      years: "15+",
      clients: "150+"
    }
  }
];

export default function ServiceAreas() {
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <Header onOpenQuotePopup={() => setQuotePopupOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-[#1a3d52] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3d52] via-[#2C5F7F] to-[#1a3d52]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#d4a853] mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Service Coverage</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Areas We Serve
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Professional shot blasting services across Birmingham, the West Midlands, and Wolverhampton. 
              Local expertise with nationwide quality standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#d4a853] hover:bg-[#c49843] text-[#1a3d52] font-semibold"
                onClick={() => setQuotePopupOpen(true)}
              >
                Get a Local Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:07970566409">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 07970 566409
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Matters Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose a Local Shot Blasting Company?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Working with a local provider means faster response times, lower transport costs, and a team that understands your region's industries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Rapid Response</h3>
                <p className="text-gray-600">
                  Same-day site visits and quick turnaround times. We're just around the corner when you need us.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Local Reputation</h3>
                <p className="text-gray-600">
                  Our reputation in the West Midlands is built on quality work and satisfied customers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#2C5F7F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#2C5F7F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a3d52] mb-2">Industry Knowledge</h3>
                <p className="text-gray-600">
                  We understand the unique needs of West Midlands industries, from automotive to aerospace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas Sections */}
      {serviceAreas.map((area, index) => (
        <section 
          key={area.id} 
          id={area.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-[#f8f5f0]' : 'bg-white'}`}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-2 text-[#d4a853] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">{area.region}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Shot Blasting in {area.name}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {area.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-[#2C5F7F]/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#2C5F7F]">{area.stats.projects}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center p-4 bg-[#2C5F7F]/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#2C5F7F]">{area.stats.years}</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-[#2C5F7F]/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#2C5F7F]">{area.stats.clients}</div>
                    <div className="text-sm text-gray-600">Local Clients</div>
                  </div>
                </div>

                {/* Industries */}
                <h3 className="text-lg font-semibold text-[#1a3d52] mb-3">Industries We Serve in {area.name}</h3>
                <ul className="space-y-2 mb-6">
                  {area.industries.map((industry, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#2C5F7F]" />
                      {industry}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="bg-[#2C5F7F] hover:bg-[#1a3d52]"
                  onClick={() => setQuotePopupOpen(true)}
                >
                  Get a Quote for {area.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Areas Covered Card */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="bg-[#1a3d52] text-white p-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Areas Covered in {area.name}
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {area.highlights.map((location, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-[#d4a853]" />
                          <span className="text-sm">{location}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-gray-600 mb-4">
                        Don't see your area listed? We cover the entire {area.region} region and beyond.
                      </p>
                      <a 
                        href="tel:07970566409" 
                        className="flex items-center gap-2 text-[#2C5F7F] font-semibold hover:text-[#1a3d52] transition"
                      >
                        <Phone className="w-4 h-4" />
                        Call to confirm coverage
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Services Available Section */}
      <section className="py-16 bg-[#1a3d52] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Services Available Across All Areas
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              No matter where you're located in the West Midlands, we offer our full range of professional shot blasting services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Factory, title: "Steel Shot Blasting", link: "/services/steel-shot-blasting" },
              { icon: Building2, title: "Concrete Preparation", link: "/services/concrete-preparation" },
              { icon: Warehouse, title: "Gate Restoration", link: "/services/gate-restoration" },
              { icon: Factory, title: "Automotive Restoration", link: "/services/automotive-restoration" }
            ].map((service, i) => (
              <Link key={i} href={service.link}>
                <Card className="border-0 bg-white/10 hover:bg-white/20 transition cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <service.icon className="w-10 h-10 mx-auto mb-4 text-[#d4a853]" />
                    <h3 className="font-semibold text-white">{service.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/#services">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#d4a853]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-[#1a3d52] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Get Started?
          </h2>
          <p className="text-[#1a3d52]/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free, no-obligation quote. We'll visit your site, assess your requirements, and provide a competitive price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#1a3d52] hover:bg-[#2C5F7F] text-white"
              onClick={() => setQuotePopupOpen(true)}
            >
              Request a Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#1a3d52] text-[#1a3d52] hover:bg-[#1a3d52] hover:text-white"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3d52] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/30">
                  <span className="font-bold">CSB</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</span>
              </div>
              <p className="text-white/70 text-sm">Professional shot blasting services for industrial and commercial applications across the UK.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#birmingham" className="hover:text-white transition">Birmingham</a></li>
                <li><a href="#west-midlands" className="hover:text-white transition">West Midlands</a></li>
                <li><a href="#wolverhampton" className="hover:text-white transition">Wolverhampton</a></li>
                <li><Link href="/#contact" className="hover:text-white transition">Other Areas</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                <li><Link href="/#services" className="hover:text-white transition">Services</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li>
                  <a href="tel:07970566409" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    07970 566409
                  </a>
                </li>
                <li>
                  <a href="mailto:info@commercialshotblasting.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    info@commercialshotblasting.co.uk
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  West Midlands, UK
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <QuotePopup open={quotePopupOpen} onOpenChange={setQuotePopupOpen} />
    </div>
  );
}
