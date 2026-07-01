import stat1 from "../../assets/icons/stat1.png";
import stat2 from "../../assets/icons/stat2.png";
import stat3 from "../../assets/icons/stat1.png";
export default function StatsBar() {
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

  return (
    <section className="w-full bg-[#FBF5ED] pt-8 md:pt-10 xl:pt-12 font-inter">
      <div className="w-11/12 sm:max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5">
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
                key={i}
                className={`${cardBg} ${
                  isDark ? "shadow-xl" : "shadow-md"
                } rounded-tl-[24px] rounded-br-[24px] md:rounded-tl-[40px] md:rounded-br-[40px] rounded-tr-lg rounded-bl-lg p-3 sm:p-5 md:p-6 flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Icon wrapper */}
                <div
                  className={`rounded-full flex items-center justify-center relative -left-4`}
                >
                  {typeof stat.icon === "string" ? (
                    <img
                      src={stat.icon}
                      alt="icon"
                      className="w-6 h-6 sm:w-auto sm:h-auto"
                    />
                  ) : (
                    stat.icon
                  )}
                </div>

                {/* Content */}
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
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? "text-white/80" : "text-[#085027]/80"
                  }`}
                >
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
