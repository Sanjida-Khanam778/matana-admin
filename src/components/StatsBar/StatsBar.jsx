export default function StatsBar() {
  const statsData = [
    {
      value: "10,000+",
      label: "HAPPY USERS",
      description:
        "A trusted community network connecting daily users with premium Jewish-owned businesses and services across the region.",
      theme: "light-green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#085027]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      value: "500+",
      label: "PHYSICAL STORES",
      description:
        "An extensive directory featuring verified local shops, kosher markets, and essential Gift stores near you",
      theme: "cream-green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-[#085027]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m2 7 4.41-3.67A2 2 0 0 1 7.7 3h8.6a2 2 0 0 1 1.3.33L22 7" />
          <path d="M4 12V9" />
          <path d="M12 12V9" />
          <path d="M20 12V9" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M9 16a3 3 0 0 0 6 0" />
        </svg>
      ),
    },
    {
      value: "20+",
      label: "KEY LOCATIONS",
      description:
        "Strategically mapped across key major states and vibrant local neighborhoods to bring the best options to your doorstep.",
      theme: "dark-green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#FBF5ED] py-8 md:py-10 xl:py-12 font-inter">
      <div className="w-11/12 sm:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {statsData.map((stat, i) => {
            const isDark = stat.theme === "dark-green";
            const cardBg =
              stat.theme === "light-green"
                ? "bg-gradient-to-br from-[#E2EFE4] to-[#C9E2CD]"
                : stat.theme === "cream-green"
                  ? "bg-gradient-to-br from-[#F5EEDC] to-[#DCEAD2]"
                  : "bg-gradient-to-br from-[#1E5631] to-[#0D381E]";

            return (
              <div
                key={i}
                className={`${cardBg} ${
                  isDark ? "shadow-xl" : "shadow-md"
                } rounded-tl-[24px] rounded-br-[24px] md:rounded-tl-[40px] md:rounded-br-[40px] rounded-tr-lg rounded-bl-lg p-3 sm:p-5 md:p-6 flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-1`}
              >
                {/* Icon wrapper */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 md:mb-4 ${
                    isDark
                      ? "bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "bg-white/70 border border-white shadow-sm"
                  }`}
                >
                  {stat.icon}
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
