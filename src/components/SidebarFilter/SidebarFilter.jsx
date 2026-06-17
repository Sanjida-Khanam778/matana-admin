import { useState } from "react";

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

// ── Icons ──────────────────────────────────────────
function ChevronUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
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
          <polyline points="20 6 9 17 4 12" />
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
        <div className="hide-scrollbar overflow-y-auto pr-1" style={{ maxHeight: "210px" }}>
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

// ── Reusable Sidebar Filter Component ──────────────
export default function SidebarFilter({
  selectedCategories = [],
  onToggleCategory,
  selectedLocations = [],
  onToggleLocation,
  selectedKosherLevels = [],
  onToggleKosherLevel,
}) {
  return (
    <aside className="w-80 flex-shrink-0 mr-8">
      <style>{hideScrollbarStyle}</style>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 sticky top-6">
        <p className="text-base font-bold text-gray-900 mb-3">Search Businesses</p>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        <SidebarSection
          title="Categories"
          items={categories}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />
        <div className="border-t border-gray-100" />
        <SidebarSection
          title="Locations"
          items={locations}
          selected={selectedLocations}
          onToggle={onToggleLocation}
        />
        <div className="border-t border-gray-100" />
        <SidebarSection
          title="Kosher Vetting Levels"
          items={kosherLevels}
          selected={selectedKosherLevels}
          onToggle={onToggleKosherLevel}
        />
      </div>
    </aside>
  );
}
