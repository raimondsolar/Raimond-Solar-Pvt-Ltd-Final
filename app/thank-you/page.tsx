"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Phone, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { trackEvent, initTracking } from "@/lib/tracking";


const WhatsAppIcon = ({ className = "w-5 h-5", ...props }: React.ComponentPropsWithoutRef<"svg">) => (
  <svg viewBox="0 0 448 512" className={className} fill="currentColor" {...props}>
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

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
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> REGISTERED WBSEDCL & CESC VENDOR
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
            className="text-3xl font-bold tracking-tight mb-1 text-white sm:text-4xl"
          >
            আপনার বুকিং সফল হয়েছে!
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.20 }}
            className="text-amber-500 font-black tracking-widest text-xs sm:text-sm mb-4 uppercase"
          >
            WE WILL CONTACT YOU SHORTLY
          </motion.h2>

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
              <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
              <div>
                <div className="text-xs text-emerald-100 font-normal text-left">হোয়াটসঅ্যাপ চ্যাট</div>
                <div className="text-sm">WhatsApp Now</div>
              </div>
            </a>
          </div>

          

          <Link
            href="/"
            onClick={() => trackEvent("Button Click", { destination: "Home from Thank You Page" })}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
            id="thankyou-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> নতুন বুকিং করুন (New Registration)
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500 font-sans">
        RAIMOND SOLAR PVT LTD • Sonarpur, Kolkata - 700150 • ISO Certified Co.
      </footer>
    </div>
  );
}
