import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import {
  FiEye,
  FiPhoneCall,
  FiGlobe,
  FiNavigation,
  FiInstagram,
  FiLogOut,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
  FiExternalLink,
  FiCheckCircle,
  FiCalendar,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";
import { BsShop } from "react-icons/bs";

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const [ownerEmail, setOwnerEmail] = useState("");
  const [activeTimeframe, setActiveTimeframe] = useState("30days");

  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth");
    if (!token) {
      navigate("/business-login");
      return;
    }
    const email = localStorage.getItem("business_owner_email") || "Business Owner";
    setOwnerEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("auth");
    localStorage.removeItem("business_owner_email");
    navigate("/business-login");
  };

  // Static Analytics Data (as requested)
  const analytics = {
    pageVisits: { count: "2,845", change: "+14.2%", isPositive: true },
    phoneClicks: { count: "412", change: "+8.5%", isPositive: true },
    websiteClicks: { count: "689", change: "+22.0%", isPositive: true },
    directionsClicks: { count: "315", change: "+5.4%", isPositive: true },
    socialClicks: { count: "524", change: "+18.1%", isPositive: true },
    inquiries: { count: "48", change: "+12.0%", isPositive: true },
  };

  const weeklyTraffic = [
    { day: "Mon", visits: 320, clicks: 85 },
    { day: "Tue", visits: 410, clicks: 110 },
    { day: "Wed", visits: 480, clicks: 145 },
    { day: "Thu", visits: 520, clicks: 160 },
    { day: "Fri", visits: 610, clicks: 210 },
    { day: "Sat", visits: 290, clicks: 70 },
    { day: "Sun", visits: 215, clicks: 45 },
  ];

  const recentActivities = [
    { type: "Phone Call", text: "Customer clicked Phone Call button", location: "Brooklyn, NY", time: "12 mins ago", icon: FiPhoneCall, color: "text-green-600 bg-green-50" },
    { type: "Directions", text: "Get Directions request triggered via Google Maps", location: "Passaic, NJ", time: "45 mins ago", icon: FiNavigation, color: "text-blue-600 bg-blue-50" },
    { type: "Inquiry", text: "New secure inquiry submitted by Sarah M.", location: "New York, NY", time: "2 hours ago", icon: FiMessageSquare, color: "text-amber-600 bg-amber-50" },
    { type: "Website", text: "Customer clicked Visit Website link", location: "Lakewood, NJ", time: "3 hours ago", icon: FiGlobe, color: "text-purple-600 bg-purple-50" },
    { type: "Instagram", text: "Social media profile redirect to Instagram", location: "Miami Beach, FL", time: "5 hours ago", icon: FiInstagram, color: "text-pink-600 bg-pink-50" },
  ];

  return (
    <div className="bg-[#f8f7f3] font-sans pb-16">
    
   

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
            <Link
              to="/all-community-stores"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#085027] border-2 border-[#085027] hover:bg-green-50 px-4 py-2.5 rounded-full transition-colors"
            >
              <BsShop size={16} /> View Public Directory
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-full transition-colors cursor-pointer"
            >
              <FiLogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics Grid Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiBarChart2 className="text-[#085027]" /> Overview Metrics
            </h2>
          
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Page Visits */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Page Visits</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#085027] flex items-center justify-center">
                  <FiEye size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.pageVisits.count}</span>
              
              </div>
              <p className="text-xs text-gray-400">Total views on your business detail page</p>
            </div>

            {/* Card 2: Phone Clicks */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Calls</span>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiPhoneCall size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.phoneClicks.count}</span>
              
              </div>
              <p className="text-xs text-gray-400">Direct phone call button taps</p>
            </div>

            {/* Card 3: Website Clicks */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Website Visits</span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FiGlobe size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.websiteClicks.count}</span>
              
              </div>
              <p className="text-xs text-gray-400">Outbound clicks to your external website</p>
            </div>

            {/* Card 4: Directions Clicks */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Directions Clicks</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FiNavigation size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.directionsClicks.count}</span>
               
              </div>
              <p className="text-xs text-gray-400">Google Maps directions button triggers</p>
            </div>

            {/* Card 5: Social Media Clicks */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Social Media Clicks</span>
                <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <FiInstagram size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.socialClicks.count}</span>
               
              </div>
              <p className="text-xs text-gray-400">Instagram, WhatsApp & Social link clicks</p>
            </div>

            {/* Card 6: Secure Inquiries */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inquiries Received</span>
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FiMessageSquare size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">{analytics.inquiries.count}</span>
               
              </div>
              <p className="text-xs text-gray-400">Messages sent via secure inquiry form</p>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
}
