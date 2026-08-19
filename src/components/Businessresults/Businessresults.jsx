import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { IMAGES } from "../../assets";
import {
  useGetCategoryStoresQuery,
  useFilterBusinessesQuery,
  useRecordPageVisitMutation,
} from "../../Api/businessDirectoryApi";

import { FaStar } from "react-icons/fa";
import LoadingSpinner from "../Common/LoadingSpinner";

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PlanBadge({ plan, isFeatured }) {
  const tier = (plan?.tier || (isFeatured ? "featured" : "")).toLowerCase().trim();

  if (tier === "premium") {
    return (
      <div className="flex items-center gap-1 bg-[#085027] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full shadow-md tracking-wider uppercase">
        <FaStar size={10} className="text-amber-400" /> Premium
      </div>
    );
  }

  if (tier === "featured") {
    return (
      <div className="flex items-center gap-1 bg-[#f59e0b] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 rounded-full shadow-md tracking-wider uppercase">
        <FaStar size={10} className="text-white" /> Featured
      </div>
    );
  }

  return null;
}

function BusinessCard({ name, category, location, image, raw, onClick }) {
  const plan = raw?.plan;
  const isFeatured = raw?.is_featured;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow group"
    >
      {/* Image */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = IMAGES.business1;
          }}
        />
        {/* Top badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <PlanBadge plan={plan} isFeatured={isFeatured} />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-1 sm:gap-1.5">
        <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-[#085027] transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500">
          <LocationIcon />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </div>
  );
}

export default function BusinessResults({
  categoryId,
  categoryName,
  selCats = [],
  selOccasions = [],
  selLocs = [],
  selServices = [],
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  const searchParams = new URLSearchParams(location.search);
  const urlSearch = searchParams.get("search");
  const initialSearch = urlSearch !== null ? urlSearch : (locationState?.search || "");

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const currentUrlSearch = new URLSearchParams(location.search).get("search");
    if (currentUrlSearch !== null) {
      setSearchTerm(currentUrlSearch);
    } else if (locationState?.search !== undefined) {
      setSearchTerm(locationState.search);
    }
  }, [location.search, locationState?.search]);

  const effectiveCats =
    selCats.length > 0
      ? selCats
      : categoryName && isNaN(Number(categoryName))
      ? [categoryName]
      : [];

  const activeUrlSearch = new URLSearchParams(location.search).get("search");
  const currentSearch = activeUrlSearch !== null ? activeUrlSearch : (locationState?.search || "");
  const effectiveSearch = (searchTerm || currentSearch || "").trim();

  const hasFilterParams =
    effectiveCats.length > 0 ||
    selOccasions.length > 0 ||
    selLocs.length > 0 ||
    selServices.length > 0 ||
    Boolean(effectiveSearch);

  const filterArgs = {
    categories: (Array.isArray(selCats) ? selCats : []).filter(Boolean).map(String).join(","),
    occasions: (Array.isArray(selOccasions) ? selOccasions : []).filter(Boolean).map(String).join(","),
    locations: (Array.isArray(selLocs) ? selLocs : [])
      .filter(Boolean)
      .map((loc) => {
        const str = typeof loc === "object" && loc !== null ? loc.name || "" : String(loc || "");
        return str.includes(",") ? str.split(",")[0].trim() : str;
      })
      .filter(Boolean)
      .join(","),
    services_tags: (Array.isArray(selServices) ? selServices : []).filter(Boolean).map(String).join(","),
    search: effectiveSearch,
  };

  const targetCategoryId =
    categoryId ||
    locationState?.categoryId ||
    (typeof categoryName === "number" || !isNaN(Number(categoryName)) ? categoryName : null);

  const { data: filterData, isLoading: isFilterLoading } = useFilterBusinessesQuery(filterArgs, {
    skip: Boolean(targetCategoryId) && !hasFilterParams,
  });

  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryStoresQuery(
    targetCategoryId,
    {
      skip: !targetCategoryId || hasFilterParams,
    }
  );

  const isLoading = targetCategoryId && !hasFilterParams ? isCategoryLoading : isFilterLoading;

  const groupLabel =
    categoryName || locationState?.categoryName || categoryData?.name || "Businesses";

  const rawBusinesses =
    targetCategoryId && !hasFilterParams
      ? categoryData?.businesses || []
      : filterData?.businesses || [];

  const mappedBusinesses = useMemo(() => {
    return rawBusinesses.map((b) => {
      const bannerUrl =
        typeof b.banner === "object" && b.banner?.url
          ? b.banner.url
          : typeof b.banner === "string" && b.banner.trim()
          ? b.banner
          : null;

      const flyerUrl =
        typeof b.flyer_image === "object" && b.flyer_image?.url
          ? b.flyer_image.url
          : typeof b.flyer_image === "string" && b.flyer_image.trim()
          ? b.flyer_image
          : null;

      const photoUrl =
        Array.isArray(b.photos) && b.photos.length > 0
          ? typeof b.photos[0] === "string" && b.photos[0].trim()
            ? b.photos[0]
            : typeof b.photos[0] === "object" && b.photos[0]?.url
            ? b.photos[0].url
            : null
          : null;

      const communityUrl =
        typeof b.community?.image === "string" && b.community.image.trim()
          ? b.community.image
          : null;

      const imgUrl = bannerUrl || flyerUrl || photoUrl || communityUrl || IMAGES.business1;

      const catLabel =
        b.categories && b.categories.length > 0
          ? typeof b.categories[0] === "object"
            ? b.categories[0].name
            : "Business"
          : typeof b.services_tags === "string" && b.services_tags.trim()
          ? b.services_tags.split(",")[0].trim()
          : groupLabel;

      return {
        id: b.id,
        name: b.name || "Business",
        category: catLabel,
        location:
          b.community ? `${b.community.name}, ${b.community.state}` : b.business_address || "Lakewood, N J",
        image: imgUrl,
        raw: b,
      };
    });
  }, [rawBusinesses, groupLabel]);

  const displayBusinesses = mappedBusinesses;

  const [recordPageVisit] = useRecordPageVisitMutation();

  const openBusinessDetails = (business) => {
    const id = business?.id || 1;
    if (id) {
      recordPageVisit(id).unwrap().catch((err) => console.error("Page visit count API error:", err));
    }
    navigate(`/community-details/${id}`, {
      state: { business: business.raw || business },
    });
  };

  const handleSearchInputChange = (val) => {
    setSearchTerm(val);
    const trimmed = val.trim();
    if (trimmed) {
      navigate(`/all-stores?search=${encodeURIComponent(trimmed)}`, { replace: true });
    } else if (location.pathname === "/all-stores" || location.pathname === "/all-community-stores") {
      navigate("/all-stores", { replace: true });
    }
  };

  return (
    <div className="py-2 space-y-5">
      {/* Search Input Bar & Result Count Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 bg-gray-50/50 hover:bg-white focus-within:bg-white focus-within:border-[#085027] transition">
          <FiSearch size={18} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search businesses, services, location or tags..."
            value={searchTerm}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="flex-1 text-xs sm:text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchInputChange("")}
              className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        <div className="text-xs sm:text-sm font-semibold text-gray-500 whitespace-nowrap">
          {isLoading ? "Loading..." : `${displayBusinesses.length} Businesses Found`}
        </div>
      </div>

    

      {/* Grid or Empty Search Result State */}
      {isLoading ? (
        <LoadingSpinner text="Searching businesses..." />
      ) : displayBusinesses.length === 0 ? (
        <div className="py-12 text-center bg-white rounded-2xl border border-gray-100 p-8 space-y-2">
          <p className="text-sm font-bold text-gray-800">No businesses found matching &quot;{searchTerm}&quot;</p>
          <p className="text-xs text-gray-500">
            Try searching with different keywords or clearing your active filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayBusinesses.map((b) => (
            <BusinessCard
              key={b.id}
              {...b}
              onClick={() => openBusinessDetails(b)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
