import ProfilePageClient from "./ProfilePageClient";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <ProfilePageClient params={params} />;
}
