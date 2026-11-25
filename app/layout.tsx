import type { Metadata, Viewport } from "next";
import { Young_Serif, Schibsted_Grotesk, Covered_By_Your_Grace, Nunito_Sans } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { lta } from "@/lib/lets-talk-auction";
import "./globals.css";

// Display: headlines and the wordmark. A sturdy, old-fashioned serif.
const youngSerif = Young_Serif({ variable: "--font-young-serif", subsets: ["latin"], weight: "400" });
// Labels: headings and the letterspaced small caps.
const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"], weight: ["500", "600"] });
// The call: "Talk" in the logo and the chant band. Used sparingly.
const coveredByGrace = Covered_By_Your_Grace({ variable: "--font-covered-by-grace", subsets: ["latin"], weight: "400" });
// Body: the shared Kindling workhorse.
const nunitoSans = Nunito_Sans({ variable: "--font-nunito-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${lta.name} | Auction Acres, Mio, Michigan`,
    template: `%s | ${lta.name}`,
  },
  description: "Estate, antique, sportsman and farm auctions at Auction Acres, between Mio and Fairview, Michigan.",
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3a2a1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${youngSerif.variable} ${schibsted.variable} ${coveredByGrace.variable} ${nunitoSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
