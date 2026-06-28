import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MatanaLogo from "../../assets/images/logoFooter.svg";
import ListBusinessModal from "../Modals/ListBusinessModal";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Scroll to a section on the home page
  function scrollToSection(sectionId) {
    const scrollTo = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // If not on home page, navigate first then scroll
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollTo, 300);
    } else {
      scrollTo();
    }
  }

  return (
    <>
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

            {/* Browse Column */}
            <div>
              <p className="text-white font-semibold text-base lg:text-lg mb-4 sm:mb-5">
                Browse
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    to="/all-categories"
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    All Businesses
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection("categories")}

                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("community")}
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors text-left"
                  >
                    Locations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("featured")}
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    Featured
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories Column */}
            <div>
              <p className="text-white font-semibold text-base lg:text-lg mb-4 sm:mb-5">
                Categories
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    to="/all-categories"
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    Gift Shops
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-community"
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <p className="text-white font-semibold text-base lg:text-lg mb-4 sm:mb-5">
                Company
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors text-left"
                  >
                    About MATANA
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors text-left"
                  >
                    List Your Business
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/80 text-xs sm:text-sm lg:text-base hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-4 sm:pt-5">
            <p className="text-center text-white/80 text-xs sm:text-sm lg:text-base">
              © 2026 MATANA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* List Business Modal */}
      {showModal && <ListBusinessModal onClose={() => setShowModal(false)} />}
    </>
  );
}
