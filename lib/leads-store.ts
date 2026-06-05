import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  district: string;
  monthlyBill: string;
  preferredSystem: string;
  source: "form" | "chat";
  timestamp: string;
  notes?: string;
}

const LEADS_FILE_PATH = path.join("/tmp", "leads_db_gas.json");

// Direct Google Apps Script Web App URL provided by you
export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwVmh1IexoJTaVNJDYbJRu16klHeQj4lXUyJZ96foOE1czKjZrYPSWP-_PaELxtogJK/exec";

// Seed initial leads if the file doesn't exist
const initialLeads: Lead[] = [
  {
    id: "lead_initial_1",
    fullName: "Raimond Solar Team",
    phone: "9876543210",
    district: "Kolkata",
    monthlyBill: "₹2,500 - ₹5,000",
    preferredSystem: "3 kWp",
    source: "form",
    timestamp: "2026-06-05T10:00:00.000Z",
    notes: "Initial seed lead for Raimond Solar project."
  }
];

function readLeadsFromFile(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_FILE_PATH)) {
      fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(initialLeads, null, 2), "utf8");
      return initialLeads;
    }
    const rawData = fs.readFileSync(LEADS_FILE_PATH, "utf8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to read leads from local storage:", err);
    return initialLeads;
  }
}

function writeLeadsToFile(leads: Lead[]) {
  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write leads to local storage:", err);
  }
}

export async function getLeads(): Promise<Lead[]> {
  return readLeadsFromFile();
}

export async function saveLead(lead: Omit<Lead, "id" | "timestamp">): Promise<Lead> {
  const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  const timestamp = new Date().toISOString();
  
  const newLead: Lead = {
    fullName: lead.fullName || "Unknown",
    phone: lead.phone || "",
    district: lead.district || "Unknown",
    monthlyBill: lead.monthlyBill || "Not Specified",
    preferredSystem: lead.preferredSystem || "Not Specified",
    source: lead.source || "form",
    notes: lead.notes || "",
    id,
    timestamp,
  };
  
  const leads = readLeadsFromFile();
  leads.unshift(newLead);
  writeLeadsToFile(leads);

  // Send to Google Apps Script Web App URL from the server side as well
  try {
    const payload = {
      name: newLead.fullName,
      phone: newLead.phone,
      location: newLead.district + (newLead.notes ? ` (${newLead.notes})` : ""),
      monthlyBill: newLead.monthlyBill,
      preferredSystem: newLead.preferredSystem,
      systemSize: newLead.preferredSystem,
      system_size: newLead.preferredSystem,
      preferred_system: newLead.preferredSystem,
      system: newLead.preferredSystem,
      size: newLead.preferredSystem,
      systemsize: newLead.preferredSystem,
      preferredsystem: newLead.preferredSystem,
    };
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).catch(e => {
      // Direct Webhook redirects may throw standard fetch errors (CORs boundary redirects), which is expected
      console.warn("Fetch to webhook completed or returned standard silent redirect status:", e.message);
    });
    
    clearTimeout(timeoutId);
  } catch (error) {
    console.error("Failed to forward lead to Google Apps Script Web App:", error);
  }

  return newLead;
}
