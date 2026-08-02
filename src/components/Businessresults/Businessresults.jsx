import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IMAGES } from "../../assets";
import {
  useGetCategoryStoresQuery,
  useFilterBusinessesQuery,
} from "../../Api/businessDirectoryApi";

const defaultBusinesses = [
  {
    id: 1,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image: IMAGES.business1,
  },
  {
    id: 2,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image: IMAGES.business2,
  },
  {
    id: 3,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image: IMAGES.business3,
  },
];

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

function BusinessCard({ name, category, location, image, onClick }) {
  return (
    <div
      className="bg-white p-4 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-32 md:h-44 overflow-hidden bg-gray-100 rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = IMAGES.business1;
          }}
        />
      </div>
      {/* Info */}
      <div className="py-3.5">
        <p className="text-sm md:text-base font-bold text-gray-900 mb-1 line-clamp-1">
          {name}
        </p>
        <p className="text-xs md:text-sm text-gray-400 mb-2 truncate">{category}</p>
        <div className="flex items-center gap-1 text-gray-500 truncate">
          <LocationIcon />
          <span className="text-xs md:text-sm truncate">{location}</span>
        </div>
      </div>
    </div>
  );
}

export default function BusinessResults({
  categoryId,
  categoryName,
  selCats = [],
  selLocs = [],
  selServices = [],
}) {
  const navigate = useNavigate();
  const locationState = useLocation().state;

  const hasFilterParams = selCats.length > 0 || selLocs.length > 0 || selServices.length > 0;

  const filterArgs = {
    categories: selCats.join(","),
    locations: selLocs.map((loc) => (loc.includes(",") ? loc.split(",")[0].trim() : loc)).join(","),
    services_tags: selServices.join(","),
  };

  const { data: filterData, isLoading: isFilterLoading } = useFilterBusinessesQuery(filterArgs, {
    skip: !hasFilterParams,
  });

  const targetCategoryId =
    categoryId ||
    locationState?.categoryId ||
    (typeof categoryName === "number" || !isNaN(Number(categoryName)) ? categoryName : null);

  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryStoresQuery(
    targetCategoryId,
    {
      skip: !targetCategoryId || hasFilterParams,
    }
  );

  const isLoading = hasFilterParams ? isFilterLoading : isCategoryLoading;

  const groupLabel = hasFilterParams
    ? "Filtered Businesses"
    : categoryData?.name || categoryName || locationState?.categoryName || "Businesses";

  const rawBusinesses = hasFilterParams
    ? filterData?.businesses || []
    : categoryData?.businesses || [];

  const mappedBusinesses = rawBusinesses.map((b) => {
    const imgUrl =
      typeof b.flyer_image === "object" && b.flyer_image?.url
        ? b.flyer_image.url
        : typeof b.flyer_image === "string" && b.flyer_image
        ? b.flyer_image
        : b.community?.image
        ? b.community.image
        : b.photos && b.photos.length > 0 && typeof b.photos[0] === "string"
        ? b.photos[0]
        : IMAGES.business1;

    const catLabel =
      b.categories && b.categories.length > 0
        ? typeof b.categories[0] === "object"
          ? b.categories[0].name
          : "Business"
        : b.services_tags
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

  const displayBusinesses =
    mappedBusinesses.length > 0
      ? mappedBusinesses
      : hasFilterParams
      ? []
      : defaultBusinesses;

  const openBusinessDetails = (business) => {
    const id = business?.id || 1;
    navigate(`/community-details/${id}`, {
      state: { business: business.raw || business },
    });
  };

  return (
    <div className="py-2">
      {/* Result count */}
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
        {isLoading ? "Loading..." : `${displayBusinesses.length} Businesses Found`}
      </h1>

      {/* Category label */}
      <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-4">
        {groupLabel}
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayBusinesses.map((b) => (
          <BusinessCard
            key={b.id}
            {...b}
            onClick={() => openBusinessDetails(b)}
          />
        ))}
      </div>
    </div>
  );
}
