"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const REASONS = ["tasacion", "compra", "venta", "otro"] as const;
type ContactReasonValue = (typeof REASONS)[number];

const isContactReason = (value: string): value is ContactReasonValue =>
  REASONS.includes(value as ContactReasonValue);

export async function createContactInquiry(values: {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}) {
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name || !message || !phone || !isContactReason(values.reason)) {
    return { success: false, error: "Completá todos los campos requeridos" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 30) {
    return { success: false, error: "Ingresá un email válido" };
  }

  if (!/^\+?[0-9]{1,15}$/.test(phone)) {
    return { success: false, error: "Ingresá un teléfono válido" };
  }

  try {
    await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        reason: values.reason.toUpperCase() as "TASACION" | "COMPRA" | "VENTA" | "OTRO",
        message,
      },
    });

    revalidatePath("/dashboard/consultas");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo enviar la consulta" };
  }
}

export async function markContactInquiryAsRead(inquiryId: string, read: boolean) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  try {
    await prisma.contactInquiry.update({
      where: { id: inquiryId },
      data: { read },
    });
    revalidatePath("/dashboard/consultas");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo actualizar la consulta" };
  }
}

export async function deleteContactInquiry(inquiryId: string) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  try {
    await prisma.contactInquiry.delete({ where: { id: inquiryId } });
    revalidatePath("/dashboard/consultas");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo eliminar la consulta" };
  }
}
