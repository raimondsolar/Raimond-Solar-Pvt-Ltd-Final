import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Solar Subsidy & Installation in West Bengal | Raimond Solar Pvt Ltd",
  description: "Get government solar subsidy support in West Bengal. 1kW to 100kW solar solutions with WBSEDCL & CESC support. Free consultation. Call 9073059780.",
  keywords: "Raimond Solar, Solar Subsidy West Bengal, Solar Subsidy Kolkata, Rooftop Solar West Bengal, Solar Price WBSEDCL, Solar Net Metering West Bengal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Raimond Solar Pvt Ltd",
    "image": "https://assets.zyrosite.com/pdf53TOKTfqD9wIN/logo-raimond-symbol-Nzgl40wncJgQVrtY.jpg",
    "telephone": "+91-9073059780",
    "email": "raimondsolar83@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Susangini Apartment, 2nd Floor, 267 A.P. Nagar",
      "addressLocality": "Sonarpur, Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700150",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Sa 10:00-19:00",
    "areaServed": ["Kolkata", "Howrah", "Hooghly", "North 24 Parganas", "South 24 Parganas", "West Bengal"],
    "priceRange": "₹62,000 - ₹2,35,000",
    "description": "ISO 9001:2015 certified, MSME registered solar EPC company in Kolkata, West Bengal. Registered installer for WBSEDCL and CESC consumers, assisting with government solar subsidy scheme applications.",
    "sameAs": []
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the PM Surya Ghar Yojana and who is eligible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PM Surya Ghar Muft Bijli Yojana is a central government subsidy scheme for implementing solar panel systems on residential rooftops from 1kW up to 10kW. Subsidy is provided up to a maximum of ₹78,000 for capacities of 3kW and above (capped). Residential homeowners who have high-sunlight, shadow-free roof space and a connection with utility providers (WBSEDCL or CESC) can easily apply for this subsidy."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum government subsidy structure in West Bengal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For residential houses, the central government subsidy is ₹30,000 for a 1kWp system, ₹60,000 for a 2kWp system, and a maximum flat ceiling of ₹78,000 for systems of 3kWp and above. The subsidy is disbursed directly into your bank account after successful inspection, project installation completion, and net-meter commissioning."
        }
      },
      {
        "@type": "Question",
        "name": "What is the solar capacity limit for residential homes and how is it approved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While residential systems generally range from 1kW up to 10kW, WBSEDCL approves the installed solar capacity based on your sanctioned/connected load, available shadow-free roof space, and monthly electric consumption patterns. You can choose to install a capacity higher than 3kW, but please note that the subsidy will remain capped at a maximum of ₹78,000."
        }
      },
      {
        "@type": "Question",
        "name": "How much roof space is required to install a 1kW On-Grid solar system?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will need approximately 60 square feet of clear, shadow-free, south-facing roof space to install a 1kWp On-Grid solar plant. The heavy-duty structural design is customized by our engineers depending on your specific flat concrete roof or tin-shed structure."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between On-Grid and Off-Grid solar systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On-Grid systems operate without battery backup, exporting surplus daytime solar power directly back to the WBSEDCL/CESC grid. Off-Grid systems use batteries to store electricity for use during utility load shedding. Crucially, the official PM Surya Ghar government subsidy is only applicable for On-Grid solar installations."
        }
      },
      {
        "@type": "Question",
        "name": "How many electricity units does a 1kWp system generate daily on average?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under West Bengal climate conditions, a 1kWp solar plant generates an average of 4.6 units of clean green electricity daily (scaling up to approx 1,400+ units annually), based on average sunlight conditions. Our Monocrystalline solar panels continue to generate electricity during overcast or cloudy weather, though output is naturally reduced compared to clear, sunny days."
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-5X793Q6K" />
      <head>
        <meta name="google-site-verification" content="dC3VziAbCyRRRPzrmrhCxrNga1R9LgbgWquUbXAMbbI" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
