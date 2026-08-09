import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiUser, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";
import { useRegisterWebsiteVisitorMutation } from "../../Api/businessDirectoryApi";
import { setHasSeenVisitorPopup } from "../../Stores/visitorSlice";

export default function VisitorPopupModal() {
  const dispatch = useDispatch();
  const reduxHasSeen = useSelector((state) => state.visitor?.hasSeenVisitorPopup);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [registerVisitor, { isLoading }] = useRegisterWebsiteVisitorMutation();

  useEffect(() => {
    // Check if user has already visited/seen the popup via Redux store or localStorage
    const localHasSeen = localStorage.getItem("matana_visitor_seen") === "true";
    const alreadySeen = reduxHasSeen || localHasSeen;

    if (!alreadySeen) {
      // Trigger popup after exactly 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Save state in Redux store & localStorage so it won't show on subsequent visits
        dispatch(setHasSeenVisitorPopup(true));
        localStorage.setItem("matana_visitor_seen", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [reduxHasSeen, dispatch]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      await registerVisitor({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      }).unwrap();

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to register website visitor:", err);
      setErrorMsg(
        err?.data?.detail ||
          err?.data?.message ||
          "Something went wrong. Please try submitting again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn font-sans">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden transform transition-all scale-100">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Thank You!</h3>
            <p className="text-sm text-gray-500">
              Your details have been successfully recorded. Enjoy exploring Matana Directory!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-block px-3 py-1 bg-green-50 text-[#085027] text-xs font-bold rounded-full mb-2 border border-green-100">
                Welcome to Matana
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                Stay Connected With Us
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Enter your details to receive exclusive updates, local community news, and directory listings.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiPhone size={16} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-2xl text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-3 px-4 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                >
                  No Thanks
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-3 px-4 bg-[#085027] hover:bg-[#063d1e] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? "Submitting..." : "Submit Details"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
