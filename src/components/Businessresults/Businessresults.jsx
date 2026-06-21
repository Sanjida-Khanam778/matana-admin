import { useState } from "react";
import { useNavigate } from "react-router-dom";

const businesses = [
  {
    id: 1,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
  },
  {
    id: 2,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80",
  },
  {
    id: 3,
    name: "Home Gift",
    category: "Gift Shops",
    location: "Lakewood, N J",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
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
        <p className="text-sm lg:text-base font-bold text-gray-900 mb-1">
          {name}
        </p>
        <p className="text-xs lg:text-base text-gray-400 mb-2">{category}</p>
        <div className="flex items-center gap-1">
          <LocationIcon />
          <span className="text-xs lg:text-base text-gray-500">{location}</span>
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
      <h1 className="text-xl font-bold text-gray-900 mb-5">
        {businesses.length} Businesses Found
      </h1>

      {/* Category label */}
      <p className="text-sm lg:text-lg font-semibold text-gray-700 mb-4">
        {groupLabel}
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
