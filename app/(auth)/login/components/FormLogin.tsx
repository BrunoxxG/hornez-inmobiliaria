"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginAction } from "../actions/actionsLogin";
import { loginSchema } from "../lib/zodLogin";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    setLoading(true);
    try {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {error && <Message severity="error" text={error} className="w-full mb-3" />}
      <div className="p-fluid">
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email / Usuario
          </label>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <InputText
                  id="email"
                  type="email"
                  {...field}
                  placeholder="usuario@speedunlimited.com"
                  autoComplete="username"
                  className={fieldState.error ? "p-invalid" : ""}
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Contraseña
          </label>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Password
                  id="password"
                  {...field}
                  placeholder="••••••••"
                  feedback={false}
                  toggleMask
                  autoComplete="current-password"
                  className={fieldState.error ? "p-invalid" : ""}
                />
                {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
              </>
            )}
          />
        </div>

        <Button type="submit" label="Ingresar" icon="pi pi-sign-in" loading={loading} className="w-full" />
      </div>
    </form>
  );
}
