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
        category: data.category,
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
        category: data.category,
      },
    });

    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}

export async function deleteFeature(featureId: string) {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: featureId },
      select: { properties: { select: { id: true }, take: 1 } },
    });

    if (!feature) return { success: false, error: "La característica no existe" };
    if (feature.properties.length > 0) {
      return { success: false, error: "No se puede eliminar una característica en uso" };
    }

    await prisma.feature.delete({ where: { id: featureId } });
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

export async function deleteListingType(listingTypeId: string) {
  try {
    const listingType = await prisma.listingType.findUnique({
      where: { id: listingTypeId },
      select: { properties: { select: { id: true }, take: 1 } },
    });

    if (!listingType) return { success: false, error: "El tipo de listado no existe" };
    if (listingType.properties.length > 0) {
      return { success: false, error: "No se puede eliminar un tipo de listado en uso" };
    }

    await prisma.listingType.delete({ where: { id: listingTypeId } });
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

export async function deletePropertyType(propertyTypeId: string) {
  try {
    const propertyType = await prisma.propertyType.findUnique({
      where: { id: propertyTypeId },
      select: { properties: { select: { id: true }, take: 1 } },
    });

    if (!propertyType) return { success: false, error: "El tipo de propiedad no existe" };
    if (propertyType.properties.length > 0) {
      return { success: false, error: "No se puede eliminar un tipo de propiedad en uso" };
    }

    await prisma.propertyType.delete({ where: { id: propertyTypeId } });
    revalidatePath("/dashboard/config");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocurrio un error" };
  }
}
