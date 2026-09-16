import { useEffect, useState } from "react";
import { PropertyTypeZod, FeatureZod } from "../../config/lib/zodConfig";

export function usePropertyFormData() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeZod[]>([]);
  const [features, setFeatures] = useState<FeatureZod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [propertyTypesRes, featuresRes] = await Promise.all([
          fetch("/api/property-types").then((r) => r.json()),
          fetch("/api/features").then((r) => r.json()),
        ]);

        if (!isMounted) return;

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
    propertyTypes,
    features,
    isLoading,
  };
}
