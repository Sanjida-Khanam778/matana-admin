import { useState, useEffect } from "react";
import bg from "../../assets/images/hero-bg.png";
import { LuShieldCheck } from "react-icons/lu";
import { IoGiftOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

// ── Scattered positions matching the screenshot layout ──
const locations = [
  { city: "Brooklyn/boro park", stores: 43, top: "6%", left: "0%" },
  { city: "Queens", stores: 63, top: "0%", left: "20%" },
  { city: "Staten Island", stores: 23, top: "3%", left: "38%" },
  { city: "Five towns", stores: 73, top: "0%", left: "58%" },
  { city: "Hollywood", stores: 115, top: "5%", left: "75%" },
  { city: "Far Rockaway", stores: 43, top: "30%", left: "6%" },
  { city: "Riverdale", stores: 133, top: "20%", left: "24%" },
  { city: "Cleveland", stores: 45, top: "24%", left: "45%" },
  { city: "Houston", stores: 32, top: "24%", left: "64%" },
  { city: "Baltimore", stores: 43, top: "24%", left: "85%" },
  { city: "Chicago", stores: 102, top: "54%", left: "2%" },
  { city: "Lakewood", stores: 43, top: "44%", left: "20%" },
  { city: "Monsey", stores: 93, top: "46%", left: "40%" },
  { city: "Jackson", stores: 163, top: "45%", left: "57%" },
  { city: "Tom's river", stores: 43, top: "44%", left: "76%" },
  { city: "Teaneck", stores: 43, top: "75%", left: "10%" },
  { city: "Detroit", stores: 43, top: "65%", left: "28%" },
  { city: "Los Angeles", stores: 43, top: "70%", left: "48%" },
  { city: "Montreal", stores: 43, top: "65%", left: "68%" },
  { city: "Edison", stores: 103, top: "70%", left: "88%" },
  { city: "Manhattan", stores: 123, top: "88%", left: "26%" },
  { city: "Passaic", stores: 63, top: "94%", left: "42%" },
  { city: "Boca", stores: 57, top: "91%", left: "62%" },
  { city: "Miami", stores: 68, top: "95%", left: "82%" },
];

// ── Scattered positions matching the screenshot layout ──
const locationsPhone = [
  { city: "Brooklyn/boro park", stores: 43, top: "6%", left: "2%" },
  { city: "Queens", stores: 63, top: "4%", left: "42%" },
  // { city: "Staten Island", stores: 23, top: "3%", left: "43%" },
  { city: "Five towns", stores: 73, top: "0%", left: "70%" },
  // { city: "Hollywood", stores: 115, top: "5%", left: "75%" },
  { city: "Far Rockaway", stores: 43, top: "30%", left: "4%" },
  { city: "Riverdale", stores: 133, top: "20%", left: "29%" },
  { city: "Cleveland", stores: 45, top: "29%", left: "60%" },
  { city: "Houston", stores: 32, top: "15%", left: "64%" },
  // { city: "Baltimore", stores: 43, top: "24%", left: "85%" },
  { city: "Chicago", stores: 102, top: "48%", left: "2%" },
  { city: "Lakewood", stores: 43, top: "38%", left: "34%" },
  // { city: "Monsey", stores: 93, top: "46%", left: "40%" },
  { city: "Jackson", stores: 163, top: "45%", left: "68%" },
  // { city: "Tom's river", stores: 43, top: "44%", left: "76%" },
  { city: "Teaneck", stores: 43, top: "65%", left: "10%" },
  { city: "Detroit", stores: 43, top: "55%", left: "34%" },
  { city: "Los Angeles", stores: 43, top: "70%", left: "40%" },
  { city: "Montreal", stores: 43, top: "59%", left: "68%" },
  // { city: "Edison", stores: 103, top: "70%", left: "88%" },
  { city: "Manhattan", stores: 123, top: "82%", left: "12%" },
  { city: "Passaic", stores: 63, top: "86%", left: "42%" },
  { city: "Boca", stores: 57, top: "76%", left: "68%" },
  // { city: "Miami", stores: 68, top: "95%", left: "82%" },
];

function LocationCard({ city, stores, top, left, delay, duration }) {
  return (
    <Link
      to="/all-categories"
      className="absolute bg-white rounded-xl shadow-sm border border-gray-100 px-3 py-2.5 animate-float hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
      style={{
        top,
        left,
        animationDelay: delay,
        animationDuration: duration,
        minWidth: "110px",
        maxWidth: "155px",
      }}
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <div className="-top-10 absolute text-primary flex items-center justify-center">
          <IoGiftOutline size={28} />
        </div>
        <p className="text-sm xl:text-base font-bold text-[#085027] leading-tight">
          {city}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{stores} Store</p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative w-full overflow-hidden font-inter">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt=""
          className="w-full h-full object-cover opacity-10 sm:opacity-15 md:opacity-40"
          draggable={false}
        />
      </div>

      {/* ══════════ LARGE SCREEN ══════════ */}
      <div className="hidden sm:flex relative z-10 w-10/12 mx-auto py-16 items-start justify-between gap-8">
        {/* LEFT */}
        <div className="w-[30%] flex-shrink-0 flex flex-col items-start pt-4">
          <div className="inline-flex items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-4 py-1.5 text-sm font-medium text-[#085027] mb-6">
            <LuShieldCheck size={14} />
            The Premier Jewish Directory
          </div>
          <h1 className="lg:text-7xl xl:text-9xl text-[#085027] mb-5 font-bebas tracking-widest leading-none">
            MATANA
          </h1>
          <div className="w-full max-w-[300px] flex items-center gap-4 mb-5">
            <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
            <IoGiftOutline size={28} color="#085027" />
            <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
          </div>
          <h2 className="text-5xl font-playfair font-bold text-[#085027] leading-tight mb-5">
            Stop Guessing.
            <br />
            Start Gifting.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Find the perfect gift in the perfect place.
          </p>
        </div>

        {/* RIGHT — absolutely scattered cards */}
        <div className="flex-1 relative" style={{ height: "560px" }}>
          {locations.map((loc, i) => (
            <LocationCard
              key={i}
              city={loc.city}
              stores={loc.stores}
              top={loc.top}
              left={loc.left}
              delay={`${(i * 0.15).toFixed(2)}s`}
              duration={`${5.5 + (i % 5) * 0.4}s`}
            />
          ))}
        </div>
      </div>

      {/* ══════════ MOBILE / TABLET ══════════ */}
      <div className="sm:hidden relative z-10">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          draggable={false}
        />
        {/* Top: Left text */}
        <div className="w-11/12 mx-auto pt-10 pb-6 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-3 py-1.5 text-xs font-medium text-[#085027] mb-5">
            <LuShieldCheck size={12} />
            The Premier Jewish Directory
          </div>
          <h1 className="text-5xl sm:text-6xl text-[#085027] mb-4 font-bebas tracking-widest leading-none">
            MATANA
          </h1>
          <div className="w-full max-w-[240px] flex items-center gap-3 mb-4">
            <div className="flex-1 h-[1px] bg-[#085027]/30" />
            <IoGiftOutline size={20} color="#085027" />
            <div className="flex-1 h-[1px] bg-[#085027]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-[#085027] leading-tight mb-4">
            Stop Guessing.
            <br />
            Start Gifting.
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Find the perfect gift in the perfect place.
          </p>
        </div>

        {/* Bottom: scattered cards on map */}
        <div className="relative w-full" style={{ height: "660px" }}>

          <div className="absolute inset-0 bg-[#f5f3ee]/20" />
          {locationsPhone.map((loc, i) => (
            <LocationCard
              key={i}
              city={loc.city}
              stores={loc.stores}
              top={loc.top}
              left={loc.left}
              delay={`${(i * 0.15).toFixed(2)}s`}
              duration={`${5.5 + (i % 5) * 0.4}s`}
            />
          ))}
        </div>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
