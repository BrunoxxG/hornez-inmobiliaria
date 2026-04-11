import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPropertiesView } from "./lib/dataPropertiesView";
import PropertiesFilters from "./components/PropertiesFilters";
import PropertiesGrid from "./components/PropertiesGrid";
import { getFeatures, getListingTypes, getPropertyTypes } from "@/app/(protected)/dashboard/config/lib/dataConfig";

export default async function PropertiesPage(props: {
  searchParams: Promise<{
    city?: string;
    priceRange?: string;
    bedrooms?: string;
    bathrooms?: string;
    operacion?: string;
    tipo?: string;
    features?: string;
    areaRange?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const properties = await getPropertiesView(searchParams);

  const listingTypes = await getListingTypes();
  const propertyTypes = await getPropertyTypes();
  const features = await getFeatures();

  return (
    <div className="bg-gray-50">
      <Navbar />

      <PropertiesFilters listingTypes={listingTypes} propertyTypes={propertyTypes} features={features} />

      <PropertiesGrid properties={properties} />
      <Footer />
    </div>
  );
}
