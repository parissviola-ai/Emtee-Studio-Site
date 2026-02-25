import CaseStudyClient from "./CaseStudyClient";
import { CASE_STUDIES } from "../caseStudiesData";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((x) => x.slug === slug);
  return {
    title: cs ? `${cs.name} | Case Study | EMTEE Music Group` : "Case Study | EMTEE Music Group",
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
