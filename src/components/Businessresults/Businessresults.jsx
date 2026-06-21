import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";

const businesses = [
  {
    id: 1,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
        IMAGES.business1,
    },
  {
    id: 2,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
      IMAGES.business2,
  },
  {
    id: 3,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
      IMAGES.business3,
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
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
      {/* Info */}
      <div className="py-3.5">
        <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
          {name}
        </p>
        <p className="text-xs md:text-sm text-gray-400 mb-2">{category}</p>
        <div className="flex items-center gap-1">
          <LocationIcon />
          <span className="text-xs md:text-sm text-gray-500">{location}</span>
        </div>
      </div>
    </div>
  );
}

export default function BusinessResults({ categoryName }) {
  const navigate = useNavigate();
  const groupLabel = categoryName || "Home Gift";

  const openBusinessDetails = (business) => {
    navigate("/category-details", {
      state: { business },
    });
  };

  return (
    <div className="py-2">
      {/* Result count */}
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
        {businesses.length} Businesses Found
      </h1>

      {/* Category label */}
      <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-4">
        {groupLabel}
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {businesses.map((b) => (
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
