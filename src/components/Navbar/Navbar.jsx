import { useState } from "react";
import logo from "../../assets/images/logo.png"
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const NAV_LINKS = ["Home", "Location", "About", "Contact"];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");

  return (
    <nav className="w-full bg-[#F6F4F1] border-b border-gray-200/60 py-4">
      <div className="w-10/12 flex items-center justify-between mx-auto">

        {/* Logo */}
<img src={logo} className="w-24 h-auto object-contain" alt="" />
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`text-sm font-medium transition-colors ${active === link ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          {/* Search — grows to fill space */}
          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2.5 shadow-sm mx-4">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>

          {/* CTA Button */}
          <button className="flex-shrink-0 bg-[#085027] hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
            List Your Business
          </button>
        </div>
      </div>
    </nav>
  );
}