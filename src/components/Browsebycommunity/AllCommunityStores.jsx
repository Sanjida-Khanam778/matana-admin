import { useState, useMemo, useEffect } from "react";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoChevronDown,
  IoChevronForward,
  IoChevronBack,
  IoArrowForwardOutline,
} from "react-icons/io5";
import BusinessResults from "../Businessresults/Businessresults";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import { ScrollRestoration, useNavigate, useLocation } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import {
  useFilterBusinessesQuery,
  useGetCategoriesQuery,
  useGetCommunitiesQuery,
  useRecordPageVisitMutation,
} from "../../Api/businessDirectoryApi";

const ITEMS_PER_PAGE = 6;

const DEFAULT_CATEGORIES = [
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
          src={business?.raw?.banner || business?.raw?.flyer_image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
        />
        {/* Top badge */}
        <div className="absolute top-3 left-3">
          {business.badge === "FEATURED" && <FeaturedBadge />}
        </div>
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
  const location = useLocation();

  // Get selected city from router state
  const communityState = location.state?.community;
  const selectedCity =
    communityState?.city || location.state?.cityName || location.state?.city || "Brooklyn";

  // Sidebar filters state
  const [selCats, setSelCats] = useState([]);
  const [selOccasions, setSelOccasions] = useState([]);
  const [selLocs, setSelLocs] = useState(selectedCity ? [selectedCity] : []);
  const [selServices, setSelServices] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      setSelLocs((prev) => (prev.includes(selectedCity) ? prev : [selectedCity]));
    }
  }, [selectedCity]);

  // Fetch filtered businesses using /api/business/filter/
  const filterArgs = {
    categories: selCats.join(","),
    occasions: selOccasions.join(","),
    locations: selLocs.map((loc) => (loc.includes(",") ? loc.split(",")[0].trim() : loc)).join(","),
    services_tags: selServices.join(","),
  };

  const { data: filterData, isLoading } = useFilterBusinessesQuery(filterArgs);

  // Fetch categories for dropdown filter
  const { data: categoriesApiData } = useGetCategoriesQuery();
  const categoriesList = useMemo(() => {
    if (categoriesApiData && categoriesApiData.length > 0) {
      return ["All Categories", ...categoriesApiData.map((c) => c.name)];
    }
    return DEFAULT_CATEGORIES;
  }, [categoriesApiData]);

  const [category, setCategory] = useState("All Categories");
  const [catOpen, setCatOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: communitiesData } = useGetCommunitiesQuery();

  // Show cover header ONLY if exactly 1 location is selected
  const showCoverHeader = selLocs.length === 1;
  const activeLocName = selLocs.length === 1 ? selLocs[0] : "";

  const matchedCommunity = useMemo(() => {
    if (!communitiesData || !activeLocName) return null;
    const clean = activeLocName.includes(",") ? activeLocName.split(",")[0].trim() : activeLocName.trim();
    return communitiesData.find(
      (c) =>
        c.name.toLowerCase() === clean.toLowerCase() ||
        `${c.name}, ${c.state}`.toLowerCase() === activeLocName.toLowerCase()
    );
  }, [communitiesData, activeLocName]);

  const communityName = matchedCommunity
    ? `${matchedCommunity.name}${matchedCommunity.state ? `, ${matchedCommunity.state}` : ""}`
    : activeLocName || selectedCity;

  const coverImage =
    matchedCommunity?.image ||
    communityState?.image ||
    "https://images.unsplash.com/photo-1546436836-07a91091f160?w=900&q=80";

  const businessCount = filterData?.count ?? matchedCommunity?.business_count ?? 0;
  const featuredCount = matchedCommunity?.featured_count ?? communityState?.featured ?? 0;

  // Map API businesses to UI representation
  const allBusinesses = useMemo(() => {
    const rawList = filterData?.businesses || [];
    return rawList.map((b) => ({
      id: b.id,
      tag: b.services_tags
        ? b.services_tags.split(",")[0].trim()
        : b.categories && b.categories.length > 0
        ? typeof b.categories[0] === "object"
          ? b.categories[0].name
          : `CATEGORY ${b.categories[0]}`
        : "STORE",
      name: b.name,
      desc: b.description || "",
      address:
        b.business_address ||
        (b.community ? `${b.community.name}, ${b.community.state}` : ""),
      rating: null,
      badge: b.is_featured ? "FEATURED" : null,
      image:
        b.banner ||
        b.flyer_image ||
        (b.photos && b.photos.length > 0 && typeof b.photos[0] === "string"
          ? b.photos[0]
          : "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80"),
      raw: b,
    }));
  }, [filterData]);

  const hasSidebarFilters = selCats.length > 0 || selLocs.length > 0 || selServices.length > 0;

  // Filter businesses by search input & dropdown category
  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((b) => {
      const matchSearch =
        !search.trim() ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.desc.toLowerCase().includes(search.toLowerCase()) ||
        b.tag.toLowerCase().includes(search.toLowerCase()) ||
        b.address.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All Categories" ||
        b.tag.toLowerCase().includes(category.toLowerCase()) ||
        b.name.toLowerCase().includes(category.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [allBusinesses, search, category]);

  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setPage(1);
  }, [search, category, selectedCity]);

  const currentPageBusinesses = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredBusinesses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBusinesses, page]);

  const [recordPageVisit] = useRecordPageVisitMutation();

  const openBusinessDetails = (business) => {
    const targetId = business?.id || business?.raw?.id;
    if (targetId) {
      recordPageVisit(targetId).unwrap().catch((err) => console.error("Page visit count API error:", err));
    }
    navigate(`/community-details/${targetId}`, {
      state: { business: business.raw || business },
    });
  };

  function toggle(arr, setArr, val, isChecked) {
    if (isChecked) {
      const valLower = val.toLowerCase().trim();
      const valShort = val.includes(",") ? val.split(",")[0].trim().toLowerCase() : valLower;
      setArr((p) =>
        p.filter((x) => {
          if (!x) return false;
          const xLower = x.toLowerCase().trim();
          const xShort = x.includes(",") ? x.split(",")[0].trim().toLowerCase() : xLower;
          return (
            xLower !== valLower &&
            xLower !== valShort &&
            xShort !== valLower &&
            xShort !== valShort &&
            !xLower.includes(valShort) &&
            !valLower.includes(xShort)
          );
        })
      );
    } else {
      setArr((p) => {
        if (p.includes(val)) {
          return p.filter((x) => x !== val);
        }
        return [...p, val];
      });
    }
  }

  return (
    <div className="font-inter min-h-screen bg-[#f8f7f3] flex w-full justify-center">
      <ScrollRestoration />

      <div className="flex flex-col lg:flex-row w-full lg:w-11/12 xl:w-10/12 mx-auto my-4 lg:my-10 px-4 lg:px-0">
        {/* ── Sidebar ── */}
        <SidebarFilter
          selectedCategories={selCats}
          onToggleCategory={(v, chk) => toggle(selCats, setSelCats, v, chk)}
          selectedOccasions={selOccasions}
          onToggleOccasion={(v, chk) => toggle(selOccasions, setSelOccasions, v, chk)}
          selectedLocations={selLocs}
          onToggleLocation={(v, chk) => toggle(selLocs, setSelLocs, v, chk)}
          selectedServices={selServices}
          onToggleService={(v, chk) => toggle(selServices, setSelServices, v, chk)}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
        <div className="flex-1 w-full min-w-0">
          {/* ── Cover Header (Shown ONLY if exactly 1 location is selected) ── */}
          {showCoverHeader && (
            <div className="relative w-full rounded-2xl overflow-hidden h-[380px] sm:h-[320px] shadow-sm mb-6">
              <img
                src={coverImage}
                alt={communityName}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 w-full">
                <div className="flex items-center px-4 sm:px-6 gap-1.5 text-white/70 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest mb-1">
                  <IoLocationOutline size={18} color="#f59e0b" />
                  Community District
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 px-4 sm:px-6">
                  {communityName}
                </h1>
                <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 mb-4">
                  <div>
                    <p className="text-white text-base sm:text-lg font-bold leading-none">
                      {businessCount}
                    </p>
                    <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                      Businesses
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <p className="text-white text-base sm:text-lg font-bold leading-none">
                      {featuredCount}
                    </p>
                    <p className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                      Featured
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                </div>
                {/* ── Search bar ── */}
                {/* <div className="bg-white px-4 sm:px-5 w-full py-4 shadow-sm rounded-2xl border">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto">
                    <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 bg-white hover:border-gray-300 transition-colors">
                      <IoSearchOutline size={16} color="#9ca3af" />
                      <input
                        type="text"
                        placeholder={`What are you looking for in ${communityName.split(",")[0]}?`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 sm:contents">
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
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto">
                            {categoriesList.map((c) => (
                              <button
                                key={c}
                                onClick={() => {
                                  setCategory(c);
                                  setCatOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                                  category === c ? "text-[#085027] font-semibold" : "text-gray-600"
                                }`}
                              >
                                {c}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button className="flex-1 hidden md:block sm:flex-initial bg-[#085027] hover:bg-[#063d1e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                        Find Local
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {!showCoverHeader && (
            <div className="bg-white px-4 sm:px-5 w-full py-4 shadow-sm rounded-2xl border mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto">
                <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 bg-white hover:border-gray-300 transition-colors">
                  <IoSearchOutline size={16} color="#9ca3af" />
                  <input
                    type="text"
                    placeholder="Search businesses, services or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 sm:contents">
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
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden max-h-60 overflow-y-auto">
                        {categoriesList.map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              setCategory(c);
                              setCatOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                              category === c ? "text-[#085027] font-semibold" : "text-gray-600"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="flex-1 hidden md:block sm:flex-initial bg-[#085027] hover:bg-[#063d1e] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                    Find Local
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Content Layout ── */}
          <div className="my-6 lg:my-10 pb-12">
            {hasSidebarFilters ? (
              <BusinessResults
                selCats={selCats}
                selLocs={selLocs}
                selServices={selServices}
              />
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {isLoading &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl h-64 animate-pulse"
                    />
                  ))}

                {!isLoading && currentPageBusinesses.length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-500">
                    No businesses found in {communityName.split(",")[0]}.
                  </div>
                )}

                {!isLoading &&
                  currentPageBusinesses.map((b) => (
                    <BusinessCard
                      key={b.id}
                      business={b}
                      onClick={() => openBusinessDetails(b)}
                    />
                  ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoChevronBack size={14} color="#374151" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-[#085027] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IoChevronForward size={14} color="#374151" />
                  </button>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
