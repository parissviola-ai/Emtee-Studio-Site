import ArtistAffiliationsPageClient from "./ArtistAffiliationsPageClient";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.artistAffiliations.title,
  description: PAGE_METADATA.artistAffiliations.description,
  path: "/artist-affiliations",
});

export default function ArtistAffiliationsPage() {
  return <ArtistAffiliationsPageClient />;
}
