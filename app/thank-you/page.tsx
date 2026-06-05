"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Phone, MessageSquare, ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import { motion } from "motion/react";
import { trackEvent, initTracking } from "@/lib/tracking";

export default function ThankYouPage() {
  useEffect(() => {
    // Initialize standard trackers
    initTracking();
    // Track page conversion load
    trackEvent("Form Submission", {
      status: "Successful Lead Registration",
      page: "Thank You Screen",
    });
  }, []);

  const handlePhoneClick = () => {
    trackEvent("Phone Click", { location: "Thank You Page" });
  };

  const handleWhatsAppClick = () => {
    trackEvent("WhatsApp Click", { location: "Thank You Page" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between" id="thankyou-container">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Brand Tag */}
      <header className="border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md sticky top-0 z-55 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              RAIMOND <span className="text-amber-500">SOLAR</span>
            </span>
          </Link>
          <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> PM Surya Ghar Partner
          </span>
        </div>
      </header>

      {/* Main Thank You Message */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 text-center backdrop-blur-xl relative shadow-2xl">
          {/* Subtle top amber light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-amber-500 rounded-b-xl shadow-[0_0_20px_#f59e0b]" />

          {/* Icon Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="w-20 h-20 bg-emerald-550/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl font-bold tracking-tight mb-3 text-white sm:text-4xl"
          >
            আপনার আবেদনটি সফল হয়েছে!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-slate-300 text-lg mb-8 leading-relaxed font-sans"
          >
            ধন্যবাদ! আমাদের Solar Expert Agent <strong className="text-amber-500">Raimond Solar Team</strong> ২৪ ঘণ্টার মধ্যে আপনার সাথে সরাসরি যোগাযোগ করবেন।
          </motion.p>

          {/* Live Action Boxes */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <a
              href="tel:9073059780"
              onClick={handlePhoneClick}
              id="thankyou-btn-call"
              className="flex items-center gap-3 justify-center py-4 px-6 bg-slate-850 hover:bg-slate-800 border border-slate-700/50 rounded-2xl transition-all font-semibold text-white text-[15px] group shadow-inner"
            >
              <Phone className="w-5 h-5 text-amber-500 group-hover:animate-bounce" />
              <div>
                <div className="text-xs text-slate-400 font-normal text-left">সরাসরি কল করতে</div>
                <div className="text-sm">9073059780</div>
              </div>
            </a>

            <a
              href="https://wa.me/919073059780?text=I%20have%20registered%20for%20a%20solar%20consultation.%20Please%20provide%20pricing."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              id="thankyou-btn-whatsapp"
              className="flex items-center gap-3 justify-center py-4 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-2xl transition-all font-semibold text-white text-[15px] group shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <MessageSquare className="w-5 h-5 text-white" />
              <div>
                <div className="text-xs text-emerald-100 font-normal text-left">হোয়াটসঅ্যাপ চ্যাট</div>
                <div className="text-sm">WhatsApp Now</div>
              </div>
            </a>
          </div>

          <div className="bg-slate-950/50 border border-slate-850/80 rounded-2xl p-4 flex gap-3 text-left mb-8 items-center">
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs text-slate-400 leading-normal">
              আমাদের অফিসিয়াল ডিস্ট্রিবিউটর বা এক্সপার্ট আপনার এলাকার বিদ্যুৎ পরিষদ (WBSEDCL) এর ছাদে সোলার বসানোর অনুমোদন ও নেট মিটারিং অনুমোদনের জন্য সমস্ত সরকারি কাগজপত্র তৈরি করার কাজ শুরু করে দিচ্ছেন।
            </p>
          </div>

          <Link
            href="/"
            onClick={() => trackEvent("Button Click", { destination: "Home from Thank You Page" })}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
            id="thankyou-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500 font-sans">
        RAIMOND SOLAR PVT LTD • Sonarpur, Kolkata - 700150 • ISO Certified & MNRE Approved
      </footer>
    </div>
  );
}
