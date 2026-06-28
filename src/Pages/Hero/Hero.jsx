import { useState, useEffect } from "react";
import bg from "../../assets/images/hero-bg.png";
import map from "../../assets/images/map.png";
import { LuShieldCheck } from "react-icons/lu";
import { IoGiftOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ListBusinessModal from "../../components/Modals/ListBusinessModal";

// ── Scattered positions matching the screenshot layout ──
const locations = [
  { city: "Toronto", stores: 63, top: "0%", left: "80%" },
  { city: "Monsey", stores: 93, top: "20%", left: "70%" },
  { city: "Lakewood", stores: 43, top: "20%", left: "90%" },
  { city: "Brooklyn/boro park", stores: 43, top: "40%", left: "82%" },
  { city: "Cleveland", stores: 45, top: "60%", left: "72%" },
  { city: "Passaic", stores: 43, top: "60%", left: "94%" },
  { city: "Five towns", stores: 73, top: "80%", left: "85%" },

];

const locationsPhone = [
  { city: "Toronto", stores: 63, top: "0%", left: "50%" },
  { city: "Monsey", stores: 93, top: "12%", left: "30%" },
  { city: "Lakewood", stores: 43, top: "25%", left: "50%" },
  { city: "Brooklyn", stores: 43, top: "38%", left: "20%" },
  { city: "Cleveland", stores: 45, top: "52%", left: "52%" },
  { city: "Passaic", stores: 43, top: "65%", left: "32%" },
  { city: "Five towns", stores: 73, top: "80%", left: "50%" },
];

function LocationCard({ city, stores, top, left, delay, duration }) {
  return (
    <Link
      to="/all-community"
      className="absolute w-fit bg-white rounded-md sm:rounded-lg lg:rounded-xl shadow-sm border border-gray-100 px-3 py-1 sm:py-2 animate-float hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
      style={{
        top,
        left,
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <div className="-top-5 sm:-top-10 -left-6 sm:-left-9 absolute text-primary">
          {/* <IoGiftOutline size={28} /> */}
          <img src={map} className="w-6 sm:w-10" alt="" />
        </div>
        <p className="text-[10px] sm:text-sm xl:text-base font-bold text-[#085027]">
          {city}
        </p>
        <p className="text-[8px] sm:text-xs text-gray-400 mt-0 sm:mt-0.5">{stores} Stores</p>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative w-full overflow-hidden font-inter" >
      {/* Background Map — anchored to top */}
      <Navbar />

      <div className="absolute inset-0 z-0">
        <img
          src={bg}
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>
      {/* ══════════ LARGE SCREEN ══════════ */}
      <div className="hidden md:flex relative z-10 mx-auto py-16">
        <div className="md:flex w-full sm:w-10/12 mx-auto items-start justify-between">
          {/* LEFT */}
          <div className="w-[30%] flex-shrink-0 flex flex-col items-start pt-4">
            <div className="inline-flex w-fit items-center gap-2 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-4 py-1.5 text-sm font-medium text-[#085027] mb-6">
              <LuShieldCheck size={18} />
              The Premier Jewish Directory
            </div>
            <h2 className="text-5xl xl:text-7xl font-playfair font-bold text-[#085027] xl:leading-tight mb-5">
              One Place, Endless Possibilities.
            </h2>
            <p className="text-lg text-[#0E3D2BCC] leading-relaxed">
              Find the perfect gift in the perfect place.
            </p>
            <div className="w-full max-w-[400px] flex items-center gap-4 mt-5">
              <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
              <IoGiftOutline size={32} color="#085027" />
              <div className="flex-1 h-[1.5px] bg-[#085027]/30" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-5 w-52">
              <button
                onClick={() => navigate("/all-categories")}
                className="flex-shrink-0 bg-[#085027] xl:text-lg w-full hover:bg-teal-900 text-white text-xs lg:text-sm font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full transition-colors whitespace-nowrap"
              >
                Explore Stores
              </button>
              <button
                onClick={() => navigate("/all-community")}
                className="flex-shrink-0 xl:text-lg border border-[#085027]/20 w-full bg-[#085027]/5 text-[#0E3D2B] text-xs lg:text-sm font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full transition-colors whitespace-nowrap"
              >
                Browse Locations
              </button>
            </div>
          </div>

          {/* RIGHT — absolutely scattered cards */}
          <div className="flex-1 relative mr-12" style={{ height: "560px" }}>
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
      </div>

      {/* ══════════ MOBILE ══════════ */}
      <div className="md:hidden relative z-10 flex" style={{ minHeight: "calc(60vh - 64px)" }}>
        {/* LEFT — text */}
        <div className="flex-1 flex-shrink-0 flex flex-col justify-start pt-6 pl-4 pr-2">
          <div className="inline-flex items-center gap-1.5 border border-[#085027]/20 bg-[#085027]/5 rounded-full px-2.5 py-1 text-[10px] font-medium text-[#085027] mb-4">
            <LuShieldCheck size={10} />
            The Premier Jewish Directory
          </div>
          <h2 className="text-2xl font-playfair font-bold text-[#085027] leading-tight mb-3">
            One Place,<br />Endless<br />Possibilities.
          </h2>
          <p className="text-xs text-[#0E3D2BCC] leading-relaxed mb-4">
            Find the perfect gift in the perfect place.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-[1px] bg-[#085027]/30" />
            <IoGiftOutline size={16} color="#085027" />
            <div className="flex-1 h-[1px] bg-[#085027]/30" />
          </div>
          <button
            onClick={() => navigate("/all-categories")} className="bg-[#085027] text-white text-xs font-medium px-4 py-2 rounded-full transition-colors mb-2 w-full"
          >
            Explore Stores
          </button>
          <button
            onClick={() => navigate("/all-community")}
            className="border border-[#085027]/30 bg-[#085027]/5 text-[#0E3D2B] text-xs font-medium px-4 py-2 rounded-full transition-colors w-full"
          >
            Browse Locations
          </button>
        </div>

        {/* RIGHT — scattered cards on map */}
        <div className="flex-1 relative">
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
      {showModal && <ListBusinessModal onClose={() => setShowModal(false)} />}
    </section>
  );
}