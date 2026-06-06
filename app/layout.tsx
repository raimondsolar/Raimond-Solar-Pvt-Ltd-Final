import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; 
import Script from 'next/script';
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
  // আপনার দেওয়া সম্পূর্ণ জিও-লোকেশন ও কোম্পানির তথ্যসহ রেডি স্কিমা মার্কআপ
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://raimondsolar.in/#localbusiness",
        "name": "Raimond Solar Pvt Ltd",
        "image": "https://picsum.photos/seed/solar/1200/630",
        "telephone": "+919073059780",
        "email": "raimondsolar83@gmail.com",
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
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

        {/* Google Tag Manager - 1st Code (Head) - Next.js সঠিক ফরম্যাট */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5SMVTHW4');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) - 2nd Code (Body) - Next.js সঠিক ফরম্যাট */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5SMVTHW4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
