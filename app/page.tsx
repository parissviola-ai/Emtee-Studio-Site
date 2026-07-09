import HomePageClient from "./HomePageClient";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.home.title,
  description: PAGE_METADATA.home.description,
  path: "/",
});

export default function HomePage() {
  return <HomePageClient />;
}
