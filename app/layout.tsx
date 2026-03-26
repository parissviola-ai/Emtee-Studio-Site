import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalExploreBar from "@/components/ConditionalExploreBar";
import ConditionalMenuBar from "@/components/ConditionalMenuBar";
import { TransitionProvider } from "@/components/transitions/TransitionProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <TransitionProvider>
          <ConditionalMenuBar />
          {children}
          <ConditionalExploreBar />
          <ConditionalFooter />
        </TransitionProvider>
      </body>
    </html>
  );
}
