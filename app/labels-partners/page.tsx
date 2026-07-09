import { redirect } from "next/navigation";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.artistAffiliations.title,
  description: PAGE_METADATA.artistAffiliations.description,
  path: "/labels-partners",
});

export default function LabelsPartnersPage() {
  redirect("/artist-affiliations#partners");
}
