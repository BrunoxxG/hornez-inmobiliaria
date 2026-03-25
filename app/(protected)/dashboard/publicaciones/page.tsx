import { getProperties } from "./lib/dataPublications";

export default async function Publicaciones() {
  const properties = await getProperties();
  
  return (
    <>
      
        <h1 className="text-4xl font-bold mb-8">Publicaciones</h1>
        
    </>
  );
}