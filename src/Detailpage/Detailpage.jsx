import { useState, useRef } from "react";
import {
  FiPhone, FiMail, FiMapPin, FiGlobe, FiInstagram,
  FiArrowLeft, FiShare2, FiHeart, FiSend, FiNavigation,
  FiShield, FiTag, FiChevronRight, FiPlay
} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

// ══════════════════════════════════════════════════
//  SAMPLE DATA
// ══════════════════════════════════════════════════
export const SAMPLE_BUSINESS = {
  type: "business",
  badge: "Kosher Certified",
  name: "Home Decor Gifts",
  subtitle: "Home Gift · Home Store",
  coverImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=80",
  logoImage: null,
  actions: { call: "+1(212) 555-0066", website: "homedecoratgifts.com", instagram: "@homedecoratgifts", visitLabel: "Visit Store" },
  about: "Elegant gifts and home decor for every occasion. We carry a premium selection of gift baskets, candles, and luxury products for any lifestyle. Our curated store inventory is full of everything you need to refresh and update all your gift-giving occasions.",
  gallery: [
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&q=70",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=70",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=70",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&q=70",
  ],
  video: null,
  tags: [],
  related: [
    { name: "Home Gift",  businesses: 12, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&q=60" },
    { name: "Home Store", businesses: 8,  image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=60" },
  ],
  reviews: [
    { name: "Caleb Cohen",    badge: "Verified", rating: 5, text: "Exceptional experience! The team is outstanding and the service and environment of the community.", date: "2w ago" },
    { name: "Patrick Miller", badge: "Verified", rating: 4, text: "Had a wonderful experience here! Highly recommend by visiting here!", date: "3w ago" },
    { name: "Rachel Coleman", badge: null,       rating: 5, text: "Absolutely outstanding! The professionality and attitude of the staff is fantastic.", date: "1m ago" },
  ],
  contact: { phone: "+1(212) 555-0066", email: "info@homedecoratgifts.com", address: "48 Pine Ave, Lakewood, NJ 08717" },
  hours: { Monday: "9:00 AM – 6:00 PM", Tuesday: "9:00 AM – 6:00 PM", Wednesday: "10:00 AM – 5:00 PM", Thursday: "9:00 AM – 6:00 PM", Friday: "9:00 AM – 3:00 PM", Saturday: "Closed", Sunday: "Closed" },
  certifications: ["OU", "Vaad"],
  inquiry: { fields: ["name", "email", "phone", "message"] },
};

export const SAMPLE_RESTAURANT = {
  type: "restaurant",
  badge: "Kosher Certified",
  name: "Kosher Delights Restaurant",
  subtitle: "Restaurant · Fine Dining",
  coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
  logoImage: null,
  actions: { call: "+1(732) 555-0458", website: "kosherdelights.com", instagram: "@kosherdelights", visitLabel: "Visit Website" },
  about: "Upscale kosher dining with a modern twist. Fresh ingredients, traditional recipes, and a contemporary atmosphere make every meal memorable.",
  gallery: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=70",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&q=70",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=70",
  ],
  video: { src: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Kosher Delights Restaurant", sub: "Promotional Video" },
  tags: ["Glatt Kosher", "Dine In", "Takeout", "Catering"],
  related: [
    { name: "Royal Vault Cafe", businesses: 5, image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=200&q=60" },
    { name: "Modern Catering",  businesses: 9, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=60" },
  ],
  reviews: [
    { name: "Sarah Johnson",  badge: "Verified", rating: 5, text: "The food was absolutely incredible. Highly recommend the salmon!", date: "1w ago" },
    { name: "David Martinez", badge: "Verified", rating: 4, text: "Great atmosphere and very attentive staff. Will definitely return.", date: "2w ago" },
  ],
  contact: { phone: "+1(732) 555-0458", email: "info@kosherdelights.com", address: "456 Oak Avenue, Lakewood, NJ 08701" },
  hours: { Monday: "11:00 AM – 10:00 PM", Tuesday: "11:00 AM – 10:00 PM", Wednesday: "11:00 AM – 10:00 PM", Thursday: "11:00 AM – 10:00 PM", Friday: "11:00 AM – 3:00 PM", Saturday: "Closed", Sunday: "12:00 PM – 9:00 PM" },
  certifications: ["OK", "Vaad"],
  inquiry: { fields: ["name", "email", "phone", "date", "message"] },
};

// ══════════════════════════════════════════════════
//  SUB COMPONENTS
// ══════════════════════════════════════════════════
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating
          ? <FaStar key={i} size={11} color="#f59e0b" />
          : <FaRegStar key={i} size={11} color="#f59e0b" />
      )}
    </div>
  );
}

