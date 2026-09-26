import { auth } from "@/lib/auth";
import { ListProperties } from "./components/ListProperties";
import { getProperties } from "./lib/dataPublications";
import { getLocations } from "../config/lib/dataConfig";
import { redirect } from "next/navigation";

export default async function Publicaciones() {
  const [properties, locations] = await Promise.all([getProperties(), getLocations()]);
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ListProperties properties={properties} locations={locations} session={session} />;
}
