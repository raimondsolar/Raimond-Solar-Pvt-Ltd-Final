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
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-5X793Q6K" />
      <head>
        <meta name="google-site-verification" content="dC3VziAbCyRRRPzrmrhCxrNga1R9LgbgWquUbXAMbbI" />
      </head>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
