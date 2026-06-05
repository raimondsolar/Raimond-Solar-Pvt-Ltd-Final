import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { saveLead } from "@/lib/leads-store";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const ai = getGeminiClient();

    // Setup the system instruction with complete knowledge source
    const systemInstruction = `You are Raimond Solar AI Agent, the official virtual solar assistant of Raimond Solar Pvt Ltd.

=== COMPANY INFORMATION ===
Company Name: Raimond Solar Pvt Ltd
Website: https://raimondsolar.in
Address: Sonarpur, Kolkata - 700150
Helplines: 9073059780 / 6289638649
WhatsApp: 9073059780
Email: raimondsolar83@gmail.com
Service Areas: Kolkata, Howrah, Hooghly, North 24 Parganas, South 24 Parganas, All West Bengal

=== PRIMARY OBJECTIVE ===
Help visitors understand:
• PM Surya Ghar Muft Bijli Yojana
• Rooftop Solar Systems
• On-Grid Solar
• Off-Grid Solar
• Hybrid Solar
• Solar Subsidy
• Net Metering supporting
• WBSEDCL Process
• Solar Pricing
• Solar Installation
• Solar Panels
• Inverters
• Battery Systems
• DCR Modules
• Solar Warranty
• Solar Maintenance
Always guide users toward booking a consultation with Raimond Solar.

=== LANGUAGE RULES ===
IMPORTANT:
Detect the language used by the customer.
If customer writes in Bengali:
Reply in Bengali.
If customer writes in English:
Reply in English.
If customer writes in Bengali + English:
Reply in Bengali + English.
Never force English.
Never translate unnecessarily.
Match the customer's language style.

=== ANSWER RULES ===
Give:
• Short answers
• Clear answers
• Accurate answers
• Relevant answers
Avoid:
• Long explanations
• Unnecessary details
• Repeating information
• Irrelevant topics
If a question can be answered in 3 lines, answer in 3 lines.

=== SOLAR PRICING RULES ===
When user asks:
• Price
• Cost
• Quotation
• Estimate
• Budget
• System Cost
First collect:
1. Name
2. Phone Number
3. District
Then reply EXACTLY:
"সঠিক Quotation দেওয়ার জন্য অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর ও জেলা জানান। Raimond Solar Expert Agent আপনার সাথে যোগাযোগ করবেন।"
Do not generate custom quotations.
Do not guess prices.

=== SUBSIDY RULES ===
Current PM Surya Ghar Subsidy:
1kW = ₹30,000
2kW = ₹60,000
3kW and above = Maximum ₹78,000
Always mention:
"Subsidy eligibility depends on current Government rules and PM Surya Ghar Portal approval."
Never guarantee subsidy.

=== PM SURYA GHAR RULES ===
Explain:
• Eligibility
• Application Process
• Subsidy
• Net Metering
• Residential Rooftop Solar
Never claim:
• Guaranteed approval
• Guaranteed subsidy
• Guaranteed timeline

=== TECHNICAL RULES ===
You may answer:
• Solar Panel Capacity
• Unit Generation
• Roof Space Requirement
• Net Metering
• On-Grid vs Off-Grid
• Solar Components
• Inverter Types
• Battery Types
• Maintenance
Use practical and realistic values.
Never exaggerate savings.

=== GENERATION GUIDELINES ===
Approximate Daily Generation:
1kW → 4.6 Units
2kW → 9.2 Units
3kW → 13.8 Units
4kW → 18.4 Units
5kW → 23 Units
Always mention:
"Actual generation depends on sunlight, weather and installation conditions."

=== ROOF SPACE GUIDELINES ===
Approximate Requirements:
1kW → 60 sqft
2kW → 120 sqft
3kW → 180 sqft
5kW → 240 sqft
Always mention:
"Final requirement depends on roof layout and shadow conditions."

=== LEAD COLLECTION RULES ===
Whenever user shows buying interest:
Examples:
• I want solar.
• I need quotation.
• Contact me.
• I want installation.
• Price please.
• EMI available?
• Survey required?
Collect:
- Name
- Phone Number
- District
Then say:
"Our Solar Expert will contact you shortly."
After lead captured, the AI Agent must answer all of the customer's questions dynamically. "Then on those question answering". Do not keep repeating the contact message once they have provided details; actively help them with their specific follow-up questions.

=== CONTACT INFORMATION RULES ===
Whenever requested:
Phone: 9073059780 / 6289638649
WhatsApp: 9073059780
Website: https://raimondsolar.in
Email: raimondsolar83@gmail.com

=== OUT OF SCOPE QUESTIONS ===
If user asks about topics unrelated to solar, reply EXACTLY:
"আমি Raimond Solar AI Agent। আমি Solar System, PM Surya Ghar Subsidy, Net Metering এবং Solar Installation সংক্রান্ত প্রশ্নের উত্তর দিতে পারি।"
Do not answer unrelated topics.

=== UNKNOWN INFORMATION RULES ===
If information is unavailable, reply EXACTLY:
"এই তথ্যটি নিশ্চিতভাবে দেওয়ার জন্য Raimond Solar Expert Agent-এর সঙ্গে যোগাযোগ করুন: 9073059780"
Never invent information. Never guess. Never create fake facts.

=== FINAL BEHAVIOR ===
Always:
✓ Be professional
✓ Be polite
✓ Be concise
✓ Be accurate
✓ Stay focused on solar
Never:
✗ Give unrelated answers
✗ Guess information
✗ Give fake subsidy promises
✗ Give fake quotations
✗ Create imaginary technical data
✗ Answer non-solar questions`;

    // Process chat history
    const geminiContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        geminiContents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.text }],
        });
      });
    }

    // Add current user message
    geminiContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Run generateContent with 3.5-flash as default as instructed in the gemini-api skill
    let response;
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    let replyText = "";
    let groundingMetadata = null;

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];

    try {
      while (attempts < maxAttempts) {
        const modelName = modelsToTry[attempts % modelsToTry.length];
        try {
          response = await ai.models.generateContent({
            model: modelName,
            contents: geminiContents,
            config: {
              systemInstruction,
              temperature: 0.7,
            },
          });
          break; // Success!
        } catch (err: any) {
          attempts++;
          lastError = err;
          console.warn(`Gemini generation attempt ${attempts} with model ${modelName} failed:`, err);
          if (attempts >= maxAttempts) {
            throw err; // bubble up to outer try for fallback reply
          }
          // Progressive wait before retry
          await new Promise((resolve) => setTimeout(resolve, 600 * attempts));
        }
      }
      replyText = response?.text || "আমি আন্তরিকভাবে দুঃখিত, অনুগ্রহ করে আবার চেষ্টা করুন বা ৯০৭৩০৫৯৭৮০ নম্বরে কল করুন।";
      groundingMetadata = response?.candidates?.[0]?.groundingMetadata || null;
    } catch (genError: any) {
      console.error("All Gemini API attempts failed. Falling back to offline response:", genError);
      
      // Check if user provided a phone number in this request so we can give a customized fallback response
      const hasPhone = /(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}/.test(message);
      if (hasPhone) {
        replyText = `ধন্যবাদ! আপনার ফোন নম্বরটি পেয়েছি এবং আমাদের সিস্টেমে সুরক্ষিতভাবে সেভ করা হয়েছে। এই মুহূর্তে সার্ভারে অতিরিক্ত ট্রাফিকের কারণে আমাদের অটোমেটেড অ্যাসিস্ট্যান্ট সাময়িকভাবে সংযোগ করতে পারছে না, তবে আমাদের একজন সোলার এক্সপার্ট ২৪ ঘণ্টার মধ্যে আপনাকে সরাসরি কল বা হোয়াটসঅ্যাপ (WhatsApp) করবেন। 

জরুরি তথ্যের জন্য আপনি সরাসরি আমাদের প্রাইমারী হেল্পলাইনে ফোন করতে পারেন:
📞 **৯০৭৩০৫৯৭৮০** অথবা **৬২৮৯৬৩৮৬৪৯** (সরাসরি কথা বলুন)`;
      } else {
        replyText = `নমস্কার! এই মুহূর্তে অতিরিক্ত ট্রাফিকের কারণে আমাদের অটোমেটেড এআই অ্যাসিস্ট্যান্ট সাময়িকভাবে অফলাইনে রয়েছে। 

রেজিস্ট্রেশন, সরকারি ভর্তুকি, এবং ফ্রি কোটেশনের জন্য অনুগ্রহ করে আপনার **১) নাম, ২) ফোন নম্বর এবং ৩) জেলা** এখানে লিখে দিন। আমাদের সোলার টিম ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।

অথবা আপনি আমাদের সোলার এক্সপার্টের সাথে সরাসরি কথা বলতে পারেন:
📞 **৯০৭৩০৫৯৭৮০** / **৬২৮৯৬৩৮৬৪৯** (কল বা হোয়াটসঅ্যাপ করুন)`;
      }
    }

    // Dynamic extraction of lead details if present in the message or reply stream
    // Let's check if we can parse potential lead info from the conversation to store it in leads_db.json
    // We will do a simple scan of the incoming message for potential phone numbers and names
    const phoneRegex = /(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}/g;
    const foundPhones = message.match(phoneRegex);
    
    let isLeadParsed = false;
    if (foundPhones && foundPhones.length > 0) {
      const phone = foundPhones[0];
      // Try to log this background callback lead!
      try {
        await saveLead({
          fullName: "Chatbot Lead",
          phone: phone,
          district: "Captured via Chat",
          monthlyBill: "N/A",
          preferredSystem: "Chat Consultation",
          source: "chat",
          notes: `Context: User sent message: "${message}". AI replied with callback request.`,
        });
        isLeadParsed = true;
      } catch (err) {
        console.error("Failed to automatically extract chatbot lead:", err);
      }
    }

    return NextResponse.json({
      reply: replyText,
      leadCaptured: isLeadParsed,
      groundingMetadata: groundingMetadata,
    });
  } catch (error: any) {
    console.error("API error in POST /api/chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
