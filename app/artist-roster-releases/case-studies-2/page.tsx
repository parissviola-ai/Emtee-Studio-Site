import CaseStudies2Client from "./CaseStudies2Client";
import { Suspense } from "react";

export const metadata = {
  title: "Case Studies | Artist Concept | EMTEE Music Group",
};

export default function ArtistCaseStudiesConceptPage() {
  return (
    <Suspense fallback={null}>
      <CaseStudies2Client />
    </Suspense>
  );
}
