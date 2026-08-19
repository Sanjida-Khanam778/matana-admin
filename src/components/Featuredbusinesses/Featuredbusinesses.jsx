import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPremiumPartnersQuery } from "../../Api/businessDirectoryApi";
import { IMAGES } from "../../assets";
import LoadingSpinner from "../Common/LoadingSpinner";

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

function getEmbedVideoUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "iframe",
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
    return {
      type: "redirect",
      src: trimmed,
    };
  }

  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "iframe",
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  return {
    type: "video",
    src: trimmed,
  };
}

function VideoModal({ business, onClose }) {
  const embed = getEmbedVideoUrl(business.promo_video_link);
  if (!embed) return null;

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
              {business.name}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">Promotional Video</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <XIcon />
          </button>
        </div>

        {embed.type === "iframe" ? (
          <div className="relative w-full h-[320px] bg-black">
            <iframe
              src={embed.src}
              title={business.name}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : embed.type === "redirect" ? (
          <div className="p-8 text-center bg-gray-900 flex flex-col items-center justify-center space-y-4">
            <p className="text-white text-sm">
              Click below to view full promotional video on YouTube:
            </p>
            <a
              href={embed.src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-full transition-colors inline-flex items-center gap-2"
            >
              Watch on YouTube
            </a>
          </div>
        ) : (
          <video
            src={embed.src}
            controls
            autoPlay
            className="w-full"
            style={{ maxHeight: "340px" }}
          />
        )}
      </div>
    </div>
  );
}

function SlideCard({ business, onPlay }) {
  const navigate = useNavigate();
  const phone = business.business_phone || business.contact_phone;
  const website = business.website ? (business.website.startsWith("http") ? business.website : `https://${business.website}`) : null;

  const bgImage =
    business.banner ||
    business.flyer_image ||
    (Array.isArray(business.photos) && business.photos.length > 0 ? business.photos[0] : null) ||
    IMAGES.business1;

  const badges = useMemo(() => {
    const list = [];
    if (typeof business.services_tags === "string" && business.services_tags.trim()) {
      const tags = business.services_tags.split(",").map((t) => t.trim()).filter(Boolean);
      list.push(...tags);
    }
    if (business.community?.name) {
      list.push(business.community.name);
    }
    if (list.length === 0) {
      list.push("Premium Partner");
    }
    return list.slice(0, 3);
  }, [business]);

  const hasVideo = Boolean(typeof business.promo_video_link === "string" && business.promo_video_link.trim());

  return (
    <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[510px] select-none font-inter shadow-none">
      <img
        src={bgImage}
        alt={business.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

      {/* Play button ONLY if video exists */}
      {hasVideo && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          style={{ background: "none", border: "none" }}
        >
          <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
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
      )}

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-2 sm:left-6 md:left-8 lg:left-10 pb-4 sm:p-4 md:p-5 lg:p-7 z-10 right-4 sm:right-6 md:right-8 lg:right-auto max-w-2xl">
        <div
          className="flex items-center gap-2 sm:gap-3 mb-2 md:mb-3 lg:mb-4 cursor-pointer"
          onClick={() => navigate(`/community-details/${business.id}`, { state: { business } })}
        >
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
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow">
              {business.name}
            </p>
            {business.description && (
              <p className="text-white/80 text-xs sm:text-sm leading-tight line-clamp-2 mt-0.5">
                {business.description}
              </p>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-1.5 sm:gap-2 mb-3 md:mb-4 lg:mb-5 flex-wrap">
          {badges.map((b, i) => (
            <span
              key={i}
              className={`px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                i === 0 ? "bg-primary text-white" : "bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {phone ? (
            <a
              href={`tel:${phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow cursor-pointer"
            >
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
              Call Now
            </a>
          ) : null}

          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#D4AF37] hover:bg-[#c49010] text-black text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow cursor-pointer"
            >
              Visit Website
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/community-details/${business.id}`, { state: { business } });
              }}
              className="bg-[#D4AF37] hover:bg-[#c49010] text-black text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow cursor-pointer"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedBusinesses() {
  const { data: apiData = [], isLoading } = useGetPremiumPartnersQuery();
  const [activeIdx, setActiveIdx] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  const businesses = useMemo(() => {
    return Array.isArray(apiData) ? apiData : [];
  }, [apiData]);

  const TOTAL = businesses.length;

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const [liveOffset, setLiveOffset] = useState(0);
  const hasDragged = useRef(false);
  const activeIdxRef = useRef(activeIdx);
  activeIdxRef.current = activeIdx;

  useEffect(() => {
    if (playingVideo || TOTAL <= 1) return;

    const interval = setInterval(() => {
      if (!isDragging.current) {
        setActiveIdx((prevIdx) => {
          const nextIdx = prevIdx + 1;
          return nextIdx >= TOTAL ? 0 : nextIdx;
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [playingVideo, TOTAL]);

  function snapTo(idx) {
    if (TOTAL === 0) return;
    const clamped = Math.max(0, Math.min(idx, TOTAL - 1));
    setActiveIdx(clamped);
    setLiveOffset(0);
    dragOffset.current = 0;
  }

  const onMouseDown = useCallback((e) => {
    if (TOTAL <= 1) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    dragOffset.current = 0;
    setLiveOffset(0);
    e.preventDefault();
  }, [TOTAL]);

  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 4) hasDragged.current = true;
    dragOffset.current = diff;
    setLiveOffset(diff);
  }, []);

  const onMouseUp = useCallback(
    (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const diff = e.clientX - startX.current;
      const containerW = containerRef.current?.offsetWidth || window.innerWidth;
      const threshold = containerW * 0.12;

      if (diff < -threshold && activeIdxRef.current < TOTAL - 1) {
        snapTo(activeIdxRef.current + 1);
      } else if (diff > threshold && activeIdxRef.current > 0) {
        snapTo(activeIdxRef.current - 1);
      } else {
        snapTo(activeIdxRef.current);
      }
    },
    [TOTAL],
  );

  const touchStartX = useRef(0);
  const onTouchStart = (e) => {
    if (TOTAL <= 1) return;
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
    if (!isDragging.current) return;
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

  if (isLoading) {
    return (
      <section className="w-full bg-[#FAF5ED] py-12">
        <LoadingSpinner text="Loading Premium Partners..." />
      </section>
    );
  }

  if (TOTAL === 0) {
    return null;
  }

  const translateX = `calc(${-activeIdx * 100}% - ${activeIdx * 16}px + ${liveOffset}px)`;
  const isSnapping = !isDragging.current;

  return (
    <section
      id="featured"
      className="w-full bg-[#FAF5ED] pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-8"
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <p className="font-bold text-primary mb-1.5 sm:mb-2 text-2xl md:text-3xl xl:text-4xl">
          Premium Partners
        </p>
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
            <div key={biz.id || i} className="flex-shrink-0 w-full">
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
      {TOTAL > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-7 md:mt-8">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIdx === i
                  ? "w-8 h-2.5 bg-[#1a5c3a]"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

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
