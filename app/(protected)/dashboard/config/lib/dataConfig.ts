import prisma from "@/lib/prisma";
import { FeatureZod, ListingTypeZod, PropertyTypeZod } from "./zodConfig";

export async function getListingTypes(): Promise<ListingTypeZod[]> {
  try {
    const listingTypes = await prisma.listingType.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return listingTypes;
  } catch (error) {
    return [];
  }
}

export async function getPropertyTypes(): Promise<PropertyTypeZod[]> {
  try {
    const propertyTypes = await prisma.propertyType.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return propertyTypes;
  } catch (error) {
    return [];
  }
}

export async function getFeatures(): Promise<FeatureZod[]> {
  try {
    const features = await prisma.feature.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return features;
  } catch (error) {
    return [];
  }
}
