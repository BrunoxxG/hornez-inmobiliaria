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
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start">
        <ListListingTypes listingTypes={listingTypes} />
        <ListPropertyTypes propertyTypes={propertyTypes} />
        <ListFeatures features={features} />
      </div>
    </>
  );
}
