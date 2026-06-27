import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  FiShield,
  FiTag,
  FiChevronRight,
  FiPlay,
} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import detailsImage from "../assets/images/detailsHeader.png";
import decor1 from "../assets/images/decor1.png";
import decor2 from "../assets/images/decor2.png";
import decor3 from "../assets/images/decor3.png";
import related1 from "../assets/images/related1.png";
import related2 from "../assets/images/related2.png";
import logo from "../assets/icons/details_logo.png";
import { LocateIcon, PlayCircle, PlayIcon } from "lucide-react";
import { GrLocation } from "react-icons/gr";

export const SAMPLE_CAFE = {
  type: "cafe",
  badge: "Featured Business",
  name: "Brooklyn Brew Cafe",
  subtitle: "Cafe & Bakery",

  coverImage:
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
  logoImage: logo,

  actions: {
    call: "+1 (718) 555-3456",
    website: "brooklynbrewcafe.com",
    instagram: "@brooklynbrewcafe",
    visitLabel: "Visit Website",
  },

  about:
    "Founded in 2018, Brooklyn Brew Cafe is where handcrafted coffee meets artisan baking. From expertly roasted espresso to buttery croissants and fresh pastries, every item is made with premium ingredients. Whether you're grabbing your morning coffee, meeting friends, or working remotely, our cozy atmosphere is designed to make every visit memorable.",

  gallery: [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  ],

  video: null,

  tags: [
    "Coffee",
    "Cafe",
    "Bakery",
    "Breakfast",
    "Free WiFi",
  ],

  related: [
    {
      name: "Zenith Space",
      businesses: 8,
      image: related1,
    },
    {
      name: "Crust & Crumb",
      businesses: 14,
      image: related2,
    },
  ],

  reviews: [
    {
      name: "Sarah Cohen",
      badge: "Verified",
      rating: 5,
      text: "Absolutely wonderful experience! The coffee is outstanding and the service is exceptional. Highly recommend everyone to visit.",
      date: "May 15, 2025",
    },
    {
      name: "David Levy",
      badge: "Verified",
      rating: 5,
      text: "Best cafe in the area. Great selection and very helpful staff. We'll definitely be coming back.",
      date: "April 23, 2025",
    },
    {
      name: "Rachel Goldstein",
      badge: "Verified",
      rating: 4,
      text: "Good quality pastries and friendly service. Prices are fair and the atmosphere is welcoming.",
      date: "April 5, 2025",
    },
  ],

  contact: {
    phone: "(718) 555-3456",
    email: "info@brooklynbrewcafe.com",
    address: "126 Oak Avenue, Brooklyn, NY 11201",
  },

  hours: {
    Sunday: "9:00 AM – 7:00 PM",
    Monday: "6:00 AM – 7:00 PM",
    Tuesday: "6:00 AM – 7:00 PM",
    Wednesday: "6:00 AM – 7:00 PM",
    Thursday: "6:00 AM – 7:00 PM",
    Friday: "6:00 AM – 8:00 PM",
    Saturday: "8:00 AM – 6:00 PM",
  },

  certifications: ["OK", "Health"],

  inquiry: {
    fields: ["name", "email", "phone", "message"],
  },
};

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

