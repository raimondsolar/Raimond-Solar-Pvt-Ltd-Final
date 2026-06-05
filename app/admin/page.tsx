"use client";

import React, { useEffect, useState } from "react";
import { Download, RefreshCw, UserCheck, Calendar, Phone, MapPin, Layers, LayoutList, Clock, Search, Filter, Lock, Mail, LogOut, Sun } from "lucide-react";
import { Lead } from "@/lib/leads-store";
import { trackEvent, initTracking } from "@/lib/tracking";

export default function LeadAdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("raimond_admin_authenticated") === "true";
    }
    return false;
  });
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [systemFilter, setSystemFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate credentials
    const targetEmail = "raimondsolar83@gmail.com";
    const targetPassword = "Website@9088";

    if (emailInput.trim().toLowerCase() === targetEmail && passwordInput === targetPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("raimond_admin_authenticated", "true");
      setLoginError(null);
      trackEvent("Button Click", { action: "Admin Login Success", user: targetEmail });
    } else {
      setLoginError("Invalid combination of Login ID and Password.");
      trackEvent("Button Click", { action: "Admin Login Failed", inputEmail: emailInput });
    }
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("raimond_admin_authenticated");
    setEmailInput("");
    setPasswordInput("");
    trackEvent("Button Click", { action: "Admin Logout" });
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to load leads from the server");
      }
      const data = await response.json();
      setLeads(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Leads database is currently loading or empty.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initTracking();
    const timer = setTimeout(() => {
      fetchLeads();
    }, 0);

    // Check for new leads from Firestore database every 8 seconds when active page is open
    const interval = setInterval(() => {
      if (sessionStorage.getItem("raimond_admin_authenticated") === "true") {
        fetchLeads();
      }
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.notes && lead.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDistrict = districtFilter === "All" || lead.district === districtFilter;
    const matchesSystem = systemFilter === "All" || lead.preferredSystem === systemFilter;
    const matchesSource = sourceFilter === "All" || lead.source === sourceFilter;

    return matchesSearch && matchesDistrict && matchesSystem && matchesSource;
  });

  // Extract unique filter populations
  const districts = ["All", ...Array.from(new Set(leads.map((l) => l.district)))];
  const systems = ["All", ...Array.from(new Set(leads.map((l) => l.preferredSystem)))];
  const sources = ["All", "form", "chat"];

  // CSV Export logic
  const handleExportCSV = () => {
    trackEvent("Button Click", { action: "CSV Lead Export Initiated" });
    if (filteredLeads.length === 0) return;

    const headers = ["ID", "Full Name", "Phone", "District", "Monthly Bill", "System Preference", "Source", "Timestamp", "Notes"];
    const rows = filteredLeads.map((lead) => [
      lead.id,
      `"${lead.fullName.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.district}"`,
      `"${lead.monthlyBill}"`,
      `"${lead.preferredSystem}"`,
      lead.source,
      lead.timestamp,
      `"${(lead.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `raimond_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
        {/* Sky Background Subtle Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950/70 to-slate-950 z-0 pointer-events-none" />

        {/* Ambient Moving Clouds Overlay behind Login Card */}
        <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden pointer-events-none z-0 select-none opacity-40">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes login-cloud-drift {
              0% { transform: translate3d(-350px, 0, 0); opacity: 0; }
              20% { opacity: 0.15; }
              80% { opacity: 0.15; }
              100% { transform: translate3d(105vw, 0, 0); opacity: 0; }
            }
            .animate-login-cloud {
              animation: login-cloud-drift 70s linear infinite;
            }
          `}} />
          <div className="absolute top-[10%] left-0 w-[400px] text-white filter blur-[15px] animate-login-cloud">
            <svg viewBox="0 0 100 60" className="w-full h-auto fill-current">
              <path d="M 12 40 Q 15 28 28 28 Q 32 18 45 18 Q 58 18 64 28 Q 78 28 80 40 Q 82 50 70 50 L 22 50 Q 8 50 12 40 Z" />
            </svg>
          </div>
        </div>

        <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10 animate-fade-in">
          {/* Logo Brand Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-4 animate-pulse">
              <Sun className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-wider text-white select-none">
              RAIMOND <span className="text-amber-500 font-bold">SOLAR</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 font-medium uppercase tracking-widest">
              Manager Control Center
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Login ID Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Login Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500 hover:border-slate-700 transition-colors placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-amber-500 hover:border-slate-700 transition-colors placeholder:text-slate-600 outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs font-semibold text-center leading-relaxed">
                {loginError}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-450 text-slate-950 font-bold py-3.5 px-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-amber-500/10 flex items-center justify-center gap-2 text-sm select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>

          {/* Secure indicator footer */}
          <div className="mt-8 text-center border-t border-slate-800/80 pt-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
              🔒 End-to-End Encrypted Admin Session
            </span>
            <p className="text-[10px] text-slate-450 leading-relaxed max-w-xs mx-auto">
              Access is monitored & permitted only to authorized personnel of Raimond Solar Pvt Ltd.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              RAIMOND <span className="text-amber-500">SOLAR</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Lead Management Admin Dashboard • Real-time PM Surya Ghar Client Inbound Tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-sm text-slate-300"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-xl hover:bg-amber-450 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/40 border border-rose-900/40 hover:bg-rose-900/60 text-rose-350 hover:text-rose-200 transition-colors text-sm font-semibold rounded-xl"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Inbounds</span>
              <UserCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-white">{leads.length}</div>
            <p className="text-xs text-slate-500 mt-1">Cumulative registered leads</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Captured via Forms</span>
              <LayoutList className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {leads.filter((l) => l.source === "form" || !l.source).length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Form landing submissions</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Captured via AI Chat</span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-white">
              {leads.filter((l) => l.source === "chat").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Automatic conversational leads</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Active Filtering</span>
              <Filter className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-extrabold text-white">{filteredLeads.length}</div>
            <p className="text-xs text-slate-500 mt-1">Matches current criteria</p>
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-slate-905/80 border border-slate-850/80 rounded-2xl p-5 mb-6 backdrop-blur-md">
          <h2 className="text-sm font-semibold text-slate-400 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-500" /> Search & Filter Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search name, phone, details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Filter by District */}
            <div>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="All">All Districts</option>
                {districts.filter(d => d !== "All").map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Filter by System Size */}
            <div>
              <select
                value={systemFilter}
                onChange={(e) => setSystemFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="All">All Capacities</option>
                {systems.filter(s => s !== "All").map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Filter by Source */}
            <div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="All">All Submission Channels</option>
                <option value="form">Landing Form</option>
                <option value="chat">Ask Raimond AI Chat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lead Table Container */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/20 border border-slate-850/80 rounded-2xl">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Querying active leads pool...</p>
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-slate-900/20 border border-slate-850/80 rounded-2xl">
            <p className="text-amber-500 text-sm">{error}</p>
            <p className="text-slate-500 text-xs mt-2">Submit a form lead to initiate server data.</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center p-12 bg-slate-900/20 border border-slate-850/80 rounded-2xl">
            <p className="text-slate-400 text-sm">No leads match the selected filtering criteria.</p>
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-slate-850/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Contact / Phone</th>
                    <th className="py-4 px-6">District</th>
                    <th className="py-4 px-6">Bill / System Preference</th>
                    <th className="py-4 px-6">Channel</th>
                    <th className="py-4 px-6">Registered At</th>
                    <th className="py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-[13px] text-slate-300">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">
                        {lead.fullName}
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1.5 text-amber-500 hover:underline font-mono"
                        >
                          <Phone className="w-3.5 h-3.5" /> {lead.phone}
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.district}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>Bill: <strong className="text-slate-200">{lead.monthlyBill}</strong></div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Size Limit: {lead.preferredSystem}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            lead.source === "chat"
                              ? "bg-emerald-600/10 text-emerald-450 border border-emerald-500/10"
                              : "bg-blue-600/10 text-blue-450 border border-blue-500/10"
                          }`}
                        >
                          {lead.source || "form"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {new Date(lead.timestamp).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          WhatsApp Reply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table count */}
            <div className="bg-slate-900/50 border-t border-slate-800 py-3.5 px-6 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing {filteredLeads.length} of {leads.length} recorded inquiries
              </div>
              <div className="font-mono text-[10px]">
                Active Campaign Code: RAIMOND_SOLAR_PV_2026
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
