import bg from "../../assets/images/hero-bg.png"
import { LuShieldCheck } from "react-icons/lu";
import { IoGiftOutline, IoChevronForwardSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

// ── Location Cards ─────────────────────────────────
const locations = [
  { city: "Torento, ON",   stores: 43, top: "18%",  left: "24%", delay: "0s", duration: "6s" },
  { city: "Montreal, QC",  stores: 43, top: "5%",   left: "62%", delay: "0.2s", duration: "5.5s" },
  { city: "Torento, ON",   stores: 43, top: "30%",  left: "50%", delay: "0.8s", duration: "6.5s" },
  { city: "PLanto, NK",    stores: 43, top: "34%",  left: "76%", delay: "1.4s", duration: "5.2s" },
  { city: "Monsey, NY",    stores: 43, top: "46%",  left: "28%", delay: "0.4s", duration: "7s" },
  { city: "Free Town",     stores: 43, top: "56%",  left: "56%", delay: "1s", duration: "6.2s" },
  { city: "Lakewood, NJ",  stores: 43, top: "74%",  left: "28%", delay: "1.2s", duration: "5.8s" },
  { city: "Miami, FL",     stores: 43, top: "72%",  left: "76%", delay: "1.6s", duration: "6.4s" },
];

function LocationCard({ city, stores, top, left, delay, duration }) {
  return (
    <Link to={'/all-categories'}
      className="absolute bg-white rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/60 px-6 py-5 flex flex-col items-center justify-center text-center min-w-[155px] animate-float transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] cursor-pointer"
      style={{
        top,
        left,
        animationDelay: delay,
        animationDuration: duration
      }}
    >
      <div className="mb-2 absolute -top-10 p-2 text-[#085027]">
        <IoGiftOutline size={34} />
      </div>
      <p className="text-xl text-primary font-bold leading-tight">{city}</p>
      <p className="text-[13px] text-gray-400 font-medium mt-1">{stores} Store</p>
    </Link>
  );
}

// ── Hero Section ───────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden flex items-center font-inter min-h-[720px]">

      {/* Background Map — full stretch and beautiful overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt="Map background"
          className="w-full h-full object-cover object-right opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-10/12 mx-auto py-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT — Text */}
        <div className="w-full lg:w-[45%] z-10 flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-4 py-1.5 font-medium text-[#085027] mb-6 text-sm">
            <LuShieldCheck className="text-base" />
            The Premier Jewish Directory
          </div>

          {/* Brand/Logo Text */}
          <h1 className="text-6xl lg:text-7xl text-[#085027] mb-6 font-anton tracking-wider">
            MATANA
          </h1>

          {/* Divider with Gift */}
          <div className="w-full max-w-[320px] flex items-center gap-4 mb-4">
            <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
            <IoGiftOutline className="text-2xl lg:text-4xl text-[#085027]" />
            <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#085027] mb-6 lg:leading-normal leading-tight">
            Stop Guessing<br />
            Start Gifting
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 leading-relaxed text-lg mb-8 max-w-md">
            Find the perfect gift-in the perfect place. We got you Covered Give with Confidance
          </p>

          {/* Button */}
          <button className="inline-flex items-center gap-3 bg-[#085027] hover:bg-[#063b1d] text-white text-base font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm">
            Explore Gifts
            <IoChevronForwardSharp className="text-base lg:text-xl" />
          </button>
        </div>

        {/* RIGHT — Location Cards */}
        <div className="w-full lg:w-[55%] relative h-[620px] overflow-visible">
          {locations.map((loc, i) => (
            <LocationCard key={i} {...loc} />
          ))}
        </div>
      </div>
    </section>
  );
}