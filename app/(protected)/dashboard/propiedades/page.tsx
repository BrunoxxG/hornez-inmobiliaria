import { auth } from "@/lib/auth";
import { ListProperties } from "./components/ListProperties";
import { getProperties } from "./lib/dataPublications";
import { redirect } from "next/navigation";

export default async function Publicaciones() {
  const properties = await getProperties();
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ListProperties properties={properties} session={session} />;
}
