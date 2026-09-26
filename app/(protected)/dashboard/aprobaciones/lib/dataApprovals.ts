import prisma from "@/lib/prisma";

export async function getPendingProperties() {
  const properties = await prisma.property.findMany({
    where: { approvalStatus: "PENDING" },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      title: true,
      description: true,
      city: true,
      province: true,
      price: true,
      currency: true,
      listingType: { select: { id: true, name: true } },
      propertyType: { select: { id: true, name: true } },
      address: true,
      totalRooms: true,
      bedrooms: true,
      bathrooms: true,
      area: true,
      coveredArea: true,
      landArea: true,
      age: true,
      floors: true,
      lat: true,
      lng: true,
      status: true,
      documentation: true,
      active: true,
      standOut: true,
      userId: true,
      updatedAt: true,
      video: true,
      features: {
        select: {
          id: true,
          value: true,
          feature: { select: { id: true, name: true, category: true } },
        },
      },
      documents: true,
      createdAt: true,
      user: { select: { name: true, email: true } },
      images: {
        select: { id: true, url: true },
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  });

  return properties.map((property) => ({ ...property, price: Number(property.price) }));
}
