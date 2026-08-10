import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiEye,
  FiPhoneCall,
  FiGlobe,
  FiNavigation,
  FiInstagram,
  FiLogOut,
  FiCheckCircle,
  FiBarChart2,
  FiCalendar,
  FiRefreshCw,
  FiMessageCircle,
  FiEdit3,
  FiCreditCard,
} from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import {
  useGetMyAnalyticsQuery,
  useGetMyBusinessProfileQuery,
} from "../../Api/businessDirectoryApi";
import EditBusinessSection from "../../components/EditBusinessSection/EditBusinessSection";

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [ownerEmail, setOwnerEmail] = useState("");

  const { data: myProfile } = useGetMyBusinessProfileQuery();

  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth");
    if (!token) {
      navigate("/business-login");
      return;
    }
    const email = localStorage.getItem("business_owner_email") || "Business Owner";
    setOwnerEmail(email);
  }, [navigate]);

  const {
    data: analyticsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMyAnalyticsQuery(undefined, {
    pollingInterval: 30000, // Refresh analytics every 30s
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth");
    localStorage.removeItem("business_owner_email");
    navigate("/business-login");
  };

  const dailyAnalytics = analyticsData?.daily_analytics || [];

  // Compute totals from daily_analytics API response
  const totalViews =
    analyticsData?.total_views !== undefined
      ? analyticsData.total_views
      : dailyAnalytics.reduce((sum, item) => sum + (item.views || 0), 0);

  const totalWebsiteClicks = dailyAnalytics.reduce(
    (sum, item) => sum + (item.website_clicks || 0),
    0
  );
  const totalWhatsappClicks = dailyAnalytics.reduce(
    (sum, item) => sum + (item.whatsapp_clicks || 0),
    0
  );
  const totalPhoneClicks = dailyAnalytics.reduce(
    (sum, item) => sum + (item.phone_clicks || 0),
    0
  );
  const totalDirectionsClicks = dailyAnalytics.reduce(
    (sum, item) => sum + (item.directions_clicks || 0),
    0
  );
  const totalInstagramClicks = dailyAnalytics.reduce(
    (sum, item) => sum + (item.instagram_clicks || 0),
    0
  );

  return (
    <div className="bg-[#f8f7f3] font-sans pb-16 min-h-screen">
      {/* Main Container */}
      <div className="w-11/12 lg:w-10/12 mx-auto pt-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              <FiCheckCircle size={14} /> Verified Business Owner
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Business Performance & Analytics
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Logged in as <span className="font-semibold text-gray-800">{ownerEmail}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-colors cursor-pointer ${
                isEditing
                  ? "bg-gray-800 text-white hover:bg-gray-900"
                  : "bg-[#085027] text-white hover:bg-[#063d1e]"
              }`}
            >
              <FiEdit3 size={15} />
              <span>{isEditing ? "Close Edit Form" : "Edit Business"}</span>
            </button>
          
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-full transition-colors cursor-pointer"
            >
              <FiLogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Membership Plan & Billing Info Card (Outside Edit Form) */}
        {myProfile && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEFFF4] text-[#085027] flex items-center justify-center font-bold text-xl">
                <FiCreditCard size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#085027] bg-[#EEFFF4] px-3 py-1 rounded-full border border-green-100">
                    {myProfile.plan?.tier || "Standard"} Partner
                  </span>
                  {myProfile.payment_type && (
                    <span className="text-xs font-semibold text-gray-500 capitalize bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {myProfile.payment_type} Billing
                    </span>
                  )}
                  {myProfile.status && (
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      myProfile.status === "APPROVED" || myProfile.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {myProfile.status}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Duration: <strong className="text-gray-900 font-bold">{myProfile.duration_months || 1} Month(s)</strong>
                  {myProfile.plan?.base_price !== undefined && (
                    <span> · Base Price: <strong className="text-gray-900 font-bold">${myProfile.plan.base_price}/mo</strong></span>
                  )}
                  {myProfile.final_price !== undefined && (
                    <span> · Final Price: <strong className="text-[#085027] font-bold">${myProfile.final_price}</strong></span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Inline Edit Business Section */}
        {isEditing && (
          <EditBusinessSection
            businessId={analyticsData?.business_id || analyticsData?.business?.id}
            initialBusiness={analyticsData?.business}
            onClose={() => setIsEditing(false)}
            onSaved={() => refetch()}
          />
        )}

        {/* API Error state */}
        {isError && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between">
            <span>
              {error?.data?.detail || error?.data?.message || "Failed to load real-time analytics data."}
            </span>
            <button
              onClick={() => refetch()}
              className="underline font-bold text-red-800 hover:text-red-900 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Overview Metrics Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiBarChart2 className="text-[#085027]" /> Overview Metrics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Metric 1: Total Views */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Page Visits
                </span>
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#085027] flex items-center justify-center">
                  <FiEye size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalViews}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Total business page views</p>
            </div>

            {/* Metric 2: Phone Clicks */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Phone Calls
                </span>
                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiPhoneCall size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalPhoneClicks}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Phone call button taps</p>
            </div>

            {/* Metric 3: Website Clicks */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Website Visits
                </span>
                <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FiGlobe size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalWebsiteClicks}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Outbound website link clicks</p>
            </div>

            {/* Metric 4: WhatsApp Clicks */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  WhatsApp Clicks
                </span>
                <div className="w-9 h-9 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <FiMessageCircle size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalWhatsappClicks}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">WhatsApp direct chat clicks</p>
            </div>

            {/* Metric 5: Directions Clicks */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Directions
                </span>
                <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FiNavigation size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalDirectionsClicks}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Google Maps direction clicks</p>
            </div>

            {/* Metric 6: Instagram Clicks */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2.5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Instagram
                </span>
                <div className="w-9 h-9 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <FiInstagram size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : totalInstagramClicks}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Instagram profile clicks</p>
            </div>
          </div>
        </div>

        {/* Daily Analytics Table / Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiCalendar className="text-[#085027]" /> Daily Analytics Breakdown
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed view count and action clicks per day
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#085027] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-gray-500 font-medium">Loading daily analytics data...</p>
            </div>
          ) : dailyAnalytics.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No daily analytics data recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Date</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Website Clicks</th>
                    <th className="py-3 px-4">WhatsApp Clicks</th>
                    <th className="py-3 px-4">Directions Clicks</th>
                    <th className="py-3 px-4">Phone Clicks</th>
                    <th className="py-3 px-4 rounded-r-xl">Instagram Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {dailyAnalytics.map((item, idx) => (
                    <tr key={item.date || idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-gray-900">{item.date}</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-800 bg-emerald-50/40 rounded-lg">
                        {item.views ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">{item.website_clicks ?? 0}</td>
                      <td className="py-3.5 px-4 text-gray-700">{item.whatsapp_clicks ?? 0}</td>
                      <td className="py-3.5 px-4 text-gray-700">{item.directions_clicks ?? 0}</td>
                      <td className="py-3.5 px-4 text-gray-700">{item.phone_clicks ?? 0}</td>
                      <td className="py-3.5 px-4 text-gray-700">{item.instagram_clicks ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
