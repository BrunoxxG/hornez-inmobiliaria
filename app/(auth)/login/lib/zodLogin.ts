import { object, string,} from "zod";

export const loginSchema = object({
  identifier: string("Email o usuario requerido").trim().min(1, "Email o usuario requerido"),
  password: string("Password is required")
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});