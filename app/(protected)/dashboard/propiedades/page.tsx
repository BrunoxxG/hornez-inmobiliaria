import { ListProperties } from "./components/ListProperties";
import { getProperties } from "./lib/dataPublications";

export default async function Publicaciones() {
  const properties = await getProperties();

  return (
    <>
      <ListProperties properties={properties} />
    </>
  );
}
