import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const categories = [
  {
    id: 1,
    name: "Baby Toys & Kids Gifts",
    count: 156,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
  },
  {
    id: 2,
    name: "Flower Bouquet & Floral Gifts",
    count: 105,
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=400&q=80",
  },
  {
    id: 3,
    name: "Gift Bags & Wrapping Station",
    count: 46,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
  },
  {
    id: 4,
    name: "Watches & Accessories",
    count: 48,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
  },
  {
    id: 5,
    name: "Bags & Fashion Purses",
    count: 156,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
  },
  {
    id: 6,
    name: "Scented Candles",
    count: 65,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80",
  },
  {
    id: 7,
    name: "Chocolates & Confectionery",
    count: 180,
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80",
  },
  {
    id: 8,
    name: "Books",
    count: 48,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80",
  },
];

function CategoryCard({ name, count, image }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
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

// Reveal wrapper — animates its child card when scrolled into view
function RevealCard({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={visible ? "reveal-visible" : "reveal-hidden"}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function BrowseCategories() {
  const [headerRef, headerVisible] = useScrollReveal(0.2);

  return (
    <section className="w-full bg-[#FAFAFA] py-20">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 ${headerVisible ? "reveal-text-visible" : "reveal-text-hidden"}`}
        >
          <p className="font-semibold text-primary uppercase mb-2">
            What Are You Looking For?
          </p>
          <h2 className="text-4xl font-bold text-gray-900">Browse Categories</h2>
        </div>

        {/* Grid — 4 cols, 2 rows */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {categories.map((cat, i) => (
            <RevealCard key={cat.id} delay={i * 80}>
              <CategoryCard {...cat} />
            </RevealCard>
          ))}
        </div>

        {/* Browse All Button */}
        <div className="flex justify-center">
          <Link to={'/all-categories'} className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
            Browse All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}