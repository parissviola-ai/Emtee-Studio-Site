import Link from "next/link";
import RoomScene from "@/components/RoomScene";
import { rooms } from "@/data/rooms";

type RoomPageParams = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): RoomPageParams[] {
  return rooms.map((room) => ({ slug: room.slug }));
}

export default async function RoomPage({
  params,
}: {
  params: Promise<RoomPageParams>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <main className="min-h-[100svh] bg-black text-white p-10">
        <h1 className="text-2xl font-semibold">Room not found</h1>
        <p className="mt-3 text-white/70">
          No room exists for:{" "}
          <span className="text-white">{slug ?? "unknown"}</span>
        </p>
        <Link
          href="/rooms/front"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white/85 hover:bg-white/15 transition"
        >
          Back to Lobby
        </Link>
      </main>
    );
  }

  return <RoomScene room={room} />;
}
