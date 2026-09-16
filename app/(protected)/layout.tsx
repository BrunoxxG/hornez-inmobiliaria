import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "./components/AdminShell";
import prisma from "@/lib/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  let unreadInquiries = 0;
  try {
    unreadInquiries = await prisma.contactInquiry.count({ where: { read: false } });
  } catch (error) {
    console.error("No se pudo cargar el contador de consultas", error);
  }

  return <AdminShell session={session} unreadInquiries={unreadInquiries}>{children}</AdminShell>;

}