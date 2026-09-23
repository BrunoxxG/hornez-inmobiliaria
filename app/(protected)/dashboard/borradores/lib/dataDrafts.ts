import prisma from "@/lib/prisma";

export async function getPropertyDrafts() {
  return prisma.draft.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      data: true,
      updatedAt: true,
      user: { select: { name: true, email: true } },
    },
  });
}
