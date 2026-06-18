import MatanaLogo from "../../assets/images/logoFooter.png"

const links = {
  Browse: ["All Businesses", "Categories", "Locations", "Featured"],
  Categories: ["Gift Shops", "Event Planning"],
  Company: ["About MATANA", "List Your Business", "Contact Us", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E4D2B]">
      <div className="w-10/12 mx-auto px-8 pt-12 pb-6">

        {/* Top row */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-10 mb-8">

          {/* Logo + tagline */}
          <div>
            <img src={MatanaLogo} className="w-40" alt="" />
            <p className="text-white/70 text-xs lg:text-base leading-relaxed mt-4 lg:mt-8">
              Connecting Jewish communities with trusted businesses.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white font-semibold text-sm lg:text-lg mb-5">{heading}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/80 text-sm lg:text-base hover:text-white transition-colors"
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
        <div className="border-t border-white/10 pt-5">
          <p className="text-center text-white/80 text-sm lg:text-base">
            © 2026 MATANA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}