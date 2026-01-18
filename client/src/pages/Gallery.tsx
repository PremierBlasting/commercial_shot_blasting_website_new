import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Phone, ArrowLeft, ArrowRight, Star, Quote, X, Menu } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const galleryItems = [
  {
    id: 1,
    title: "Industrial Steel Framework",
    category: "Steel Shot Blasting",
    description: "Complete rust and scale removal from structural steel beams",
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    after: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600",
  },
  {
    id: 2,
    title: "Factory Floor Preparation",
    category: "Concrete Preparation",
    description: "Surface profiling for epoxy coating application",
    before: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
    after: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
  },
  {
    id: 3,
    title: "Vehicle Chassis Restoration",
    category: "Automotive",
    description: "Full chassis blast cleaning and rust removal",
    before: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
  },
  {
    id: 4,
    title: "Marine Equipment",
    category: "Marine",
    description: "Corrosion removal from marine vessel components",
    before: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    after: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600",
  },
  {
    id: 5,
    title: "Agricultural Machinery",
    category: "Agriculture",
    description: "Heavy equipment restoration and paint preparation",
    before: "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=600",
    after: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600",
  },
  {
    id: 6,
    title: "Bridge Steelwork",
    category: "Infrastructure",
    description: "Structural steel preparation for protective coating",
    before: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600",
    after: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600",
  },
];

const categories = ["All", "Steel Shot Blasting", "Concrete Preparation", "Automotive", "Marine", "Agriculture", "Infrastructure"];