function InquiryForm({ fields = [] }) {
  const [form, setForm] = useState({});
  const [sent, setSent] = useState(false);
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

  return (
    <div className="space-y-2.5">
      {allFields.map((f) =>
        f === "message" ? (
          <>
            <textarea
              key={f}
              rows={3}
              placeholder={placeholders[f]}
              className={`${inputCls} resize-none`}
              value={form[f] || ""}
              onChange={(e) => set(f, e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              key={f}
              type="text"
              placeholder={placeholders[f]}
              className={inputCls}
              value={form[f] || ""}
              onChange={(e) => set(f, e.target.value)}
            />
          </>
        ),
      )}
      <button
        onClick={async () => {
          await new Promise((r) => setTimeout(r, 500));
          setSent(true);
          setForm({});
          setTimeout(() => setSent(false), 3000);
        }}
        className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-xs lg:text-base font-semibold py-3 rounded-xl transition-colors"
      >
        <FiSend size={16} /> {sent ? "✓ Sent!" : "Send Inquiry"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════
export default function CommunityDetails({ data = SAMPLE_CAFE, onBack }) {
  const location = useLocation();
  const stateBusiness = location.state?.business;
  const d = data;
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

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">
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
          onClick={onBack || (() => window.history.back())}
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-sm text-black bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
        >
          <FiArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Header */}
      <div className="lg:w-10/12 w-11/12 mx-auto py-4 flex items-start gap-3 xl:gap-6 my-10">
        <div className="w-18 h-18 rounded-xl flex items-center justify-center flex-shrink-0">
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
          <p className="text-xs lg:text-base text-gray-500 mt-0.5">
            {d.subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-2.5">
            {d.actions?.call && (
              <a
                href={`tel:${d.actions.call}`}
                className="flex items-center gap-1.5 bg-primary text-white font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <FiPhone size={18} /> Call
              </a>
            )}
            {d.actions?.website && (
              <a
                href={`https://${d.actions.website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-black border-2 font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <FiGlobe size={18} /> Website
              </a>
            )}
            {d.actions?.instagram && (
              <a
                href="#"
                className="flex items-center gap-1.5 text-black border-2 font-medium px-3 py-1.5 rounded-full transition-colors"
              >
                <FiInstagram size={18} /> Instagram
              </a>
            )}
            {d.actions?.visitLabel && (
              <button className="flex items-center gap-1.5 bg-[#D4AF37] font-medium px-4 py-1.5 rounded-full transition-colors">
                <PlayIcon size={18} /> {d.actions.visitLabel}
              </button>
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
          {d.gallery?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-2 lg:mb-4">
                Inside The Caffe
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {d.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden"
                    style={{ height: 250 }}
                  >
                    <img
                      src={img}
                      alt=""
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
              <h2 className="text-sm md:text-lg xl:text-2xl  font-bold text-gray-900 mb-2">
                Video
              </h2>
              <VideoPlayer video={d.video} />
            </section>
          )}

          {/* Tags */}
          {d.tags?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl  font-bold text-gray-900 mb-2">
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
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="h-52 overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-900">
                        {r.name}
                      </p>
                      <p className="text-base py-1 text-gray-400">Gift Shops</p>
                      <p className="text-base flex items-center gap-2 text-gray-400">
                        <GrLocation /> Lakewood, N J
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {/* {d.reviews?.length > 0 && (
            <section>
              <h2 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3">
                Customer Reviews
              </h2>
              <div className="space-y-3">
                {d.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="bg-[#F5F5F5] rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5"
                  >
                    <div className="">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 text-lg flex items-center justify-center rounded-full font-bold text-primary bg-green-50">
                            S
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                              {" "}
                              <span className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-gray-900">
                                {r.name}
                              </span>
                              {r.badge && (
                                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-medium">
                                  {r.badge}
                                </span>
                              )}
                              <div className="flex items-center gap-1" />
                            </div>
                            <div className="text-sm text-gray-400">
                              May 15, 2026
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1">
                          {" "}
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <p className=" text-gray-500 mt-4 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )} */}
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
              <button className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-sm sm:text-base font-bold py-3 rounded-full transition-colors mt-2 shadow-sm">
                <FiNavigation size={18} className="rotate-45" /> Get Directions
              </button>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors font-bold shadow-sm">
                  <FiShare2 size={16} /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-sm py-2.5 rounded-full hover:bg-gray-50 transition-colors font-bold shadow-sm">
                  <FiHeart size={16} /> Save
                </button>
              </div>
            </div>
          )}

          {/* Hours */}
          {d.hours && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3">
                Business Hours
              </h3>
              <div className="space-y-1.5">
                {Object.entries(d.hours).map(([day, hours]) => (
                  <div
                    key={day}
                    className={`flex justify-between text-xs lg:text-base ${day === today ? "font-semibold text-[#085027]" : "text-gray-500"}`}
                  >
                    <span>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {d.certifications?.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3 lg:mb-6">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {d.certifications.map((c) => (
                  <span
                    key={c}
                    className="border border-gray-300 bg-primary/10 text-primary text-xs lg:text-base px-2.5 py-1 rounded font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm md:text-lg xl:text-2xl font-bold text-gray-900 mb-3 lg:mb-6">
              Send Secure Inquiry
            </h3>
            <InquiryForm fields={d.inquiry?.fields || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
