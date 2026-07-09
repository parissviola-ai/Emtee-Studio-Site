import CaseStudies2Client from "./CaseStudies2Client";
import { Suspense } from "react";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.caseStudies.title,
  description: PAGE_METADATA.caseStudies.description,
  path: "/artist-affiliations/case-studies-2",
});

export default function ArtistCaseStudiesConceptPage() {
  return (
    <Suspense fallback={null}>
      <CaseStudies2Client />
    </Suspense>
  );
}
