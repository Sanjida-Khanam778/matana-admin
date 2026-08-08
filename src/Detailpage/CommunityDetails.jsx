import { useState, useRef } from "react";
import { ScrollRestoration, useLocation, useParams, useNavigate } from "react-router-dom";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiInstagram,
  FiArrowLeft,
  FiShare2,
  FiHeart,
  FiSend,
  FiNavigation,
  FiTag,
  FiPlay,
} from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import related1 from "../assets/images/related1.png";
import related2 from "../assets/images/related2.png";
import logo from "../assets/icons/details_logo.png";
import { GrLocation } from "react-icons/gr";
import { useGetBusinessDetailsQuery, useSendInquiryMutation } from "../Api/businessDirectoryApi";
import ubereats from "../assets/images/ubereats.png"
import whatsapp from "../assets/images/whatsapp.png"
// export const SAMPLE_CAFE = {
//   type: "cafe",
//   badge: "Featured Business",
//   name: "Brooklyn Brew Cafe",
//   subtitle: "Cafe & Bakery",

//   coverImage:
//     "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
//   logoImage: logo,

//   actions: {
//     call: "+1 (718) 555-3456",
//     website: "brooklynbrewcafe.com",
//     instagram: "@brooklynbrewcafe",
//     other_social_link: "",
//     visitLabel: "Visit Website",
//   },

//   about:
//     "Founded in 2018, Brooklyn Brew Cafe is where handcrafted coffee meets artisan baking. From expertly roasted espresso to buttery croissants and fresh pastries, every item is made with premium ingredients. Whether you're grabbing your morning coffee, meeting friends, or working remotely, our cozy atmosphere is designed to make every visit memorable.",

//   gallery: [
//     "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
//     "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
//     "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
//   ],

//   video: null,

//   tags: ["Coffee", "Cafe", "Bakery", "Breakfast", "Free WiFi"],

//   related: [
//     {
//       name: "Zenith Space",
//       businesses: 8,
//       image: related1,
//     },
//     {
//       name: "Crust & Crumb",
//       businesses: 14,
//       image: related2,
//     },
//   ],

//   contact: {
//     phone: "(718) 555-3456",
//     email: "info@brooklynbrewcafe.com",
//     address: "126 Oak Avenue, Brooklyn, NY 11201",
//   },

//   hours: {
//     Sunday: "9:00 AM – 7:00 PM",
//     Monday: "6:00 AM – 7:00 PM",
//     Tuesday: "6:00 AM – 7:00 PM",
//     Wednesday: "6:00 AM – 7:00 PM",
//     Thursday: "6:00 AM – 7:00 PM",
//     Friday: "6:00 AM – 8:00 PM",
//     Saturday: "8:00 AM – 6:00 PM",
//   },


//   inquiry: {
//     fields: ["name", "email", "phone", "message"],
//   },
// };

// ══════════════════════════════════════════════════
//  SUB COMPONENTS
// ══════════════════════════════════════════════════

function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef();
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-black"
      style={{ height: 220 }}
    >
      <video
        ref={ref}
        src={video.src}
        className="w-full h-full object-cover"
        controls={playing}
        onClick={() => {
          setPlaying(true);
          ref.current?.play();
        }}
      />
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={() => {
            setPlaying(true);
            ref.current?.play();
          }}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <FiPlay size={22} color="#085027" fill="#085027" />
          </div>
        </div>
      )}
    </div>
  );
}

