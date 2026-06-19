import { useState, useEffect } from "react";
import bg from "../../assets/images/hero-bg.png";
import { LuShieldCheck } from "react-icons/lu";
import {
  IoGiftOutline,
  IoChevronForwardSharp,
  IoSearchOutline,
  IoLocationOutline,
  IoChevronDown,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

// ── Location Cards ─────────────────────────────────
const locations = [
  {
    city: "Torento, ON",
    stores: 43,
    top: "18%",
    left: "24%",
    delay: "0s",
    duration: "6s",
  },
  {
    city: "Montreal, QC",
    stores: 43,
    top: "5%",
    left: "62%",
    delay: "0.2s",
    duration: "5.5s",
  },
  {
    city: "Torento, ON",
    stores: 43,
    top: "30%",
    left: "50%",
    delay: "0.8s",
    duration: "6.5s",
  },
  {
    city: "PLanto, NK",
    stores: 43,
    top: "34%",
    left: "76%",
    delay: "1.4s",
    duration: "5.2s",
  },
  {
    city: "Monsey, NY",
    stores: 43,
    top: "46%",
    left: "28%",
    delay: "0.4s",
    duration: "7s",
  },
  {
    city: "Free Town",
    stores: 43,
    top: "56%",
    left: "56%",
    delay: "1s",
    duration: "6.2s",
  },
  {
    city: "Lakewood, NJ",
    stores: 43,
    top: "74%",
    left: "28%",
    delay: "1.2s",
    duration: "5.8s",
  },
  {
    city: "Miami, FL",
    stores: 43,
    top: "72%",
    left: "76%",
    delay: "1.6s",
    duration: "6.4s",
  },
];

const uniqueCities = Array.from(new Set(locations.map((loc) => loc.city)));

function LocationCard({ city, stores, top, left, delay, duration, isMobile }) {
  return (
    <Link
      to={"/all-categories"}
      className="lg:absolute relative bg-white rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/60 px-5 sm:px-6 py-4 sm:py-5 flex flex-col items-center justify-center text-center min-w-[140px] sm:min-w-[155px] animate-float transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] cursor-pointer"
      style={{
        ...(!isMobile ? { top, left } : {}),
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <div className="mb-2 relative lg:absolute lg:-top-5 left-1/2 lg:-translate-x-1/2 bg-white rounded-full p-2 text-[#085027] border border-gray-150 shadow-sm flex items-center justify-center w-10 h-10">
        <IoGiftOutline size={22} />
      </div>
      <p className="text-base sm:text-lg text-primary font-bold leading-tight mt-1 lg:mt-3">
        {city}
      </p>
      <p className="text-[12px] sm:text-[13px] text-gray-400 font-medium mt-1">
        {stores} Store
      </p>
    </Link>
  );
}

// ── Hero Section ───────────────────────────────────
export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".location-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery.trim());
    if (selectedLocation) params.set("location", selectedLocation);
    
    // Navigate with query parameters so they can be parsed by listing pages
    navigate(`/all-events?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative w-full overflow-hidden flex items-center font-inter">
      {/* Background Map — full stretch and beautiful overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="Map background"
          className="w-full h-full object-cover object-right opacity-10 sm:opacity-15 md:opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-10/12 mx-auto py-8 sm:py-12 md:py-8 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
        {/* LEFT — Text */}
        <div className="w-full lg:w-[45%] z-10 flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-3 sm:px-4 py-1.5 font-medium text-[#085027] mb-4 sm:mb-6 text-xs sm:text-sm">
            <LuShieldCheck className="text-sm sm:text-base" />
            The Premier Jewish Directory
          </div>

          {/* Brand/Logo Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#085027] mb-4 sm:mb-6 font-bebas tracking-wider leading-tight">
            MATANA
          </h1>

          {/* Divider with Gift */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 h-[1px] sm:h-[1.5px] bg-[#085027]/30" />
            <IoGiftOutline className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#085027] flex-shrink-0" />
            <div className="flex-1 h-[1px] sm:h-[1.5px] bg-[#085027]/30" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#085027] mb-4 sm:mb-6 lg:leading-normal leading-tight">
            Stop Guessing.
            <br />
            Start Gifting.
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed mb-4 max-w-md">
            Find the perfect gift in the perfect place.
          </p>

          {/* Search section */}
          <div className="w-full lg:w-[140%] lg:max-w-3xl bg-white border border-gray-150 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] p-1.5 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 mb-6 sm:mb-8 z-30">
            {/* Search Query Input */}
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 flex-[1.8] w-full">
              <IoSearchOutline className="text-[#085027]/70 text-xl sm:text-2xl flex-shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base text-gray-700 placeholder-gray-400 font-medium focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div className="w-[1px] h-8 bg-gray-200 mx-2 hidden sm:block" />

            {/* Location Selector (Custom elegant inline dropdown) */}
            <div className="location-dropdown relative flex items-center px-3.5 py-1.5 flex-[1.2] w-full cursor-pointer">
              <div
                className="flex items-center gap-2 w-full select-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <IoLocationOutline className="text-[#085027]/70 text-xl sm:text-2xl flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 font-semibold truncate">
                  {selectedLocation || "Location"}
                </span>
                <IoChevronDown className={`text-gray-400 text-sm transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </div>

              {isDropdownOpen && (
                <div className="absolute bottom-[calc(100%+12px)] left-0 w-full min-w-[210px] bg-white border border-gray-100 shadow-[0_15px_45px_rgba(0,0,0,0.12)] rounded-2xl py-2 z-50">
                  <div
                    onClick={() => {
                      setSelectedLocation("");
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2.5 text-sm sm:text-base text-gray-500 hover:bg-[#085027]/5 hover:text-[#085027] font-medium transition-colors cursor-pointer"
                  >
                    All Locations
                  </div>
                  {uniqueCities.map((city, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(city);
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2.5 text-sm sm:text-base text-gray-700 hover:bg-[#085027]/5 hover:text-[#085027] font-semibold transition-colors cursor-pointer"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-[#085027] hover:bg-[#063b1d] text-white px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>

          {/* Button */}
          {/* <button className="inline-flex items-center gap-2 sm:gap-3 bg-[#085027] hover:bg-[#063b1d] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-colors shadow-sm hover:shadow-md">
            Explore Gifts
            <IoChevronForwardSharp className="text-sm sm:text-base lg:text-lg" />
          </button> */}
        </div>

        {/* RIGHT — Location Cards (Visible on all devices) */}
        <div className="w-full relative h-auto md:h-[400px] lg:h-[620px] overflow-visible">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-0">
            {locations.map((loc, i) => (
              <div
                key={i}
                className=""
              >
                <LocationCard {...loc} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </div> 
      </div>
    </section>
  );
}
