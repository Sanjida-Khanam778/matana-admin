import { useState } from "react";
import BusinessResults from "../Businessresults/Businessresults";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import { FaStar } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { IoChevronForwardSharp, IoLocationOutline } from "react-icons/io5";

// ── Data ───────────────────────────────────────────
const venues = [
    {
        id: 1,
        name: "Grand Simcha Hall",
        description: "Brooklyn's premier kosher event venue for weddings, bar/bat mitzvahs, and simchas.",
        address: "123 Main Street, Brooklyn, NY 11230",
        rating: 4.9,
        reviews: 324,
        phone: "(718) 555-0123",
        certifications: ["OU", "Vaad"],
        kosherCertified: true,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
    },
    {
        id: 2,
        name: "Kosher Delights Restaurant",
        description: "Upscale kosher dining with a modern twist. Fresh ingredients, traditional recipes, and contemporary.",
        address: "456 Oak Avenue, Lakewood, NJ 08701",
        rating: 4.8,
        reviews: 256,
        phone: "(732) 555-0458",
        certifications: ["OK", "Vaad"],
        kosherCertified: true,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    },
    {
        id: 3,
        name: "Modern Catering",
        description: "Exceptional kosher catering for all your special events. From intimate gatherings to grand.",
        address: "789 Cedar Lane, Queens, NY 11375",
        rating: 4.9,
        reviews: 189,
        phone: "(718) 555-0789",
        certifications: ["OU", "OK"],
        kosherCertified: false,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
    },
    {
        id: 4,
        name: "Modern Jewish Home",
        description: "Stylish and modern home decor with a Jewish touch. Transform your space with our curated.",
        address: "321 Elm Street, Brooklyn, NY 11204",
        rating: 4.7,
        reviews: 412,
        phone: "(718) 555-0321",
        certifications: ["Certified"],
        kosherCertified: false,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
    },
    {
        id: 5,
        name: "Royal Vault Cafe",
        description: "Experience fine dining with authentic kosher cuisine in an elegant setting.",
        address: "555 Main Ave, Queens, NY 11375",
        rating: 4.8,
        reviews: 298,
        phone: "(718) 555-0555",
        certifications: ["OU", "OK"],
        kosherCertified: true,
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&q=80",
    },
    {
        id: 6,
        name: "Celebration Events",
        description: "Full-service event planning and coordination for all your special occasions.",
        address: "888 Party Lane, Miami, FL 33101",
        rating: 4.9,
        reviews: 176,
        phone: "(305) 555-0888",
        certifications: ["Certified"],
        kosherCertified: true,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&q=80",
    },
];

const ITEMS_PER_PAGE = 9;
const TOTAL_PAGES = 3;

// ── Icons ──────────────────────────────────────────
function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}


// ── Grid Card ──────────────────────────────────────
function GridCard({ name, count, image, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group bg-white p-4 relative overflow-hidden border border-gray-100/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left border line drawing */}
      <div
        className="absolute top-0 left-0 w-[1.5px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          height: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0s" : "0.3s"
        }}
      />

      {/* Bottom border line drawing */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          width: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0.3s" : "0s"
        }}
      />

      {/* Image */}
      <div className="rounded-2xl overflow-hidden mb-3 relative" style={{ height: "200px" }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>

      {/* Text */}
      <p className={`text-lg font-bold text-gray-900 leading-snug mb-0.5 transition-colors ${hovered ? "text-[#085027]" : ""}`}>
        {name}
      </p>
      <p className="text-gray-400">{count} businesses</p>
    </div>
  );
}

function CertBadge({ label }) {
    return (
        <span className="inline-flex items-center border border-gray-300 text-gray-600 bg-gray-100 text-sm font-semibold px-2 py-0.5 rounded-sm tracking-wide">
            {label}
        </span>
    );
}

function VenueCard({ venue }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
            {/* Image */}
            <div className="relative h-52 flex-shrink-0">
                <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                {venue.kosherCertified && (
                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#1a5c3a] text-white text-xs lg:text-sm font-semibold px-2.5 py-1 rounded-full">
                        <FaStar />
                        Kosher Certified
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1">
                {/* Name + description */}
                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug">{venue.name}</h3>
                <p className="text-gray-500 leading-relaxed mb-3 line-clamp-2">{venue.description}</p>

                {/* Address */}
                <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="mt-0.5 flex-shrink-0"><IoLocationOutline className="text-xl" /></span>
                    <span className=" text-gray-500">{venue.address}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5">
                    <FaStar className="text-yellow-500 mr-1.5" />
                    <span className=" font-semibold text-gray-800">{venue.rating}</span>
                    <span className=" text-gray-400">({venue.reviews} reviews)</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-1.5 mb-3">
                    <LuPhone className="mr-1" />
                    <span className="text-gray-500">{venue.phone}</span>
                </div>

                {/* Cert badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {venue.certifications.map((c) => (
                        <CertBadge key={c} label={c} />
                    ))}
                </div>

                {/* Call Now button — pushed to bottom */}
                <div className="mt-auto flex items-center gap-2">
                   
                    <button className="w-full flex items-center justify-between bg-primary hover:bg-[#155230] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
                    <span className="flex-1 text-center">Call Now</span>
                    </button>
                        <span className="w-10 h-10 rounded-full bg-white/20 border-2 flex items-center justify-center flex-shrink-0">
                            <IoChevronForwardSharp />
                        </span>
                </div>
            </div>
        </div>
    );
}
// ── Main Component ─────────────────────────────────
export default function AllEvents() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selCats, setSelCats] = useState(["Custom Baked Goods"]);
  const [selLocs, setSelLocs] = useState(["Brooklyn, NY"]);
  const [selLevels, setSelLevels] = useState(["Cholov Yisroel"]);
  const [page, setPage] = useState(2);

  function toggle(arr, setArr, val) {
    setArr((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">
      {/* Back button */}
      <div className="px-8 pt-6 pb-2">
        <button
          onClick={() => {
            if (selectedCategory) {
              setSelectedCategory(null);
            } else {
              window.history.back();
            }
          }}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon /> Back
        </button>
      </div>

      <div className="flex gap-0 px-8 pb-12">
        {/* ── Sidebar ── */}
        <SidebarFilter
          selectedCategories={selCats}
          onToggleCategory={(v) => toggle(selCats, setSelCats, v)}
          selectedLocations={selLocs}
          onToggleLocation={(v) => toggle(selLocs, setSelLocs, v)}
          selectedKosherLevels={selLevels}
          onToggleKosherLevel={(v) => toggle(selLevels, setSelLevels, v)}
        />

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {selectedCategory ? (
            <BusinessResults categoryName={selectedCategory} />
          ) : (
            <>
              {/* 3-col grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {venues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeftIcon />
                </button>

                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${page === n
                        ? "bg-[#085027] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronRightSmIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}