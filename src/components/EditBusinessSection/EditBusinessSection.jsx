import { useEffect, useState } from "react";
import {
  FiX,
  FiUploadCloud,
  FiAlertCircle,
  FiCheckCircle,
  FiPlus,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import {
  useGetCommunitiesQuery,
  useGetCategoriesQuery,
  useUploadMediaMutation,
  useGetBusinessDetailsQuery,
  useGetMyBusinessProfileQuery,
  useRequestUpdateMutation,
} from "../../Api/businessDirectoryApi";
import toast from "react-hot-toast";

// Helpers
function getMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "object" && media.url) return media.url;
  return null;
}

function getUploadedMediaId(res) {
  if (!res) return null;
  if (typeof res === "number") return res;
  if (typeof res === "object" && res.id) return res.id;
  return null;
}

const DAYS_LIST = [
  { label: "Monday", short: "Mon" },
  { label: "Tuesday", short: "Tue" },
  { label: "Wednesday", short: "Wed" },
  { label: "Thursday", short: "Thu" },
  { label: "Friday", short: "Fri" },
  { label: "Saturday", short: "Sat" },
  { label: "Sunday", short: "Sun" },
];

const TIME_OPTIONS = [
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
  "Closed",
  "Open 24 Hours",
];

function BusinessHoursField({ value, onChange }) {
  const [rows, setRows] = useState([
    { startDay: "Monday", endDay: "Friday", openTime: "9:00 AM", closeTime: "6:00 PM" },
  ]);

  const getShortDay = (dayName) =>
    DAYS_LIST.find((d) => d.label === dayName)?.short || dayName;

  const formatRowText = (r) => {
    const startShort = getShortDay(r.startDay);
    const endShort = getShortDay(r.endDay);

    const dayText =
      !r.endDay || r.endDay === "None" || r.endDay === r.startDay
        ? startShort
        : `${startShort} - ${endShort}`;

    if (r.openTime === "Open 24 Hours" || r.closeTime === "Open 24 Hours") {
      return `${dayText}: Open 24 Hours`;
    } else if (r.closeTime === "Closed" || r.openTime === "Closed") {
      return `${dayText}: Closed`;
    }
    return `${dayText}: ${r.openTime} - ${r.closeTime}`;
  };

  const updateRows = (newRows) => {
    setRows(newRows);
    const result = newRows.map(formatRowText).join(", ");
    onChange({ target: { value: result } });
  };

  const updateRowField = (idx, field, val) => {
    const updated = rows.map((r, i) => (i === idx ? { ...r, [field]: val } : r));
    updateRows(updated);
  };

  const addRow = () => {
    const nextRow = {
      startDay: "Sunday",
      endDay: "None",
      openTime: "10:00 AM",
      closeTime: "4:00 PM",
    };
    updateRows([...rows, nextRow]);
  };

  const removeRow = (idx) => {
    if (rows.length === 1) return;
    const updated = rows.filter((_, i) => i !== idx);
    updateRows(updated);
  };

  return (
    <div className="space-y-3 bg-stone-50/80 p-3.5 sm:p-4 rounded-xl border border-stone-200/80">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs font-semibold text-stone-700">
          Business Hours
        </label>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full max-w-full truncate">
          {value || "Not set"}
        </span>
      </div>

      {/* Rows List */}
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-9 gap-2 items-end p-2.5 bg-white rounded-lg border border-stone-200"
          >
            <div className="sm:col-span-2">
              <label className="text-[11px] font-medium text-stone-500 mb-1 block">
                Start Day
              </label>
              <select
                value={row.startDay}
                onChange={(e) => updateRowField(idx, "startDay", e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
              >
                {DAYS_LIST.map((d) => (
                  <option key={d.label} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-medium text-stone-500 mb-1 block">
                End Day
              </label>
              <select
                value={row.endDay}
                onChange={(e) => updateRowField(idx, "endDay", e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
              >
                <option value="None">Same Day Only</option>
                {DAYS_LIST.map((d) => (
                  <option key={d.label} value={d.label}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-medium text-stone-500 mb-1 block">
                Opening Time
              </label>
              <select
                value={row.openTime}
                onChange={(e) => updateRowField(idx, "openTime", e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] font-medium text-stone-500 mb-1 block">
                Closing Time
              </label>
              <select
                value={row.closeTime}
                onChange={(e) => updateRowField(idx, "closeTime", e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-800 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1 flex justify-end">
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  title="Remove this schedule row"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition border border-emerald-200 cursor-pointer"
      >
        <FiPlus size={14} /> Add Hours Row
      </button>
    </div>
  );
}

const PLAN_META = {
  standard: {
    name: "Standard Partner",
    maxPhotos: 0,
    maxDescChars: 250,
  },
  featured: {
    name: "Featured Partner",
    maxPhotos: 5,
    maxDescChars: 350,
  },
  premium: {
    name: "Premium Partner",
    maxPhotos: 10,
    maxDescChars: 500,
  },
};

export default function EditBusinessSection({ businessId, initialBusiness, onClose, onSaved }) {
  const { data: myBusinessProfile, isLoading: profileLoading } = useGetMyBusinessProfileQuery();

  const targetId = myBusinessProfile?.id || businessId || initialBusiness?.id;

  const { data: fetchedDetails, isLoading: detailsLoading } = useGetBusinessDetailsQuery(targetId, {
    skip: !targetId,
  });

  const { data: communities = [], isLoading: communitiesLoading } = useGetCommunitiesQuery();
  const { data: categoriesData = [], isLoading: categoriesLoading } = useGetCategoriesQuery();

  const [uploadMedia] = useUploadMediaMutation();
  const [updateBusiness, { isLoading: isSaving }, error] = useRequestUpdateMutation();

  const activeBusiness = myBusinessProfile || fetchedDetails || initialBusiness || {};

  const planTier = (activeBusiness?.plan?.tier || "standard").toLowerCase();
  const planMeta = PLAN_META[planTier] || PLAN_META.standard;

  const [form, setForm] = useState({
    name: "",
    description: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    city: "",
    business_address: "",
    business_phone: "",
    business_hours: "",
    instagram: "",
    facebook: "",
    other_social_link: "",
    serving_areas: "",
    services_tags: "",
    occasions: "",
    website: "",
    promo_video_link: "",
    categories: [],
  });

  const descLength = (form.description || "").length;
  const descOverLimit = descLength > planMeta.maxDescChars;

  const [flyerFiles, setFlyerFiles] = useState([]);
  const [bannerFiles, setBannerFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Pre-fill form values when activeBusiness changes
  useEffect(() => {
    if (activeBusiness && Object.keys(activeBusiness).length > 0) {
      const initialCatIds = (activeBusiness.categories ?? []).map((c) =>
        typeof c === "object" ? c.id : c
      );

      const communityVal = activeBusiness.community
        ? activeBusiness.community.name || activeBusiness.community.id
        : activeBusiness.community_id || "";

      setForm({
        name: activeBusiness.name ?? "",
        description: activeBusiness.description ?? "",
        contact_email: activeBusiness.contact_email ?? "",
        contact_name: activeBusiness.contact_name ?? "",
        contact_phone: activeBusiness.contact_phone ?? "",
        city: communityVal,
        business_address: activeBusiness.business_address ?? "",
        business_phone: activeBusiness.business_phone ?? "",
        business_hours: activeBusiness.business_hours ?? "",
        instagram: activeBusiness.instagram ?? "",
        facebook: activeBusiness.facebook ?? "",
        other_social_link: activeBusiness.other_social_link ?? "",
        serving_areas: activeBusiness.serving_areas ?? "",
        services_tags: activeBusiness.services_tags ?? "",
        occasions: activeBusiness.occasions ?? "",
        website: activeBusiness.website ?? "",
        promo_video_link: activeBusiness.promo_video_link ?? "",
        categories: initialCatIds,
      });

      setFlyerFiles([]);
      setBannerFiles([]);
      setGalleryFiles([]);
      setUploadError("");
      setSuccessMsg("");
    }
  }, [activeBusiness]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleCategory = (catId) => {
    setForm((f) => {
      const current = f.categories || [];
      const updated = current.includes(catId)
        ? current.filter((id) => id !== catId)
        : [...current, catId];
      return { ...f, categories: updated };
    });
  };

  const handleFlyerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFlyerFiles([e.target.files[0]]);
    }
  };

  const handleBannerChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFiles([e.target.files[0]]);
    }
  };

  const handleGalleryChange = (e) => {
    setUploadError("");
    if (planMeta.maxPhotos === 0) {
      setUploadError(`Photo gallery is not included in ${planMeta.name}.`);
      return;
    }
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const remaining = planMeta.maxPhotos - galleryFiles.length;
      if (remaining <= 0) {
        setUploadError(`Reached the ${planMeta.maxPhotos}-photo limit for ${planMeta.name}.`);
        return;
      }
      setGalleryFiles((prev) => [...prev, ...newFiles.slice(0, remaining)]);
      if (newFiles.length > remaining) {
        setUploadError(`Only ${remaining} more photo${remaining !== 1 ? "s" : ""} allowed for ${planMeta.name}.`);
      }
    }
  };

  const handleRemoveGalleryFile = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    setSuccessMsg("");

    if (descOverLimit) {
      setUploadError(`Description exceeds the ${planMeta.maxDescChars}-character limit for ${planMeta.name}. Please shorten it.`);
      return;
    }

    setUploadingMedia(true);

    try {
      const matchedCommunity = communities.find(
        (c) => c.name === form.city || c.id === form.city
      );

      const payload = {
        id: targetId,
        name: form.name,
        description: form.description,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        business_address: form.business_address,
        business_phone: form.business_phone,
        business_hours: form.business_hours,
        serving_areas: form.serving_areas,
        instagram: form.instagram,
        facebook: form.facebook,
        other_social_link: form.other_social_link,
        services_tags: form.services_tags,
        occasions: form.occasions,
        website: form.website,
        ...(planTier === "premium" ? { promo_video_link: form.promo_video_link } : {}),
        categories: form.categories,
        ...(matchedCommunity ? { community_id: matchedCommunity.id } : {}),
      };

      // Upload Flyer image if selected
      if (flyerFiles.length > 0) {
        const formData = new FormData();
        formData.append("image", flyerFiles[0]);
        const res = await uploadMedia(formData).unwrap();
        const flyerId = getUploadedMediaId(res);
        if (flyerId) payload.flyer_image = flyerId;
      }

      // Upload Banner image if selected
      if (bannerFiles.length > 0) {
        const formData = new FormData();
        formData.append("image", bannerFiles[0]);
        const res = await uploadMedia(formData).unwrap();
        const bannerId = getUploadedMediaId(res);
        if (bannerId) payload.banner = bannerId;
      }

      // Upload Gallery Photos if selected
      if (galleryFiles.length > 0 && planMeta.maxPhotos > 0) {
        const photoIds = [];
        for (const file of galleryFiles) {
          const formData = new FormData();
          formData.append("image", file);
          const res = await uploadMedia(formData).unwrap();
          const pId = getUploadedMediaId(res);
          if (pId) photoIds.push(pId);
        }
        if (photoIds.length > 0) {
          payload.photo_ids = photoIds;
        }
      }

      setUploadingMedia(false);

      await updateBusiness(payload).unwrap();
      setSuccessMsg("Business details update request submitted successfully!");
      toast.success("Business details update request submitted successfully!");

      if (onSaved) onSaved();

      setTimeout(() => {
        if (onClose) onClose();
      }, 1800);
    } catch (err) {
      setUploadingMedia(false);
      console.error("Failed to update business details:", err);
      const apiErrorMsg =
        err?.data?.error ||
        err?.data?.detail ||
        err?.data?.message ||
        (typeof err?.data === "string" ? err.data : null);

      const displayErr =
        apiErrorMsg || "Failed to update business details. Please check your inputs and try again.";

      setUploadError(displayErr);
      toast.error(displayErr);
    }
  };

  const currentFlyerUrl = flyerFiles.length > 0
    ? URL.createObjectURL(flyerFiles[0])
    : getMediaUrl(activeBusiness.flyer_image);

  const currentBannerUrl = bannerFiles.length > 0
    ? URL.createObjectURL(bannerFiles[0])
    : getMediaUrl(activeBusiness.banner);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <div className="inline-block px-3 py-1 bg-green-50 text-[#085027] text-xs font-bold rounded-full mb-1 border border-green-100">
            Edit Listing Details ({planMeta.name})
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Update Business Profile Information
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Modify your contact details, services, business hours, and images.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-full transition cursor-pointer"
        >
          <FiX size={16} /> Hide Form
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-100 text-green-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
          <FiCheckCircle size={18} className="text-green-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-2">
          <FiAlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {profileLoading || (detailsLoading && !activeBusiness.id) ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#085027] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-gray-500 font-medium">Loading current business details...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Business Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Super Tech Solutions"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>

            {/* City / Community */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Community / City
              </label>
              <select
                value={form.city}
                onChange={update("city")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent bg-white transition"
              >
                <option value="">Select Community</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} {c.state ? `, ${c.state}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Contact Name
              </label>
              <input
                type="text"
                value={form.contact_name}
                onChange={update("contact_name")}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={update("contact_email")}
                placeholder="owner@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                value={form.contact_phone}
                onChange={update("contact_phone")}
                placeholder="+1 234 567 8900"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Address & Business Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Business Address
              </label>
              <input
                type="text"
                value={form.business_address}
                onChange={update("business_address")}
                placeholder="123 Tech Park, NY 10001"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Business WhatsApp / Direct Phone
              </label>
              <input
                type="text"
                value={form.business_phone}
                onChange={update("business_phone")}
                placeholder="+1 987 654 3210"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Business Description *
              </label>
              <span className={`text-xs font-medium ${descOverLimit ? "text-red-500 font-bold" : "text-gray-400"}`}>
                {descLength} / {planMeta.maxDescChars}
              </span>
            </div>
            <textarea
              rows={4}
              value={form.description}
              onChange={update("description")}
              placeholder="Providing top-notch tech solutions and consulting..."
              className={`w-full px-4 py-3 border ${
                descOverLimit ? "border-red-400 focus:ring-red-500" : "border-gray-200 focus:ring-[#085027]"
              } rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:border-transparent transition`}
            />
            {descOverLimit && (
              <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1 font-medium">
                <FiAlertCircle size={14} className="flex-shrink-0" />
                <span>
                  {planMeta.name} allows up to {planMeta.maxDescChars} characters. Please shorten your description.
                </span>
              </div>
            )}
          </div>

          {/* Media Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 rounded-2xl bg-gray-50/70 border border-gray-200/80">
            {/* Flyer Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Flyer Image
                </label>
                <span className="text-[10px] text-[#085027] bg-[#EEFFF4] border border-green-200 px-1.5 py-0.5 rounded font-bold">
                  600×600 px
                </span>
              </div>
              {currentFlyerUrl ? (
                <div className="relative h-28 rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img src={currentFlyerUrl} alt="Flyer preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  No flyer image
                </div>
              )}
              <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                <FiUploadCloud size={16} />
                <span>Upload New Flyer</span>
                <input type="file" accept="image/*" onChange={handleFlyerChange} className="hidden" />
              </label>
            </div>

            {/* Banner Image */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Banner Image
                </label>
                <span className="text-[10px] text-[#085027] bg-[#EEFFF4] border border-green-200 px-1.5 py-0.5 rounded font-bold">
                  1200×400 px
                </span>
              </div>
              {currentBannerUrl ? (
                <div className="relative h-28 rounded-xl overflow-hidden border border-gray-200 bg-white">
                  <img src={currentBannerUrl} alt="Banner preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  No banner image
                </div>
              )}
              <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                <FiUploadCloud size={16} />
                <span>Upload New Banner</span>
                <input type="file" accept="image/*" onChange={handleBannerChange} className="hidden" />
              </label>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Photo Gallery
                  </label>
                  {planMeta.maxPhotos > 0 && (
                    <span className="text-[10px] text-[#085027] bg-[#EEFFF4] border border-green-200 px-1.5 py-0.5 rounded font-bold">
                      800×600 px
                    </span>
                  )}
                </div>
                {planMeta.maxPhotos > 0 && (
                  <span className="text-xs text-gray-500">
                    ({galleryFiles.length} / {planMeta.maxPhotos})
                  </span>
                )}
              </div>

              {planMeta.maxPhotos > 0 ? (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-1 max-h-28 min-h-[7rem]">
                    {galleryFiles.map((file, idx) => (
                      <div key={idx} className="relative w-20 h-28 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                        <img src={URL.createObjectURL(file)} alt="Gallery file" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryFile(idx)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {galleryFiles.length === 0 && (
                      <div className="w-full h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                        Add gallery photos (up to {planMeta.maxPhotos})
                      </div>
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                    <FiPlus size={16} />
                    <span>Add Gallery Photos</span>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
                  </label>
                </>
              ) : (
                <div className="h-28 rounded-xl border border-gray-200 bg-gray-50 p-3 flex flex-col items-center justify-center text-center text-xs text-gray-500">
                  <span className="font-semibold text-gray-700 mb-1">Gallery Not Included</span>
                  <span>Photo gallery is not included in {planMeta.name}.</span>
                </div>
              )}
            </div>
          </div>

          {/* Categories Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Select Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categoriesData.map((cat) => {
                const isSel = form.categories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                      isSel
                        ? "bg-[#085027] text-white border-[#085027]"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Links & Web */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="text"
                value={form.instagram}
                onChange={update("instagram")}
                placeholder="https://instagram.com/supertech"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#085027]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Facebook URL
              </label>
              <input
                type="text"
                value={form.facebook}
                onChange={update("facebook")}
                placeholder="https://facebook.com/supertech"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#085027]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Uber Eats / Other Link
              </label>
              <input
                type="text"
                value={form.other_social_link}
                onChange={update("other_social_link")}
                placeholder="https://ubereats.com/..."
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#085027]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Website URL
              </label>
              <input
                type="text"
                value={form.website}
                onChange={update("website")}
                placeholder="https://supertech.com"
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#085027]"
              />
            </div>
          </div>

          {/* Promo Video (Only for Premium) */}
          {planTier === "premium" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Promo Video URL (YouTube, Vimeo, etc.)
              </label>
              <input
                type="url"
                value={form.promo_video_link}
                onChange={update("promo_video_link")}
                placeholder="https://youtube.com/..."
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#085027]"
              />
            </div>
          )}

          {/* Services & Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Services & Tags (Comma separated)
            </label>
            <input
              type="text"
              value={form.services_tags}
              onChange={update("services_tags")}
              placeholder="IT, Consulting, Software"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#085027]"
            />
          </div>

          {/* Business Hours (Multi-Row Component) */}
          <div>
            <BusinessHoursField
              value={form.business_hours}
              onChange={update("business_hours")}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadingMedia || descOverLimit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#085027] hover:bg-[#063d1e] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition disabled:opacity-60 cursor-pointer"
            >
              {(isSaving || uploadingMedia) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <FiSave size={16} />
                  <span>Request Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
