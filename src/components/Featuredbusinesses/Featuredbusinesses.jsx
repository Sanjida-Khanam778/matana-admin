import { useState, useRef, useCallback, useEffect } from "react";
const businesses = [
  {
    id: 1,
    name: "Elegant Judaica",
    tagline: "Timeless Judaica for Every Occasion",
    badges: ["OU Certified Kosher", "20% off this month"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    videoTitle: "Elegant Judaica",
    videoSub: "Promotional Video",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    name: "Royal Vault Cafe",
    tagline: "Gourmet Kosher Cuisine",
    badges: ["OU Certified Kosher", "20% off this month"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    videoTitle: "Royal Vault Cafe",
    videoSub: "Promotional Video",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    name: "Kosher Delights Restaurant",
    tagline: "Authentic Kosher Flavors",
    badges: ["OU Certified Kosher", "10% off weekdays"],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    videoTitle: "Kosher Delights Restaurant",
    videoSub: "Promotional Video",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const dotMap = [0, 1, 2, 0];
const DOT_COUNT = 3;

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l1.27-.63a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
    </svg>
  );
}
function HouseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#92713a"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function VideoModal({ business, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] rounded-2xl overflow-hidden w-full max-w-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4">
          <div>
            <p className="text-white text-sm font-semibold">
              {business.videoTitle}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">{business.videoSub}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XIcon />
          </button>
        </div>
        <video
          src={business.videoSrc}
          controls
          autoPlay
          className="w-full"
          style={{ maxHeight: "340px" }}
        />
      </div>
    </div>
  );
}

function SlideCard({ business, onPlay }) {
  return (
    <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[510px] select-none font-inter">
      <img
        src={business.image}
        alt={business.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      {/* Play button */}
      <button
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ background: "none", border: "none" }}
      >
        <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1a5c3a"
            className="sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px]"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </button>

      {/* Info */}
      <div className="absolute bottom-0 left-4 sm:left-6 md:left-8 lg:left-10 p-3 sm:p-4 md:p-5 lg:p-7 z-10 right-4 sm:right-6 md:right-8 lg:right-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
          <div className="w-8 sm:w-9 md:w-11 h-8 sm:h-9 md:h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#92713a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight drop-shadow">
              {business.name}
            </p>
            <p className="text-white/75 text-xs sm:text-sm leading-tight">
              {business.tagline}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 flex-wrap">
          {business.badges.map((b, i) => (
            <span
              key={i}
              className={`px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium ${i === 0 ? "bg-primary text-white" : "bg-white/20 text-white backdrop-blur-sm"}`}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row">
          <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-[14px] sm:h-[14px]"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l1.27-.63a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
            </svg>{" "}
            Call Now
          </button>
          <button className="bg-[#D4AF37] hover:bg-[#c49010] text-black text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow">
            Visit Website
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedBusinesses() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  // Real-time drag state
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0); // live px offset while dragging
  const [liveOffset, setLiveOffset] = useState(0); // triggers re-render for live tracking
  const hasDragged = useRef(false);
  const activeIdxRef = useRef(activeIdx);
  activeIdxRef.current = activeIdx;

  const TOTAL = businesses.length;

  // Autoplay: auto transition every 3 seconds
  useEffect(() => {
    if (playingVideo) return;

    const interval = setInterval(() => {
      if (!isDragging.current) {
        setActiveIdx((prevIdx) => {
          const nextIdx = prevIdx + 1;
          return nextIdx >= TOTAL ? 0 : nextIdx;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [playingVideo, TOTAL]);

  // Base translate = activeIdx * 100%  (each slide = 100% of container)
  // liveOffset is added on top while dragging

  function snapTo(idx) {
    const clamped = Math.max(0, Math.min(idx, TOTAL - 1));
    setActiveIdx(clamped);
    setLiveOffset(0);
    dragOffset.current = 0;
  }

  const onMouseDown = useCallback((e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    dragOffset.current = 0;
    setLiveOffset(0);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 4) hasDragged.current = true;
    dragOffset.current = diff;
    setLiveOffset(diff); // live update
  }, []);

  const onMouseUp = useCallback(
    (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const diff = e.clientX - startX.current;
      const containerW = containerRef.current?.offsetWidth || window.innerWidth;
      const threshold = containerW * 0.12; // 12% of container width

      if (diff < -threshold && activeIdxRef.current < TOTAL - 1) {
        snapTo(activeIdxRef.current + 1);
      } else if (diff > threshold && activeIdxRef.current > 0) {
        snapTo(activeIdxRef.current - 1);
      } else {
        snapTo(activeIdxRef.current); // snap back
      }
    },
    [TOTAL],
  );

  // Touch
  const touchStartX = useRef(0);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    dragOffset.current = 0;
    setLiveOffset(0);
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    dragOffset.current = diff;
    setLiveOffset(diff);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    const diff = dragOffset.current;
    const containerW = containerRef.current?.offsetWidth || window.innerWidth;
    const threshold = containerW * 0.12;
    if (diff < -threshold && activeIdxRef.current < TOTAL - 1) {
      snapTo(activeIdxRef.current + 1);
    } else if (diff > threshold && activeIdxRef.current > 0) {
      snapTo(activeIdxRef.current - 1);
    } else {
      snapTo(activeIdxRef.current);
    }
  };

  // translateX: each slide = 90% width of track, gap is 16px
  // base: -activeIdx * 90% - activeIdx * 16px + liveOffset px
  const translateX = `calc(${-activeIdx * 90}% - ${activeIdx * 16}px + ${liveOffset}px)`;
  const isSnapping = !isDragging.current;

  const activeDot = dotMap[activeIdx];

  return (
    <section className="w-full bg-[#D4E2E7]/20 py-8 sm:py-12 md:py-8 lg:py16 lg:py-8 md:py-12 xl:py-20">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <p className="font-bold tracking-[0.18em] text-primary uppercase mb-1.5 sm:mb-2 text-xs sm:text-sm">
          Premium Partners
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Featured Businesses
        </h2>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden w-full sm:w-11/12 md:w-5/6 lg:w-10/12 mx-auto px-3 sm:px-4 md:px-0"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX})`,
            transition: isSnapping
              ? "transform 1.85s cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
            willChange: "transform",
            gap: "16px",
          }}
        >
          {businesses.map((biz, i) => (
            <div key={i} className="flex-shrink-0 w-[90%]">
              <SlideCard
                business={biz}
                onPlay={() => {
                  if (!hasDragged.current) setPlayingVideo(biz);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-7 md:mt-8">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(dotMap.indexOf(i))}
            className={`transition-all duration-300 rounded-full ${
              activeDot === i
                ? "w-8 h-2.5 bg-[#1a5c3a]"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <VideoModal
          business={playingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </section>
  );
}
