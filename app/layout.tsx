import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalExploreBar from "@/components/ConditionalExploreBar";
import ConditionalMenuBar from "@/components/ConditionalMenuBar";
import GlobalWarmup from "@/components/GlobalWarmup";
import "./globals.css";
import { RoomNavDebugCapture } from "@/components/RoomNavDebugCapture";

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
        <ConditionalMenuBar />
        {children}
        <ConditionalExploreBar />
        <ConditionalFooter />
      </body>
    </html>
  );
}
