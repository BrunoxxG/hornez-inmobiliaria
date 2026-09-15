"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { propertyFormSchema, PropertyFormZod } from "../lib/zodPublications";
import { Prisma } from "@prisma/client";

export async function createProperty(values: PropertyFormZod) {
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
      currency,
      lat,
      lng,
      status,
      documentation,
      active,
      standOut,
      userId,
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
        currency,
        lat,
        lng,
        status,
        documentation,
        active,
        standOut,
        userId,
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
          currency,
          lat,
          lng,
          status,
          documentation,
          active,
          standOut,
          video,
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
