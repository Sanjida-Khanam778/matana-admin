import { useState, useEffect } from "react";
import BusinessResults from "../Businessresults/Businessresults";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import { useNavigate, useParams, ScrollRestoration } from "react-router-dom";
import { IMAGES } from "../../assets";
import { useGetCategoriesQuery } from "../../Api/businessDirectoryApi";

const LOCAL_CAT_IMAGES = {
  "Upsherin": IMAGES.categoryImage1,
  "Tu Bshvat": IMAGES.categoryImage2,
  "Thank You": IMAGES.categoryImage3,
  "Sukkos": IMAGES.categoryImage4,
  "Shiva and Condolences": IMAGES.categoryImage5,
  "Shavuous": IMAGES.categoryImage6,
  "Shabbos": IMAGES.categoryImage7,
  "Rosh Hashana8": IMAGES.categoryImage8,
  "Purim": IMAGES.categoryImage9,
  "Pesach": IMAGES.categoryImage10,
  "Party": IMAGES.categoryImage11,
  "Kiddush": IMAGES.categoryImage12,
  "Just Because": IMAGES.categoryImage13,
  "Graduation": IMAGES.categoryImage14,
  "Engagements, vorts and weddings": IMAGES.categoryImage15,
  "Corporate gifting and catering": IMAGES.categoryImage16,
  "Chanuka": IMAGES.categoryImage17,
  "Bris": IMAGES.categoryImage18,
  "Birthday": IMAGES.categoryImage19,
  "Bar Mitzvah": IMAGES.categoryImage20,
  "Baby": IMAGES.categoryImage21,
  "Anniversary": IMAGES.categoryImage22,
};

const ITEMS_PER_PAGE = 12;

// ── Icons ──
function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightSmIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ── Grid Card ──────────────────────────────────────
function GridCard({ name, count, image, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer group bg-white p-4 relative overflow-hidden border border-gray-100/50 transition-all duration-300 hover:shadow-xl`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Left border line drawing */}
      <div
        className="absolute top-0 left-0 w-[2px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          height: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0s" : "0.3s",
        }}
      />

      {/* Bottom border line drawing */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#085027]/20 transition-all duration-200 ease-linear z-20"
        style={{
          width: hovered ? "100%" : "0%",
          transitionDelay: hovered ? "0.3s" : "0s",
        }}
      />

      {/* Image */}
      <div className="rounded-2xl md:h-52 h-32 bg-[#EAF2EC] p-4 overflow-hidden mb-3 relative flex justify-center items-center">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
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

// ── Main Component ──
export default function BusinessSearch() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selCats, setSelCats] = useState(["Custom Baked Goods"]);
  const [selLocs, setSelLocs] = useState(["Brooklyn, NY"]);
  const [selLevels, setSelLevels] = useState(["Cholov Yisroel"]);
  const [page, setPage] = useState(1);
  const [selOccasions, setSelOccasions] = useState([]);
  const [selTov, setSelTov] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  const categories = (categoriesData ?? []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: cat.business_count ?? 0,
    image: cat.image || LOCAL_CAT_IMAGES[cat.name] || IMAGES.categoryImage7,
  }));

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(decodeURIComponent(categoryName));
    } else {
      setSelectedCategory(null);
    }
  }, [categoryName]);

  function toggle(arr, setArr, val) {
    setArr((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">
      <ScrollRestoration />

      {/* Back button and filters toggle on mobile */}
      <div className="px-4 sm:px-8 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={() => {
            if (selectedCategory) {
              setSelectedCategory(null);
              navigate("/all-categories");
            } else {
              window.history.back();
            }
          }}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          selectedOccasions={selOccasions}
          onToggleOccasion={(v) => toggle(selOccasions, setSelOccasions, v)}
          selectedTov={selTov}
          onToggleTov={(v) => toggle(selTov, setSelTov, v)}
        >
          <ArrowLeftIcon /> Back
        </button>

        {/* Filters Toggle Button for mobile/tablet */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 px-4 sm:px-8 pb-12">
        {/* ── Sidebar ── */}
        <SidebarFilter
          selectedCategories={selCats}
          onToggleCategory={(v) => toggle(selCats, setSelCats, v)}
          selectedLocations={selLocs}
          onToggleLocation={(v) => toggle(selLocs, setSelLocs, v)}
          selectedKosherLevels={selLevels}
          onToggleKosherLevel={(v) => toggle(selLevels, setSelLevels, v)}
          selectedOccasions={selOccasions}
          onToggleOccasion={(v) => toggle(selOccasions, setSelOccasions, v)}
          selectedTov={selTov}
          onToggleTov={(v) => toggle(selTov, setSelTov, v)}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {selectedCategory ? (
            <BusinessResults categoryName={selectedCategory} />
          ) : (
            <>
              {/* 3-col grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {isLoading &&
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-4 h-64 animate-pulse"
                    />
                  ))}
                {!isLoading &&
                  paginatedCategories.map((item) => (
                    <GridCard
                      key={item.name}
                      {...item}
                      onClick={() =>
                        navigate(`/all-stores/${encodeURIComponent(item.name)}`)
                      }
                    />
                  ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-[60px] md:mt-[100px]">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const n = idx + 1;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                          page === n
                            ? "bg-[#085027] text-white"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightSmIcon />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
