import { redirect } from "next/navigation";

export const metadata = {
  title: "Labels & Partners | EMTEE Music Group",
};

export default function LabelsPartnersPage() {
  redirect("/artist-affiliations#partners");
}
