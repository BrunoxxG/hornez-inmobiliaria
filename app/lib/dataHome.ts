import prisma from "@/lib/prisma";

export async function getFeaturedProperties() {
  try {
    const properties = await prisma.property.findMany({
      where: { active: true, status: "AVAILABLE" },
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        listingType: true,
        propertyType: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return properties.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  } catch {
    return [];
  }
}

export type FeaturedProperty = Awaited<ReturnType<typeof getFeaturedProperties>>[number];

export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        listingType: true,
        propertyType: true,
        features: { include: { feature: true } },
      },
    });

    if (!property) return null;

    return {
      ...property,
      price: Number(property.price),
    };
  } catch {
    return null;
  }
}

export type PropertyDetail = NonNullable<Awaited<ReturnType<typeof getPropertyById>>>;
