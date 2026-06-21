import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import { IMAGES } from "../../assets";

const categories = [
  {
    id: 1,
    name: "Upsherin",
    count: 156,
    image: IMAGES.categoryImage1,
  },
  {
    id: 2,
    name: "Tu Bshvat",
    count: 120,
    image: IMAGES.categoryImage2,
  },
  {
    id: 3,
    name: "Thank You",
    count: 100,
    image: IMAGES.categoryImage3,
  },
  {
    id: 4,
    name: "Sukkos",
    count: 120,
    image: IMAGES.categoryImage4,
  },
  {
    id: 5,
    name: "Shiva and Condolences",
    count: 126,
    image: IMAGES.categoryImage5,
  },
  {
    id: 6,
    name: "Shavuous",
    count: 100,
    image: IMAGES.categoryImage6,
  },
  {
    id: 7,
    name: "Shabbos",
    count: 120,
    image: IMAGES.categoryImage7,
  },
  {
    id: 8,
    name: "Rosh Hashana",
    count: 120,
    image: IMAGES.categoryImage8,
  },
];

function CategoryCard({ name, count, image, delayClass }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/all-categories?category=${encodeURIComponent(name)}`);
  };

  return (
    <div
      className={`cursor-pointer group bg-white p-4 relative overflow-hidden border border-gray-100/50 transition-all duration-300 hover:shadow-none reveal reveal-slide-up ${delayClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Left border line drawing */}
      <div
        className="absolute top-0 left-0 w-[1.5px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          height: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0s" : "0.3s",
        }}
      />

      {/* Bottom border line drawing */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          width: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0.3s" : "0s",
        }}
      />

      {/* Image */}
      <div className="rounded-2xl overflow-hidden mb-3 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>

      {/* Text */}
      <p
        className={`text-lg font-bold text-gray-900 leading-snug mb-0.5 transition-colors ${hovered ? "text-[#085027]" : ""}`}
      >
        {name}
      </p>
      <p className="text-gray-400">{count} businesses</p>
    </div>
  );
}

const categoryRevealDelay = [
  "reveal-delay-05",
  "reveal-delay-1",
  "reveal-delay-2",
  "reveal-delay-3",
];

export default function BrowseCategories() {
  useScrollReveal();

  return (
    <section className="w-full bg-[#FAFAFA] py-8 md:py-12 xl:py-20 reveal reveal-fade-in">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16 reveal reveal-fade-in reveal-delay-05">
          <p className="font-semibold text-sm lg:text-base text-primary uppercase mb-2">
            What Are You Looking For?
          </p>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900">
            Browse Categories
          </h2>
        </div>

        {/* Grid — 4 cols, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              {...cat}
              delayClass={
                categoryRevealDelay[index % categoryRevealDelay.length]
              }
            />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="flex justify-center reveal reveal-zoom reveal-delay-2">
          <Link
            to={"/all-categories"}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-full transition-colors shadow-sm"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
