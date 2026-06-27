import { useState } from "react";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
  IoArrowForwardOutline,
} from "react-icons/io5";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

// ── Data ───
const community = {
  district: "New York City District",
  name: "Brooklyn, NY",
  businesses: 342,
  featured: 12,
  rating: 4.8,
  coverImage:
    "https://images.unsplash.com/photo-1546436836-07a91091f160?w=900&q=80",
};

const categories = [
  "All Categories",
  "Cafe & Roastery",
  "Modern Kitchen",
  "Luxury Retail",
  "Wellness Center",
  "Artisan Bakery",
  "Creative Agency",
  "Judaica",
  "Gift Shops",
];

const businesses = [
  {
    id: 1,
    tag: "CAFE & ROASTERY",
    name: "Brooklyn Brew Lab",
    desc: "Artisanal coffee sourced from sustainable farms, roasted daily in the heart of...",
    address: "142 Berry St, Brooklyn",
    rating: null,
    badge: "FEATURED",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80",
  },
  {
    id: 2,
    tag: "MODERN KITCHEN",
    name: "The Slate Table",
    desc: "Elevated seasonal cuisine focusing on local farm-to-table ingredients with a modern...",
    address: "89 Atlantic Ave, Brooklyn",
    rating: 4.7,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  },
  {
    id: 3,
    tag: "LUXURY RETAIL",
    name: "Indigo & Iron",
    desc: "A curated collection of sustainable fashion and unique home goods from local...",
    address: "312 Wythe Ave, Brooklyn",
    rating: 4.8,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80",
  },
  {
    id: 4,
    tag: "WELLNESS CENTER",
    name: "Zenith Space",
    desc: "Holistic wellness studio offering yoga, meditation, and community health...",
    address: "250 Flatbush Ave, Brooklyn",
    rating: 4.6,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80",
  },
  {
    id: 5,
    tag: "ARTISAN BAKERY",
    name: "Crust & Crumb",
    desc: "Specializing in ancient grains and slow-fermented sourdoughs, baked fresh every...",
    address: "15 Prospect Park W, Brooklyn",
    rating: null,
    badge: "FEATURED",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80",
  },
  {
    id: 6,
    tag: "CREATIVE AGENCY",
    name: "Form & Flow Studios",
    desc: "Full-service design and architectural firm focused on sustainable urban development...",
    address: "55 Water St, Brooklyn",
    rating: 4.8,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
  },
];

const TOTAL_PAGES = 4;

// ── Components ───
// function RatingBadge({ rating }) {
//   return (
//     <div className="flex items-center gap-1 bg-white/95 text-gray-800 text-[11px] font-bold px-2 py-1 rounded-full shadow-sm">
//       <FaStar size={9} color="#f59e0b" />
//       {rating}
//     </div>
//   );
// }

function FeaturedBadge() {
  return (
    <div className="flex items-center gap-1 bg-[#f59e0b] text-white text-xs px-2.5 py-1 rounded-full shadow-sm tracking-wide">
      <FaStar size={12} color="white" />
      Featured
    </div>
  );
}

