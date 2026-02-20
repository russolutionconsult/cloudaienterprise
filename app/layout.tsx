import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Serif_Display, DM_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { OrganizationJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudaienterprise.com"),
  title: {
    default: "CloudAI Enterprise — AI Adoption & Training for Business Leaders",
    template: "%s | CloudAI Enterprise",
  },
  description:
    "We help CEOs and business owners adopt AI strategically — from readiness assessments to team training and full implementation. Stop wasting money on AI tools that don't deliver ROI.",
  keywords: [
    "AI consulting",
    "AI adoption",
    "AI training",
    "enterprise AI",
    "AI strategy",
    "AI ROI",
    "business AI",
    "CEO AI guide",
  ],
  authors: [{ name: "CloudAI Enterprise" }],
  creator: "CloudAI Enterprise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudaienterprise.com",
    siteName: "CloudAI Enterprise",
    title: "CloudAI Enterprise — AI Adoption & Training for Business Leaders",
    description:
      "We help CEOs and business owners adopt AI strategically — from readiness assessments to team training and full implementation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CloudAI Enterprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudAI Enterprise — AI Adoption & Training for Business Leaders",
    description:
      "We help CEOs and business owners adopt AI strategically.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSerif.variable} ${dmMono.variable}`}
    >
      <body className="font-sans bg-bg text-text-primary min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        <ServiceJsonLd />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
