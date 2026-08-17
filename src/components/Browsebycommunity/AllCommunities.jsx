import { useState, useMemo } from "react";
import {
    IoChevronForward,
    IoChevronBack,
} from "react-icons/io5";
import BusinessResults from "../Businessresults/Businessresults";
import SidebarFilter from "../SidebarFilter/SidebarFilter";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IMAGES } from "../../assets";
import { useGetCommunitiesQuery } from "../../Api/businessDirectoryApi";

const ITEMS_PER_PAGE = 12;

function CommunityCard({ city, state, rating, businesses, featured, image }) {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/all-community-stores", {
            state: {
                community: { city, state, rating, businesses, featured, image },
            },
        });
    };

    return (
        <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            // style={{ height: "300px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Background image */}
            <div className="h-40 md:h-60 overflow-hidden">

                <img
                    src={image}
                    alt={city}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                />
            </div>

            {/* Dark overlay — gradient from bottom */}
            <div className="absolute inset-0 bg-[#040404]/40" />

            {/* City + State — bottom left */}
            <div className="absolute bottom-0 left-0 p-2 md:p-4">
                <p className="text-white text-base sm:text-lg md:text-2xl font-semibold leading-tight drop-shadow mb-0 sm:mb-1 md:mb-2">
                    {city}
                </p>
                <p className="text-white/80 text-xs md:text-sm font-medium mb-2 md:mb-4">
                    {state}
                </p>

                {/* Stats */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
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
            <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                <div
                    className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center shadow transition-transform duration-200 ${hovered ? "scale-110" : ""}`}
                >
                    <FaChevronRight className="text-white text-sm md:text-base lg:text-lg" />
                </div>
            </div>
        </div>
    );
}

// ── Main ───────────────────────────────────────────
export default function AllCommunities() {
    const { data: communitiesData, isLoading } = useGetCommunitiesQuery();
    const [page, setPage] = useState(1);
    const [selCats, setSelCats] = useState([]);
    const [selLocs, setSelLocs] = useState([]);
    const [selServices, setSelServices] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const hasSidebarFilters = selCats.length > 0 || selLocs.length > 0 || selServices.length > 0;

    const communities = useMemo(() => {
        return (communitiesData ?? []).map((c) => ({
            id: c.id,
            city: c.name,
            state: c.state,
            rating: c.rating ?? 4.8,
            businesses: c.business_count ?? 0,
            featured: c.featured_count ?? 0,
            image: c.image || IMAGES.browse1,
        }));
    }, [communitiesData]);

    const totalPages = Math.ceil(communities.length / ITEMS_PER_PAGE) || 1;

    const currentPageCommunities = useMemo(() => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        return communities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [communities, page]);

    function toggle(arr, setArr, val) {
        setArr((p) => (p.includes(val) ? p.filter((x) => x !== val) : [...p, val]));
    }

    return (
        <div className="font-inter min-h-screen bg-[#f8f7f3] flex flex-col items-center w-full">
            <ScrollRestoration />

            {/* Filters Toggle Button for mobile/tablet */}
            <div className="w-full lg:w-11/12 xl:w-10/12 lg:hidden px-4 pt-4 pb-0 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900">Communities</span>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm transition-colors cursor-pointer"
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

            <div className="flex flex-col lg:flex-row w-full lg:w-11/12 xl:w-10/12 mx-auto my-4 lg:my-10 px-4 lg:px-0">
                {/* ── Sidebar ── */}
                <SidebarFilter
                    selectedCategories={selCats}
                    onToggleCategory={(v) => toggle(selCats, setSelCats, v)}
                    selectedLocations={selLocs}
                    onToggleLocation={(v) => toggle(selLocs, setSelLocs, v)}
                    selectedServices={selServices}
                    onToggleService={(v) => toggle(selServices, setSelServices, v)}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />
                <div className="flex-1 w-full min-w-0">

                    {/* ── Content Layout ── */}
                    <div className="pb-12">
                        {hasSidebarFilters ? (
                            <BusinessResults
                                selCats={selCats}
                                selLocs={selLocs}
                                selServices={selServices}
                            />
                        ) : (
                            <div className="w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                    {isLoading &&
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="bg-white border border-gray-200 rounded-2xl h-40 md:h-60 animate-pulse"
                                            />
                                        ))}
                                    {!isLoading &&
                                        currentPageCommunities.map((c) => (
                                            <CommunityCard key={c.id} {...c} />
                                        ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <IoChevronBack size={14} color="#374151" />
                                        </button>

                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                                                    page === i + 1
                                                        ? "bg-[#085027] text-white"
                                                        : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <IoChevronForward size={14} color="#374151" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
