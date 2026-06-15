import { useState } from "react";

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
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="rounded-2xl overflow-hidden mb-3 relative" style={{ height: "155px" }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>

      {/* Text */}
      <p className={`text-sm font-semibold text-gray-900 leading-snug mb-0.5 transition-colors ${hovered ? "text-[#1a5c3a]" : ""}`}>
        {name}
      </p>
      <p className="text-xs text-gray-400">{count} businesses</p>
    </div>
  );
}

export default function BrowseCategories() {
  return (
    <section className="w-full bg-[#f8f7f3] py-14 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase mb-2">
            What Are You Looking For?
          </p>
          <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
        </div>

        {/* Grid — 4 cols, 2 rows */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="flex justify-center">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-8 py-3 rounded-full transition-colors shadow-sm">
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
}