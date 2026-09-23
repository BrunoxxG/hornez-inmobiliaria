"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function savePropertyDraft(draftId: string | undefined, data: Record<string, unknown>) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "No autorizado" };

  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : "Sin título";
  const draftData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value === null || typeof value !== "object" || Array.isArray(value)),
  );
  const jsonData = JSON.parse(JSON.stringify(draftData)) as Prisma.InputJsonValue;

  try {
    const draft = draftId
      ? await prisma.draft.update({ where: { id: draftId }, data: { title, data: jsonData } })
      : await prisma.draft.create({ data: { title, data: jsonData, userId: session.user.id } });

    revalidatePath("/dashboard/borradores");
    return { success: true, draftId: draft.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo guardar el borrador" };
  }
}

export async function deletePropertyDraft(draftId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "No autorizado" };

  try {
    await prisma.draft.delete({ where: { id: draftId } });
    revalidatePath("/dashboard/borradores");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "No se pudo eliminar el borrador" };
  }
}
