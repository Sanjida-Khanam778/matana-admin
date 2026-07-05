import { useEffect, useState } from "react";
import stat1 from "../../assets/icons/stat1.png";
import stat2 from "../../assets/icons/stat2.png";
import stat3 from "../../assets/icons/stat1.png";
import { FaArrowLeft } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function StatsBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const statsData = [
    {
      value: "10,000+",
      label: "HAPPY USERS",
      description: "A trusted network of local businesses & services.",
      theme: "light-green",
      icon: stat1,
    },
    {
      value: "500+",
      label: "Businesses",
      description: "Featuring your Favorite local shops and services.",
      theme: "cream-green",
      icon: stat2,
    },
    {
      value: "20+",
      label: "Locations",
      description:
        "Serving all Jewish Communities throughout the U.S. and Canada",
      theme: "dark-green",
      icon: stat3,
    },
  ];

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 640);
    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const cardsPerView = isMobile ? 1 : 3;
  const visibleStats = statsData.slice(activeIndex, activeIndex + cardsPerView);
  const showPrev = activeIndex > 0;
  const showNext = activeIndex + cardsPerView < statsData.length;

  return (
    <section className="w-full bg-[#FBF5ED] pt-8 md:pt-10 xl:pt-12 font-inter">
      <div className="w-11/12 sm:max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div />
          <div className="flex justify-center items-center sm:hidden gap-2">
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={!showPrev}
              className={`h-8 w-8 rounded-full border border-[#085027]/20 text-[#085027] text-center flex items-center justify-center transition ${
                showPrev ? "hover:bg-[#085027] hover:text-white" : "opacity-40 cursor-not-allowed"
              }`}
            >
              <MdArrowForwardIos className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => prev + 1)}
              disabled={!showNext}
              className={`h-8 w-8 rounded-full border border-[#085027]/20 text-[#085027] flex items-center justify-center transition ${
                showNext ? "hover:bg-[#085027] hover:text-white" : "opacity-40 cursor-not-allowed"
              }`}
            >
             <MdArrowForwardIos />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-5 transition-all duration-300">
          {visibleStats.map((stat, i) => {
            const isDark = stat.theme === "dark-green";
            const cardBg =
              stat.theme === "light-green"
                ? "bg-gradient-to-br from-[#DEE9BC] to-[#D3E2D1]"
                : stat.theme === "cream-green"
                  ? "bg-gradient-to-br from-[#FAF1D2] to-[#B3D095]"
                  : "bg-gradient-to-br from-[#2E7647] to-[#1A3C26]";

            return (
              <div
                key={`${stat.label}-${i}`}
                className={`${cardBg} ${
                  isDark ? "shadow-xl" : "shadow-md"
                } rounded-tl-[24px] w-52 sm:w-auto mx-auto rounded-br-[24px] md:rounded-tl-[40px] md:rounded-br-[40px] rounded-tr-lg rounded-bl-lg p-3 sm:p-5 md:p-6 flex flex-col items-center md:items-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="rounded-full flex items-center justify-center relative -left-2 sm:-left-4">
                  <img
                    src={stat.icon}
                    alt="icon"
                    className="w-12 h-12 sm:w-auto sm:h-auto"
                  />
                </div>

                <h3
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 ${
                    isDark ? "text-white" : "text-[#085027]"
                  }`}
                >
                  {stat.value}
                </h3>
                <p
                  className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1 sm:mb-2 ${
                    isDark ? "text-white/90" : "text-[#085027]"
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed text-center md:text-left ${
                    isDark ? "text-white/80" : "text-[#085027]/80"
                  }`}
                >
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {statsData.map((stat, index) => (
            <button
              key={`${stat.label}-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? "bg-[#085027]" : "bg-[#085027]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
