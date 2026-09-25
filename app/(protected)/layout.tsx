import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "./components/AdminShell";
import prisma from "@/lib/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  if (session.user.mustChangePassword) {
    redirect("/cambiar-password");
  }

  let unreadInquiries = 0;
  let pendingApprovals = 0;
  let draftCount = 0;
  let publishedProperties = 0;
  try {
    unreadInquiries = await prisma.contactInquiry.count({ where: { read: false } });
    draftCount = await prisma.draft.count();
    publishedProperties = await prisma.property.count({
      where: { active: true, status: "AVAILABLE", approvalStatus: "APPROVED" },
    });
    if (session.user.role === "ADMIN" || session.user.role === "SUPERADMIN") {
      pendingApprovals = await prisma.property.count({ where: { approvalStatus: "PENDING" } });
    }
  } catch (error) {
    console.error("No se pudo cargar el contador de consultas", error);
  }

  return <AdminShell session={session} unreadInquiries={unreadInquiries} pendingApprovals={pendingApprovals} draftCount={draftCount} publishedProperties={publishedProperties}>{children}</AdminShell>;

}