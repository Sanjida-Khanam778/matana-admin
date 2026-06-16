function MatanaLogo() {
  return (
    <div className="w-24 h-24 bg-[#8aaa8a] flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 64 64" width="68" height="68" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 24 C22 16 42 16 42 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        <rect x="14" y="24" width="36" height="26" rx="3" fill="none" stroke="white" strokeWidth="2.2"/>
        <text x="32" y="38" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="serif" letterSpacing="1.5">MATANA</text>
        <line x1="18" y1="42" x2="46" y2="42" stroke="white" strokeWidth="0.8"/>
        <text x="32" y="46.5" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="serif" letterSpacing="0.8">DIRECTORY</text>
      </svg>
    </div>
  );
}

const links = {
  Browse: ["All Businesses", "Categories", "Locations", "Featured"],
  Categories: ["Gift Shops", "Event Planning"],
  Company: ["About MATANA", "List Your Business", "Contact Us", "Privacy Policy"],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a4030]">
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-6">

        {/* Top row */}
        <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-10 mb-10">

          {/* Logo + tagline */}
          <div>
            <MatanaLogo />
            <p className="text-white/70 text-xs leading-relaxed mt-4">
              Connecting Jewish communities with trusted businesses.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white font-semibold text-sm mb-5">{heading}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/65 text-sm hover:text-white transition-colors"
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
        <div className="border-t border-white/15 pt-5">
          <p className="text-center text-white/50 text-xs">
            © 2026 MATANA. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}