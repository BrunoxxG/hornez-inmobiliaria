"use client";

import { useState } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { changeOwnPassword } from "./actions/changePassword";
import Navbar from "@/app/(pages)/components/Navbar";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await changeOwnPassword(password, confirmation);
      if (!result.success) setError(result.error ?? "No se pudo cambiar la contraseña");
    } catch {
      setError("No se pudo cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/img/lomaBolaLaCruz.jpeg')" }}>
      <Navbar />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative flex min-h-screen items-center justify-center px-4 pb-8 pt-24">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl border border-white/60 bg-white/95 p-6 shadow-2xl md:-mt-16">
          <h1 className="text-2xl font-bold text-hornez-blue">Cambiar contraseña</h1>
          <p className="text-sm text-gray-600">Por seguridad, elegí una contraseña nueva antes de continuar.</p>
          {error && <Message severity="error" text={error} className="w-full" />}
          <Password value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nueva contraseña" feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          <Password value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Repetir contraseña" feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          <Button type="submit" label="Guardar contraseña" loading={loading} className="dashboard-action-button w-full" />
        </form>
      </div>
    </main>
  );
}
