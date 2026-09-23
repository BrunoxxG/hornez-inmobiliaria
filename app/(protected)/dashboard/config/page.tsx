import { ListFeatures } from "./components/ListFeatures";
import { ListPropertyTypes } from "./components/ListPropertyTypes";
import { ListLocations } from "./components/ListLocations";
import { getFeatures, getLocations, getPropertyTypes } from "./lib/dataConfig";

export default async function Config() {
  const [propertyTypes, features, locations] = await Promise.all([
    getPropertyTypes(),
    getFeatures(),
    getLocations(),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-4">
        <ListPropertyTypes propertyTypes={propertyTypes} />
        <ListFeatures features={features} category="SERVICE" />
        <ListFeatures features={features} category="ADDITIONAL" />
        <ListLocations locations={locations} />
      </div>
    </>
  );
}
