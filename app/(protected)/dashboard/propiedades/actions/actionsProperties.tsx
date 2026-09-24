"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { propertyFormSchema, PropertyFormZod } from "../lib/zodPublications";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/authorization";

export async function createProperty(values: PropertyFormZod) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "No autorizado" };

  const { data, success } = propertyFormSchema.safeParse(values);
  if (!success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const {
      title,
      description,
      price,
      propertyTypeId,
      address,
      city,
      province,
      totalRooms,
      bedrooms,
      bathrooms,
      area,
      coveredArea,
      landArea,
      age,
      floors,
      currency,
      lat,
      lng,
      status,
      documentation,
      active,
      standOut,
      video,
      features,
      images,
      documents,
    } = data;
    const saleListingType = await prisma.listingType.findUnique({
      where: { slug: "venta" },
      select: { id: true },
    });

    if (!saleListingType) {
      return { success: false, error: "No se encontró el tipo de listado Venta" };
    }

    await prisma.property.create({
      data: {
        title,
        description,
        price: new Prisma.Decimal(price),
        listingTypeId: saleListingType.id,
        propertyTypeId,
        address,
        city,
        province,
        totalRooms,
        bedrooms,
        bathrooms,
        area,
        coveredArea,
        landArea,
        age,
        floors,
        currency,
        lat,
        lng,
        status,
        documentation,
        active,
        standOut,
        userId: session.user.id,
        approvalStatus: isAdminRole(session.user.role) ? "APPROVED" : "PENDING",
        approvedById: isAdminRole(session.user.role) ? session.user.id : null,
        approvedAt: isAdminRole(session.user.role) ? new Date() : null,
        video,
        features: {
          create: features.map((featureId) => ({
            featureId,
          })),
        },
        images: {
          create:
            images?.map((image) => ({
              url: image.url,
              order: image.order,
            })) ?? [],
        },
        documents: {
          create:
            documents?.map((doc) => ({
              url: doc.url,
              name: doc.name,
            })) ?? [],
        },
      },
    });

    revalidatePath("/dashboard/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function updateProperty(values: PropertyFormZod, propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "No autorizado" };

  const { data, success } = propertyFormSchema.safeParse(values);
  if (!success) {
    return { error: "Invalid data" };
  }

  try {
    const {
      title,
      description,
      price,
      propertyTypeId,
      address,
      city,
      province,
      totalRooms,
      bedrooms,
      bathrooms,
      area,
      coveredArea,
      landArea,
      age,
      floors,
      currency,
      lat,
      lng,
      status,
      documentation,
      active,
      standOut,
      video,
      features,
      images,
      deletedImages,
      existingImages,
      documents,
      deletedDocuments,
      existingDocuments,
    } = data;
    const currentProperty = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { userId: true },
    });
    if (!currentProperty) return { success: false, error: "No se encontró la propiedad" };
    if (!isAdminRole(session.user.role) && currentProperty.userId !== session.user.id) {
      return { success: false, error: "No autorizado" };
    }

    const saleListingType = await prisma.listingType.findUnique({
      where: { slug: "venta" },
      select: { id: true },
    });

    if (!saleListingType) {
      return { success: false, error: "No se encontró el tipo de listado Venta" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.property.update({
        where: { id: propertyId },
        data: {
          title,
          description,
          price: new Prisma.Decimal(price),
          listingTypeId: saleListingType.id,
          propertyTypeId,
          address,
          city,
          province,
          totalRooms,
          bedrooms,
          bathrooms,
          area,
          coveredArea,
          landArea,
          age,
          floors,
          currency,
          lat,
          lng,
          status,
          documentation,
          active,
          standOut,
          video,
          ...(isAdminRole(session.user.role)
            ? {}
            : {
                approvalStatus: "PENDING" as const,
                approvedById: null,
                approvedAt: null,
                rejectionReason: null,
              }),
          features: {
            deleteMany: {},
            create: features.map((featureId) => ({
              featureId,
            })),
          },
          images: {
            deleteMany: {
              id: {
                in: deletedImages,
              },
            },
            create:
              images?.map((img) => ({
                url: img.url,
                order: img.order,
              })) ?? [],
          },
          documents: {
            deleteMany: {
              id: {
                in: deletedDocuments,
              },
            },
            create:
              documents?.map((doc) => ({
                url: doc.url,
                name: doc.name,
              })) ?? [],
          },
        },
      });

      if (existingImages) {
        await Promise.all(
          existingImages.map((img) =>
            tx.image.update({
              where: { id: img.id },
              data: { order: img.order },
            }),
          ),
        );
      }

      if (existingDocuments) {
        await Promise.all(
          existingDocuments.map((doc) =>
            tx.document.update({
              where: { id: doc.id },
              data: { name: doc.name },
            }),
          ),
        );
      }
    });

    revalidatePath("/dashboard/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function deleteProperty(propertyId: string) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { userId: true },
    });
    if (!property) return { success: false, error: "No se encontró la propiedad" };
    if (!isAdminRole(session.user.role) && property.userId !== session.user.id) {
      return { success: false, error: "No autorizado" };
    }

    await prisma.property.delete({ where: { id: propertyId } });
    revalidatePath("/dashboard/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo eliminar la propiedad" };
  }
}