const testimonials = [
  {
    id: 1,
    name: "Kate Crisp",
    company: "Property Renovation",
    rating: 5,
    text: "We have been renovating our 500plus year old property which is steeped in character but most of the beams were painted black. The transformation could not be more worth it.",
    project: "Beam Restoration",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
    ],
    isNew: true,
  },
  {
    id: 2,
    name: "Alex Philip",
    company: "Cottage Owner",
    rating: 5,
    text: "Excellent service from start to finish. Completed blasting the gloss black paint off all the beams in our cottage in superb time. Alfie and Ben were a great team and kept us updated throughout from the tester patches to the finished beams. Would highly recommend.",
    project: "Beam Cleaning",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600",
    ],
  },
  {
    id: 3,
    name: "Zoë Meredith",
    company: "Homeowner",
    rating: 5,
    text: "Alfie & Ben have done a fantastic job on the beams in our house. We are really happy with their work and would 100% recommend them. They did as much as possible to contain the dust/sand, they cleaned up well before leaving.",
    project: "Beam Restoration",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600",
    ],
  },
  {
    id: 4,
    name: "Colin Howe",
    company: "Property Owner",
    rating: 5,
    text: "Fantastic! The guys at Commercial Shot Blasting were very helpful from the initial enquiry stage right through to the finished project. Sam and Tom did a great job with our beams and we are incredibly happy with the result. Great job!",
    project: "Beam Blasting",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600",
    ],
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [showAfter, setShowAfter] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Fetch data from database
  const { data: dbGalleryItems } = trpc.gallery.list.useQuery();
  const { data: dbTestimonials } = trpc.testimonials.list.useQuery();

  // Use database data if available, otherwise use static fallback
  const displayGalleryItems = useMemo(() => {
    if (dbGalleryItems && dbGalleryItems.length > 0) {
      return dbGalleryItems.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description || '',
        before: item.beforeImage,
        after: item.afterImage,
      }));
    }
    return galleryItems;
  }, [dbGalleryItems]);

  const displayTestimonials = useMemo(() => {
    if (dbTestimonials && dbTestimonials.length > 0) {
      return dbTestimonials.map(item => ({
        id: item.id,
        name: item.name,
        company: item.company || '',
        rating: item.rating,
        text: item.text,
        project: item.project || '',
        images: item.images as string[] | undefined,
        isNew: item.isNew,
      }));
    }
    return testimonials;
  }, [dbTestimonials]);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxImage(images[index]);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(lightboxImages[newIndex]);
  };

  const filteredItems = selectedCategory === "All" 
    ? displayGalleryItems 
    : displayGalleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <header className="bg-[#2C5F7F] text-white sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/30">
              <span className="text-xl font-bold">CSB</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Commercial Shot Blasting</h1>
              <p className="text-xs text-white/80">Professional Surface Preparation</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-white/80 transition">Home</Link>
            <Link href="/#services" className="hover:text-white/80 transition">Services</Link>
            <Link href="/#about" className="hover:text-white/80 transition">About</Link>
            <Link href="/gallery" className="text-white border-b-2 border-white pb-1">Gallery</Link>
            <Link href="/#contact" className="hover:text-white/80 transition">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <a href="tel:07970566409" className="hidden lg:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              07970 566409
            </a>
            <Link href="/#contact">
              <Button className="hidden sm:flex bg-white text-[#2C5F7F] hover:bg-white/90">Get a Quote</Button>
            </Link>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="container py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={closeMobileMenu} className="py-2 hover:text-white/80 transition border-b border-white/10">Home</Link>
              <Link href="/#services" onClick={closeMobileMenu} className="py-2 hover:text-white/80 transition border-b border-white/10">Services</Link>
              <Link href="/#about" onClick={closeMobileMenu} className="py-2 hover:text-white/80 transition border-b border-white/10">About</Link>
              <Link href="/gallery" onClick={closeMobileMenu} className="py-2 hover:text-white/80 transition border-b border-white/10 font-semibold">Gallery</Link>
              <Link href="/#contact" onClick={closeMobileMenu} className="py-2 hover:text-white/80 transition border-b border-white/10">Contact</Link>
              <div className="flex flex-col gap-3 pt-2">
                <a href="tel:07970566409" className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  07970 566409
                </a>
                <Link href="/#contact" onClick={closeMobileMenu}>
                  <Button className="bg-white text-[#2C5F7F] hover:bg-white/90 w-full">Get a Quote</Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2C5F7F] to-[#1a3d52] text-white py-16">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Work Gallery
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            See the dramatic transformations we achieve with our professional shot blasting services. 
            View before and after results from projects across various industries.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#F5F1E8] py-6 border-b border-[#e5e0d5]">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-[#2C5F7F] text-white"
                    : "bg-white text-[#2C2C2C] hover:bg-[#2C5F7F]/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#F5F1E8] flex-1">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => { setSelectedItem(item); setShowAfter(false); }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.before} 
                        alt={`${item.title} - Before`} 
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                      />
                      <img 
                        src={item.after} 
                        alt={`${item.title} - After`} 
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium group-hover:opacity-0 transition-opacity">BEFORE</span>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">AFTER</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-white/80 text-xs uppercase tracking-wider">{item.category}</span>
                        <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-[#2C5F7F] text-sm font-medium mt-2">Hover to see transformation →</p>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={showAfter ? item.after : item.before} 
                      alt={item.title} 
                      className="w-full h-auto max-h-[70vh] object-contain bg-black"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-white text-sm px-3 py-1 rounded font-medium ${showAfter ? 'bg-green-500' : 'bg-red-500'}`}>
                        {showAfter ? 'AFTER' : 'BEFORE'}
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowAfter(!showAfter)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#2C5F7F] px-6 py-2 rounded-full font-medium shadow-lg hover:bg-[#2C5F7F] hover:text-white transition flex items-center gap-2"
                    >
                      {showAfter ? <><ArrowLeft className="w-4 h-4" /> View Before</> : <>View After <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                  <div className="p-6 bg-white">
                    <span className="text-[#2C5F7F] text-sm font-medium">{item.category}</span>
                    <h3 className="text-2xl font-bold text-[#2C2C2C] mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          {lightboxImages.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          <img 
            src={lightboxImage} 
            alt="Review photo" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {lightboxImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); setLightboxImage(lightboxImages[idx]); }}
                  className={`w-2 h-2 rounded-full transition ${idx === lightboxIndex ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#2C5F7F] font-medium mb-2">Customer Reviews</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients Say
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our shot blasting services.
            </p>
          </div>
          
          {/* Featured Review with Images */}
          {displayTestimonials.length > 0 && (
            <Card className="p-6 mb-8 hover:shadow-lg transition-shadow relative bg-gradient-to-br from-[#F5F1E8] to-white border-2 border-[#2C5F7F]/20">
              <div className="flex items-center gap-2 mb-4">
                {displayTestimonials[0].isNew && (
                  <span className="bg-[#2C5F7F] text-white text-xs px-2 py-1 rounded font-medium">NEW</span>
                )}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < displayTestimonials[0].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <Quote className="absolute top-4 right-4 w-12 h-12 text-[#2C5F7F]/10" />
              <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">"{displayTestimonials[0].text}"</p>
              {displayTestimonials[0].images && displayTestimonials[0].images.length > 0 && (
                <div className={`grid gap-2 mb-6 ${displayTestimonials[0].images.length >= 5 ? 'grid-cols-5' : `grid-cols-${displayTestimonials[0].images.length}`}`}>
                  {displayTestimonials[0].images.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Review photo ${idx + 1}`} 
                      className="w-full h-24 md:h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer shadow-md"
                      onClick={() => openLightbox(displayTestimonials[0].images!, idx)}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#2C2C2C] text-lg">{displayTestimonials[0].name}</p>
                  <p className="text-sm text-gray-500">{displayTestimonials[0].company}</p>
                </div>
                <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                  {displayTestimonials[0].project}
                </span>
              </div>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.slice(1).map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#2C5F7F]/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic text-sm">"{testimonial.text}"</p>
                {testimonial.images && testimonial.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-1 mb-4">
                    {testimonial.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={`Review photo ${idx + 1}`} 
                        className="w-full h-16 object-cover rounded hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => openLightbox(testimonial.images!, idx)}
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#2C2C2C]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <span className="text-xs bg-[#2C5F7F]/10 text-[#2C5F7F] px-3 py-1 rounded-full font-medium">
                    {testimonial.project}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#2C5F7F] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready for Your Transformation?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get in touch today and let us show you what professional shot blasting can do for your project.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90">Get a Free Quote</Button>
            </Link>
            <a href="tel:07970566409">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-4 h-4 mr-2" /> Call Us
              </Button>
            </a>
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
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#services" className="hover:text-white">Steel Shot Blasting</a></li>
                <li><a href="/#services" className="hover:text-white">Concrete Preparation</a></li>
                <li><a href="/#services" className="hover:text-white">Rust Removal</a></li>
                <li><a href="/#services" className="hover:text-white">Paint Stripping</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/#about" className="hover:text-white">About Us</a></li>
                <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
                <li><a href="/#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>07970 566409</li>
                <li>info@commercialshotblasting.co.uk</li>
                <li>Nationwide UK Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Commercial Shot Blasting Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
