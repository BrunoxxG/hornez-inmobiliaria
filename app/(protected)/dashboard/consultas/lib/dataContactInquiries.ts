import prisma from "@/lib/prisma";

export async function getContactInquiries() {
  try {
    return await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("No se pudieron cargar las consultas", error);
    return [];
  }
}
