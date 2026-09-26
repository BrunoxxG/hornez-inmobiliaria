import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/authorization";
import { getPendingProperties } from "./lib/dataApprovals";
import ApprovalsList from "./components/ApprovalsList";

export default async function ApprovalsPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard/propiedades");

  const properties = await getPendingProperties();
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hornez-blue">Aprobaciones</h1>
        <p className="mt-2 text-gray-600">Revisá las publicaciones creadas por los usuarios.</p>
      </div>
      <ApprovalsList properties={properties} session={session} />
    </section>
  );
}
