import { Phone } from "lucide-react";

export function FloatingCallButton() {
  return (
    <a
      href="tel:07970566409"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#2C5F7F] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#234a63] transition-all duration-300 md:hidden"
      aria-label="Call Now"
    >
      <Phone className="w-5 h-5" />
      <span className="font-medium">Call Now</span>
    </a>
  );
}
