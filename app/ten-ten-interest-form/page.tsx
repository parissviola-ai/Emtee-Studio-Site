import TenTenInterestFormClient from "./TenTenInterestFormClient";

const ALLOWED_INTERESTS = new Set([
  "join-community",
  "showcase-slot",
  "live-set-development",
  "all",
] as const);

type InterestValue = "join-community" | "showcase-slot" | "live-set-development" | "all";

export default async function TenTenInterestFormPage({
  searchParams,
}: {
  searchParams?: Promise<{ interest?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const requestedInterest = resolvedSearchParams?.interest;
  const initialInterest: InterestValue =
    requestedInterest && ALLOWED_INTERESTS.has(requestedInterest as InterestValue)
      ? (requestedInterest as InterestValue)
      : "showcase-slot";

  return <TenTenInterestFormClient initialInterest={initialInterest} />;
}
