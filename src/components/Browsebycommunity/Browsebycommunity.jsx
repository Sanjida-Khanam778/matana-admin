import { useState } from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";

const communities = [
  {
    id: 1,
    city: "Brooklyn",
    state: "NY",
    rating: 4.8,
    businesses: 342,
    featured: 12,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  },
  {
    id: 2,
    city: "Queens",
    state: "NY",
    rating: 4.7,
    businesses: 178,
    featured: 8,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
  },
  {
    id: 3,
    city: "Five Towns",
    state: "NY",
    rating: 4.9,
    businesses: 178,
    featured: 8,
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&q=80",
  },
  {
    id: 4,
    city: "Los Angeles",
    state: "CA",
    rating: 4.8,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1549041471-15c5a1e51d89?w=600&q=80",
  },
  {
    id: 5,
    city: "Lakewood",
    state: "NJ",
    rating: 4.7,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    id: 6,
    city: "Baltimore",
    state: "MD",
    rating: 4.8,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: 7,
    city: "Cleveland",
    state: "OH",
    rating: 4.6,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    id: 8,
    city: "Miami",
    state: "FL",
    rating: 4.9,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80",
  },
  {
    id: 9,
    city: "Monsey",
    state: "NY",
    rating: 4.7,
    businesses: 250,
    featured: 8,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  },
];

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function CommunityCard({ city, state, rating, businesses, featured, image }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ height: "300px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={image}
        alt={city}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        draggable={false}
      />

      {/* Dark overlay — gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

      {/* Rating badge — top right */}
      <div className="absolute top-6 right-6 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-2 py-1 rounded-full border border-white/30">
        <FaStar className="text-yellow-500" />
        {rating}
      </div>

      {/* City + State — bottom left */}
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-white text-2xl font-semibold leading-tight drop-shadow mb-2">{city}</p>
        <p className="text-white/70 text-sm lg:text-base font-medium mb-4">{state}</p>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-white text-xs lg:text-sm font-bold leading-none">{businesses}</p>
            <p className="text-white/60 text-xs lg:text-sm">businesses</p>
          </div>
          <div>
            <p className="text-white text-xs lg:text-sm font-bold leading-none">{featured}</p>
            <p className="text-white/60 text-xs lg:text-sm">featured</p>
          </div>
        </div>
      </div>

      {/* Arrow button — bottom right */}
      <div className="absolute bottom-4 right-4">
        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center shadow transition-transform duration-200 ${hovered ? "scale-110" : ""}`}>
          <FaChevronRight className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function BrowseByCommunity() {
  return (
    <section className="w-full bg-[#FAFAFA] py-20">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-bold text-primary uppercase mb-2">
            Discover Local Businesses
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Browse By Community</h2>
        </div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-3 gap-4">
          {communities.map((c) => (
            <CommunityCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}