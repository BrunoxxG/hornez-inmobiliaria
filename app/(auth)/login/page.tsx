import Image from "next/image";
import FormLogin from "./components/FormLogin";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center md:h-screen bg-secondary dark:bg-background">
      <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-2.5 p-4 md:-mt-32 bg-white dark:bg-secondary rounded-lg border">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-background p-3 md:h-36">
          <div className="w-20 text-white md:w-36 p-1 md:p-4">
            <img
              className="relative w-20 h-20 object-contain md:w-35 md:h-35"
              src="/LogoHornez.png"
              alt="Hornez Logo"
            />
          </div>
        </div>
        <FormLogin />
      </div>
    </main>
  );
}
