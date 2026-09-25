"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isAdminRole } from "@/lib/authorization";

async function getAdminSession() {
  const session = await auth();
  if (!session?.user?.id || !isAdminRole(session.user.role)) return null;
  return session;
}

export async function createManagedUser(values: { name: string; email: string; password: string; role: "BASIC" | "ADMIN" }) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "No autorizado" };
  if (values.role === "ADMIN" && session.user.role !== "SUPERADMIN") {
    return { success: false, error: "Solo el superadmin puede crear administradores" };
  }

  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  if (!name || !email || values.password.length < 8) {
    return { success: false, error: "Completá los datos y usá una contraseña de al menos 8 caracteres" };
  }

  try {
    const password = await bcrypt.hash(values.password, 10);
    await prisma.user.create({ data: { name, email, password, role: values.role } });
    revalidatePath("/dashboard/usuarios");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo crear el usuario" };
  }
}

export async function resetManagedUserPassword(userId: string, password: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "No autorizado" };
  if (password.length < 8) return { success: false, error: "La contraseña debe tener al menos 8 caracteres" };

  try {
    const target = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (!target) return { success: false, error: "No se encontró el usuario" };
    if (target.role !== "BASIC" && session.user.role !== "SUPERADMIN") {
      return { success: false, error: "Solo el superadmin puede administrar cuentas administrativas" };
    }

    await prisma.user.update({ where: { id: userId }, data: { password: await bcrypt.hash(password, 10) } });
    revalidatePath("/dashboard/usuarios");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo resetear la contraseña" };
  }
}

export async function updateManagedUser(userId: string, values: { name: string; email: string; role: "BASIC" | "ADMIN" }) {
  const session = await getAdminSession();
  if (!session || session.user.role !== "SUPERADMIN") {
    return { success: false, error: "Solo el superadmin puede editar usuarios" };
  }

  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  if (!name) return { success: false, error: "El nombre es obligatorio" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: "Ingresá un email válido" };

  try {
    const target = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (!target) return { success: false, error: "No se encontró el usuario" };
    if (target.role === "SUPERADMIN") return { success: false, error: "No se puede modificar al superadmin" };
    const existingEmail = await prisma.user.findFirst({ where: { email, NOT: { id: userId } }, select: { id: true } });
    if (existingEmail) return { success: false, error: "Ese email ya está siendo utilizado" };

    await prisma.user.update({
      where: { id: userId },
      data: { name, email, role: values.role },
    });
    revalidatePath("/dashboard/usuarios");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo actualizar el usuario" };
  }
}

export async function deleteManagedUser(userId: string) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "No autorizado" };
  if (session.user.id === userId) return { success: false, error: "No podés eliminar tu propio usuario" };

  try {
    const target = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    if (!target) return { success: false, error: "No se encontró el usuario" };
    if (target.role === "SUPERADMIN") return { success: false, error: "No se puede eliminar al superadmin" };
    if (target.role === "ADMIN" && session.user.role !== "SUPERADMIN") {
      return { success: false, error: "Solo el superadmin puede eliminar administradores" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.property.updateMany({ where: { approvedById: userId }, data: { approvedById: null, approvedAt: null } });
      await tx.property.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
    });
    revalidatePath("/dashboard/usuarios");
    revalidatePath("/dashboard/aprobaciones");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo eliminar el usuario" };
  }
}
