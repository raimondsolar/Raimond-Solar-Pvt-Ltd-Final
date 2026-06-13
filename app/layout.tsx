import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "PM Surya Ghar Solar Subsidy in West Bengal | Raimond Solar Pvt Ltd",
  description: "Get PM Surya Ghar Solar Subsidy in West Bengal. 1kW to 100kW Solar Solutions with WBSEDCL Support. Free Consultation. Call 9073059780.",
  keywords: "Raimond Solar, PM Surya Ghar West Bengal, Solar Subsidy Kolkata, Rooftop Solar West Bengal, Solar Price WBSEDCL, Solar Net Metering West Bengal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Rich Structured Schema definitions (LocalBusiness and Organization)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://raimondsolar.in/#localbusiness",
        "name": "Raimond Solar Pvt Ltd",
        "image": "https://picsum.photos/seed/solar/1200/630",
        "telephone": "+919073059780",
        "email": "info@raimondsolar.in",
        "url": "https://raimondsolar.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sonarpur",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "postalCode": "700150",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 22.4391,
          "longitude": 88.4339
        },
        "priceRange": "$$",
        "areaServed": ["Kolkata", "Howrah", "Hooghly", "North 24 Parganas", "South 24 Parganas", "West Bengal"]
      },
      {
        "@type": "Organization",
        "@id": "https://raimondsolar.in/#organization",
        "name": "Raimond Solar Pvt Ltd",
        "url": "https://raimondsolar.in",
        "logo": "https://picsum.photos/seed/solarlogo/500/500",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919073059780",
          "contactType": "customer service",
          "contactOption": "TollFree",
          "areaServed": "IN",
          "availableLanguage": ["Bengali", "English"]
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
