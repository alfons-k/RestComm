import ListingPageClient from "./ListingPageClient";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  return <ListingPageClient params={params} />;
}
