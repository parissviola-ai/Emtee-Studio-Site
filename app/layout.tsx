import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalExploreBar from "@/components/ConditionalExploreBar";
import GlobalTransitionHoldLayer from "@/components/GlobalTransitionHoldLayer";
import ConditionalMenuBar from "@/components/ConditionalMenuBar";
import GlobalWarmup from "@/components/GlobalWarmup";
import type { Metadata } from "next";
import "./globals.css";
import { RoomNavDebugCapture } from "@/components/RoomNavDebugCapture";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.emteemusicgroup.com"),
  description: "Explore Emtee Music Group",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Emtee Music Group",
    description: "Explore Emtee Music Group",
    url: "https://www.emteemusicgroup.com",
    siteName: "Emtee Music Group",
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
    title: "Emtee Music Group",
    description: "Explore Emtee Music Group",
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
        <RoomNavDebugCapture />
        <GlobalWarmup />
        <GlobalTransitionHoldLayer />
        <ConditionalMenuBar />
        {children}
        <ConditionalExploreBar />
        <ConditionalFooter />
      </body>
    </html>
  );
}
