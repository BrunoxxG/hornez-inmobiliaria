"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  featureFormSchema,
  FeatureFormZod,
  listingTypeFormSchema,
  ListingTypeFormZod,
  propertyTypeFormSchema,
  PropertyTypeFormZod,
} from "../lib/zodConfig";
import { slugify } from "@/lib/utils";

export async function createFeature(values: FeatureFormZod) {
  const { data, success } = featureFormSchema.safeParse(values);
  if (!success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const slug = slugify(data.name);

    const existingFeature = await prisma.feature.findUnique({
      where: { slug },
    });

    if (existingFeature) {
      return { success: false, error: "Ya existe una caracteristica con ese nombre" };
    }

    await prisma.feature.create({
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function updateFeature(values: FeatureFormZod, featureId: string) {
  const { data, success } = featureFormSchema.safeParse(values);
  if (!success) {
    return { error: "Invalid data" };
  }

  try {
    const slug = slugify(data.name);

    const existingFeature = await prisma.feature.findUnique({
      where: { slug, NOT: { id: featureId } },
    });

    if (existingFeature) {
      return { success: false, error: "Ya existe una caracteristica con ese nombre" };
    }
    await prisma.feature.update({
      where: { id: featureId },
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function createListingType(values: ListingTypeFormZod) {
  const { data, success } = listingTypeFormSchema.safeParse(values);
  if (!success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const slug = slugify(data.name);

    const existingListingType = await prisma.listingType.findUnique({
      where: { slug },
    });

    if (existingListingType) {
      return { success: false, error: "Ya existe un tipo de listado con ese nombre" };
    }

    await prisma.listingType.create({
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function updateListingType(values: ListingTypeFormZod, listingTypeId: string) {
  const { data, success } = listingTypeFormSchema.safeParse(values);
  if (!success) {
    return { error: "Invalid data" };
  }

  const slug = slugify(data.name);

  const existingListingType = await prisma.listingType.findUnique({
    where: { slug, NOT: { id: listingTypeId } },
  });

  if (existingListingType) {
    return { success: false, error: "Ya existe un tipo de listado con ese nombre" };
  }

  try {
    await prisma.listingType.update({
      where: { id: listingTypeId },
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function createPropertyType(values: PropertyTypeFormZod) {
  const { data, success } = propertyTypeFormSchema.safeParse(values);
  if (!success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const slug = slugify(data.name);

    const existingPropertyType = await prisma.propertyType.findUnique({
      where: { slug },
    });

    if (existingPropertyType) {
      return { success: false, error: "Ya existe un tipo de propiedad con ese nombre" };
    }

    await prisma.propertyType.create({
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function updatePropertyType(values: PropertyTypeFormZod, propertyTypeId: string) {
  const { data, success } = propertyTypeFormSchema.safeParse(values);
  if (!success) {
    return { error: "Invalid data" };
  }

  const slug = slugify(data.name);

  const existingPropertyType = await prisma.propertyType.findUnique({
    where: { slug, NOT: { id: propertyTypeId } },
  });

  if (existingPropertyType) {
    return { success: false, error: "Ya existe un tipo de propiedad con ese nombre" };
  }

  try {
    await prisma.propertyType.update({
      where: { id: propertyTypeId },
      data: {
        name: data.name,
        slug,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}