function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef();
  return (
    <div className="relative rounded-2xl overflow-hidden bg-black" style={{ height: 220 }}>
      <video
        ref={ref}
        src={video.src}
        className="w-full h-full object-cover"
        controls={playing}
        onClick={() => { setPlaying(true); ref.current?.play(); }}
      />
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={() => { setPlaying(true); ref.current?.play(); }}
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

  const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#085027] transition";
  const placeholders = { name: "Full name", email: "Email address", phone: "Phone number", message: "Your message...", date: "Preferred date" };
  const allFields = ["name", "email", "phone", ...(fields.includes("date") ? ["date"] : []), "message"];

  return (
    <div className="space-y-2.5">
      {allFields.map((f) =>
        f === "message"
          ? <textarea key={f} rows={3} placeholder={placeholders[f]} className={`${inputCls} resize-none`} value={form[f] || ""} onChange={(e) => set(f, e.target.value)} />
          : <input key={f} type="text" placeholder={placeholders[f]} className={inputCls} value={form[f] || ""} onChange={(e) => set(f, e.target.value)} />
      )}
      <button
        onClick={async () => { await new Promise((r) => setTimeout(r, 500)); setSent(true); setForm({}); setTimeout(() => setSent(false), 3000); }}
        className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-xs font-semibold py-3 rounded-xl transition-colors"
      >
        <FiSend size={13} /> {sent ? "✓ Sent!" : "Send Inquiry"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════
export default function DetailPage({ data = SAMPLE_BUSINESS, onBack }) {
  const d = data;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];

  return (
    <div className="min-h-screen bg-[#f8f7f3] font-sans">

      {/* Back */}
      <div className="px-6 pt-5 pb-2">
        <button
          onClick={onBack || (() => window.history.back())}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Cover */}
      <div className="mx-4 rounded-2xl overflow-hidden" style={{ height: 180 }}>
        <img src={d.coverImage} alt={d.name} className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="px-6 py-4 flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-amber-100 border-2 border-white shadow-md flex items-center justify-center flex-shrink-0">
          {d.logoImage
            ? <img src={d.logoImage} className="w-full h-full object-cover rounded-xl" alt="logo" />
            : <BsShop size={22} color="#92713a" />
          }
        </div>
        <div className="flex-1 min-w-0">
          {d.badge && (
            <div className="inline-flex items-center gap-1 bg-[#085027] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1">
              <FiShield size={9} /> {d.badge}
            </div>
          )}
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{d.name}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{d.subtitle}</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-2.5">
            {d.actions?.call && (
              <a href={`tel:${d.actions.call}`} className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
                <FiPhone size={12} /> Call
              </a>
            )}
            {d.actions?.website && (
              <a href={`https://${d.actions.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
                <FiGlobe size={12} /> Website
              </a>
            )}
            {d.actions?.instagram && (
              <a href="#" className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
                <FiInstagram size={12} /> Instagram
              </a>
            )}
            {d.actions?.visitLabel && (
              <button className="flex items-center gap-1.5 bg-[#085027] hover:bg-[#063d1e] text-white text-xs font-medium px-4 py-1.5 rounded-full transition-colors">
                <FiChevronRight size={12} /> {d.actions.visitLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Two-col layout */}
      <div className="px-6 pb-12 grid grid-cols-[1fr_260px] gap-6">

        {/* ── LEFT ── */}
        <div className="space-y-6">

          {/* About */}
          {d.about && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-2">About</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{d.about}</p>
            </section>
          )}

          {/* Gallery */}
          {d.gallery?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-2">Gallery</h2>
              <div className="grid grid-cols-3 gap-2">
                {d.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ height: 90 }}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {d.video && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-2">Video</h2>
              <VideoPlayer video={d.video} />
            </section>
          )}

          {/* Tags */}
          {d.tags?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {d.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-50 cursor-pointer transition-colors">
                    <FiTag size={10} /> {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Related */}
          {d.related?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3">Related Businesses</h2>
              <div className="grid grid-cols-2 gap-3">
                {d.related.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="h-28 overflow-hidden">
                      <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-bold text-gray-900">{r.name}</p>
                      <p className="text-[10px] text-gray-400">{r.businesses} businesses</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {d.reviews?.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-900 mb-3">Customer Reviews</h2>
              <div className="space-y-3">
                {d.reviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{r.name}</span>
                        {r.badge && (
                          <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full font-medium">
                            {r.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{r.text}</p>
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2.5">
                {d.contact.phone && (
                  <div className="flex items-center gap-2.5 text-xs text-gray-600">
                    <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <FiPhone size={13} color="#085027" />
                    </div>
                    {d.contact.phone}
                  </div>
                )}
                {d.contact.email && (
                  <div className="flex items-center gap-2.5 text-xs text-gray-600">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <FiMail size={13} color="#3b82f6" />
                    </div>
                    {d.contact.email}
                  </div>
                )}
                {d.contact.address && (
                  <div className="flex items-start gap-2.5 text-xs text-gray-600">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiMapPin size={13} color="#f97316" />
                    </div>
                    {d.contact.address}
                  </div>
                )}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors mt-4">
                <FiNavigation size={12} /> Get Directions
              </button>
              <div className="flex gap-2 mt-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 text-xs py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <FiShare2 size={11} /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 text-xs py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <FiHeart size={11} /> Save
                </button>
              </div>
            </div>
          )}

          {/* Hours */}
          {d.hours && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Business Hours</h3>
              <div className="space-y-1.5">
                {Object.entries(d.hours).map(([day, hours]) => (
                  <div key={day} className={`flex justify-between text-xs ${day === today ? "font-semibold text-[#085027]" : "text-gray-500"}`}>
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
              <h3 className="text-sm font-bold text-gray-900 mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-1.5">
                {d.certifications.map((c) => (
                  <span key={c} className="border border-gray-300 text-gray-600 text-xs px-2.5 py-1 rounded font-medium">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Send Inquiry</h3>
            <InquiryForm fields={d.inquiry?.fields || []} />
          </div>
        </div>
      </div>
    </div>
  );
}