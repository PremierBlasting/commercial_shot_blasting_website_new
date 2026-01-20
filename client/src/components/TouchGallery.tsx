import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom, type Swiper as SwiperType } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { X } from "lucide-react";

interface TouchGalleryProps {
  images: Array<{
    id: number;
    url: string;
    title: string;
    category: string;
  }>;
}

export function TouchGallery({ images }: TouchGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-semibold text-sm md:text-base">{image.title}</p>
                <p className="text-xs md:text-sm text-gray-200">{image.category}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Full-Screen Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white">
              <p className="font-semibold text-sm md:text-base">
                {images[currentIndex]?.title}
              </p>
              <p className="text-xs md:text-sm text-gray-300">
                {images[currentIndex]?.category}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/60 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Swiper Carousel */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <Swiper
              modules={[Navigation, Pagination, Zoom]}
              spaceBetween={20}
              slidesPerView={1}
              initialSlide={currentIndex}
              navigation
              zoom={{
                maxRatio: 3,
                minRatio: 1,
              }}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              className="w-full h-full"
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-navigation-size": "44px",
              } as React.CSSProperties}
            >
              {images.map((image) => (
                <SwiperSlide key={image.id} className="flex items-center justify-center">
                  <div className="swiper-zoom-container">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Swipe hint for mobile */}
          <div className="md:hidden absolute bottom-16 left-0 right-0 text-center text-white/60 text-xs">
            Swipe left/right • Pinch to zoom • Tap close to exit
          </div>
        </div>
      )}
    </>
  );
}
