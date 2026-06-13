import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Go Back Home
          </Link>
          <Shield className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl font-black mb-6 text-slate-950 font-display">Privacy Policy</h1>
        <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
          <p className="font-bold">Last Updated: June 12, 2026</p>
          <p>Welcome to Raimond Solar Pvt Ltd (&apos;we,&apos; &apos;our,&apos; or &apos;us&apos;). We values your privacy and are committed to protecting your personal data in accordance with applicable legal guidelines.</p>
          <p><strong>1. Information We Collect:</strong> We collect personal details that you voluntarily submit to us via our pricing calculator and consultation inquiry forms, which include your Name, Phone Number, Monthly Electricity Bill Range, Preferred System Capacity, and District Location.</p>
          <p><strong>2. How We Use Informational Data:</strong> The captured details are strictly processed to schedule on-site engineering surveys, evaluate technical grid capabilities, calculate rooftop solar output capacity, assist in MNRE/PM Surya Ghar applications, and optimize solar product consultation. We do not engage in renting or selling your personal information to third-party brokers.</p>
          <p><strong>3. Security Safeguards:</strong> We employ robust security measures, restricted firewall parameters, and data protection practices to safeguard information from unauthorized modification, tracking, or access.</p>
          <p><strong>4. Contact Details:</strong> For questions concerning this policy, please reach us immediately at <a href="mailto:info@raimondsolar.in" className="text-sky-600 underline">info@raimondsolar.in</a>.</p>
        </div>
      </div>
    </div>
  );
}
