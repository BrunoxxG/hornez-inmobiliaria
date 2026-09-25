import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/lib/authorization";
import { getManagedUsers } from "./lib/dataUsers";
import UsersList from "./components/UsersList";

export default async function UsersPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!isAdminRole(session.user.role)) redirect("/dashboard/propiedades");

  const users = await getManagedUsers();
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hornez-blue">Usuarios</h1>
        <p className="mt-2 text-gray-600">Administrá las cuentas que colaboran con la página.</p>
      </div>
      <UsersList users={users} currentRole={session.user.role ?? "BASIC"} />
    </section>
  );
}
