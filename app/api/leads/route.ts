import { NextRequest, NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, district, monthlyBill, preferredSystem, source, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Full Name and Phone are required fields" },
        { status: 400 }
      );
    }

    const saved = await saveLead({
      fullName,
      phone,
      district: district || "Unknown",
      monthlyBill: monthlyBill || "Not Specified",
      preferredSystem: preferredSystem || "Not Specified",
      source: source || "form",
      notes: notes || "",
    });

    return NextResponse.json({ success: true, lead: saved });
  } catch (error: any) {
    console.error("API error in POST /api/leads:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("API error in GET /api/leads:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
