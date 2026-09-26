export const ADMIN_ROLES = ["ADMIN", "SUPERADMIN"] as const;

export type AppRole = "BASIC" | "ADMIN" | "SUPERADMIN";

export const isAdminRole = (role?: string): role is (typeof ADMIN_ROLES)[number] =>
  ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]);

