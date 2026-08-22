import React, { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  ShieldAlert,
  FileText,
} from "lucide-react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[#f8f7f3] min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 mt-4 md:mt-6 space-y-10">
          <div className="mx-auto text-center space-y-2 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Terms of Service
            </h1>
            <p className="sm:text-lg max-w-2xl mx-auto font-medium text-gray-600">
              Matana Shop LLC
            </p>
     
          </div>

          {/* Section 1: Agreement to Terms */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Agreement to Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              By accessing or using{" "}
              <a
                href="https://matanashop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
              >
                matanashop.com
              </a>
              , submitting a business listing, or making any payment, you agree to be bound by these Terms of Service. If you do not agree, do not use our platform. These terms constitute a legally binding agreement between you and Matana Shop LLC.
            </p>
          </section>

          {/* Section 2: The Platform */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                The Platform
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              Matana Shop LLC operates an online directory platform that allows Jewish-owned and Jewish-friendly businesses to list their products and services. We are a directory only — we do not sell products, provide services, or act as an agent for any listed business.
            </p>
          </section>

          {/* Section 3: Business Listings */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Business Listings
              </h2>
            </div>
            <div className="pl-11 space-y-4 text-gray-600 text-sm sm:text-base">
              <p className="leading-relaxed">
                By submitting a listing, you represent and warrant that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>All information provided is accurate, truthful, and not misleading</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>You are authorized to represent the business being listed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>You own or have the legal right to use all images and content submitted</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Your business and its products/services comply with all applicable laws</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Your listing does not infringe on any third-party intellectual property rights</span>
                </li>
              </ul>
              <p className="leading-relaxed pt-2">
                Matana Shop LLC reserves the right to reject, edit, or remove any listing at our sole discretion without notice or refund.
              </p>
            </div>
          </section>

          {/* Section 4: Payment Terms */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Payment Terms
              </h2>
            </div>
            <div className="pl-11 space-y-4 text-gray-600 text-sm sm:text-base">
              <p className="leading-relaxed">
                Listing fees vary by package type and are subject to change. Current pricing is available on our pricing page at{" "}
                <a
                  href="https://matanashop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
                >
                  matanashop.com
                </a>
                .
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Featured and Premium listings are subject to monthly or periodic fees as described on our pricing page</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Payments are processed securely through Sola Payments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>By providing payment information, you authorize Matana Shop LLC to charge your payment method for the selected package</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>All fees are in US dollars</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Matana Shop LLC reserves the right to change pricing at any time with reasonable notice</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Refund Policy */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Refund Policy
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              All payments are non-refundable unless otherwise required by law. If you believe you were charged in error, contact us at{" "}
              <a
                href="mailto:info@matanashop.com"
                className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
              >
                info@matanashop.com
              </a>{" "}
              within 7 days of the charge.
            </p>
          </section>

          {/* Section 6: Prohibited Conduct */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Prohibited Conduct
              </h2>
            </div>
            <div className="pl-11 space-y-3 text-gray-600 text-sm sm:text-base">
              <p className="leading-relaxed">You agree not to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Submit false, misleading, or fraudulent information</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Use the platform for any unlawful purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Submit content that is offensive, defamatory, or violates any third-party rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Attempt to hack, scrape, or disrupt the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Impersonate any person or business</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7: Intellectual Property */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Intellectual Property
              </h2>
            </div>
            <div className="pl-11 space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>
                All content on matanashop.com including the Matana brand, logo, design, and platform code is owned by Matana Shop LLC. You may not copy, reproduce, or use our content without written permission.
              </p>
              <p>
                By submitting a listing, you grant Matana Shop LLC a non-exclusive, royalty-free license to display, reproduce, and distribute your submitted content (including images and text) on our platform and in our marketing materials.
              </p>
            </div>
          </section>

          {/* Section 8: Disclaimer of Warranties */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Disclaimer of Warranties
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              The platform is provided &quot;as is&quot; without any warranties of any kind, express or implied. Matana Shop LLC does not warrant that the platform will be uninterrupted, error-free, or free of viruses. We do not verify, endorse, or guarantee any business listed on our platform.
            </p>
          </section>

          {/* Section 9: Limitation of Liability */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Limitation of Liability
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              To the fullest extent permitted by law, Matana Shop LLC and its owners, employees, and affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability to you shall not exceed the amount you paid us in the three months prior to the claim.
            </p>
          </section>

          {/* Section 10: Indemnification */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Indemnification
              </h2>
            </div>
            <div className="pl-11 space-y-3 text-gray-600 text-sm sm:text-base">
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless Matana Shop LLC, its owners, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Your use of the platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Your submitted listing content</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Your violation of these Terms of Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#085027] shrink-0 mt-0.5" />
                  <span>Any claim that your content infringes a third party&apos;s rights</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 11: Termination */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                11
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Termination
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              Matana Shop LLC reserves the right to suspend or terminate any listing or account at any time for any reason, including violation of these Terms of Service. Upon termination, no refund will be issued for any prepaid fees.
            </p>
          </section>

          {/* Section 12: Changes to Terms */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                12
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Changes to Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or a notice on the platform. Continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Section 13: Governing Law */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                13
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Governing Law
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              These Terms of Service shall be governed by the laws of the State of New York. Any disputes shall be resolved exclusively in the courts of New York. You waive any objection to jurisdiction or venue in such courts.
            </p>
          </section>

          {/* Section 14: Dispute Resolution */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                14
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dispute Resolution
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              Before initiating any legal action, you agree to contact Matana Shop LLC at{" "}
              <a
                href="mailto:info@matanashop.com"
                className="text-[#085027] font-medium underline hover:text-emerald-700 transition"
              >
                info@matanashop.com
              </a>{" "}
              to attempt to resolve the dispute informally. We will make reasonable efforts to resolve disputes within 30 days.
            </p>
          </section>

          {/* Section 15: Severability */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                15
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Severability
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>
          </section>

          {/* Section 16: Entire Agreement */}
          <section className="border-b border-gray-100 pb-4 md:pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                16
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Entire Agreement
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base pl-11">
              These Terms of Service and our Privacy Policy constitute the entire agreement between you and Matana Shop LLC regarding the use of our platform.
            </p>
          </section>

          {/* Section 17: Contact Us */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#085027]/10 text-[#085027] font-semibold text-sm">
                17
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                For any questions regarding these Terms of Service, contact us at:
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
