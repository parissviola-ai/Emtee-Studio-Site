import { RoomTransitionProvider } from "@/components/RoomTransitionProvider";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoomTransitionProvider>{children}</RoomTransitionProvider>;
}

