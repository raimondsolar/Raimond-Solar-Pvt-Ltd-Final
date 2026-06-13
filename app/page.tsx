"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  Phone,
  MessageSquare,
  Sun,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calculator,
  ChevronDown,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  HardDrive,
  MapPin,
  X,
  Send,
  Award,
  Bot,
  User,
  CheckCheck,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent, initTracking } from "@/lib/tracking";

// The high-quality official WhatsApp logo SVG
const WhatsAppIcon = ({ className = "w-5 h-5", ...props }: React.ComponentPropsWithoutRef<"svg">) => (
  <svg viewBox="0 0 448 512" className={className} fill="currentColor" {...props}>
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

// Define the 1-5kW Solar packages database
interface SolarPackage {
  id: string;
  size: string;
  grossPrice: string;
  subsidy: string;
  netPrice: string;
  dailyGen: string;
  monthlyGen: string;
  monthlySavings: string;
  yearlySavings: string;
  spaceRequired: string;
  suitableFor: string;
  badge?: string;
}

const SOLAR_PACKAGES: SolarPackage[] = [
  {
    id: "pkg-1kw",
    size: "1kWp Package",
    grossPrice: "₹92,000",
    subsidy: "₹30,000",
    netPrice: "₹62,000",
    dailyGen: "4.6 Units",
    monthlyGen: "138 Units",
    monthlySavings: "₹966",
    yearlySavings: "₹11,592",
    spaceRequired: "৬০ স্কয়ার ফিট (60 sqft)",
    suitableFor: "Small Home / Tuition Centre",
  },
  {
    id: "pkg-2kw",
    size: "2kWp Package",
    grossPrice: "₹1,44,000",
    subsidy: "₹60,000",
    netPrice: "₹84,000",
    dailyGen: "9.2 Units",
    monthlyGen: "276 Units",
    monthlySavings: "₹1,932",
    yearlySavings: "₹23,184",
    spaceRequired: "১২০ স্কয়ার ফিট (120 sqft)",
    suitableFor: "Medium Family",
  },
  {
    id: "pkg-3kw",
    size: "3kWp Package",
    grossPrice: "₹1,98,000",
    subsidy: "₹78,000",
    netPrice: "₹1,20,000",
    dailyGen: "13.8 Units",
    monthlyGen: "414 Units",
    monthlySavings: "₹2,898",
    yearlySavings: "₹34,776",
    spaceRequired: "১৮০ স্কয়ার ফিট (180 sqft)",
    suitableFor: "Large Family, Water Pump & Multiple AC",
    badge: "Most Popular",
  },
  {
    id: "pkg-4kw",
    size: "4kWp Package",
    grossPrice: "₹2,66,000",
    subsidy: "₹78,000",
    netPrice: "₹1,88,000",
    dailyGen: "18.4 Units",
    monthlyGen: "552 Units",
    monthlySavings: "₹3,864",
    yearlySavings: "₹46,368",
    spaceRequired: "২৪০ স্কয়ার ফিট (240 sqft)",
    suitableFor: "Large Households & Multi-Floor Houses",
  },
  {
    id: "pkg-5kw",
    size: "5kWp Package",
    grossPrice: "₹3,13,000",
    subsidy: "₹78,000",
    netPrice: "₹2,35,000",
    dailyGen: "23 Units",
    monthlyGen: "690 Units",
    monthlySavings: "₹4,830",
    yearlySavings: "₹57,960",
    spaceRequired: "৩০০ স্কয়ার ফিট (300 sqft)",
    suitableFor: "Villas, Duplexes & Small Commercial Shops",
  },
];

const WB_DISTRICTS = [
  "Kolkata",
  "Howrah",
  "Hooghly",
  "North 24 Parganas",
  "South 24 Parganas",
  "Purba Medinipur",
  "Paschim Medinipur",
  "Purba Bardhaman",
  "Paschim Bardhaman",
  "Nadia",
  "Murshidabad",
  "Birbhum",
  "Bankura",
  "Purulia",
  "Malda",
  "Uttar Dinajpur",
  "Dakshin Dinajpur",
  "Darjeeling",
  "Kalimpong",
  "Jalpaiguri",
  "Alipurduar",
  "Cooch Behar",
];

export default function RaimondSolarLandingPage() {
  const router = useRouter();

  // Scroll transparency state (kept for compatibility)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form lead submission states (Integrating working PM Surya Ghar Lead Form state)
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Kolkata");
  const [monthlyBill, setMonthlyBill] = useState("₹1000-2000");
  const [preferredSystem, setPreferredSystem] = useState("3kWp");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Solar Interactive Calculator State
  const [calcSelectedSize, setCalcSelectedSize] = useState<number>(3); // 1 to 5 kWp
  const [calcBill, setCalcBill] = useState<number>(2400); // Monthly bill input

  const calculatedSubsidy = calcSelectedSize === 1 ? 30000 : calcSelectedSize === 2 ? 60000 : 78000;
  const calcBaseRates: Record<number, number> = { 1: 92000, 2: 144000, 3: 198000, 4: 266000, 5: 313000 };
  const calculatedGross = calcBaseRates[calcSelectedSize] || calcSelectedSize * 65000;
  const calculatedNet = Math.max(0, calculatedGross - calculatedSubsidy);
  const calculatedMonthlyUnits = calcSelectedSize * 138;
  const calculatedMonthlySavings = Math.round(calculatedMonthlyUnits * 7); // average ₹7 per unit
  const calculatedYearlySavings = calculatedMonthlySavings * 12;
  const calculated25YearSavings = calculatedYearlySavings * 25;

  // AI Chatbot Open/Close and conversation tree
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "নমস্কার! আমি Raimond Solar Expert AI। PM Surya Ghar মুফ্ত বিজলি যোজনার সরকারি ভর্তুকি বা আপনার বাড়ির সোলার বসানোর খরচ জানতে আমাকে জিজ্ঞাসা করতে পারেন। আপনার নাম, ফোন নম্বর ও জেলা জানান, আমাদের টিম সরাসরি সহযোগিতা করবে।",
    },
  ]);
  const [userChatInput, setUserChatInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // FAQ accordion active key list
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Modals for Privacy Policy & Terms of Service
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Init standard pixel tracker
  useEffect(() => {
    initTracking();
  }, []);

  // Scroll to a division smoothly
  const scrollToSection = (id: string) => {
    // Map older section IDs to new streamlined IDs
    let targetId = id;
    if (id === "hero-section") targetId = "home";
    if (id === "pricing-section") targetId = "price";
    if (id === "calculator-section") targetId = "subsidy-calculator";
    if (id === "why-choose-section") targetId = "on-grid";
    if (id === "video-gallery-section") targetId = "video";
    if (id === "faq-section") targetId = "faq";

    // Close mobile menu if open immediately
    setIsMobileMenuOpen(false);

    // Let any mobile toggle keyboard / transitions settle
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        // Subtract 75px representing the sticky navigation header height
        const offsetPosition = elementPosition - 75;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        history.pushState(null, "", `#${targetId}`);
        trackEvent("Button Click", { action: `Scrolled to Section: ${targetId}` });
      }
    }, 120);
  };

  // Lead Form submission handler (Integrating Apps Script Web App submission logic)
  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr("");
    
    // Validate phone number (10 digits)
    const cleanedPhone = phone.replace(/[^0-9]/g, "");
    if (cleanedPhone.length !== 10) {
      setFormErr("দয়া করে ১০ ডিজিটের সঠিক নম্বর দিন (যেমন: 9876543210)।");
      return;
    }

    setSubmittingLead(true);
    trackEvent("Form Submission", {
      candidateName: fullName,
      candidateLocation: district,
    });

    const leadData = {
      name: fullName.trim(),
      phone: cleanedPhone.trim(),
      location: district.trim(),
      monthlyBill: monthlyBill,
      preferredSystem: preferredSystem,
      systemSize: preferredSystem,
      system_size: preferredSystem,
      preferred_system: preferredSystem,
      system: preferredSystem,
      size: preferredSystem,
      systemsize: preferredSystem,
      preferredsystem: preferredSystem,
    };

    const webhookUrl = 'https://script.google.com/macros/s/AKfycbwVmh1IexoJTaVNJDYbJRu16klHeQj4lXUyJZ96foOE1czKjZrYPSWP-_PaELxtogJK/exec'; 

    try {
      // 1. Submit directly to Google Apps Script Web App using no-cors mode
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // অত্যন্ত জরুরি গুগল স্ক্রিপ্টের রিডাইরেকশন হ্যান্ডেল করার জন্য
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });

      // 2. Submit to local Express/Next API so the lead resides in the admin list
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullName.trim(),
            phone: cleanedPhone.trim(),
            district: district.trim(),
            monthlyBill: monthlyBill,
            preferredSystem: preferredSystem || "3kWp",
            source: "form",
            notes: "Direct Google Apps Script Web App Lead Form Submission"
          }),
        });
      } catch (localErr) {
        console.warn("Failed to copy lead to local admin store:", localErr);
      }

      // Success alerts and clear inputs
      alert('ধন্যবাদ! আপনার লিডটি সফলভাবে Raimond Solar সিস্টেমে জমা হয়েছে।');
      setFullName("");
      setPhone("");
      setDistrict("Kolkata");
      setMonthlyBill("₹1000-2000");
      setLeadSubmitted(true);
      trackEvent("Form Submission", { status: "Success", location: district });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErr('দুঃখিত, কোনো একটি সমস্যা হয়েছে! দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setSubmittingLead(false);
    }
  };

  // Chatbot send text handler
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim() || isAILoading) return;

    const userText = userChatInput;
    setUserChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsAILoading(true);

    trackEvent("Chat Message Sent", { promptLength: userText.length });

    const getOfflineResponseByKeywords = (msg: string): string => {
      const norm = msg.toLowerCase();
      const phonePattern = /(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}/;
      
      if (phonePattern.test(msg)) {
        return `ধন্যবাদ! আপনার ফোন নম্বরটি পেয়েছি এবং আমাদের সিস্টেমে সুরক্ষিতভাবে সেভ করা হয়েছে। এই মুহূর্তে সার্ভারে অতিরিক্ত ট্রাফিকের কারণে আমাদের অটোমেটেড অ্যাসিস্ট্যান্ট সাময়িকভাবে সংযোগ করতে পারছে না, তবে আমাদের একজন সোলার এক্সপার্ট ২৪ ঘণ্টার মধ্যে আপনাকে সরাসরি কল বা হোয়াটসঅ্যাপ (WhatsApp) করবেন। \n\nজরুরি তথ্যের জন্য আপনি সরাসরি আমাদের প্রাইমারী হেল্পলাইনে ফোন করতে পারেন:\n📞 **৯০৭৩০৫৯৭৮০** অথবা **৬২৮৯৬৩৮৬৪৯** (সরাসরি কথা বলুন)`;
      }

      if (norm.includes("price") || norm.includes("দাম") || norm.includes("টাকা") || norm.includes("খরচ") || norm.includes("package") || norm.includes("প্যাকেজ") || norm.includes("cost") || norm.includes("কত")) {
        return `আমাদের Raimond Solar-এর কিছু জনপ্রিয় প্যাকেজ রেট নিচে উল্লেখ করা হলো (ভর্তুকি কড়ার পর চূড়ান্ত মূল্য):\n\n☀️ **1kWp**: ₹৬২,২২২ (দৈনিক ৪.৬ ইউনিট) | Roof Space: ৬০ স্কয়ার ফিট\n☀️ **2kWp**: ₹৮৪,৪৪৪ (দৈনিক ৯.২ ইউনিট)\n☀️ **3kWp (সবথেকে জনপ্রিয়)**: ₹১,২০,৮৮৯ (দৈনিক ১৩.৮ ইউনিট) | ওয়াটার পাম্প ও একাধিক এসি চালানো যাবে।\n☀️ **5kWp**: ₹২,৩৫,৩৩৩ (দৈনিক ২৩ ইউনিট)\n\nআপনার বাড়ির লোড অনুযায়ী কাস্টমাইজড হিসাব ও ফ্রি সাইট ভিজিটের জন্য অনুগ্রহ করে আপনার **নাম, ফোন নম্বর এবং জেলা** এখানে লিখে দিন। আমাদের সোলার এক্সপার্ট আপনাকে সরাসরি কোটেশন দেবেন।`;
      }

      if (norm.includes("subsidy") || norm.includes("ভর্তুকি") || norm.includes("যোজনা") || norm.includes("scheme") || norm.includes("সরকার")) {
        return `পশ্চিমবঙ্গ বিদ্যুৎ পর্ষদের (WBSEDCL) অধীনে কেন্দ্র সরকারের PM Surya Ghar Muft Bijli Yojana-য় সোলার ইনস্টলেশনে আকর্ষণীয় সরকারি ভর্তুকি দেওয়া হচ্ছে:\n\n📌 **১ কিলোওয়াট সোলারে**: ₹৩০,০০০ ভর্তুকি\n📌 **২ কিলোওয়াট সোলারে**: ₹৬০,০০০ ভর্তুকি\n📌 **৩ কিলোওয়াট বা তার বেশির জন্য**: ₹৭৮,০০০ (সর্বোচ্চ ভর্তুকি)\n\nআমরা Raimond Solar সম্পূর্ণ কোটেশন, সরকারি আবেদন প্রক্রিয়া ও নেট মিটারিং একদম অ্যান্ড-টু-অ্যান্ড সমাধান করে দিই। আজই সোলার বুক করতে আপনার সম্পূর্ণ নাম ও মোবাইল নম্বর এখানে মেসেজ করুন।`;
      }

      if (norm.includes("address") || norm.includes("ঠিকানা") || norm.includes("কোথায়") || norm.includes("office") || norm.includes("অফিস") || norm.includes("location") || norm.includes("kolkata")) {
        return `আমাদের অফিসের ঠিকানা:\n📍 **Raimond Solar Pvt Ltd**\nসোনারপুর (Sonarpur), কলকাতা - ৭০০১৫০\n📍 Google Maps: https://maps.google.com/?cid=15167722827222380471\n\nআমরা কলকাতা, ২৪ পরগনা, হাওড়া, হুগলি ছাড়াও সমগ্র পশ্চিমবঙ্গে সফলভাবে সোলার ইনস্টলেশন করছি। আপনার বাড়ির ছাদ পরিদর্শনের জন্য বিনামূল্যে আজকের স্লট বুক করতে আপনার ফোন নম্বরটি আমাদের পাঠান।`;
      }

      if (norm.includes("phone") || norm.includes("call") || norm.includes("যোগাযোগ") || norm.includes("নম্বর") || norm.includes("ফোন") || norm.includes("contact") || norm.includes("whatsapp") || norm.includes("হোয়াটসঅ্যাপ") || norm.includes("কথা")) {
        return `আপনি আমাদের সাথে সরাসরি কথা বলতে পারেন বা হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারেন:\n📞 **৯০৭৩০৫৯৭৮০** (প্রধান হেল্পলাইন)\n📞 **৬২৮৯৬৩৮৬৪৯** (বিকল্প হেল্পলাইন)\n📧 ইমেইল: info@raimondsolar.in\n\nআমাদের একজন প্রতিনিধি ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন। আপনার ফোন নম্বর ও জেলা আমাদের মেসেজ করলেই সোলার সার্ভেয়ার সরাসরি যোগাযোগ করে নেবেন।`;
      }

      return `নমস্কার! বর্তমানে অতিরিক্ত ট্রাফিকের কারণে আমাদের অটোমেটেড এআই অ্যাসিস্ট্যান্ট সাময়িকভাবে অফলাইনে রয়েছে। \n\nরেজিস্ট্রেশন, সরকারি সর্বোচ্চ ভর্তুকি, এবং ফ্রি কোটেশনের জন্য অনুগ্রহ করে আপনার **১) নাম, ২) ফোন নম্বর এবং ৩) জেলা** এখানে লিখে দিন। অথবা আমাদের সোলার টিমের সাথে সরাসরি যোগাযোগ করুন:\n📞 **৯০৭৩০৫৯৭৮০** / **৬২৮৯৬৩৮৬৪৯** (কল বা হোয়াটসঅ্যাপ করুন - Raimond Solar)`;
    };

    let responseOk = false;
    let dataReply = "";
    let dataLeadCaptured = false;

    // Retry configuration
    const maxFetchAttempts = 2;
    for (let attempt = 1; attempt <= maxFetchAttempts; attempt++) {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            history: chatMessages,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          dataReply = data.reply;
          dataLeadCaptured = data.leadCaptured;
          responseOk = true;
          break; // success
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.warn(`Chat API attempt ${attempt} returned status:`, response.status, errorData);
          if (attempt === maxFetchAttempts) {
            throw new Error(errorData.details || errorData.error || "Chat request failed");
          }
        }
      } catch (err) {
        console.error(`Attempt ${attempt} error in fetching chat API:`, err);
        if (attempt === maxFetchAttempts) {
          // Final attempt failed, use offline response
          dataReply = getOfflineResponseByKeywords(userText);
          dataLeadCaptured = false;
          responseOk = true;
        } else {
          // Wait briefly before retrying
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }
    }

    if (responseOk && dataReply) {
      setChatMessages((prev) => [...prev, { role: "assistant", text: dataReply }]);
      if (dataLeadCaptured) {
        trackEvent("Form Submission", {
          source: "AI Chat Auto-Extraction",
          status: "Success",
        });
      }
    } else {
      // Emergency ultimate fallback
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "দুঃখিত, বর্তমানে আমাদের AI এজেন্ট ওভারলোডেড রয়েছে। আপনি সরাসরি আমাদের হেল্পলাইন নম্বর ৯০৭৩০৫৯৭৮০ এ কল করে আপনার সোলার বুক করতে পারেন।",
        },
      ]);
    }

    setIsAILoading(false);
  };

  // Scroll to bottom of chat automatically when a message appends
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  // Handle calculator package selection click
  const handleClaimCalculatorPkg = (size: number) => {
    setPreferredSystem(`${size}kWp`);
    scrollToSection("home");
    trackEvent("Button Click", { action: `Claim Pricing from Calculator: ${size}kW` });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-amber-100 p-0 m-0 font-sans">

      {/* Google Tag Manager (Script) */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5SMVTHW4');
        `}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-5SMVTHW4" 
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }} 
        />
      </noscript>

      {/* Top Banner indicating Government Scheme validation */}
      <div className="bg-amber-500 text-slate-950 font-black text-center py-2 px-3 sm:py-2.5 sm:px-4 text-[9px] xs:text-[10px] sm:text-xs tracking-wider z-50 flex flex-col items-center justify-center gap-1 font-display relative shadow-sm leading-tight">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950 animate-pulse shrink-0" /> 
          <span>RAIMOND SOLAR PVT LTD - AUTHORIZED SOLAR VENDOR & INTEGRATOR</span>
        </div>
        <div className="text-[8px] sm:text-[10px] text-slate-900 font-bold opacity-90">
          We assist in PM Surya Ghar National Portal Subsidy applications as a registered vendor. Raimond Solar is an Empaneled Vendor under National Portal for WBSEDCL & CESC consumers.
        </div>
      </div>

      {/* Modern Floating Header Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-md backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto py-3 px-2 sm:px-8 flex items-center justify-between gap-1 sm:gap-4">
          <Link href="/" className="shrink-0">
            <span className="text-xs xs:text-sm sm:text-base md:text-xl font-black tracking-wider text-blue-600 uppercase transition-colors hover:text-blue-700 font-display">
              RAIMOND SOLAR PVT LTD
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-black tracking-tight text-slate-700 uppercase font-display">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("on-grid")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              Solar On-Grid System
            </button>
            <button
              onClick={() => scrollToSection("price")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              Price
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              Package Options
            </button>
            <button
              onClick={() => scrollToSection("subsidy-calculator")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer inline-block whitespace-nowrap"
            >
              Smart Subsidy Calculator
            </button>
            <button
              onClick={() => scrollToSection("video")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer inline-block whitespace-nowrap"
            >
              Raimond Solar Video
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-amber-500 hover:scale-105 transition-all cursor-pointer"
            >
              FAQ
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* RED DUAL-DESKTOP/MOBILE CT CUSTOM CALL BUTTON */}
            <a
              href="tel:9073059780"
              onClick={() => trackEvent("Phone Click", { location: "Nav Red Call Now Button" })}
              id="gtm-call-btn"
              className="gtm-call-click px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-black bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-rose-600/30 flex items-center gap-1 sm:gap-1.5 shrink-0 animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current shrink-0" />
              <span className="font-mono">9073059780</span>
            </a>

            {/* Mobile / Tablet Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 shrink-0 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drop-down with slick animations - Positioned Absolutely to prevent page shifting */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="xl:hidden absolute top-full left-0 right-0 border-t border-slate-200/80 bg-white shadow-xl overflow-hidden text-left z-50 max-h-[82vh] overflow-y-auto"
            >
              <div className="px-5 py-5 space-y-1.5 flex flex-col font-display font-black text-xs uppercase tracking-wider text-slate-800">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("home");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("on-grid");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Solar On-Grid System</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("price");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Price</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("packages");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Package Options</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("subsidy-calculator");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Smart Subsidy Calculator</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("video");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl border-0 cursor-pointer flex items-center justify-between group"
                >
                  <span>Raimond Solar Video</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("faq");
                  }}
                  className="w-full text-left py-3 px-3 hover:text-amber-500 hover:bg-slate-50 transition-all rounded-xl cursor-pointer flex items-center justify-between group"
                >
                  <span>FAQ</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION with High-Quality Solar Panel Background Roof Image */}
      <section 
        className="relative overflow-hidden py-10 md:py-20 px-4 sm:px-8 bg-cover bg-center bg-no-repeat" 
        id="home"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1920')`
        }}
      >
        {/* Dark material gradient overlay for legibility - Responsive gradient flow */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/85 to-slate-950/75 lg:bg-gradient-to-r lg:from-slate-950/90 lg:via-slate-950/70 lg:to-slate-900/40 pointer-events-none z-0 animate-fade-in" />
        
        {/* Dynamic Sky Clouds Auto-Drifting Animation Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
          {/* Custom Portable CSS Animation Styles for Cloud Drifting */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes cloud-drift-slow {
              0% {
                transform: translate3d(-400px, 0, 0);
                opacity: 0;
              }
              10% {
                opacity: 0.16;
              }
              90% {
                opacity: 0.16;
              }
              100% {
                transform: translate3d(105vw, 0, 0);
                opacity: 0;
              }
            }

            @keyframes cloud-drift-medium {
              0% {
                transform: translate3d(-500px, 0, 0);
                opacity: 0;
              }
              15% {
                opacity: 0.12;
              }
              85% {
                opacity: 0.12;
              }
              100% {
                transform: translate3d(105vw, 0, 0);
                opacity: 0;
              }
            }

            @keyframes cloud-drift-fast {
              0% {
                transform: translate3d(-300px, 0, 0);
                opacity: 0;
              }
              25% {
                opacity: 0.08;
              }
              75% {
                opacity: 0.08;
              }
              100% {
                transform: translate3d(105vw, 0, 0);
                opacity: 0;
              }
            }

            .animate-cloud-slow {
              animation: cloud-drift-slow 85s linear infinite;
            }

            .animate-cloud-medium {
              animation: cloud-drift-medium 62s linear infinite;
              animation-delay: 18s;
            }

            .animate-cloud-fast {
              animation: cloud-drift-fast 42s linear infinite;
              animation-delay: 35s;
            }
          `}} />

          {/* Cloud Formation 1 - Slow & High Sky */}
          <div 
            className="absolute top-[5%] left-0 w-[420px] text-white/90 filter blur-[15px] animate-cloud-slow"
            style={{ willChange: "transform" }}
          >
            <svg viewBox="0 0 100 60" className="w-full h-auto fill-current">
              <path d="M 12 40 Q 15 28 28 28 Q 32 18 45 18 Q 58 18 64 28 Q 78 28 80 40 Q 82 50 70 50 L 22 50 Q 8 50 12 40 Z" />
            </svg>
          </div>
          
          {/* Cloud Formation 2 - Medium & Middle Sky */}
          <div 
            className="absolute top-[18%] left-0 w-[550px] text-sky-100/80 filter blur-[22px] animate-cloud-medium"
            style={{ willChange: "transform" }}
          >
            <svg viewBox="0 0 100 60" className="w-full h-auto fill-current">
              <path d="M 10 42 A 15 15 0 0 1 25 25 A 20 20 0 0 1 60 20 A 18 18 0 0 1 85 30 A 14 14 0 0 1 90 42 Z" />
            </svg>
          </div>

          {/* Cloud Formation 3 - Fast & Lower Sky */}
          <div 
            className="absolute top-[32%] left-0 w-[320px] text-white/70 filter blur-[12px] animate-cloud-fast"
            style={{ willChange: "transform" }}
          >
            <svg viewBox="0 0 100 60" className="w-full h-auto fill-current">
              <path d="M 20 45 C 20 40, 25 35, 30 35 C 32 30, 38 25, 45 25 C 52 25, 58 30, 60 35 C 65 35, 75 40, 75 48 L 20 48 Z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Main Hero Header Highlights */}
          <div className="lg:col-span-7 space-y-6 text-left">
 
            {/* Bengali/English Hybrid Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white leading-tight font-display animate-fade-in">
              সরকারি ভর্তুকির সুবিধায় নিজের বাড়িতে সোলার বসান ও <span className="text-amber-500 underline decoration-amber-500 decoration-wavy decoration-1 underline-offset-4">বিদ্যুৎ বিল অনেকাংশে সাশ্রয়</span> করুন
            </h1>
 
            {/* Subheadline Details */}
            <p className="text-slate-100 text-base sm:text-lg max-w-xl leading-relaxed drop-shadow-sm font-semibold">
              পশ্চিমবঙ্গের সর্বাধিক নির্ভরযোগ্য সোলার কোম্পানি <strong className="text-white font-black bg-slate-900/40 px-1 py-0.5 rounded">RAIMOND SOLAR PVT LTD</strong>-র সাহায্যে আপনার বাড়ির ছাদকে বানান আপনার নিজস্ব গ্রিন বিদ্যুৎ কেন্দ্র।
            </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
              <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">১kWp থেকে 100kWp সোলার</h4>
                  <p className="text-xs text-slate-400 mt-0.5">রপ্তানীযোগ্য On-Grid Solar System</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">WBSEDCL Full Office Support</h4>
                  <p className="text-xs text-slate-400 mt-0.5">আমরা আপনাকে WBSEDCL & CESC-এর আবেদন প্রক্রিয়াকরণ এবং প্রয়োজনীয় ডকুমেন্টস তৈরিতে সম্পূর্ণ সহায়তা প্রদান করি।</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Net Metering Connection</h4>
                  <p className="text-xs text-slate-400 mt-0.5">বিল দ্বিগুণ সাশ্রয় করতে অতিরিক্ত বিদ্যুৎ গ্রিডে ফেরত দিন</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Up to ₹78,000 Estimated Subsidy Support</h4>
                  <p className="text-xs text-slate-400 mt-0.5">সরকারি নির্দেশিকা অনুযায়ী সর্বোচ্চ অনুদানের আবেদন প্রক্রিয়াকরণে সম্পূর্ণ সহযোগিতা</p>
                </div>
              </div>
            </div>
 
            {/* Hero Interactive CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => scrollToSection("price")}
                className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-center rounded-2xl transition-all shadow-[0_5px_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 hover:scale-108 hover:shadow-emerald-500/40 active:scale-95 duration-200 cursor-pointer"
              >
                View Package Prices (প্যাকেজ মূল্য) <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* WhatsApp direct trigger with official design */}
              <a
                href="https://wa.me/919073059780?text=I%20want%20to%20know%20more%20about%20Raimond%20Solar%20Subsidy%20Setup"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsApp Click", { location: "Hero Section Quick Link" })}
                id="gtm-whatsapp-btn"
                className="gtm-whatsapp-click px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-gray-950 font-black text-center rounded-2xl transition-all shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.65)] flex items-center justify-center gap-2 hover:scale-108 active:scale-95 duration-200 cursor-pointer border border-[#25D366]"
              >
                <WhatsAppIcon className="w-5 h-5 text-gray-950 fill-gray-950" /> 
                <span>WhatsApp Now</span>
              </a>
            </div>

            {/* Core Metrics Summary */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80">
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-500 font-display">1500+</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-extrabold mt-0.5">Successful Installs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">18+ Years</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-extrabold mt-0.5">Industry Experience</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-500 font-display">4.9 / 5</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-extrabold mt-0.5">Client Rating</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">ISO 9001</div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase font-extrabold mt-0.5">Certified Co.</div>
              </div>
            </div>
          </div>
 
          {/* HIGH-CONVERSION HERO LEAD CAPTURE FORM SHEET */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 font-sans" id="hero-lead-form">
            <AnimatePresence mode="wait">
              {leadSubmitted ? (
                <motion.div
                  key="thank-you-view"
                  id="gtm-lead-success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white text-slate-900 border border-emerald-200 rounded-3xl p-8 relative shadow-2xl text-center relative overflow-hidden"
                >
                  {/* Glowing success top bar */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-emerald-500 shadow-[0_2px_10px_rgba(16,185,129,0.3)] animate-pulse" />
                  
                  {/* Animated Checkmark Bubble */}
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 relative shadow-inner">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
                    <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-950 font-display tracking-tight">আপনার বুকিং সফল হয়েছে!</h3>
                  <p className="text-xs text-sky-700 font-extrabold uppercase tracking-widest mt-1.5 block">
                    We Will Contact You Shortly
                  </p>
                  
                  <p className="text-sm text-slate-650 text-slate-600 mt-4 leading-relaxed font-semibold">
                    ধন্যবাদ! আমাদের Solar Expert Agent <strong className="text-amber-500 font-bold">Raimond Solar Team</strong> ২৪ ঘণ্টার মধ্যে আপনার সাথে সরাসরি যোগাযোগ করবেন।
                  </p>

                  {/* Immediate Action Buttons (Call & WhatsApp) */}
                  <div className="mt-7 space-y-3.5">
                    {/* Direct WhatsApp Call to Action */}
                    <a
                      href="https://wa.me/919073059780?text=I%20have%20registered%20for%20a%20solar%20consultation.%20Please%20provide%20pricing."
                      target="_blank"
                      rel="noopener noreferrer"
                      id="gtm-whatsapp-btn"
                      className="gtm-whatsapp-click flex items-center justify-center gap-3 w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-2xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white fill-current" />
                      হোয়াটসঅ্যাপ চ্যাট (WhatsApp Now)
                    </a>

                    {/* Direct Phone Call Button */}
                    <a
                      href="tel:9073059780"
                      id="gtm-call-btn"
                      className="gtm-call-click flex items-center justify-center gap-3 w-full py-3.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-2xl transition-all shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <Phone className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                      সরাসরি কল করতে (Call Support)
                    </a>
                  </div>

                  {/* Trust point indicator */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    ⚡ Official PM Surya Ghar Vendor Partner
                  </div>

                  <button
                    onClick={() => {
                      setLeadSubmitted(false);
                      trackEvent("Button Click", { action: "Fill Form Again" });
                    }}
                    className="mt-6 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors inline-block cursor-pointer underline underline-offset-4"
                  >
                    নতুন বুকিং করুন (New Registration)
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="lead-form-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white text-slate-900 border border-slate-200/80 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden"
                >
                  {/* Modern top gradient bar decoration */}
                  <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-black uppercase tracking-widest font-display inline-block">
                        Empaneled Vendor for WBSEDCL Consumers
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 mt-1 tracking-tight font-display">Book Free Consultation</h3>
                    <p className="text-xs text-slate-600 mt-2 font-medium">সহজ ফর্মটি পূরণ করুন, আমাদের সোলার বিশেষজ্ঞ সরাসরি ফোনে ১৫ মিনিটে যোগাযোগ করবেন।</p>
                  </div>

                  {formErr && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs mb-4 font-bold text-center flex items-center justify-center gap-2">
                      ⚠️ {formErr}
                    </div>
                  )}

                  <form id="solarLeadForm" onSubmit={handleLeadFormSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="fullName" className="text-[10px] text-slate-700 uppercase font-black tracking-wider block mb-1.5 label-title">
                        আপনার সম্পূর্ণ নাম (Your Full Name) <span className="text-rose-500 font-extrabold">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          placeholder="যেমন: রামপ্রসাদ মুখার্জী"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all duration-200 font-semibold"
                        />
                      </div>
                    </div>

                    {/* Phone number */}
                    <div>
                      <label htmlFor="phone" className="text-[10px] text-slate-700 uppercase font-black tracking-wider block mb-1.5 label-title">
                        ফোন নম্বর (Valid Mobile Number) <span className="text-rose-500 font-extrabold">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors flex items-center pr-2.5 border-r border-slate-200 gap-1.5 pointer-events-none">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="font-mono text-slate-500 font-bold text-xs">+91</span>
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="১০ ডিজিটের মোবাইল নম্বর"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl pl-20 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all duration-200 font-mono font-semibold"
                        />
                      </div>
                    </div>

                    {/* District Select Dropdown */}
                    <div>
                      <label htmlFor="district" className="text-[10px] text-slate-700 uppercase font-black tracking-wider block mb-1.5 label-title">
                        পশ্চিমবঙ্গের জেলা (District) <span className="text-rose-500 font-extrabold">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <select
                          id="district"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl pl-11 pr-10 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none transition-all cursor-pointer font-bold appearance-none"
                        >
                          {WB_DISTRICTS.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-emerald-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Monthly Bill & Preferred System */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="monthlyBill" className="text-[10px] text-slate-700 uppercase font-black tracking-wider block mb-1.5 label-title">
                          মাসিক বিল (Avg Bill)
                        </label>
                        <div className="relative group">
                          <select
                            id="monthlyBill"
                            value={monthlyBill}
                            onChange={(e) => setMonthlyBill(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-3 pr-8 py-3 text-xs text-slate-800 focus:outline-none transition-all cursor-pointer font-bold appearance-none"
                          >
                            <option value="₹500-1000">₹500-1000</option>
                            <option value="₹1000-2000">₹1000-2000</option>
                            <option value="₹2000-3000">₹2000-3000</option>
                            <option value="₹3000-5000">₹3000-5000</option>
                            <option value="₹5000+">₹5000+</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="preferredSystem" className="text-[10px] text-slate-700 uppercase font-black tracking-wider block mb-1.5 label-title">
                          সিস্টেম সাইজ (Size)
                        </label>
                        <div className="relative group">
                          <select
                            id="preferredSystem"
                            value={preferredSystem}
                            onChange={(e) => setPreferredSystem(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-3 pr-8 py-3 text-xs text-slate-800 focus:outline-none transition-all cursor-pointer font-bold appearance-none"
                          >
                            <option value="1kWp">1kWp System</option>
                            <option value="2kWp">2kWp System</option>
                            <option value="3kWp">3kWp System</option>
                            <option value="4kWp">4kWp System</option>
                            <option value="5kWp">5kWp System</option>
                            <option value="5kWp-100kWp">5-100kWp Max</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={submittingLead}
                      className="w-full py-4 text-center text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.985] font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer mt-5"
                    >
                      {submittingLead ? (
                        <>
                          <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          বুকিং হচ্ছে... (Booking...)
                        </>
                      ) : (
                        <>
                          ফ্রি পরামর্শ ও সাইট সার্ভে বুক করুন <ArrowRight className="w-4.5 h-4.5" />
                        </>
                      )}
                    </button>

                    {/* Trust details */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>No commitments • Free design blueprint included</span>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
 
        </div>
      </section>

      {/* SUBSIDY QUICK HIGHLIGHT GRID - Clean Material Gradient Card Section */}
      <section className="py-8 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white border border-slate-200 p-3.5 sm:p-5 rounded-3xl relative overflow-hidden text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.08] active:scale-95 hover:border-amber-400/50 cursor-pointer">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block font-display">1kWp Solar Unit</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 my-1.5 sm:my-2 font-mono">₹30,000</div>
              <div className="text-[10px] sm:text-xs text-slate-600 bg-slate-50 py-1.5 rounded-xl border border-slate-100 font-bold leading-normal">
                ক্যাবিনেট স্তরের অনুমোদিত ভর্তুকি
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 sm:p-5 rounded-3xl relative overflow-hidden text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.08] active:scale-95 hover:border-amber-400/50 cursor-pointer">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block font-display">2kWp Solar Unit</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 my-1.5 sm:my-2 font-mono">₹60,000</div>
              <div className="text-[10px] sm:text-xs text-slate-600 bg-slate-50 py-1.5 rounded-xl border border-slate-100 font-bold leading-normal">
                রানিং কিস্তি ও ব্যাংক লোন উপলব্ধ
              </div>
            </div>

            <div className="bg-white border-2 border-amber-400 p-3.5 sm:p-5 rounded-3xl relative overflow-hidden text-center shadow-md bg-amber-50/20 transition-all duration-300 scale-102 sm:scale-105 hover:scale-[1.10] active:scale-95 hover:shadow-xl cursor-pointer">
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[8px] sm:text-[9px] font-black px-1.5 sm:px-2 py-0.5 rounded-bl uppercase tracking-wide">
                Best Benefit
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-widest block font-display">3kWp - 10kWp Max</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 my-1.5 sm:my-2 font-mono">₹78,000</div>
              <div className="text-[10px] sm:text-xs text-emerald-800 bg-emerald-50 py-1.5 rounded-xl border border-emerald-100 font-bold leading-normal">
                সর্বাধিক সাশ্রয় ও দীর্ঘস্থায়ী বিদ্যুৎ উৎপাদন
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 sm:p-5 rounded-3xl relative overflow-hidden text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.08] active:scale-95 hover:border-amber-400/50 cursor-pointer">
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block font-display">Above 10kWp</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 my-1.5 sm:my-2 font-mono">₹78,000</div>
              <div className="text-[10px] sm:text-xs text-slate-600 bg-slate-50 py-1.5 rounded-xl border border-slate-100 font-bold leading-normal">
                সর্বোচ্চ ক্যাটাগরি ফিক্সড সাবসিডি
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGE PRICING SECTION - Set with professional white gradients & materials */}
      <section className="py-16 md:py-24 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-white" id="price">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-sky-600 font-bold tracking-widest uppercase block mb-2 font-display">
              No Hidden Charges • Complete Turnkey Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-display">
              Raimond Solar Subsidy Package Options
            </h2>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed font-semibold">
              পশ্চিমবঙ্গ বিদ্যুৎ পর্ষদের (WBSEDCL) অধীনে সরকারি প্রজেক্টের ভর্তুকি ক্লেইম করার পর আপনার মোট খরচের নিখুঁত প্যাকেজ বিবরণ।
            </p>
          </div>

          {/* Quick Recommended System Reference Guide */}
          <div className="max-w-7xl mx-auto mb-16 p-8 sm:p-10 bg-amber-50/60 border border-amber-200/70 rounded-[2rem] shadow-md relative overflow-hidden">
            {/* Ambient subtle light blur background effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900 font-display mb-8 flex items-center gap-2.5 justify-center text-center">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Recommended Solar System Based on Your Monthly Electricity Bill
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
              {[
                { size: "1kWp Solar System", bill: "₹500 - ₹1,000", bg: "from-amber-50/30 to-amber-100/10" },
                { size: "2kWp Solar System", bill: "₹1,000 - ₹2,000", bg: "from-sky-50/30 to-sky-100/10" },
                { size: "3kWp Solar System", bill: "₹2,000 - ₹3,000", bg: "from-emerald-50/30 to-emerald-100/10", tag: "Best Seller" },
                { size: "4kWp Solar System", bill: "₹3,000 - ₹4,000", bg: "from-teal-50/30 to-teal-100/10" },
                { size: "5kWp Solar System", bill: "₹4,000 - ₹5,000", bg: "from-indigo-50/30 to-indigo-100/10" },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white border-2 border-slate-200/80 p-3.5 sm:p-5 rounded-2xl text-center relative shadow-sm hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform scale-100 hover:scale-[1.08] active:scale-[1.03] select-none cursor-pointer flex flex-col justify-between min-h-[125px] sm:min-h-[145px] group ${index === 4 ? "col-span-1 xs:col-span-2 md:col-span-1" : ""}`}
                >
                  {item.tag && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] sm:text-[9px] font-black uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full tracking-wider shadow-sm z-10 whitespace-nowrap">
                      {item.tag}
                    </span>
                  )}
                  <div className="text-xs sm:text-base font-extrabold text-slate-950 tracking-tight font-display transition-colors group-hover:text-emerald-700">{item.size}</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500 font-bold my-1 sm:my-1.5 uppercase tracking-wide">Electricity Bill</div>
                  <div className="text-xs sm:text-base font-mono font-black text-emerald-800 bg-emerald-50/90 border border-emerald-200 py-1.5 px-2 sm:py-2 sm:px-3 rounded-xl inline-block w-full shadow-sm transition-colors group-hover:bg-emerald-100/40">
                    {item.bill}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Micro-hint under the grid */}
            <p className="text-center text-[10px] sm:text-xs text-slate-500 font-bold mt-6 tracking-wide italic">
              💡 Touch or hover over any option to scale. Systems are completely customisable depending on space.
            </p>
          </div>

          {/* Package Grid layout with white gradients and crisp borders */}
          <div id="packages" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SOLAR_PACKAGES.map((pkg) => {
              const isHighlyRecommended = pkg.id === "pkg-3kw";
              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between hover:scale-[1.05] active:scale-98 hover:shadow-2xl cursor-pointer ${
                    isHighlyRecommended
                      ? "border-amber-400 shadow-lg relative bg-gradient-to-b from-amber-50/10 to-white hover:border-amber-550"
                      : "border-slate-200/80 shadow-sm hover:border-amber-400/50"
                  }`}
                >
                  {isHighlyRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm font-display">
                      <Award className="w-3.5 h-3.5 stroke-[2.5]" /> Highly Recommended • সবচেয়ে লাভজনক
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Size and Info */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 font-display">{pkg.size}</h3>
                        <p className="text-xs text-slate-500 mt-1 font-bold">Suitable for: {pkg.suitableFor}</p>
                      </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="py-2 space-y-2 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 hover:scale-[1.02] hover:bg-slate-50 transition-all duration-200">
                      <div className="flex justify-between text-xs text-slate-500 font-semibold border-b border-slate-100/60 pb-1.5">
                        <span>Gross Install Price:</span>
                        <span className="font-mono text-slate-400 line-through">{pkg.grossPrice}</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-600 font-bold border-b border-slate-100/60 pb-1.5">
                        <span>PM Surya Ghar Subsidy:</span>
                        <span className="font-mono bg-emerald-100/60 px-2 py-0.5 rounded text-emerald-700">-{pkg.subsidy}</span>
                      </div>
                      
                      <div className="mt-2.5 pt-2.5 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">NET EFFECTIVE PACKAGE PRICE</span>
                          <span className="text-[9px] bg-rose-600 text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                            আজই বুকিং করুন
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold">ভর্তুকি পরবর্তী চূড়ান্ত মুল্য</span>
                          <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono tracking-tight hover:scale-105 duration-200">
                            {pkg.netPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Checklists highlights */}
                    <ul className="space-y-2.5 text-xs pt-1 border-t border-slate-100/80">
                      <li className="flex items-center justify-between text-slate-600">
                        <span>Daily Gen Average:</span>
                        <strong className="text-slate-900">{pkg.dailyGen}</strong>
                      </li>
                      <li className="flex items-center justify-between text-slate-600">
                        <span>Monthly Gen Average:</span>
                        <strong className="text-slate-900">{pkg.monthlyGen}</strong>
                      </li>
                      <li className="flex items-center justify-between text-slate-600">
                        <span>Monthly Bill Savings:</span>
                        <strong className="text-emerald-700 font-bold">~{pkg.monthlySavings}</strong>
                      </li>
                      <li className="flex items-center justify-between text-slate-600">
                        <span>Yearly Bill Savings:</span>
                        <strong className="text-emerald-700 font-bold">~{pkg.yearlySavings}</strong>
                      </li>
                      <li className="flex items-center justify-between text-slate-600">
                        <span>Required Roof Area:</span>
                        <strong className="text-slate-900 font-mono">{pkg.spaceRequired}</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-5 border-t border-slate-100">
                    <button
                      onClick={() => handleClaimCalculatorPkg(pkg.id === "pkg-1kw" ? 1 : pkg.id === "pkg-2kw" ? 2 : pkg.id === "pkg-3kw" ? 3 : pkg.id === "pkg-4kw" ? 4 : 5)}
                      id="gtm-book-package-btn"
                      className={`gtm-book-package-click w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
                        isHighlyRecommended
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-600/30"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400"
                      }`}
                    >
                      <span>আজই বুকিং করুন • Book Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLAR SAVINGS ROI CALCULATOR - Rendered on white gradient blocks */}
      <section className="py-16 md:py-24 px-4 sm:px-8 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200/85" id="subsidy-calculator">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs text-sky-600 font-bold uppercase tracking-widest block mb-2 font-display">
              Smart Financial Forecaster
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-display">
              Solar Savings & Grid Subsidy Calculator
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto font-medium">
              আপনার সোলার প্ল্যান্টের সাইজ অনুযায়ী দেখে নিন কত টাকা সোজাসুজি সরকারি অনুদান পাবেন এবং এবং আগামী ২৫ বছরে কত টাকা সাশ্রয় হতে পারে।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Control Panel inputs */}
            <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-600 uppercase font-black tracking-wider block mb-2 font-display">
                    ১. সোলার প্ল্যান্টের ক্ষমতা নির্ধারণ করুন (kWp)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setCalcSelectedSize(val);
                          trackEvent("Calculator Usage", { systemSizeSelected: `${val}kWp` });
                        }}
                        className={`py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl font-bold font-mono transition-all text-xs sm:text-sm cursor-pointer ${
                          calcSelectedSize === val
                            ? "bg-amber-500 text-slate-950 shadow-sm"
                            : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {val}kW
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-slate-600 uppercase font-black tracking-wider font-display">
                      ২. বর্তমান গড় মাসিক বিদ্যুৎ বিল
                    </label>
                    <span className="text-sm font-black font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      ₹{calcBill}/মাস
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="500"
                    value={calcBill}
                    onChange={(e) => {
                      setCalcBill(Number(e.target.value));
                    }}
                    className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>₹500</span>
                    <span>₹7,500</span>
                    <span>₹15,000</span>
                  </div>
                </div>
              </div>

              {/* Suitability details */}
              <div className="pt-6 border-t border-slate-100 mt-6 bg-slate-50 p-4 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-display">
                  <Sun className="w-4 h-4 text-amber-500" /> Space & Energy Estimate:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  আপনার নির্বাচিত সোলার ইউনিট দৈনিক গড়ে মাপা <strong className="text-slate-900 font-bold">{(calcSelectedSize * 4.6).toFixed(1)} Units</strong> বিদ্যুৎ উৎপন্ন করবে। এর জন্য আপনার ছাদের প্রয়োজন আনুমানিক <strong className="text-amber-600 font-bold">{calcSelectedSize * 60} sqft</strong> স্কয়ার ফিট।
                </p>
              </div>
            </div>

            {/* Calculations outputs with beautiful visual frames */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider font-display">Estimated Gross Cost</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                    ₹{calculatedGross.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                  <span className="text-[10px] text-emerald-700 block uppercase font-bold tracking-wider font-display">Estimated Govt. Subsidy (Subject to National Portal Approval)</span>
                  <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600">
                    -₹{calculatedSubsidy.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Big central effective pricing */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-150 to-white border border-amber-200 p-5 rounded-2xl text-center my-6">
                <span className="text-xs text-slate-600 uppercase tracking-widest block mb-1 font-bold font-display">
                  Net Setup Cost (ভর্তুকি পরবর্তী প্রকৃত খরচ)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-amber-600 font-mono">
                  ₹{calculatedNet.toLocaleString("en-IN")}*
                </span>
                <p className="text-[9px] text-slate-400 mt-1 font-semibold leading-normal">
                  *This includes our complete package of standard panels, inverter kit, structure and earthing logic arrays.
                </p>
              </div>

              {/* Savings grids */}
              <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-center">
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <h5 className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-black font-display leading-tight">Monthly savings</h5>
                  <div className="text-xs xs:text-sm sm:text-base font-bold font-mono text-slate-950 mt-1">~₹{calculatedMonthlySavings.toLocaleString("en-IN")}</div>
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <h5 className="text-[8px] xs:text-[9px] sm:text-[10px] text-slate-500 uppercase font-black font-display leading-tight">Yearly Savings</h5>
                  <div className="text-xs xs:text-sm sm:text-base font-bold font-mono text-slate-950 mt-1">~₹{calculatedYearlySavings.toLocaleString("en-IN")}</div>
                </div>
                <div className="p-2.5 sm:p-3 bg-amber-500/5 rounded-xl border border-amber-200 flex flex-col justify-between">
                  <h5 className="text-[8px] xs:text-[9px] sm:text-[10px] text-amber-700 uppercase font-black font-display leading-tight">25 Yr savings</h5>
                  <div className="text-xs xs:text-sm sm:text-base font-black font-mono text-amber-600 mt-1">
                    ~₹{calculated25YearSavings.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleClaimCalculatorPkg(calcSelectedSize)}
                className="w-full mt-6 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold rounded-xl transition-all shadow text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>এই হিসাবের ভিত্তিতে বুক করুন</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto" id="on-grid">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-sky-600 font-bold uppercase tracking-widest block mb-2 font-display">
            About Raimond Solar Pvt Ltd
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-display">
            Why West Bengal Trusts Raimond Solar Pvt Ltd
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-semibold">
            আমরা দীর্ঘ ১৮ বছর ধরে পশ্চিমবঙ্গে সোলার সংযোগ ও বিদ্যুৎ পরিকাঠামোয় কাজ করছি এবং ১৫০০ এর বেশি সফল সোলার সংযোগ কাস্টমার রয়েছে আমাদের।
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
            <ShieldCheck className="w-10 h-10 text-sky-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-950 mb-2 font-display">ISO Certified Co.</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Raimond Solar Pvt Ltd সম্পূর্ণ সার্টিফাইড ও সরকারি নিয়মানুযায়ী তালিকাভুক্ত সোলার এন্টারপ্রাইজ কোম্পানি। আমাদের ইনস্টল করা সিস্টেমগুলি সরকারি নির্দেশিকা মেনে তৈরি, যা গ্রাহকদের ন্যাশনাল পোর্টালের মাধ্যমে ভর্তুকির আবেদন করার যোগ্য করে তোলে।
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
            <Zap className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-950 mb-2 font-display">Premium DCR Solar Panels</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              সরকারি নির্দেশিকা মেনে আমরা শুধুমাত্র উচ্চ মানের ডমেস্টিক কনটেন্ট রিকোয়ারমেন্ট (DCR) এবং লেটেস্ট TOPCon / HJT সোলার মডিউল ব্যবহার করি দীর্ঘস্থায়ী বিদ্যুৎ উৎপাদনের নিশ্চয়তা দিতে।
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
            <HardDrive className="w-10 h-10 text-emerald-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-950 mb-2 font-display">WBSEDCL Full Office Assist</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              আপনার বাড়ির নতুন মিটারিং পরিবর্তন ও বিদ্যুৎ পর্ষদ (WBSEDCL & CESC) এর দপ্তরে আবেদনের সমস্ত টেকনিক্যাল প্রসেস এবং প্রয়োজনীয় নথিপত্র তৈরিতে আমাদের এক্সপার্ট টিম আপনাকে সম্পূর্ণ সহযোগিতা করবে।
            </p>
          </div>
        </div>
      </section>

      {/* WORKFLOW PROCESS SECTION (সোলার বসানোর সহজ ৬ ধাপ) */}
      <section className="py-16 md:py-24 px-4 sm:px-8 bg-slate-50 border-t border-slate-200/80" id="process-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs text-sky-600 font-bold uppercase tracking-widest block mb-1 font-display">
              Scientific Deployment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Installation Process (সোলার বসানোর সহজ ৬ ধাপ)
            </h2>
            <p className="text-slate-600 text-sm mt-3 font-semibold leading-relaxed">
              সোলার প্যানেল বসানো থেকে সরকারি ভর্তুকি দাবী ও আপনার ব্যাঙ্ক অ্যাকাউন্টে ক্রেডিট হওয়া পর্যন্ত প্রতি ধাপ আমরা সম্পন্ন করব।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">01</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Free Consult</h4>
              <p className="text-xs text-slate-600 mt-2">আমরা সায়েন্টিফিক উপায়ে হিসাব করে জানাই আপনার কত সোলার দরকার।</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">02</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Site Survey</h4>
              <p className="text-xs text-slate-600 mt-2">আমাদের সোলার ইঞ্জিনিয়ার আপনার বাড়ি বা ছাদ পরিদর্শন এবং ড্রয়িং সেট করেন।</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">03</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Design Approve</h4>
              <p className="text-xs text-slate-600 mt-2">গ্রাহকের পক্ষে MNRE ন্যাশনাল পোর্টাল এবং WBSEDCL & CESC-এর নিয়ম মেনে সোলার স্কিম ও সাবসিডির ডিজিটাল আবেদন প্রক্রিয়াকরণে আমরা সম্পূর্ণ সহযোগিতা করি।</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">04</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Installation</h4>
              <p className="text-xs text-slate-600 mt-2">আমাদের সুদক্ষ ইঞ্জিনিয়ার টিম সোলার প্যানেল সুচারুভাবে কাঠামোর উপর সংযুক্ত করে দেন।</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">05</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Net Metering</h4>
              <p className="text-xs text-slate-600 mt-2">ডাবল-মিটার সংযোগ সমাপ্ত করে সোলার গ্রিডকে বিদ্যুৎ পর্ষদের নেটওয়ার্কে লাইভ করা হয়।</p>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl relative shadow-sm">
              <span className="text-3xl font-black text-slate-200 absolute top-2 right-4">06</span>
              <h4 className="text-slate-900 font-bold text-sm font-display">Subsidy Pay</h4>
              <p className="text-xs text-slate-600 mt-2">সোলার সিস্টেম চালু হওয়ার পর সরকারি নির্দেশিকা অনুযায়ী ন্যাশনাল পোর্টালের মাধ্যমে আপনার ব্যাঙ্ক অ্যাকাউন্টে সরাসরি ভর্তুকি ক্রেডিট হওয়ার প্রক্রিয়ায় আমরা প্রয়োজনীয় সহায়তা প্রদান করি।</p>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO GALLERY SECTION */}
      <section className="py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto" id="video">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs text-sky-600 font-bold uppercase tracking-widest block mb-2 font-display">
            Solar Learning Hub / Educational Video Guides (সোলার গাইড ভিডিও)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-display">
            Video Learning & Case Studies
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-semibold">
            সোলার সিস্টেমের ব্যবহার, ১kWp থেকে ৫kWp-এর বিভিন্ন প্যাকেজের আসল ক্ষমতা এবং বিদ্যুৎ বিল সাশ্রয়ের সঠিক গাইডলাইন সরাসরি ভিডিওর মাধ্যমে দেখে নিন।
          </p>
        </div>

        {/* 6 YouTube Short URL iframe grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              id: "blyGZSIVA5s",
              title: "Raimond Solar Guide - 1kW Solar Load Analysis",
              desc: "১kW Solar দিয়ে কি কি চালাতে পারবেন?  সঠিক এবং বাস্তব সত্যটি এই ভিডিওর মাধ্যমে জেনে নিন।"
            },
            {
              id: "pcJ73U5KKT8",
              title: "Raimond Solar Guide - 2kW Solar & AC Compatibility",
              desc: "২kW Solar দিয়ে কি কি চালাতে পারবেন? এসি (AC) কেন চলবে কি না, তার আসল বৈজ্ঞানিক সত্যটি জানুন।"
            },
            {
              id: "PTHv4WqkDdM",
              title: "Raimond Solar Guide - 3kW Solar Appliance Guide",
              desc: "৩kW সোলার সিস্টেমে বাড়িতে কি কি লোড চলবে? এসি (AC) চালানো কি সম্ভব? বিস্তারিত সত্যটি দেখে নিন।"
            },
            {
              id: "sUI8iHyCXp0",
              title: "Raimond Solar Guide - 5kW System Calculation",
              desc: "৫ কিলোওয়াট (5 kW) সোলার সিস্টেমের সহজ হিসাব! ৫kW সোলার দিয়ে কি ২টি দেড় টনের এসি (1.5 Ton AC) চালানো সম্ভব? আপনার বাড়ির জন্য অন-গ্রিড (On-Grid) নাকি অফ-গ্রিড (Off-Grid) কোনটা সেরা, তা জানুন।"
            },
            {
              id: "PqHhUsqRGSY",
              title: "Raimond Solar Guide - Important Setup Precautions",
              desc: "Warning 🚨 সোলার লাগানোর আগে ৩টি অত্যন্ত জরুরি এবং আইনি পদ্ধতি অবশ্যই জেনে রাখুন।"
            },
            {
              id: "BlV_DfqRtUo",
              title: "Raimond Solar Guide - 90% Bill Reduction Strategy",
              desc: "কিভাবে আপনার বাড়ীর ইলেকট্রিক বিল ৯০% পর্যন্ত কমাবেন? Raimond Solar দেবে তার সঠিক ও নির্ভরযোগ্য সমাধান।"
            }
          ].map((vid) => (
            <div
              key={vid.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden p-4 relative flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all shadow-sm"
              id={`video-card-${vid.id}`}
            >
              {/* YouTube Iframe element */}
              <div className="relative aspect-[9/16] w-full max-h-[440px] bg-black rounded-2xl overflow-hidden shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4 text-left">
                <div className="text-[10px] text-amber-600 font-extrabold tracking-wider uppercase font-display mb-1 font-sans">Raimond Solar Guide</div>
                <h3 className="text-sm font-black text-slate-950 font-display leading-tight mb-2">{vid.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">{vid.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILED ACCORDION FAQ */}
      <section className="py-16 md:py-24 px-4 sm:px-8 max-w-4xl mx-auto" id="faq">
        <div className="text-center mb-12">
          <span className="text-xs text-sky-600 font-bold uppercase tracking-widest block mb-2 font-display">
            Solar Information Base
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-display">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed font-semibold">
            Clear answers on official government subsidies, rooftop installation requirements, and utility guidelines.
          </p>
        </div>

        {/* Collapsible item stack */}
        <div className="space-y-3.5">
          {[
            {
              q: "What is the PM Surya Ghar Yojana and who is eligible?",
              a: "PM Surya Ghar Muft Bijli Yojana is a central government subsidy scheme for implementing solar panel systems on residential rooftops from 1kW up to 10kW and above. Residential homeowners who have high-sunlight, shadow-free roof space and a connection with utility providers (WBSEDCL or CESC) can easily claim this subsidy.",
            },
            {
              q: "What is the maximum government subsidy structure in West Bengal?",
              a: "For residential houses, the central bank subsidy is ₹30,000 for a 1kWp system, ₹60,000 for a 2kWp system, and a maximum flat ceiling of ₹78,000 for a 3kWp system up to higher capacities. The subsidy is disbursed directly into your bank account after successful inspection and net-meter commissioning.",
            },
            {
              q: "What is the solar capacity limit for residential homes and how is it approved?",
              a: "While residential systems generally range from 1kW up to 10kW, WBSEDCL approves the installed solar capacity based on your sanctioned/connected load, available shadow-free roof space, and monthly electric consumption patterns. You can choose to install a capacity higher than 3kW, but please note that the subsidy will remain capped at a maximum of ₹78,000.",
            },
            {
              q: "How much roof space is required to install a 1kW On-Grid solar system?",
              a: "You will need approximately 60 square feet of clear, shadow-free, south-facing roof space to install a 1kWp On-Grid solar plant. The heavy-duty structural design is customized by our engineers depending on your specific flat concrete roof or tin-shed structure.",
            },
            {
              q: "What is the difference between On-Grid and Off-Grid solar systems?",
              a: "On-Grid systems operate without battery backup, exporting surplus daytime solar power directly back to the WBSEDCL/CESC grid. Off-Grid systems use batteries to store electricity for use during utility load shedding. Crucially, the official PM Surya Ghar government subsidy is only applicable for On-Grid solar installations.",
            },
            {
              q: "How many electricity units does a 1kWp system generate daily on average?",
              a: "Under West Bengal climate conditions, a highly optimized 1kWp solar plant generates an average of 4.6 units of clean green electricity daily (scaling up to approx 1,400+ units annually). Our certified TOPCon and HJT solar technologies maintain dependable production even during overcast or cloudy weather.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-205 shadow-sm hover:shadow-md hover:border-emerald-500/20"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveFaq(activeFaq === idx ? null : idx);
                  trackEvent("Button Click", { action: `Toggle FAQ Accordion Item: ${idx}` });
                }}
                className="w-full py-4 px-6 flex items-center justify-between text-left font-display font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-600 hover:bg-slate-50/50 transition-all duration-200"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                    activeFaq === idx ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-100 bg-slate-50/40"
                  >
                    <p className="py-4 px-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* SECONDARY BOTTOM LEAD ACTION BANNER */}
      <section className="py-12 px-4 sm:px-8 bg-slate-950 text-white border-t border-slate-800 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2">
            <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-black border border-amber-500/20 uppercase tracking-widest font-display inline-block">
              Immediate Assistance Line
            </span>
            <h3 className="text-2xl font-black font-display text-white">বিনা মূল্যে আপনার ছাদের সার্ভে করতে চান?</h3>
            <p className="text-slate-400 text-xs sm:text-sm">বিনা মূল্যে আপনার ছাদের সার্ভে ও সোলার কনসালটেশনের জন্য নিচের নম্বরে ফোন করুন অথবা কল করতে আবেদন করুন।</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a 
              href="tel:9073059780"
              onClick={() => trackEvent("Phone Click", { location: "Footer Banner Call CTA" })}
              id="gtm-call-btn"
              className="gtm-call-click px-6 py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-center rounded-2xl transition-all shadow-[0_5px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_10px_25px_rgba(225,29,72,0.5)] hover:scale-110 active:scale-95 duration-250 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-white font-black" /> Call 9073059780
            </a>
            <button
              onClick={() => {
                scrollToSection("home");
                trackEvent("Button Click", { action: "Footer Section Booking CTA Click" });
              }}
              className="px-8 py-4.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:via-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 hover:scale-[1.15] hover:-translate-y-1 active:scale-90 duration-300 cursor-pointer outline-none border-none select-none group focus:ring-2 focus:ring-emerald-400"
            >
              <Sun className="w-5.5 h-5.5 fill-slate-950 group-hover:rotate-180 transition-transform duration-700 text-slate-950 shrink-0" />
              <span>আজই বুকিং করুন • Book Today</span>
            </button>
          </div>
        </div>
      </section>

      {/* FLOATING TRIGGERS & AI CHAT BOT DESK */}

      {/* Floating WhatsApp Bubble with Official Green Aesthetics */}
      <a
        href="https://wa.me/919073059780?text=I%20have%20visited%20raimondsolar.in%20and%20want%20to%20apply%20for%20subsidy"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("WhatsApp Click", { location: "Floating Action Button" })}
        className="gtm-whatsapp-click fixed bottom-24 right-6 z-45 w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full flex items-center justify-center transition-all shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:scale-110 select-none group hidden md:flex"
        id="gtm-whatsapp-btn"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
        <span className="absolute right-16 bg-slate-950 border border-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all font-semibold shadow-md pointer-events-none">
          WhatsApp Support Open
        </span>
      </a>

      {/* STICKY BOTTOM MOBILE ACTION BAR - Essential for Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md z-45 grid grid-cols-3 gap-2 md:hidden">
        <a
          href="tel:9073059780"
          onClick={() => trackEvent("Phone Click", { location: "Sticky Mobile Bottom Bar" })}
          id="gtm-call-btn"
          className="gtm-call-click flex flex-col items-center justify-center py-2 px-1 bg-rose-600 rounded-xl transition-all text-white font-black hover:bg-rose-700 hover:scale-110 hover:shadow-rose-600/50 hover:shadow-lg active:scale-95 duration-200"
        >
          <Phone className="w-4 h-4 text-white" />
          <span className="text-[9px] mt-1 font-display">Call Now</span>
        </a>

        <a
          href="https://wa.me/919073059780?text=I%20want%20to%20know%20more%20about%20Raimond%20Solar%20from%20mobile."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("WhatsApp Click", { location: "Sticky Mobile Bottom Bar" })}
          id="gtm-whatsapp-btn"
          className="gtm-whatsapp-click flex flex-col items-center justify-center py-2 px-1 bg-[#25D366] rounded-xl transition-all text-white font-bold hover:bg-[#20ba59]"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span className="text-[9px] mt-1 font-display">WhatsApp</span>
        </a>

        <button
          onClick={() => scrollToSection("home")}
          id="sticky-mobile-quote"
          className="flex flex-col items-center justify-center py-2 px-1 bg-amber-500 rounded-xl text-slate-950 font-black transition-all hover:bg-amber-400"
        >
          <Sun className="w-4 h-4 fill-slate-950" />
          <span className="text-[9px] mt-1 font-display">Book Free</span>
        </button>
      </div>

      {/* ASK RAIMOND AI FLOATING CHATBOT WIDGET */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-48">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 50 }}
              transition={{ duration: 0.25 }}
              className="w-[calc(100vw-2rem)] sm:w-96 h-[400px] sm:h-[480px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-xl mb-16 relative text-left"
              id="ai-chatbot-dialog"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Chatbot Header */}
              <div className="bg-slate-950 border-b border-slate-850 px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center text-amber-500 font-bold relative overflow-visible shadow-inner">
                    {/* Pulsing glow ring */}
                    <span className="absolute -inset-0.5 rounded-xl bg-amber-500/10 animate-pulse pointer-events-none" />
                    
                    <Bot className="w-5 h-5 text-amber-500 relative z-10" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none flex items-center gap-1.5">
                      Raimond Solar AI
                      <span className="inline-block px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-extrabold uppercase rounded tracking-wider border border-emerald-500/20 animate-pulse">
                        Active
                      </span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest flex items-center gap-1 font-display mt-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-400 animate-pulse" /> Advanced Agent Solution 2.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:9073059780"
                    onClick={() => trackEvent("Phone Click", { location: "AI Chat Window Header" })}
                    className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-500" />
                  </a>
                  <button
                    onClick={() => {
                      setIsChatOpen(false);
                      trackEvent("Button Click", { action: "AI Chat Dialogue Closed" });
                    }}
                    className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Conversation Box */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-3.5 leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-amber-500 text-slate-950 font-semibold rounded-br-none text-left"
                          : "bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none text-left"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAILoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-850 border border-slate-800 rounded-2xl rounded-bl-none px-3.5 py-3 text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-150" />
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-300" />
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Action Box footer */}
              <form onSubmit={handleSendChatMessage} className="p-3 border-t border-slate-800 bg-slate-950/40">
                <div className="relative">
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    placeholder="সোলারের খরচ বা ভর্তুকি নিয়ে জিজ্ঞাসা করুন..."
                    className="w-full bg-slate-950 border border-slate-855 border-slate-800 focus:border-amber-500 rounded-xl pl-4 pr-11 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-0"
                    id="chat-input-text"
                  />
                  <button
                    type="submit"
                    disabled={!userChatInput.trim() || isAILoading}
                    id="chat-btn-send"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 hover:bg-amber-450 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4 shrink-0 font-bold" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI circular trigger button */}
        <button
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            trackEvent(isChatOpen ? "Button Click" : "Chat Open" as any, { source: "Floating Trigger" });
          }}
          id="chat-floating-trigger"
          className="w-14 h-14 bg-slate-900 border border-slate-800 text-slate-100 rounded-full flex items-center justify-center transition-all shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.45)] hover:scale-115 p-0 m-0 cursor-pointer z-50 select-none relative group overflow-visible"
        >
          {/* Internal rotating overlay trail */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-emerald-500/0 to-amber-500/30 animate-spin-slow pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 border border-slate-800 shadow-inner group-hover:border-amber-500/60 transition-colors">
            <Bot className="w-5.5 h-5.5 text-amber-500 group-hover:text-amber-400 group-hover:rotate-6 transition-all duration-300" />
          </div>

          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 select-none z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 text-[8px] font-extrabold text-slate-950 items-center justify-center whitespace-nowrap">
              AI
            </span>
          </span>
          <span className="absolute right-16 bg-slate-900 border border-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all font-semibold shadow-md pointer-events-none">
            Ask Raimond Solar AI
          </span>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white text-slate-500 text-xs py-12 px-4 sm:px-8 relative z-10 font-sans pb-24 md:pb-12 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="text-lg font-black tracking-tight text-slate-950 font-display">
              RAIMOND <span className="text-amber-500">SOLAR</span>
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
              র‍্যামন্ড সোলার প্রাইভেট লিমিটেড পশ্চিমবঙ্গের একটি তালিকাভুক্ত অগ্রণী সোলার এন্টারপ্রাইজ কোম্পানি। ছাদের অন-গ্রিড সংযোগ ও সরকারি ভর্তুকি রূপায়ণে আমরা নির্ভরযোগ্য অংশীদার।
            </p>
            <div className="text-[10px] text-sky-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> 
              <span>ISO Certified Co.</span>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-3 font-display">Service Areas (পশ্চিমবঙ্গে আমাদের এলাকা)</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600 font-semibold">
              <li>• Kolkata (কলকাতা)</li>
              <li>• Howrah (হাওড়া)</li>
              <li>• Hooghly (হুগলী)</li>
              <li>• North 24 Parganas</li>
              <li>• South 24 Parganas</li>
              <li className="text-amber-600">• All Districts (সমগ্র পশ্চিমবঙ্গ)</li>
            </ul>
          </div>

          {/* Corporate Office Location */}
          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-3 font-display">Corporate Details</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
              <strong>Raimond Solar Pvt Ltd</strong>
              <br />
              Sonarpur, Kolkata - 700150
              <br />
              West Bengal, India
            </p>
            <a
              href="https://maps.google.com/?cid=15167722827222380471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-700 hover:underline text-[11px] font-bold mt-2.5"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600" /> View on Google Maps
            </a>
          </div>

          {/* Helpline desk */}
          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-wider mb-3 font-display">Official Connections</h4>
            <ul className="space-y-2 text-[11px] text-slate-600 font-semibold">
              <li>
                Helpline Primary: <a href="tel:9073059780" className="text-slate-900 hover:text-rose-600 font-mono font-black">9073059780</a>
              </li>
              <li>
                Helpline Office: <a href="tel:6289638649" className="text-slate-900 hover:text-rose-600 font-mono font-black">6289638649</a>
              </li>
              <li>
                WhatsApp Chat: <a href="https://wa.me/919073059780" className="text-[#25D366] hover:underline font-mono font-bold">9073059780</a>
              </li>
              <li>
                Email Desk: <a href="mailto:info@raimondsolar.in" className="text-slate-700 hover:underline">info@raimondsolar.in</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-semibold gap-4">
          <div>
            © 2026 Raimond Solar Pvt Ltd. All Rights Reserved. Meta Pixel is fully configured on active nodes.
          </div>
          <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 text-slate-500 font-display font-bold">
            <a href="/admin" className="hover:text-amber-600 hover:underline">Admin CRM Panel</a>
            <a href="/privacy-policy" className="hover:text-amber-600 hover:underline cursor-pointer">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-amber-600 hover:underline cursor-pointer">Terms of Service</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 text-[10px] text-slate-400 leading-relaxed text-center border-t border-slate-200/50 pt-4">
          Disclaimer: Raimond Solar Pvt Ltd is an independent, private solar energy engineering and installation company. We are a registered vendor for WBSEDCL & CESC consumers of West Bengal. Please note that we are NOT a government organization, nor are we the official website of the PM Surya Ghar Muft Bijli Yojana, WBSEDCL or CESC. Subsidies are subject to clearance and rules set by the Government of India and respective electricity boards.
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left text-slate-900"
            >
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl sm:text-2xl font-black mb-4 text-slate-900 font-display">Privacy Policy</h3>
              <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <p className="font-bold">Last Updated: June 12, 2026</p>
                <p>Welcome to Raimond Solar Pvt Ltd (&apos;we,&apos; &apos;our,&apos; or &apos;us&apos;). We values your privacy and are committed to protecting your personal data in accordance with applicable legal guidelines.</p>
                <p><strong>1. Information We Collect:</strong> We collect personal details that you voluntarily submit to us via our pricing calculator and consultation inquiry forms, which include your Name, Phone Number, Monthly Electricity Bill Range, Preferred System Capacity, and District Location.</p>
                <p><strong>2. How We Use Informational Data:</strong> The captured details are strictly processed to schedule on-site engineering surveys, evaluate technical grid capabilities, calculate rooftop solar output capacity, assist in MNRE/PM Surya Ghar applications, and optimize solar product consultation. We do not engage in renting or selling your personal information to third-party brokers.</p>
                <p><strong>3. Security Safeguards:</strong> We employ robust security measures, restricted firewall parameters, and data protection practices to safeguard information from unauthorized modification, tracking, or access.</p>
                <p><strong>4. Contact Details:</strong> For questions concerning this policy, please reach us immediately at <a href="mailto:info@raimondsolar.in" className="text-sky-600 underline">info@raimondsolar.in</a>.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-slate-100 relative text-left text-slate-900"
            >
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl sm:text-2xl font-black mb-4 text-slate-900 font-display">Terms of Service</h3>
              <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                <p className="font-bold">Last Updated: June 12, 2026</p>
                <p>By accessing or navigating the Raimond Solar Pvt Ltd platform, you agree to comply with and be bound by the following Terms of Service:</p>
                <p><strong>1. Private Enterprise Disclaimer:</strong> Raimond Solar Pvt Ltd is an independent, private solar engineering organization and MNRE list-integrated solar installation vendor in West Bengal. We are not a government entity, nor are we representing PM Surya Ghar Scheme directly. Any government portal submissions are cooperative assistance services.</p>
                <p><strong>2. Quote & Estimates Accuracy:</strong> Calculations, ROI estimations, and subsidy numbers generated by the on-site calculator tool are highly detailed estimations intended purely for engineering and budgetary analysis. Actual price sheets vary depending on spatial layout constraints, roof shading, sub-district wiring configurations, and national-level subsidy approvals.</p>
                <p><strong>3. Use Restrictions:</strong> Homeowners confirm that accurate customer billing and electricity records are provided for technical verification. User data is utilized strictly for technical feasibility reviews.</p>
                <p><strong>4. Governing Authority:</strong> These terms are governed under Indian jurisdiction and MNRE / regional regulatory framework protocols of West Bengal.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
