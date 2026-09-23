import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPropertyDrafts } from "./lib/dataDrafts";
import DraftsPageClient from "./components/DraftsPageClient";

export default async function DraftsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const drafts = await getPropertyDrafts();
  const normalizedDrafts = drafts.map((draft) => ({
    ...draft,
    data: draft.data && typeof draft.data === "object" && !Array.isArray(draft.data)
      ? draft.data as Record<string, unknown>
      : {},
  }));
  return <DraftsPageClient drafts={normalizedDrafts} session={session} />;
}
