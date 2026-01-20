import { Phone, MessageCircle } from "lucide-react";

export function FloatingMobileCTA() {
  const phoneNumber = "07970566409";
  const whatsappNumber = "447970566409"; // UK format for WhatsApp
  const whatsappMessage = encodeURIComponent("Hi, I'd like to inquire about your shot blasting services.");

  return (
    <>
      {/* Only show on mobile and tablet (hidden on desktop) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 lg:hidden">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 active:scale-95"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        {/* Call Now Button */}
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center w-14 h-14 bg-[#2C5F7F] text-white rounded-full shadow-lg hover:bg-[#234A61] transition-all hover:scale-110 active:scale-95"
          aria-label="Call us now"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>
    </>
  );
}
