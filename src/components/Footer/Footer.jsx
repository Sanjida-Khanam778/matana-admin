import MatanaLogo from "../../assets/images/logoFooter.png";

const links = {
  Browse: ["All Businesses", "Categories", "Locations", "Featured"],
  Categories: ["Gift Shops", "Event Planning"],
  Company: [
    "About MATANA",
    "List Your Business",
    "Contact Us",
    "Privacy Policy",
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E4D2B]">
      <div className="w-10/12 mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Logo + tagline */}
          <div className="space-y-4">
            <img
              src={MatanaLogo}
              className="w-32 sm:w-36 h-auto object-contain"
              alt="Matana logo"
            />
            <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-3">
              Connecting Jewish communities with trusted businesses.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white font-semibold text-base lg:text-lg mb-4 sm:mb-5">
                {heading}
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-4 sm:pt-5">
          <p className="text-center text-white/80 text-xs sm:text-sm lg:text-base">
            © 2026 MATANA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
