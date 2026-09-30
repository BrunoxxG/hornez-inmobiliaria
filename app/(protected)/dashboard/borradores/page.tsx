import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPropertyDrafts } from "./lib/dataDrafts";
import DraftsPageClient from "./components/DraftsPageClient";
import { getLocations } from "../config/lib/dataConfig";

export default async function DraftsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [drafts, locations] = await Promise.all([getPropertyDrafts(), getLocations()]);
  const normalizedDrafts = drafts.map((draft) => ({
    ...draft,
    data: draft.data && typeof draft.data === "object" && !Array.isArray(draft.data)
      ? draft.data as Record<string, unknown>
      : {},
  }));
  return <DraftsPageClient drafts={normalizedDrafts} locations={locations} session={session} />;
}
