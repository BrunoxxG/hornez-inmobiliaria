import FormLogin from "./components/FormLogin";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navbar from "@/app/(pages)/components/Navbar";

// Página de acceso para el panel administrativo.
export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard/propiedades");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/img/lomaBolaLaCruz.jpeg')" }}>
      <Navbar />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex min-h-screen items-center justify-center px-4 pb-8 pt-24">
        <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-2.5 rounded-lg border border-white/60 bg-white/95 p-4 shadow-2xl md:-mt-16 md:p-6">
          <div className="p-1 md:p-4">
            <img className="mx-auto h-auto max-h-20 w-full object-contain" src="/img/logo.svg" alt="Hornez Logo" />
          </div>
          <FormLogin />
        </div>
      </div>
    </main>
  );
}
