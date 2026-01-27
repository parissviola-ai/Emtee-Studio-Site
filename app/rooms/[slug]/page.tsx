import { notFound } from "next/navigation";
import RoomScene from "../../../components/RoomScene";
import { rooms } from "../../../data/rooms";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const room = rooms.find((r) => r.slug === slug);
  if (!room) return notFound();

  return <RoomScene room={room} />;
}
