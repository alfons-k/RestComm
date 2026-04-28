import ProfilePageClient from "./ProfilePageClient";

import ProfilePageClient from "./ProfilePageClient";

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ];
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return <ProfilePageClient params={resolvedParams} />;
}
