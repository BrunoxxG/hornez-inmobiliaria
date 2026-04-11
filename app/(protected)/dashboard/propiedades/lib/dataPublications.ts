import prisma from "@/lib/prisma";
import { PropertyZod } from "./zodPublications";

export async function getProperties(): Promise<PropertyZod[]> {
  try {
    const findProperties = await prisma.property.findMany({
      orderBy: {
        updatedAt: "desc" 
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        listingType: {
          select: {
            id: true,
            name: true,
          }
        },
        propertyType: {
          select: {
            id: true,
            name: true,
          }
        },
        address: true,
        city: true,
        province: true,
        zipCode: true,
        totalRooms: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        currency: true,
        lat: true,
        lng: true,
        status: true,
        active: true,
        standOut: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        video: true,
        features: {
          select: {
            id: true,
            value: true,
            feature: {
              select: {
                id: true,
                name: true,
              },
            },
          }
        },
        images: true,
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
