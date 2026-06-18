import { FaStar } from "react-icons/fa";
import { IoChevronForwardSharp, IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useScrollRevealGentle } from "../../hooks/useScrollReveal";
import { IMAGES } from "../../assets";

const venues = [
  {
    id: 1,
    name: "Anniversaries",
    description:
      "Brooklyn's premier kosher event venue for weddings, bar/bat mitzvahs, and simchas.",
    address: "123 Main Street, Brooklyn, NY 11230",
    rating: 4.9,
    reviews: 324,
    phone: "(718) 555-0123",
    certifications: ["OU", "Vaad"],
    kosherCertified: true,
    image: IMAGES.eventVenue1,
  },
  {
    id: 2,
    name: "Bar Mitzvahs",
    description:
      "Upscale kosher dining with a modern twist. Fresh ingredients, traditional recipes, and contemporary.",
    address: "456 Oak Avenue, Lakewood, NJ 08701",
    rating: 4.8,
    reviews: 256,
    phone: "(732) 555-0456",
    certifications: ["OK", "Vaad"],
    kosherCertified: true,
    image: IMAGES.eventVenue2,
  },
  {
    id: 3,
    name: "Corporate Gift",
    description:
      "Exceptional kosher catering for all your special events. From intimate gatherings to grand.",
    address: "789 Cedar Lane, Queens, NY 11375",
    rating: 4.9,
    reviews: 189,
    phone: "(718) 555-0789",
    certifications: ["OU", "OK"],
    kosherCertified: false,
    image: IMAGES.eventVenue3,
  },
  {
    id: 4,
    name: "Birthdays",
    description:
      "Stylish and modern home decor with a Jewish touch. Transform your space with our curated.",
    address: "321 Elm Street, Brooklyn, NY 11204",
    rating: 4.7,
    reviews: 412,
    phone: "(718) 555-0321",
    certifications: ["Certified"],
    kosherCertified: false,
    image: IMAGES.eventVenue4,
  },
  {
    id: 5,
    name: "Shabbos Host",
    description:
      "Experience fine dining with authentic kosher cuisine in an elegant setting.",
    address: "555 Main Ave, Queens, NY 11375",
    rating: 4.8,
    reviews: 298,
    phone: "(718) 555-0555",
    certifications: ["OU", "OK"],
    kosherCertified: false,
    image: IMAGES.eventVenue5,
  },
  {
    id: 6,
    name: "Engagements, Vorts & Weddings",
    description:
      "Full-service event planning and coordination for all your special occasions.",
    address: "888 Party Lane, Miami, FL 33101",
    rating: 4.9,
    reviews: 176,
    phone: "(305) 555-0888",
    certifications: ["Certified"],
    kosherCertified: true,
    image: IMAGES.eventVenue6,
  },
];

// ── Cert Badge ─────────────────────────────────────
function CertBadge({ label }) {
  return (
    <span className="inline-flex items-center border border-gray-300 text-gray-600 bg-gray-100 text-sm font-semibold px-2 py-0.5 rounded-sm tracking-wide">
      {label}
    </span>
  );
}

// ── Venue Card ─────────────────────────────────────
const venueRevealStyles = ["reveal-scale", "reveal-slide-up", "reveal-swish"];

function VenueCard({ venue, animationClass }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/category-details", { state: { venue } });
  };

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col reveal ${animationClass} cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-52 flex-shrink-0">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {venue.kosherCertified && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#1a5c3a] text-white text-xs lg:text-sm font-semibold px-2.5 py-1 rounded-full">
            <FaStar />
            Kosher Certified
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name + description */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-snug">
          {venue.name}
        </h3>
        <p className="text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {venue.description}
        </p>

        {/* Address */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="mt-0.5 flex-shrink-0">
            <IoLocationOutline className="text-xl" />
          </span>
          <span className=" text-gray-500">{venue.address}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <FaStar className="text-yellow-500 mr-1.5" />
          <span className=" font-semibold text-gray-800">{venue.rating}</span>
          <span className=" text-gray-400">({venue.reviews} reviews)</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-1.5 mb-3">
          <LuPhone className="mr-1" />
          <span className="text-gray-500">{venue.phone}</span>
        </div>

        {/* Cert badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {venue.certifications.map((c) => (
            <CertBadge key={c} label={c} />
          ))}
        </div>

        {/* Call Now button — pushed to bottom */}
        <div className="mt-auto flex items-center gap-2">
          <button className="w-full flex items-center justify-between bg-primary hover:bg-[#155230] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
            <span className="flex-1 text-center">Call Now</span>
          </button>
          <span className="w-10 h-10 rounded-full bg-white/20 border-2 flex items-center justify-center flex-shrink-0">
            <IoChevronForwardSharp />
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────
export default function EventVenues() {
  useScrollRevealGentle();
  return (
    <section className="w-full py-14 px-6 font-inter reveal reveal-slide-up">
      <div className="w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-semibold text-sm lg:text-base text-primary uppercase mb-2">
            Simchas &amp; Celebrations
          </p>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900">
            Event Venues &amp; Spaces
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {venues.map((venue, index) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              animationClass={
                venueRevealStyles[index % venueRevealStyles.length]
              }
            />
          ))}
        </div>

        {/* Browse All */}
        <div className="flex justify-center">
          <Link
            to="/all-events"
            className="border border-gray-400 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium px-8 py-3 rounded-full transition-colors shadow-sm"
          >
            Browse All Businesses
          </Link>
        </div>
      </div>
    </section>
  );
}
