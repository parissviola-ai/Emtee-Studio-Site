import { Suspense } from "react";
import CaseStudies2Client from "@/app/artist-affiliations/case-studies-2/CaseStudies2Client";

export const metadata = {
  title: "Case Studies | EMTEE Music Group",
};

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={null}>
      <CaseStudies2Client />
    </Suspense>
  );
}
