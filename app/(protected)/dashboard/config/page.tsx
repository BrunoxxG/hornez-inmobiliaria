import { ListFeatures } from "./components/ListFeatures";
import { ListListingTypes } from "./components/ListListingTypes";
import { ListPropertyTypes } from "./components/ListPropertyTypes";
import { getFeatures, getListingTypes, getPropertyTypes } from "./lib/dataConfig";

export default async function Config() {
  const [propertyTypes, listingTypes, features] = await Promise.all([
    getPropertyTypes(),
    getListingTypes(),
    getFeatures(),
  ]);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <ListListingTypes listingTypes={listingTypes} />
        <ListPropertyTypes propertyTypes={propertyTypes} />
        <ListFeatures features={features} category="SERVICE" />
        <ListFeatures features={features} category="ADDITIONAL" />
      </div>
    </>
  );
}
