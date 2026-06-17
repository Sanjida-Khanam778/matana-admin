import { useState } from "react";

// Hide scrollbar globally for this component
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;


// ── Data ───────────────────────────────────────────
const categories = [
  { name: "Custom Baked Goods", count: 156 },
  { name: "Custom Gifts", count: 89 },
  { name: "Custom Merchandise", count: 42 },
  { name: "Desserts", count: 78 },
  { name: "Fish Boards", count: 34 },
  { name: "Homemade Baked Goods", count: 56 },
  { name: "Floral Arrangements", count: 105 },
  { name: "Judaica", count: 65 },
  { name: "Bakery & Cakes", count: 65 },
  { name: "Layette & Baby Gifts", count: 190 },
  { name: "Liquor & Wine", count: 46 },
  { name: "Home Gift", count: 156 },
];

const locations = [
  { name: "Queens, NY", count: 175 },
  { name: "Brooklyn, NY", count: 358 },
  { name: "Five Towns, NY", count: 1781 },
  { name: "Los Angeles, CA", count: 204 },
  { name: "Lakewood, NJ", count: 234 },
  { name: "Miami, FL", count: 188 },
  { name: "Monsey, NY", count: 122 },
  { name: "Baltimore, MD", count: 97 },
];

const kosherLevels = [
  { name: "Glatt Kosher", count: 175 },
  { name: "Cholov Yisroel", count: 358 },
  { name: "Standard Supervision", count: 1781 },
  { name: "Pareve Only", count: 204 },
  { name: "Pas Yisroel", count: 134 },
  { name: "Mehadrin", count: 88 },
];

const gridItems = [
  { name: "Home Gift",           count: 156, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80" },
  { name: "Floral Arrangements", count: 105, image: "https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=400&q=80" },
  { name: "Custom Gifts",        count: 46,  image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80" },
  { name: "Fish Boards",         count: 156, image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&q=80" },
  { name: "Bakery & Cakes",      count: 65,  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80" },
  { name: "Custom Baked Goods",  count: 190, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80" },
  { name: "Judaica",             count: 65,  image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80" },
  { name: "Layette & Baby Gifts",count: 190, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80" },
  { name: "Liquor & Wine",       count: 46,  image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80" },
];

const ITEMS_PER_PAGE = 9;
const TOTAL_PAGES = 3;

// ── Icons ──────────────────────────────────────────
function ChevronUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function ChevronRightSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}

// ── Checkbox ───────────────────────────────────────
function Checkbox({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded flex items-center justify-center cursor-pointer flex-shrink-0 border transition-colors ${checked ? "bg-[#085027] border-[#085027]" : "bg-white border-gray-300"}`}
    >
      {checked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </div>
  );
}

// ── Collapsible Sidebar Section ────────────────────
function SidebarSection({ title, items, selected, onToggle }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-1">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-sm font-bold text-gray-900">{title}</span>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {/* Items — scroll if more than 6 */}
      {open && (
        <div className="overflow-y-auto pr-1" style={{ maxHeight: "210px" }}>
          {items.map((item) => (
            <label
              key={item.name}
              className="flex items-center justify-between py-2 cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Checkbox
                  checked={selected.includes(item.name)}
                  onChange={() => onToggle(item.name)}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">({item.count})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Grid Card ──────────────────────────────────────
function GridCard({ name, count, image }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-bold text-gray-900">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{count} businesses</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────
export default function AllCategories() {
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
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon /> Back
        </button>
      </div>

      <div className="flex gap-0 px-8 pb-12">
        {/* ── Sidebar ── */}
        <aside className="w-52 flex-shrink-0 mr-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 sticky top-6">
            <p className="text-base font-bold text-gray-900 mb-3">Search Businesses</p>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            <SidebarSection
              title="Categories"
              items={categories}
              selected={selCats}
              onToggle={(v) => toggle(selCats, setSelCats, v)}
            />
            <div className="border-t border-gray-100" />
            <SidebarSection
              title="Locations"
              items={locations}
              selected={selLocs}
              onToggle={(v) => toggle(selLocs, setSelLocs, v)}
            />
            <div className="border-t border-gray-100" />
            <SidebarSection
              title="Kosher Vetting Levels"
              items={kosherLevels}
              selected={selLevels}
              onToggle={(v) => toggle(selLevels, setSelLevels, v)}
            />
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Result count */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">9 Businesses Found</h1>

          {/* 3-col grid */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {gridItems.map((item) => (
              <GridCard key={item.name} {...item} />
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
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  page === n
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
        </div>
      </div>
    </div>
  );
}