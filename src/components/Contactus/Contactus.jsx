import { useState } from "react";
import { useScrollRevealGentle } from "../../hooks/useScrollReveal";

// ── Icons ──────────────────────────────────────────
function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a5c3a"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l1.27-.63a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#ig-grad)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="50%" stopColor="#e6683c" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="#e6683c" stroke="none" />
    </svg>
  );
}

const contactItems = [
  {
    icon: <EmailIcon />,
    iconBg: "bg-green-50",
    title: "Email Us",
    subtitle: "Send us an email anytime",
    value: "info@matana.com",
    valueColor: "text-gray-900",
  },
  {
    icon: <PhoneIcon />,
    iconBg: "bg-yellow-50",
    title: "Call Us",
    subtitle: "Mon-Fri from 9am to 6pm EST",
    value: "+1 (555) 123-4567",
    valueColor: "text-gray-900 font-semibold",
  },
  {
    icon: <InstagramIcon />,
    iconBg: "bg-pink-50",
    title: "Follow Us",
    subtitle: "Stay updated on social media",
    value: "@matana",
    valueColor: "text-gray-900",
  },
];

export default function ContactUs() {
  useScrollRevealGentle();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-br from-[#1E4D2B]/5 to-[#D4AF37]/5 py-8 lg:py16 px-6 reveal reveal-fade-in"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-bold text-sm lg:text-base text-primary uppercase mb-2">Get In Touch</p>
          <h2 className="text-2xl md:text-3xl xl:text-4xlfont-bold text-gray-900 mb-3">
            Contact Us
          </h2>
          <p className="text-sm lg:text-base text-gray-500">
            Have questions? We're here to help you find what you need.
          </p>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT — contact info cards */}
          <div className="flex flex-col gap-4">
            {contactItems.map((item, index) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 flex items-start gap-4 reveal reveal-slide-left ${index % 2 === 0 ? "reveal-delay-1" : "reveal-delay-2"}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm lg:text-base font-bold text-gray-900 mb-0.5">
                    {item.title}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500 mb-1.5">
                    {item.subtitle}
                  </p>
                  <p
                    className={`text-sm lg:text-base text-primary font-semibold`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — message form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-7 reveal reveal-slide-right reveal-delay-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 transition bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 transition bg-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-teal-500 transition resize-none bg-white"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSend}
                disabled={!name.trim() || !email.trim() || !message.trim()}
                className={`w-full py-3.5 rounded-full text-sm font-semibold transition-colors ${
                  name.trim() && email.trim() && message.trim()
                    ? "bg-primary text-white"
                    : "bg-primary/50 text-white cursor-not-allowed"
                }`}
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
