"use server";

import bcrypt from "bcryptjs";
import { signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function changeOwnPassword(password: string, confirmation: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "No autorizado" };
  if (password.length < 8) return { success: false, error: "La contraseña debe tener al menos 8 caracteres" };
  if (password !== confirmation) return { success: false, error: "Las contraseñas no coinciden" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: await bcrypt.hash(password, 10), mustChangePassword: false },
  });

  await signOut({ redirectTo: "/login?passwordChanged=1" });
  return { success: true };
}