function InquiryForm({ fields = [], businessId }) {
  const [form, setForm] = useState({});
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sendInquiry, { isLoading: submitting }] = useSendInquiryMutation();

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs lg:text-base text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#085027] transition";
  const placeholders = {
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "Your message...",
    date: "Preferred date",
  };
  const allFields = [
    "name",
    "email",
    "phone",
    ...(fields.includes("date") ? ["date"] : []),
    "message",
  ];

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!form.name?.trim() || !form.email?.trim() || !form.message?.trim()) {
      setErrorMsg("Please fill in all required fields (name, email, message).");
      return;
    }

    try {
      const payload = {
        full_name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        message: form.message || "",
        business: businessId ? parseInt(businessId, 10) : 0,
      };
      await sendInquiry(payload).unwrap();
      setSent(true);
      setForm({});
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error("Failed to send inquiry:", err);
      setErrorMsg(err?.data?.detail || err?.data?.message || "Failed to send inquiry. Please try again.");
    }
  };

  return (
    <div className="space-y-2.5">
      {allFields.map((f) =>
        f === "message" ? (
          <textarea
            key={f}
            rows={3}
            placeholder={placeholders[f]}
            className={`${inputCls} resize-none`}
            value={form[f] || ""}
            onChange={(e) => set(f, e.target.value)}
          />
        ) : (
          <input
            key={f}
            type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
            placeholder={placeholders[f]}
            className={inputCls}
            value={form[f] || ""}
            onChange={(e) => set(f, e.target.value)}
          />
        )
      )}

      {errorMsg && (
        <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] disabled:opacity-60 text-white text-xs lg:text-base font-semibold py-3 rounded-xl transition-colors"
      >
        <FiSend size={16} /> {submitting ? "Sending..." : sent ? "✓ Sent!" : "Send Inquiry"}
      </button>
    </div>
  );
}

function formatWhatsAppUrl(phone) {
  if (!phone) return "#";
  let digits = String(phone).replace(/\D/g, "");
  if (!digits) return "#";

  // Bangladesh local 11-digit starting with 01 (e.g. 01544789954 -> 8801544789954)
  if (digits.length === 11 && digits.startsWith("01")) {
    digits = "88" + digits;
  }
  // 10-digit starting with 1 (BD without leading 0 e.g. 1544789954 -> 8801544789954)
  else if (digits.length === 10 && digits.startsWith("1")) {
    digits = "880" + digits;
  }
  // 10-digit standard US/Canada (e.g. 7185553456 -> 17185553456)
  else if (digits.length === 10) {
    digits = "1" + digits;
  }
  // If starts with 0 and hasn't matched above, strip leading zero
  else if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }

  return `https://api.whatsapp.com/send?phone=${digits}`;
}

