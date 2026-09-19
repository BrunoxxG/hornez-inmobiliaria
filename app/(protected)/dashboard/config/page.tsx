import { ListFeatures } from "./components/ListFeatures";
import { ListPropertyTypes } from "./components/ListPropertyTypes";
import { getFeatures, getPropertyTypes } from "./lib/dataConfig";

export default async function Config() {
  const [propertyTypes, features] = await Promise.all([
    getPropertyTypes(),
    getFeatures(),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
        <ListPropertyTypes propertyTypes={propertyTypes} />
        <ListFeatures features={features} category="SERVICE" />
        <ListFeatures features={features} category="ADDITIONAL" />
      </div>
    </>
  );
}
