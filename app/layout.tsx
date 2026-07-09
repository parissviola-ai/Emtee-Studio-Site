import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalExploreBar from "@/components/ConditionalExploreBar";
import GlobalTransitionHoldLayer from "@/components/GlobalTransitionHoldLayer";
import ConditionalMenuBar from "@/components/ConditionalMenuBar";
import GlobalWarmup from "@/components/GlobalWarmup";
import {
  BUSINESS_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  organizationStructuredData,
} from "@/lib/siteMetadata";
import type { Metadata } from "next";
import "./globals.css";
import { RoomNavDebugCapture } from "@/components/RoomNavDebugCapture";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  applicationName: BUSINESS_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Emtee Music Group lobby preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/twitter-image.png",
        alt: "Emtee Music Group lobby preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <RoomNavDebugCapture />
        <GlobalWarmup />
        <GlobalTransitionHoldLayer />
        <ConditionalMenuBar />
        {children}
        <ConditionalExploreBar />
        <ConditionalFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
