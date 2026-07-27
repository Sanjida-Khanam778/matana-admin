import { useEffect, useState } from "react";
import stat1 from "../../assets/icons/stat1.png";
import stat2 from "../../assets/icons/stat2.png";
import stat3 from "../../assets/icons/stat1.png";
import { useGetStatsQuery } from "../../Api/businessDirectoryApi";

export default function StatsBar() {
  const [isMobile, setIsMobile] = useState(false);
  const { data: stats } = useGetStatsQuery();

  const statsData = [
    {
      value: stats?.total_users !== undefined ? `${stats?.total_users}+` : "100+",
      label: "HAPPY USERS",
      description: "A trusted network of local businesses & services.",
      theme: "light-green",
      icon: stat1,
    },
    {
      value: stats?.total_businesses !== undefined ? `${stats?.total_businesses}+` : "50+",
      label: "Businesses",
      description: "Featuring your Favorite local shops and services.",
      theme: "cream-green",
      icon: stat2,
    },
    {
      value: stats?.total_locations !== undefined ? `${stats?.total_locations}+` : "20+",
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


  return (
    <section className="w-full bg-[#FAF5ED] pt-8 md:pt-10 xl:pt-12 font-inter">
      <div className="w-11/12 sm:max-w-4xl mx-auto">
 

        <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5 transition-all duration-300">
          {statsData.map((stat, i) => {
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
                } rounded-tl-[16px] sm:w-auto mx-auto rounded-br-[16px] md:rounded-tl-[40px] md:rounded-br-[40px] rounded-tr-lg rounded-bl-lg p-1 sm:p-5 md:p-6 flex flex-col items-center md:items-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="rounded-full flex items-center justify-center relative top-1 sm:-left-4">
                  <img
                    src={stat.icon}
                    alt="icon"
                    className="w-12 h-12 sm:w-auto sm:h-auto"
                  />
                </div>

                <h3
                  className={`text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1 ${
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
                  className={`text-[9px] sm:text-sm leading-relaxed text-center md:text-left ${
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
              
            />
          ))}
        </div>
      </div>
    </section>
  );
}
