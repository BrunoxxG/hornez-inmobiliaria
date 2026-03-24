import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "./components/AdminShell";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <AdminShell session={session}>{children}</AdminShell>;

}