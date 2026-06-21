import { useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useScrollRevealBounce } from "../../hooks/useScrollReveal";
import { IMAGES } from "../../assets";

const communities = [
  {
    id: 1,
    city: "Brooklyn",
    state: "NY",
    rating: 4.8,
    businesses: 342,
    featured: 12,
    image:
      IMAGES.browse1,
  },
  {
    id: 2,
    city: "Queens",
    state: "NY",
    rating: 4.7,
    businesses: 178,
    featured: 8,
    image:
      IMAGES.browse2,
  },
  {
    id: 3,
    city: "Five Towns",
    state: "NY",
    rating: 4.9,
    businesses: 178,
    featured: 8,
    image:
      IMAGES.browse3,
  },
  {
    id: 4,
    city: "Los Angeles",
    state: "CA",
    rating: 4.8,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse4,
  },
  {
    id: 5,
    city: "Lakewood",
    state: "NJ",
    rating: 4.7,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse5,
  },
  {
    id: 6,
    city: "Baltimore",
    state: "MD",
    rating: 4.8,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse6,
  },
  {
    id: 7,
    city: "Cleveland",
    state: "OH",
    rating: 4.6,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse7,
  },
  {
    id: 8,
    city: "Miami",
    state: "FL",
    rating: 4.9,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse8,
  },
  {
    id: 9,
    city: "Monsey",
    state: "NY",
    rating: 4.7,
    businesses: 250,
    featured: 8,
    image:
      IMAGES.browse9,
  },
];

function CommunityCard({ city, state, rating, businesses, featured, image }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/community-details", {
      state: {
        community: { city, state, rating, businesses, featured, image },
      },
    });
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group reveal reveal-slide-right reveal-delay-1"
      style={{ height: "300px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Background image */}
      <img
        src={image}
        alt={city}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />

      {/* Dark overlay — gradient from bottom */}
      <div className="absolute inset-0 bg-[#040404]/40" />

      {/* Rating badge — top right */}
      <div className="absolute md:top-6 md:right-6 top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-semibold px-2 py-1 rounded-full border border-white/30">
        <FaStar className="text-yellow-500" />
        {rating}
      </div>

      {/* City + State — bottom left */}
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white text-lg md:text-2xl font-semibold leading-tight drop-shadow mb-2">
          {city}
        </p>
        <p className="text-white/80 text-xs md:text-sm font-medium mb-4">
          {state}
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <p className="text-white text-xs lg:text-sm font-bold leading-none">
              {businesses}
            </p>
            <p className="text-white/80 text-xs lg:text-sm">businesses</p>
          </div>
          <div>
            <p className="text-white text-xs lg:text-sm font-bold leading-none">
              {featured}
            </p>
            <p className="text-white/80 text-xs lg:text-sm">featured</p>
          </div>
        </div>
      </div>

      {/* Arrow button — bottom right */}
      <div className="absolute bottom-4 right-4">
        <div
          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center shadow transition-transform duration-200 ${hovered ? "scale-110" : ""}`}
        >
          <FaChevronRight className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function BrowseByCommunity() {
  useScrollRevealBounce();

  return (
    <section
      id="community"
      className="w-full bg-[#FAFAFA] py-8 md:py-12 xl:py-20 font-inter reveal reveal-slide-left"
    >
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <p className="font-bold text-sm lg:text-base text-primary uppercase mb-2">
            Discover Local Businesses
          </p>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900">
            Browse By Community
          </h2>
        </div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((c) => (
            <CommunityCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
