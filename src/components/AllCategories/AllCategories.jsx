import { useState } from "react";
import BusinessResults from "../Businessresults/Businessresults";
import SidebarFilter from "../SidebarFilter/SidebarFilter";

// ── Data ──
const gridItems = [
  { name: "Home Gift", count: 156, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80" },
  { name: "Floral Arrangements", count: 105, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=400&q=80" },
  { name: "Custom Gifts", count: 46, image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80" },
  { name: "Fish Boards", count: 156, image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&q=80" },
  { name: "Bakery & Cakes", count: 65, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
  { name: "Custom Baked Goods", count: 190, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80" },
  { name: "Judaica", count: 65, image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80" },
  { name: "Layette & Baby Gifts", count: 190, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80" },
  { name: "Liquor & Wine", count: 46, image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80" },
];

const ITEMS_PER_PAGE = 9;
const TOTAL_PAGES = 3;

// ── Icons ──
function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ── Grid Card ──────────────────────────────────────
function GridCard({ name, count, image, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
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

// ── Main Component ──
export default function BusinessSearch() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selCats, setSelCats] = useState(["Custom Baked Goods"]);
  const [selLocs, setSelLocs] = useState(["Brooklyn, NY"]);
  const [selLevels, setSelLevels] = useState(["Cholov Yisroel"]);
  const [page, setPage] = useState(2);

  function toggle(arr, setArr, val) {
    setArr((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">
      {/* Back button */}
      <div className="px-8 pt-6 pb-2">
        <button
          onClick={() => {
            if (selectedCategory) {
              setSelectedCategory(null);
            } else {
              window.history.back();
            }
          }}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon /> Back
        </button>
      </div>

      <div className="flex gap-0 px-8 pb-12">
        {/* ── Sidebar ── */}
        <SidebarFilter
          selectedCategories={selCats}
          onToggleCategory={(v) => toggle(selCats, setSelCats, v)}
          selectedLocations={selLocs}
          onToggleLocation={(v) => toggle(selLocs, setSelLocs, v)}
          selectedKosherLevels={selLevels}
          onToggleKosherLevel={(v) => toggle(selLevels, setSelLevels, v)}
        />

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {selectedCategory ? (
            <BusinessResults categoryName={selectedCategory} />
          ) : (
            <>
              {/* 3-col grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                {gridItems.map((item) => (
                  <GridCard
                    key={item.name}
                    {...item}
                    onClick={() => setSelectedCategory(item.name)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeftIcon />
                </button>

                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${page === n
                        ? "bg-[#085027] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronRightSmIcon />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}