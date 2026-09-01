import { PropertyZod } from "@/app/(protected)/dashboard/propiedades/lib/zodPublications";
import prisma from "@/lib/prisma";
import { number } from "zod";

// Servicios de consulta de propiedades para la vista pública: listado, destacados y detalle.
const getRange = (range?: string) => {
  if (!range) return {};

  const [min, max] = range.split("-");

  return {
    gte: min ? Number(min) : undefined,
    lte: max ? Number(max) : undefined,
  };
};

export async function getPropertiesView(filters: any): Promise<PropertyZod[]> {
  try {
    const featureFilters = filters.features
      ? filters.features.split(",").map((feature: string) => ({
          features: {
            some: {
              feature: {
                slug: feature,
              },
            },
          },
        }))
      : [];
    const findProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        city: filters.city
          ? {
              contains: filters.city,
              mode: "insensitive",
            }
          : undefined,
        listingType: filters.operacion
          ? {
              slug: filters.operacion,
            }
          : undefined,
        propertyType: filters.tipo
          ? {
              slug: filters.tipo,
            }
          : undefined,
        price: getRange(filters.priceRange),
        bedrooms: filters.bedrooms ? { gte: Number(filters.bedrooms) } : undefined,
        bathrooms: filters.bathrooms ? { gte: Number(filters.bathrooms) } : undefined,
        area: getRange(filters.areaRange),
        AND: featureFilters,
      },
      orderBy: {
        updatedAt: "desc",
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
          },
        },
        propertyType: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
        city: true,
        province: true,
        totalRooms: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        currency: true,
        lat: true,
        lng: true,
        status: true,
        documentation: true,
        standOut: true,
        active: true,
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
                category: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            order: true,
            url: true,
          },
        },
        documents: {
          select: {
            id: true,
            url: true,
            name: true,
          },
        },
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

export async function getPropertiesStand(): Promise<PropertyZod[]> {
  try {
    const findProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        standOut: true,
      },
      orderBy: {
        updatedAt: "desc",
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
          },
        },
        propertyType: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
        city: true,
        province: true,
        totalRooms: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        currency: true,
        lat: true,
        lng: true,
        status: true,
        documentation: true,
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
                category: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            order: true,
            url: true,
          },
        },
        documents: {
          select: {
            id: true,
            url: true,
            name: true,
          },
        },
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

// Trae propiedades relacionadas por tipo con fallback para mantener siempre opciones de navegación.
export async function getRelatedProperties(
  propertyId: string,
  city: string,
  propertyTypeId: string,
  limit = 3,
): Promise<PropertyZod[]> {
  try {
    const selectConfig = {
      id: true,
      title: true,
      description: true,
      price: true,
      listingType: { select: { id: true, name: true } },
      propertyType: { select: { id: true, name: true } },
      address: true,
      city: true,
      province: true,
      totalRooms: true,
      bedrooms: true,
      bathrooms: true,
      area: true,
      currency: true,
      lat: true,
      lng: true,
      status: true,
      documentation: true,
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
          feature: { select: { id: true, name: true, category: true } },
        },
      },
      images: { select: { id: true, order: true, url: true } },
      documents: { select: { id: true, url: true, name: true } },
    } as const;

    const sameTypeCityProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        id: { not: propertyId },
        propertyTypeId,
        city: {
          contains: city,
          mode: "insensitive",
        },
      },
      take: limit * 2,
      orderBy: { updatedAt: "desc" },
      select: selectConfig,
    });

    const sameTypeProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        id: { not: propertyId },
        propertyTypeId,
      },
      take: limit * 3,
      orderBy: { updatedAt: "desc" },
      select: selectConfig,
    });

    const sameCityProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        id: { not: propertyId },
        city: {
          contains: city,
          mode: "insensitive",
        },
      },
      take: limit * 3,
      orderBy: { updatedAt: "desc" },
      select: selectConfig,
    });

    const generalProperties = await prisma.property.findMany({
      where: {
        active: true,
        status: "AVAILABLE",
        id: { not: propertyId },
      },
      take: limit * 4,
      orderBy: { updatedAt: "desc" },
      select: selectConfig,
    });

    const mergedProperties = [...sameTypeCityProperties, ...sameTypeProperties, ...sameCityProperties, ...generalProperties]
      .filter((property, index, array) => array.findIndex((item) => item.id === property.id) === index)
      .slice(0, limit * 4)
      .map((property) => ({
        ...property,
        price: Number(property.price),
      }));

    return mergedProperties;
  } catch (error) {
    return [];
  }
}

export async function getPropertyById(propertyId: string): Promise<PropertyZod | null> {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        listingType: {
          select: {
            id: true,
            name: true,
          },
        },
        propertyType: {
          select: {
            id: true,
            name: true,
          },
        },
        address: true,
        city: true,
        province: true,
        totalRooms: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        currency: true,
        lat: true,
        lng: true,
        status: true,
        documentation: true,
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
                category: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            order: true,
            url: true,
          },
        },
        documents: {
          select: {
            id: true,
            url: true,
            name: true,
          },
        },
      },
    });

    if (!property) return null;

    return {
      ...property,
      price: Number(property.price),
    };
  } catch (error) {
    return null;
  }
}