// ══════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════
export default function CommunityDetails({ data , onBack }) {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const location = useLocation();
  const stateBusiness = location.state?.business;
  const targetId = paramId || stateBusiness?.id;

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Fetch business details from API if ID is available
  const { data: apiBusiness, isLoading } = useGetBusinessDetailsQuery(targetId, {
    skip: !targetId,
  });
  const [showCallNumber, setShowCallNumber] = useState(false);
  const b = apiBusiness || stateBusiness;

  const handleCallClick = (e) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || (window.innerWidth <= 768 && "ontouchstart" in window);

    if (!isMobile) {
      e.preventDefault();
      setShowCallNumber((prev) => !prev);
    }
  };

  // Construct dynamic data object `d`
  const d = {
    badge: b ? (b.is_featured ? "Featured Business" : null) : data.badge,
    name: b?.name || data.name,
    subtitle: b
      ? b.services_tags || (b.community ? `${b.community.name}, ${b.community.state}` : "")
      : data.subtitle,
    coverImage:
      b?.banner ||
      b?.flyer_image ||
      b?.community?.image ||
      data.coverImage,
    logoImage: b?.flyer_image,

    actions: {
      call: b?.business_phone || b?.contact_phone || data.actions?.call,
      website: b?.website,
      instagram: b?.instagram,
      facebook: b?.facebook,
      business_phone: b?.business_phone,
      other_social_link: b?.other_social_link,
    },

    about: b?.description,

    photos:
      b?.photos && Array.isArray(b.photos) && b.photos.length > 0
        ? b.photos
        : b?.flyer_image
        ? [b.flyer_image]
        : data?.gallery || [],

    gallery:
      b?.photos && Array.isArray(b.photos) && b.photos.length > 0
        ? b.photos
        : b?.flyer_image
        ? [b.flyer_image]
        : data?.gallery || [],

    video: b?.promo_video_link && { src: b.promo_video_link } ,

    tags: b?.services_tags
      ? b.services_tags.split(",").map((t) => t.trim()).filter(Boolean)
      : data.tags,

    related: (b?.related_businesses || []).map((r) => ({
      id: r.id,
      name: r.name,
      category: r.services_tags ? r.services_tags.split(",")[0].trim() : "Business Services",
      location: r.community ? `${r.community.name}, ${r.community.state}` : r.business_address || "",
      image: r.flyer_image || r.community?.image || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      raw: r,
    })),

    contact: {
      phone: b?.business_phone || b?.contact_phone || data.contact?.phone,
      email: b?.contact_email || data.contact?.email,
      address:
        b?.business_address ||
        (b?.community ? `${b.community.name}, ${b.community.state}` : data.contact?.address),
      website: b?.website || data.contact?.website,
    },

    hours: b?.business_hours || data.hours,
    inquiry: [],
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = days[new Date().getDay()];

  if (isLoading && !stateBusiness) {
    return (
      <div className="min-h-screen bg-[#f8f7f3] font-sans flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">
      <ScrollRestoration />

      {/* Cover */}
      <div className="overflow-hidden relative" style={{ height: 380 }}>
        <img
          src={d.coverImage}
          alt={d.name}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-sm text-black bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <FiArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Header */}
      <div className="lg:w-10/12 w-11/12 mx-auto py-4 flex items-start gap-3 xl:gap-6 my-10">
        <div className="w-28 h-28 rounded-xl flex items-center justify-center flex-shrink-0">
          {d.logoImage ? (
            <img
              src={d.logoImage}
              className="w-full h-full object-cover rounded-xl"
              alt="logo"
            />
          ) : (
            <BsShop size={22} color="#92713a" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          {d.badge && (
            <div className="inline-flex items-center gap-1 bg-[#085027] text-white text-sm font-semibold px-4 py-1 rounded-full mb-1">
              {d.badge}
            </div>
          )}
          <h1 className="text-lg md:text-2xl xl:text-4xl font-bold text-gray-900 leading-tight">
            {d.name}
          </h1>
          {d.subtitle && (
            <p className="text-xs lg:text-base text-gray-500 mt-0.5">
              {d.subtitle}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            {d.actions?.call && (
              <a
                href={`tel:${d.actions.call}`}
                onClick={handleCallClick}
                className="flex items-center gap-1.5 bg-[#085027] text-white font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                title={d.actions.call}
              >
                <FiPhone size={18} /> {showCallNumber ? d.actions.call : "Call"}
              </a>
            )}
            {d.actions?.website && (
              <a
                href={
                  d.actions.website.startsWith("http")
                    ? d.actions.website
                    : `https://${d.actions.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-black border-2 font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <FiGlobe size={18} /> Website
              </a>
            )}
            {d.actions?.instagram && (
              <a
                href={
                  d.actions.instagram.startsWith("http")
                    ? d.actions.instagram
                    : `https://instagram.com/${d.actions.instagram.replace("@", "")}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-black border-2 font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <FiInstagram size={18} /> Instagram
              </a>
            )}
            {(d.actions?.business_phone || d.actions?.call) && (
              <a
                href={formatWhatsAppUrl(d.actions.business_phone || d.actions.call)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="whatsapp" className="w-12" />
              </a>
            )}
            {(
              <a href={d.actions.other_social_link} target="_blank" rel="noopener noreferrer">
                <img src={ubereats} alt="ubereats" className="w-11" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Two-col layout */}
      <div className="lg:w-10/12 w-11/12 mx-auto pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ── LEFT ── */}
        <div className="space-y-6 col-span-2 lg:col-span-2">
          {/* About */}
          {d.about && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-2">
                About
              </h2>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                {d.about}
              </p>
            </section>
          )}

          {/* Gallery */}
          {d.photos?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-2 lg:mb-4">
                Gallery
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {d.photos.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl"
                    style={{ height: 250 }}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {d.video && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-2">
                Video
              </h2>
              <VideoPlayer video={d.video} />
            </section>
          )}

          {/* Tags */}
          {d.tags?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-2">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <FiTag size={10} /> {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Related */}
          {d.related?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3">
                Related Businesses
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {d.related.map((r, i) => (
                  <div
                    key={r.id || i}
                    onClick={() => {
                      navigate(`/community-details/${r.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="h-52 overflow-hidden bg-gray-100">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80";
                        }}
                      />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-900 line-clamp-1">
                        {r.name}
                      </p>
                      {r.category && (
                        <p className="text-xs md:text-sm py-1 text-gray-400 truncate">{r.category}</p>
                      )}
                      {r.location && (
                        <p className="text-xs md:text-sm flex items-center gap-1.5 text-gray-400 truncate">
                          <GrLocation className="flex-shrink-0" /> {r.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── RIGHT ── */}
        <div className="space-y-4">
          {/* Contact */}
          {d.contact && (
            <div className="bg-[#f8f9fa] rounded-[24px] border border-gray-200/80 p-5 flex flex-col gap-4 font-inter">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 font-inter">
                Contact Information
              </h3>

              <div className="flex flex-col gap-3">
                {/* Phone */}
                {d.contact.phone && (
                  <div className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <FiPhone size={18} color="#085027" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-gray-400 font-medium font-inter">
                        Phone
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-0.5 font-inter">
                        {d.contact.phone}
                      </span>
                    </div>
                  </div>
                )}

                {/* Email */}
                {d.contact.email && (
                  <div className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <FiMail size={18} color="#d97706" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Email
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-0.5 break-all">
                        {d.contact.email}
                      </span>
                    </div>
                  </div>
                )}

                {/* Address */}
                {d.contact.address && (
                  <div className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <FiMapPin size={18} color="#059669" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Address
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-gray-900 leading-tight mt-0.5">
                        {d.contact.address}
                      </span>
                    </div>
                  </div>
                )}

                {/* Website */}
                {(d.contact.website || d.actions?.website) && (
                  <div className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FiGlobe size={18} color="#2563eb" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Website
                      </span>
                      <span className="text-sm sm:text-base font-inter font-semibold text-gray-900 leading-tight mt-0.5 break-all">
                        {d.contact.website || d.actions?.website}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Directions Button */}
              {d.contact?.address ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-sm sm:text-base font-bold py-3 rounded-full transition-colors mt-2 shadow-sm"
                >
                  <FiNavigation size={18} className="rotate-45" /> Get Directions
                </a>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-gray-300 text-white text-sm sm:text-base font-bold py-3 rounded-full cursor-not-allowed mt-2 shadow-sm"
                >
                  <FiNavigation size={18} className="rotate-45" /> Get Directions
                </button>
              )}

              {/* Action buttons */}
              {/* <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors font-bold shadow-sm">
                  <FiShare2 size={16} /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors font-bold shadow-sm">
                  <FiHeart size={16} /> Save
                </button>
              </div> */}
            </div>
          )}

          {/* Hours */}
          {d.hours && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3">
                Business Hours
              </h3>
              {typeof d.hours === "object" ? (
                <div className="space-y-1.5">
                  {Object.entries(d.hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className={`flex justify-between text-xs lg:text-base ${day === today ? "font-semibold text-[#085027]" : "text-gray-500"
                        }`}
                    >
                      <span>{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs lg:text-base text-gray-600 font-medium">
                  {d.hours}
                </div>
              )}
            </div>
          )}

          {/* Inquiry */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3 lg:mb-6">
              Send Secure Inquiry
            </h3>
            <InquiryForm fields={d.inquiry?.fields || []} businessId={targetId} />
          </div>
        </div>
      </div>
    </div>
  );
}
