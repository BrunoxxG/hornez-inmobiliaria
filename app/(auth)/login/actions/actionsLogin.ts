"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { loginSchema } from "../lib/zodLogin";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  try {
    await signIn("credentials", {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
}
