import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ListBusinessModal from "../Modals/ListBusinessModal";

// ── Icons ──
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// label → { route: string | null, sectionId: string | null }
const NAV_CONFIG = [
  { label: "Home", route: "/", sectionId: null },
  { label: "Locations", route: "/", sectionId: "community" },
  { label: "About", route: "/", sectionId: "about" },
  { label: "Contact", route: "/", sectionId: "contact" },
];

// ── Navbar ──
export default function Navbar() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleNav(item) {
    setActive(item.label);
    setMobileMenuOpen(false); // Close mobile menu after navigation
    if (!item.sectionId) {
      navigate(item.route);
      return;
    }
    const scrollToSection = () => {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== item.route) {
      navigate(item.route);
      setTimeout(scrollToSection, 300);
    } else {
      scrollToSection();
    }
  }

  return (
    <>
      <nav
        className={`w-full relative z-50 py-3 md:py-4 ${location.pathname === "/" ? "bg-transparent" : "bg-[#f8f7f3]"}`}
      >
        <div className="w-full w-11/12 lg:w-10/12 mx-auto px-4 md:px-8 lg:px-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={"/"} className="flex-shrink-0">
              <img
                src={logo}
                className="h-20 md:h-24 lg:h-32 xl:h-auto object-contain"
                alt="Matana"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_CONFIG.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className={`font-medium text-sm lg:text-base transition-colors whitespace-nowrap ${active === item.label ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Search & CTA */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 lg:px-4 py-2 shadow-sm">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-xs lg:text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none w-32 lg:w-40"
                />
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex-shrink-0 bg-[#085027] hover:bg-teal-900 text-white text-xs lg:text-sm font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full transition-colors whitespace-nowrap"
              >
                List Your Business
              </button>
            </div>

            {/* Mobile: Hamburger Menu */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200/60 pt-4">
              <div className="space-y-3 mb-4">
                {NAV_CONFIG.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active === item.label ? "bg-[#085027] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Search Bar */}
              <div className="mb-4">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 shadow-sm">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none flex-1"
                  />
                </div>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setShowModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#085027] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              >
                List Your Business
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Modal */}
      {showModal && <ListBusinessModal onClose={() => setShowModal(false)} />}
    </>
  );
}