function BusinessCard({ business, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
        />
        {/* Top badge */}
        <div className="absolute top-3 left-3">
          {business.badge === "FEATURED" && <FeaturedBadge />}
        </div>
        {/* {business.rating && (
          <div className="absolute top-3 right-3">
            <RatingBadge rating={business.rating} />
          </div>
        )} */}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold tracking-widest text-[#855300] uppercase mb-1">
          {business.tag}
        </p>
        <h3 className="text-sm lg:text-base xl:text-lg font-bold text-gray-900 mb-2 leading-snug">
          {business.name}
        </h3>
        <p className="text-xs lg:text-sm text-gray-500 leading-relaxed flex-1 mb-3">
          {business.desc}
        </p>

        {/* Address + Arrow */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-900">
            <CiLocationArrow1 size={18} />
            <span>{business.address}</span>
          </div>
          <div className="w-9 h-9 rounded-full border border-gray flex items-center justify-center group-hover:bg-[#085027] group-hover:border-[#085027] transition-colors">
            <IoArrowForwardOutline
              size={19}
              className="text-gray-900 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────
export default function AllCommunity() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [category, setCategory] = useState("All Categories");
  const [catOpen, setCatOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [selCats, setSelCats] = useState(["All Categories"]);
  const [selLocs, setSelLocs] = useState([community.name]);
  const [selLevels, setSelLevels] = useState([]);
  const [selOccasions, setSelOccasions] = useState([]);
  const [selTov, setSelTov] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openBusinessDetails = (business) => {
    navigate(`/community-details/${business.id}`, {
      state: { business },
    });
  };
  function toggle(arr, setArr, val) {
    setArr((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));
  }

  return (
    <div className="font-inter min-h-screen bg-[#f8f7f3] flex w-full justify-center">
      <div className="flex flex-col lg:flex-row w-full lg:w-11/12 xl:w-10/12 mx-auto my-4 lg:my-10 px-4 lg:px-0">
        {/* ── Sidebar ── */}
        <SidebarFilter
          selectedCategories={selCats}
          onToggleCategory={(v) => toggle(selCats, setSelCats, v)}
          selectedLocations={selLocs}
          onToggleLocation={(v) => toggle(selLocs, setSelLocs, v)}
          selectedKosherLevels={selLevels}
          onToggleKosherLevel={(v) => toggle(selLevels, setSelLevels, v)}
          selectedOccasions={selOccasions}
          onToggleOccasion={(v) => toggle(selOccasions, setSelOccasions, v)}
          selectedTov={selTov}
          onToggleTov={(v) => toggle(selTov, setSelTov, v)}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
        <div className="flex-1 w-full min-w-0">
          {/* ── Cover ── */}
          <div className="relative w-full rounded-2xl overflow-hidden h-[380px] sm:h-[320px] shadow-sm">
            <img
              src={community.coverImage}
              alt={community.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="flex items-center px-4 sm:px-6 gap-1.5 text-white/70 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest mb-1">
                <IoLocationOutline size={18} color="#f59e0b" />
                {community.district}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 px-4 sm:px-6">
                {community.name}
              </h1>
              <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 mb-4">
                <div>
                  <p className="text-white text-base sm:text-lg font-bold leading-none">
                    {community.businesses}
                  </p>
                  <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                    Businesses
                  </p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div>
                  <p className="text-white text-base sm:text-lg font-bold leading-none">
                    {community.featured}
                  </p>
                  <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                    Featured
                  </p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                {/* <div className="">
                <div className="flex items-center gap-1.5">
                    <p className="text-white text-base sm:text-lg font-bold leading-none">
                    {community.rating}
                  </p>
                  <FaStar size={13} color="#f59e0b" />
                </div>
                  <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-wider">
                   average Rating
                  </p>
                </div> */}
              </div>
              {/* ── Search bar ── */}
              <div className="bg-white px-4 sm:px-5 w-full py-4 shadow-sm rounded-2xl border">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto">
                  {/* Search input */}
                  <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 bg-white hover:border-gray-300 transition-colors">
                    <IoSearchOutline size={16} color="#9ca3af" />
                    <input
                      type="text"
                      placeholder={`What are you looking for in ${community.name.split(",")[0]}?`}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                    />
                  </div>

                  {/* Category dropdown & Filter Toggle & Find Local button */}
                  <div className="flex items-center gap-2 sm:contents">
                    {/* Filters Toggle Button for mobile/tablet */}
                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden flex items-center justify-center gap-1.5 border border-gray-200 rounded-full px-3.5 py-2.5 text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                      <span>Filters</span>
                    </button>

                    {/* Category dropdown */}
                    <div className="relative flex-1 sm:flex-initial">
                      <button
                        onClick={() => setCatOpen((v) => !v)}
                        className="w-full flex items-center justify-between sm:justify-start gap-2 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap"
                      >
                        <span className="truncate max-w-[120px] sm:max-w-none">{category}</span>
                        <IoChevronDown
                          size={14}
                          className={`transition-transform flex-shrink-0 ${catOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {catOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden">
                          {categories.map((c) => (
                            <button
                              key={c}
                              onClick={() => {
                                setCategory(c);
                                setCatOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${category === c ? "text-[#085027] font-semibold" : "text-gray-600"}`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Find Local button */}
                    <button className="flex-1 hidden md:block sm:flex-initial bg-[#085027] hover:bg-[#063d1e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                      Find Local
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content Layout ── */}
          <div className="my-6 lg:my-10 pb-12">
            {/* ── Main Content ── */}
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {businesses.map((b) => (
                  <BusinessCard
                    key={b.id}
                    business={b}
                    onClick={() => openBusinessDetails(b)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <IoChevronBack size={14} color="#374151" />
                </button>

                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${page === i + 1
                        ? "bg-[#085027] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <IoChevronForward size={14} color="#374151" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
