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
      listingTypeId,
      propertyTypeId,
      address,
      city,
      province,
      zipCode,
      bedrooms,
      bathrooms,
      area,
      currency,
      lat,
      lng,
      status,
      active,
      userId,
    } = data;
    await prisma.property.create({
      data: {
        title,
        description,
        price: new Prisma.Decimal(price),
        listingTypeId,
        propertyTypeId,
        address,
        city,
        province,
        zipCode,
        bedrooms,
        bathrooms,
        area,
        currency,
        lat,
        lng,
        status,
        active,
        userId,
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
      listingTypeId,
      propertyTypeId,
      address,
      city,
      province,
      zipCode,
      bedrooms,
      bathrooms,
      area,
      currency,
      lat,
      lng,
      status,
      active,
    } = data;
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        title,
        description,
        price: new Prisma.Decimal(price),
        listingTypeId,
        propertyTypeId,
        address,
        city,
        province,
        zipCode,
        bedrooms,
        bathrooms,
        area,
        currency,
        lat,
        lng,
        status,
        active,
      },
    });

    revalidatePath("/dashboard/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}
