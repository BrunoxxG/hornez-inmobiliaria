"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isAdminRole } from "@/lib/authorization";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.id && isAdminRole(session.user.role) ? session : null;
}

export async function createLocation(name: string) {
  const session = await requireAdmin();
  if (!session) return { success: false, error: "No autorizado" };
  const cleanName = name.trim();
  if (!cleanName) return { success: false, error: "La localidad es obligatoria" };

  try {
    const locality = await prisma.locality.create({ data: { name: cleanName } });
    revalidatePath("/dashboard/config");
    revalidatePath("/propiedades");
    return { success: true, locality };
  } catch (error) {
    console.error(error);
    return { success: false, error: "La localidad ya existe o no se pudo crear" };
  }
}

export async function updateLocation(currentName: string, newName: string) {
  const session = await requireAdmin();
  if (!session) return { success: false, error: "No autorizado" };

  const name = newName.trim();
  if (!name) return { success: false, error: "La localidad es obligatoria" };

  try {
    const current = await prisma.property.findFirst({ where: { city: currentName }, select: { id: true } });
    if (current) {
      return { success: false, error: "No se puede editar porque la localidad está en uso por una propiedad" };
    }

    await prisma.locality.updateMany({
      where: { name: currentName },
      data: { name },
    });
    const result = await prisma.property.updateMany({
      where: { city: currentName },
      data: { city: name },
    });
    revalidatePath("/dashboard/config");
    revalidatePath("/dashboard/propiedades");
    revalidatePath("/propiedades");
    return { success: true, count: result.count };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo actualizar la localidad" };
  }
}

export async function deleteLocation(name: string) {
  const session = await requireAdmin();
  if (!session) return { success: false, error: "No autorizado" };

  try {
    const property = await prisma.property.findFirst({ where: { city: name }, select: { id: true } });
    if (property) return { success: false, error: "No se puede eliminar porque la localidad está en uso por una propiedad" };

    await prisma.locality.deleteMany({ where: { name } });
    revalidatePath("/dashboard/config");
    revalidatePath("/dashboard/propiedades");
    revalidatePath("/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo eliminar la localidad" };
  }
}
