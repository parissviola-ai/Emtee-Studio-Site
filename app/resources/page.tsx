import ResourcesPage from "../connect/ResourcesPage";
import { PAGE_METADATA, createPageMetadata } from "@/lib/siteMetadata";

export const metadata = createPageMetadata({
  title: PAGE_METADATA.resources.title,
  description: PAGE_METADATA.resources.description,
  path: "/resources",
});

export default function ResourcesRoutePage() {
  return <ResourcesPage />;
}
