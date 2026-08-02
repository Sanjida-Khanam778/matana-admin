import { useState } from "react";
import {
  useGetTagsQuery,
  useGetCategoriesQuery,
  useGetCommunitiesQuery,
} from "../../Api/businessDirectoryApi";

const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// ── Icons ──────────────────────────────────────────
function ChevronUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6b7280"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <div
          className="hide-scrollbar overflow-y-auto pr-1"
          style={{ maxHeight: "210px" }}
        >
          {Array.isArray(items) &&
            items.map((item) => (
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
                {item.count !== undefined && item.count !== null && (
                  <span className="text-xs text-gray-400">({item.count})</span>
                )}
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
  selectedServices = [],
  onToggleService,
  isOpen = false,
  onClose,
}) {
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: communitiesData } = useGetCommunitiesQuery();
  const { data: tagsData } = useGetTagsQuery();

  const categoryItems =
    categoriesData && Array.isArray(categoriesData)
      ? categoriesData.map((cat) => ({
          name: cat.name,
          count: cat.business_count,
        }))
      : [];

  const locationItems =
    communitiesData && Array.isArray(communitiesData)
      ? communitiesData.map((loc) => ({
          name: `${loc.name}, ${loc.state}`,
          count: loc.business_count,
        }))
      : [];

  const servicesItems =
    tagsData && Array.isArray(tagsData)
      ? tagsData.map((tag) => ({
          name: typeof tag === "string" ? tag : tag.name,
          count: typeof tag === "object" ? (tag.business_count ?? tag.count ?? null) : null,
        }))
      : [];

  return (
    <>
      <style>{hideScrollbarStyle}</style>

      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:z-auto lg:inset-auto lg:w-80 lg:flex-shrink-0 lg:mr-8 lg:block lg:overflow-visible lg:bg-transparent
        `}
      >
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 lg:sticky lg:top-6 h-full lg:h-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <p className="text-base font-bold text-gray-900">
              Search Businesses
            </p>
            {/* Close button on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 flex-shrink-0" />

          {/* Scrollable container for sections inside sidebar */}
          <div className="flex-1 overflow-y-auto lg:overflow-visible hide-scrollbar pr-1 mt-2">
            <SidebarSection
              title="Categories"
              items={categoryItems}
              selected={selectedCategories}
              onToggle={onToggleCategory}
            />
            <div className="border-t border-gray-100 my-2" />
            <SidebarSection
              title="Locations"
              items={locationItems}
              selected={selectedLocations}
              onToggle={onToggleLocation}
            />
            <div className="border-t border-gray-100 my-2" />
            <SidebarSection
              title="Services & Tags"
              items={servicesItems}
              selected={selectedServices}
              onToggle={onToggleService}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
