import bg from "../../assets/images/hero-bg.png";
import { LuShieldCheck } from "react-icons/lu";
import { IoGiftOutline, IoChevronForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

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

function LocationCard({ city, stores, top, left, delay, duration }) {
  return (
    <Link
      to={"/all-categories"}
      className="lg:absolute relative bg-white rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/60 px-5 sm:px-6 py-4 sm:py-5 flex flex-col items-center justify-center text-center min-w-[140px] sm:min-w-[155px] animate-float transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] cursor-pointer"
      style={{
        ...(typeof window !== "undefined" && window.innerWidth >= 1024
          ? { top, left }
          : {}),
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <div className="mb-2 relative lg:absolute lg:-top-8 sm:lg:-top-10 p-1.5 sm:p-2 text-[#085027]">
        <IoGiftOutline size={28} />
      </div>
      <p className="text-lg sm:text-xl text-primary font-bold leading-tight">
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
  return (
    <section className="relative w-full overflow-hidden flex items-center font-inter min-h-screen sm:min-h-[600px] md:min-h-[700px] lg:min-h-[720px]">
      {/* Background Map — full stretch and beautiful overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="Map background"
          className="w-full h-full object-cover object-right opacity-10 sm:opacity-15 md:opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-8 sm:py-12 md:py-8 lg:py16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
        {/* LEFT — Text */}
        <div className="w-full lg:w-[45%] z-10 flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-3 sm:px-4 py-1.5 font-medium text-[#085027] mb-4 sm:mb-6 text-xs sm:text-sm">
            <LuShieldCheck className="text-sm sm:text-base" />
            The Premier Jewish Directory
          </div>

          {/* Brand/Logo Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#085027] mb-4 sm:mb-6 font-anton tracking-wider leading-tight">
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
            Stop Guessing
            <br />
            Start Gifting
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed mb-6 sm:mb-8 max-w-md">
            Find the perfect gift in the perfect place. We got you covered. Give
            with confidence
          </p>

          {/* Button */}
          <button className="inline-flex items-center gap-2 sm:gap-3 bg-[#085027] hover:bg-[#063b1d] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-colors shadow-sm hover:shadow-md">
            Explore Gifts
            <IoChevronForwardSharp className="text-sm sm:text-base lg:text-lg" />
          </button>
        </div>

        {/* RIGHT — Location Cards (Visible on all devices) */}
        <div className="w-full lg:w-[55%] relative h-auto md:h-[400px] lg:h-[620px] overflow-visible">
          <div className="flex flex-col sm:flex-wrap md:flex-wrap lg:flex-none gap-4 sm:gap-6 lg:gap-0">
            {locations.map((loc, i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-auto"
              >
                <LocationCard {...loc} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
