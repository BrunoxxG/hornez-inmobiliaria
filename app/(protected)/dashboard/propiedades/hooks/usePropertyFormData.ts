import { useEffect, useState } from "react";
import { ListingTypeZod, PropertyTypeZod, FeatureZod } from "../../config/lib/zodConfig";

export function usePropertyFormData() {
  const [listingTypes, setListingTypes] = useState<ListingTypeZod[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeZod[]>([]);
  const [features, setFeatures] = useState<FeatureZod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [listingTypesRes, propertyTypesRes, featuresRes] = await Promise.all([
          fetch("/api/listing-types").then((r) => r.json()),
          fetch("/api/property-types").then((r) => r.json()),
          fetch("/api/features").then((r) => r.json()),
        ]);

        if (!isMounted) return;

        setListingTypes(listingTypesRes);
        setPropertyTypes(propertyTypesRes);
        setFeatures(featuresRes);
      } catch (error) {
        console.error("Error fetching order form data", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    listingTypes,
    propertyTypes,
    features,
    isLoading,
  };
}
