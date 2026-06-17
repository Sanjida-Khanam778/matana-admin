import { useState } from "react";
import logo from "../../assets/images/logo.png";

// ── Icons ──────────────────────────────────────────
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  );
}

const CERT_OPTIONS = ["OU", "OK", "Vaad", "Star-K", "CRC", "Other"];
const NAV_LINKS = ["Home", "Location", "About", "Contact"];

// ── Step Indicator ─────────────────────────────────
function StepIndicator({ step }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Step 1 */}
      <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${step === 1 ? "bg-[#085027] text-white" : "bg-gray-100 text-gray-500"}`}>
        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? "bg-white text-[#085027]" : "bg-gray-300 text-white"}`}>1</span>
        Basic Information
      </div>
      {/* Line */}
      <div className="flex-1 h-px bg-gray-200" />
      {/* Step 2 */}
      <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${step === 2 ? "bg-[#085027] text-white" : "bg-gray-100 text-gray-500"}`}>
        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2 ? "bg-white text-[#085027]" : "bg-gray-300 text-white"}`}>2</span>
        Media Upload
      </div>
    </div>
  );
}

// ── Modal Shell ────────────────────────────────────
function ModalShell({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Dark green header */}
        <div className="bg-[#085027] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <ListIcon />
            </div>
            <div>
              <p className="text-white font-semibold text-base leading-tight">List Your Business</p>
              <p className="text-white/70 text-xs">Join our directory and reach thousands of customers</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <XIcon />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Basic Information ──────────────────────
function Step1({ onNext, onClose }) {
  const [form, setForm] = useState({ name: "", category: "", description: "", address: "", city: "Brooklyn", state: "NY", zip: "11230", phone: "", email: "", kosherLevel: "" });
  const [certs, setCerts] = useState([]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggleCert = (c) => setCerts((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#085027] transition bg-white";

  return (
    <>
      <StepIndicator step={1} />
      <div className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business Name <span className="text-red-500">*</span></label>
          <input className={inputCls} placeholder="Enter your business name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
          <input className={inputCls} placeholder="" value={form.category} onChange={(e) => set("category", e.target.value)} />
        </div>
        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
          <textarea rows={4} className={`${inputCls} resize-none`} placeholder="Describe your business, services, and what makes you unique..." value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        {/* Street Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Street Address <span className="text-red-500">*</span></label>
          <input className={inputCls} placeholder="123 Main Street" value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
        {/* City / State / ZIP */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
            <input className={inputCls} value={form.city} onChange={(e) => set("city", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
            <input className={inputCls} value={form.state} onChange={(e) => set("state", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">ZIP <span className="text-red-500">*</span></label>
            <input className={inputCls} value={form.zip} onChange={(e) => set("zip", e.target.value)} />
          </div>
        </div>
        {/* Phone / Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
            <input className={inputCls} placeholder="(555) 123-4567" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
            <input className={inputCls} placeholder="info@business.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
        {/* Kosher Supervision */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kosher Supervision Level</label>
          <input className={inputCls} value={form.kosherLevel} onChange={(e) => set("kosherLevel", e.target.value)} />
        </div>
        {/* Kosher Certifications */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Kosher Certifications</label>
          <div className="flex flex-wrap gap-2">
            {CERT_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => toggleCert(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${certs.includes(c) ? "bg-[#085027] text-white border-[#085027]" : "bg-white text-gray-600 border-gray-300 hover:border-[#085027]"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Next button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="flex items-center gap-2 bg-[#085027] hover:bg-[#063d1e] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
        >
          Continue to Media Upload <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

// ── Step 2: Media Upload ───────────────────────────
function Step2({ onBack, onClose }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const fileRef = useState(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setFiles((p) => [...p, ...dropped].slice(0, 10));
  }

  return (
    <>
      <StepIndicator step={2} />
      <h3 className="text-base font-bold text-gray-900 mb-4">Step 2: Add Your Business Media</h3>

      {/* Photo Gallery */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#085027] mb-2">Business Photo Gallery</label>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => {
            const inp = document.createElement("input");
            inp.type = "file"; inp.accept = "image/*"; inp.multiple = true;
            inp.onchange = (e) => setFiles((p) => [...p, ...Array.from(e.target.files)].slice(0, 10));
            inp.click();
          }}
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 cursor-pointer transition-colors ${dragging ? "border-[#085027] bg-green-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
        >
          <UploadIcon />
          <p className="text-sm font-medium text-gray-600 mt-3">Drag &amp; drop your store images here, or browse files</p>
          <p className="text-xs text-gray-400 mt-1">Upload up to 10 premium photos for your profile photo gallery grid</p>
          {files.length > 0 && (
            <p className="text-xs text-[#085027] font-semibold mt-2">{files.length} file(s) selected</p>
          )}
        </div>
      </div>

      {/* Video URL */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-700 mb-2">Promotional Video Link</label>
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
          <VideoIcon />
          <input
            type="url"
            placeholder="Promotional Video Link (YouTube / Vimeo URL)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Add a YouTube or Vimeo URL to showcase your business (optional)</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-300 text-gray-600 text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
        >
          <ArrowLeftIcon /> Back
        </button>
        <button
          onClick={onClose}
          className="bg-[#085027] hover:bg-[#063d1e] text-white text-sm font-semibold px-7 py-2.5 rounded-full transition-colors"
        >
          Submit Listing
        </button>
      </div>
    </>
  );
}

// ── List Your Business Modal ───────────────────────
function ListBusinessModal({ onClose }) {
  const [step, setStep] = useState(1);
  return (
    <ModalShell onClose={onClose}>
      {step === 1
        ? <Step1 onNext={() => setStep(2)} onClose={onClose} />
        : <Step2 onBack={() => setStep(1)} onClose={onClose} />
      }
    </ModalShell>
  );
}

// ── Navbar ─────────────────────────────────────────
export default function Navbar() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="w-full bg-[#F6F4F1] border-b border-gray-200/60 py-4">
        <div className="w-10/12 flex items-center justify-between mx-auto">
          {/* Logo */}
          <img src={logo} className="w-24 h-auto object-contain" alt="Matana" />

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => setActive(link)}
                className={`font-medium transition-colors ${active === link ? "text-gray-900" : "text-gray-600 hover:text-gray-900"}`}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center">
            {/* Search */}
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2.5 shadow-sm mx-4">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
              />
            </div>
            {/* CTA */}
            <button
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 bg-[#085027] hover:bg-teal-900 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              List Your Business
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {showModal && <ListBusinessModal onClose={() => setShowModal(false)} />}
    </>
  );
}