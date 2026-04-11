import FormLogin from "./components/FormLogin";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard/propiedades");
  }

  return (
    <main className="flex items-center justify-center md:h-screen bg-secondary dark:bg-background">
      <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-2.5 p-4 md:-mt-32 bg-white dark:bg-secondary rounded-lg border">
        <div className="text-white p-1 md:p-4">
          <img className="w-200 h-auto object-contain" src="/img/logo.svg" alt="Hornez Logo" />
        </div>
        <FormLogin />
      </div>
    </main>
  );
}
