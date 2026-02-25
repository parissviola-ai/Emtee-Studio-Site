import { frontRoom } from "./front";
import { publishingDistroRoom } from "./publishing-distro";
import { businessRoom } from "./business";
import { musicRoom } from "./music";
import { arSalesRoom } from "./ar-sales";
import { marketingRoom } from "./marketing";
import { orangeRoom } from "./orange";
import { liveRoom } from "./live";
import { quietRoom } from "./quiet";

import type { Room } from "./types";
export { type Hotspot, type Room } from "./types";

export const rooms: Room[] = [
  frontRoom,
  publishingDistroRoom,
  businessRoom,
  musicRoom,
  arSalesRoom,
  marketingRoom,
  orangeRoom,
  liveRoom,
  quietRoom,
];
