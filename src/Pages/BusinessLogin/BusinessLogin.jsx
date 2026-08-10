import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestOtpMutation, useVerifyOtpMutation } from "../../Api/businessDirectoryApi";
import { FiMail, FiLock, FiArrowLeft, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import logo from "../../assets/images/logo.svg";

export default function BusinessLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [requestOtp, { isLoading: isRequesting }] = useRequestOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const otpInputsRef = useRef([]);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("auth");
    if (token) {
      // Optional: navigate to dashboard
    }
  }, []);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !email.trim()) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      const res = await requestOtp({ email: email.trim() }).unwrap();
      setSuccessMsg(res?.message || "OTP sent to your email successfully.");
      setStep(2);
    } catch (err) {
      console.error("Failed to request OTP:", err);
      setErrorMsg(
        err?.data?.detail ||
          err?.data?.message ||
          (typeof err?.data === "string" ? err.data : "Failed to send OTP. Please check your email and try again.")
      );
    }
  };

  const handleOtpChange = (index, val) => {
    if (!/^\d*$/.test(val)) return; // Digits only

    const newOtp = [...otpValues];
    newOtp[index] = val.slice(-1); // Take latest char
    setOtpValues(newOtp);

    // Auto advance focus
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtpValues(digits);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const fullOtp = otpValues.join("");
    if (fullOtp.length < 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const res = await verifyOtp({
        email: email.trim(),
        otp: fullOtp,
      }).unwrap();

      // Save tokens
      if (res?.access) {
        localStorage.setItem("access_token", res.access);
      }
      if (res?.refresh) {
        localStorage.setItem("refresh_token", res.refresh);
      }
      localStorage.setItem(
        "auth",
        JSON.stringify({ access: res?.access, refresh: res?.refresh })
      );
      localStorage.setItem("business_owner_email", email.trim());

      setSuccessMsg(res?.message || "Login successful.");
      
      setTimeout(() => {
        navigate("/business-dashboard");
      }, 500);
    } catch (err) {
      console.error("Failed to verify OTP:", err);
      setErrorMsg(
        err?.data?.detail ||
          err?.data?.message ||
          (typeof err?.data === "string" ? err.data : "Invalid OTP code. Please try again.")
      );
    }
  };

  return (
    <div className="bg-[#f8f7f3] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans min-h-[60vh]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Business Owner Portal
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {step === 1
            ? "Sign in with your email to access your business analytics"
            : `Enter the 6-digit verification code sent to ${email}`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/60 rounded-3xl sm:px-10 border border-gray-100">
          {/* Notification Messages */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-xs sm:text-sm text-red-700">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-green-50 border border-green-100 flex items-start gap-2.5 text-xs sm:text-sm text-green-800">
              <FiCheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {step === 1 ? (
            /* STEP 1: Email Form */
            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative rounded-2xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. owner@mybusiness.com"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#085027] focus:border-transparent transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isRequesting}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-md text-sm font-bold text-white bg-[#085027] hover:bg-[#063d1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#085027] disabled:opacity-60 transition-all cursor-pointer"
              >
                {isRequesting ? "Sending OTP..." : "Send Verification Code"}
              </button>
            </form>
          ) : (
            /* STEP 2: OTP Form */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-xs text-[#085027] hover:underline font-semibold flex items-center gap-1"
                  >
                    <FiArrowLeft size={12} /> Change Email
                  </button>
                </div>

                <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                  {otpValues.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#085027] focus:ring-0 outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-md text-sm font-bold text-white bg-[#085027] hover:bg-[#063d1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#085027] disabled:opacity-60 transition-all cursor-pointer"
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={isRequesting}
                  className="text-xs text-gray-500 hover:text-[#085027] font-medium transition-colors"
                >
                  Didn't receive code? <span className="underline font-semibold">Resend OTP</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
