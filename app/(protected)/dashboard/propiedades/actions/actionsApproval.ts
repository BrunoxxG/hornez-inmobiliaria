"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { isAdminRole } from "@/lib/authorization";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !isAdminRole(session.user.role)) return null;
  return session;
}

export async function approveProperty(propertyId: string) {
  const session = await requireAdmin();
  if (!session) return { success: false, error: "No autorizado" };

  try {
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        approvalStatus: "APPROVED",
        approvedById: session.user.id,
        approvedAt: new Date(),
        rejectionReason: null,
      },
    });
    revalidatePath("/dashboard/propiedades");
    revalidatePath("/dashboard/aprobaciones");
    revalidatePath("/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo aprobar la propiedad" };
  }
}

export async function rejectProperty(propertyId: string, rejectionReason: string) {
  const session = await requireAdmin();
  if (!session) return { success: false, error: "No autorizado" };

  const reason = rejectionReason.trim();
  if (!reason) return { success: false, error: "Indicá un motivo de rechazo" };

  try {
    await prisma.property.update({
      where: { id: propertyId },
      data: {
        approvalStatus: "REJECTED",
        approvedById: session.user.id,
        approvedAt: new Date(),
        rejectionReason: reason,
      },
    });
    revalidatePath("/dashboard/propiedades");
    revalidatePath("/dashboard/aprobaciones");
    revalidatePath("/propiedades");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo rechazar la propiedad" };
  }
}
