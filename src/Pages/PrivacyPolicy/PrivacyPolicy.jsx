import {
  CheckCircle2,
  Database,
  ExternalLink,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#f8f7f3] min-h-screen pb-8 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 mt-4 md:mt-6 space-y-4 md:space-y-10">
          <div className="mx-auto text-center space-y-2 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className=" sm:text-lg max-w-2xl mx-auto font-medium">
              Matana Shop LLC
            </p>
          </div>
          {/* Section 1: Introduction */}
          <section className="border-b border-gray-100 pb-4 md:pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Introduction
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              Matana Shop LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{" "}
              <a
                href="https://matanashop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
              >
                matanashop.com
              </a>
              . This Privacy Policy explains how we collect, use, and protect your information.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
            </div>
            <ul className="space-y-3 text-gray-600 pl-11 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Business information</strong> submitted through our listing form (business name, contact details, address, photos, description)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Payment information</strong> (processed securely through Sola Payments — we never store card numbers)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Usage data</strong> collected through Google Analytics
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: How We Use Your Information */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
            </div>
            <ul className="space-y-3 text-gray-600 pl-11 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>To list your business in the Matana directory</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>To contact you about your listing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>To process payments for listing packages</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>To improve our website</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Data Storage */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Data Storage
              </h2>
            </div>
            <div className="pl-11">
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-3">
                <Database className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Your submitted information is stored securely on AWS (Amazon Web Services) servers. Images and business details are retained for the duration of your listing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Third-Party Services */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Third-Party Services
              </h2>
            </div>
            <p className="text-gray-600 mb-3 pl-11 text-sm sm:text-base">
              We use the following third-party services:
            </p>
            <ul className="space-y-3 text-gray-600 pl-11 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Sola Payments</strong> for payment processing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Google Analytics</strong> for website analytics
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                <span>
                  <strong>Amazon Web Services (AWS)</strong> for data storage and hosting
                </span>
              </li>
            </ul>
          </section>

          {/* Section 6: Disclaimer of Liability */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Disclaimer of Liability
              </h2>
            </div>
            <div className="pl-11 space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                Matana Shop LLC serves as a directory platform only. We do not verify, endorse, or guarantee the accuracy of any business listings, products, or services advertised on our platform. By submitting your listing, you confirm that all information provided is accurate and that you have the right to use any images or content submitted.
              </p>
              <p>
                Matana Shop LLC is not responsible for any transactions, disputes, or interactions between users and listed businesses. We are not liable for any damages, losses, or claims arising from the use of our platform or reliance on any listed information.
              </p>
            </div>
          </section>

          {/* Section 7: Indemnification */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Indemnification
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              By using our platform, you agree to indemnify and hold harmless Matana Shop LLC, its owners, employees, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from your use of the platform, your submitted content, or your violation of these terms.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Limitation of Liability
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              To the fullest extent permitted by law, Matana Shop LLC&apos;s total liability to any party shall not exceed the amount paid by that party for their listing in the three months preceding the claim.
            </p>
          </section>

          {/* Section 9: Governing Law */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Governing Law
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              This Privacy Policy and any disputes arising from it shall be governed by the laws of the State of New York, without regard to its conflict of law provisions. Any legal action must be brought in the courts of New York.
            </p>
          </section>

          {/* Section 10: Your Rights */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Rights
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              You may request to update or delete your business listing at any time by contacting us at{" "}
              <a
                href="mailto:info@matanashop.com"
                className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
              >
                info@matanashop.com
              </a>
              .
            </p>
          </section>

          {/* Section 11: Changes to This Policy */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                11
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Changes to This Policy
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              We reserve the right to update this Privacy Policy at any time. Continued use of the platform after changes constitutes acceptance of the new policy.
            </p>
          </section>

          {/* Section 12: Contact Us */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                12
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                For any privacy-related questions, contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="mailto:info@matanashop.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-[#085027] transition group"
                >
                  <Mail className="w-5 h-5 text-[#085027] group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="block text-gray-400 text-[10px] uppercase font-semibold">Email</span>
                    info@matanashop.com
                  </div>
                </a>
                <a
                  href="tel:9292056513"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-[#085027] transition group"
                >
                  <Phone className="w-5 h-5 text-[#085027] group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm">
                    <span className="block text-gray-400 text-[10px] uppercase font-semibold">Phone</span>
                    929-205-6513
                  </div>
                </a>
                <a
                  href="https://matanashop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-[#085027] transition group"
                >
                  <Globe className="w-5 h-5 text-[#085027] group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm">
                    <span className="block text-gray-400 text-[10px] uppercase font-semibold">Website</span>
                    matanashop.com
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
