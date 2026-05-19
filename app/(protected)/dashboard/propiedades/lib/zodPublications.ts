import z, { boolean, date, number, object, string, array } from "zod";
import { Dispatch, SetStateAction } from "react";
import type { Toast as ToastType } from "primereact/toast";

import { Currency, PropertyStatus } from "@prisma/client";
import { Session } from "next-auth";

export const propertySchema = object({
  id: string(),
  title: string(),
  description: string(),
  price: number(),
  listingType: object({
    id: string(),
    name: string(),
  }),
  propertyType: object({
    id: string(),
    name: string(),
  }),
  address: string(),
  city: string(),
  province: string(),
  zipCode: string(),
  totalRooms: number(),
  bedrooms: number(),
  bathrooms: number(),
  area: number(),
  currency: z.enum(Currency),
  lat: number(),
  lng: number(),
  status: z.enum(PropertyStatus),
  active: boolean(),
  standOut: boolean(),
  userId: string(),
  createdAt: date(),
  updatedAt: date(),
  features: array(
    object({
      id: string(),
      value: string(),
      feature: object({
        id: string(),
        name: string(),
      }),
    }),
  ),
  video: string(),
  images: array(object({
    id: string(),
    url: string(),
  })),
  documents: array(object({
    id: string(),
    url: string(),
    name: string(),
  }))
});
export type PropertyZod = z.infer<typeof propertySchema>;

export const propertyFormSchema = object({
  title: string().trim().min(1, "Título requerido"),
  description: string().trim().min(1, "Descripción requerida"),
  price: number().min(0, "El precio debe ser mayor o igual a 0"),
  listingTypeId: string().min(1, "Tipo de listado requerido"),
  propertyTypeId: string().min(1, "Tipo de propiedad requerido"),
  address: string().trim().min(1, "Dirección requerida"),
  city: string().trim().min(1, "Ciudad requerida"),
  province: string().trim().min(1, "Provincia requerida"),
  zipCode: string().trim().min(1, "Código postal requerido"),
  totalRooms: number(),
  bedrooms: number(),
  bathrooms: number(),
  area: number(),
  currency: z.enum(Currency),
  lat: number(),
  lng: number(),
  status: z.enum(PropertyStatus),
  active: boolean(),
  standOut: boolean(),
  userId: string().min(1, "Usuario requerido"),
  features: array(string()),
  video: string().trim(),
  images: array(object({ url: string(), order: number() })).optional(),
  deletedImages: array(string()).optional(),
  existingImages: array(object({ id: string(), order: number() })).optional(),
  documents: array(object({ url: string(), name: string() })).optional(),
  deletedDocuments: array(string()).optional(),
  existingDocuments: array(object({ id: string(), name: string() })).optional(),
});

export type PropertyFormZod = z.infer<typeof propertyFormSchema>;

export type FormPropertyProps = {
  setOpenModalForm?: Dispatch<SetStateAction<boolean>>;
  property?: PropertyZod;
  toast: React.RefObject<ToastType | null>;
  session: Session;
};

export const PROPERTY_STATUS: Record<
  PropertyStatus,
  {
    label: string;
    icon: string;
    severity: "secondary" | "info" | "success" | "warning" | "danger";
  }
> = {
  AVAILABLE: {
    label: "Disponible",
    icon: "✅",
    severity: "success",
  },
  RESERVED: {
    label: "Reservado",
    icon: "⚠️",
    severity: "info",
  },
  SOLD: {
    label: "Vendido",
    icon: "❌",
    severity: "danger",
  },
  RENTED: {
    label: "Alquilado",
    icon: "⚠️",
    severity: "warning",
  },
};
