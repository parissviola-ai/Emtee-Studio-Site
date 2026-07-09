import AboutPageClient from "./AboutPageClient";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.about.title,
  description: PAGE_METADATA.about.description,
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
