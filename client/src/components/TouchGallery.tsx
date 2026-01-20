import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, type Swiper as SwiperType } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { X, MoveHorizontal } from "lucide-react";

interface TouchGalleryProps {
  images: Array<{
    id: number;
    url: string;
    beforeUrl?: string;
    title: string;
    category: string;
  }>;
}

function BeforeAfterSlider({ beforeUrl, afterUrl, title }: { beforeUrl: string; afterUrl: string; title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* After Image (Background) */}
      <img
        src={afterUrl}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeUrl}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center touch-manipulation">
          <MoveHorizontal className="w-6 h-6 text-gray-800" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs md:text-sm px-3 py-1 rounded font-medium z-20 pointer-events-none">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs md:text-sm px-3 py-1 rounded font-medium z-20 pointer-events-none">
        AFTER
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full pointer-events-none z-20">
        Drag slider to compare
      </div>
    </div>
  );
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

  const currentImage = images[currentIndex];
  const hasBeforeAfter = currentImage?.beforeUrl;

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
            {image.beforeUrl && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">
                BEFORE/AFTER
              </div>
            )}
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
                {currentImage?.title}
              </p>
              <p className="text-xs md:text-sm text-gray-300">
                {currentImage?.category}
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

          {/* Swiper Carousel or Before/After Slider */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            {hasBeforeAfter ? (
              <div className="w-full h-full max-w-5xl max-h-[80vh] relative">
                <BeforeAfterSlider
                  beforeUrl={currentImage.beforeUrl!}
                  afterUrl={currentImage.url}
                  title={currentImage.title}
                />
                {/* Navigation arrows for before/after mode */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const newIndex = (currentIndex - 1 + images.length) % images.length;
                        setCurrentIndex(newIndex);
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-30"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => {
                        const newIndex = (currentIndex + 1) % images.length;
                        setCurrentIndex(newIndex);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-30"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                initialSlide={currentIndex}
                navigation
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
                    <img
                      src={image.url}
                      alt={image.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Swipe hint for mobile */}
          <div className="md:hidden absolute bottom-16 left-0 right-0 text-center text-white/60 text-xs">
            {hasBeforeAfter ? "Drag slider • Tap arrows to navigate" : "Swipe left/right • Tap close to exit"}
          </div>
        </div>
      )}
    </>
  );
}
