import prisma from "@/lib/prisma";
import { PropertyZod } from "./zodPublications";

export async function getProperties(): Promise<PropertyZod[]> {
  try {
    const findProperties = await prisma.property.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        listingTypeId: true,
        propertyTypeId: true,
        address: true,
        city: true,
        province: true,
        zipCode: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        currency: true,
        lat: true,
        lng: true,
        status: true,
        active: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const properties = findProperties.map((property) => ({
      ...property,
      price: Number(property.price),
    }));

    return properties;
  } catch (error) {
    return [];
  }
}
