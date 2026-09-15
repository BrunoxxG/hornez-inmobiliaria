import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPropertiesView } from "./lib/dataPropertiesView";
import PropertiesFilters from "./components/PropertiesFilters";
import PropertiesGrid from "./components/PropertiesGrid";
import { getFeatures, getPropertyTypes } from "@/app/(protected)/dashboard/config/lib/dataConfig";

// Listado público de propiedades con filtro por ciudad, tipo y servicios.
export default async function PropertiesPage(props: {
  searchParams: Promise<{
    city?: string;
    priceRange?: string;
    bedrooms?: string;
    bathrooms?: string;
    tipo?: string;
    features?: string;
    areaRange?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const properties = await getPropertiesView(searchParams);

  const propertyTypes = await getPropertyTypes();
  const features = await getFeatures();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <PropertiesFilters propertyTypes={propertyTypes} features={features} />
        <PropertiesGrid properties={properties} />
      </div>

      <Footer />
    </div>
  );
}
