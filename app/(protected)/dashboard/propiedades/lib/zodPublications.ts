import z, { boolean, date, number, object, string, array } from "zod";
import { Dispatch, SetStateAction } from "react";
import type { Toast as ToastType } from "primereact/toast";

import { Currency, PropertyStatus } from "@prisma/client";

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
  title: string("Título requerido").min(1, "Título requerido"),
  description: string("Descripción requerida").min(1, "Descripción requerida"),
  price: number("Precio requerido").min(0, "El precio debe ser mayor o igual a 0"),
  listingTypeId: string("Tipo de listado requerido").min(1),
  propertyTypeId: string("Tipo de propiedad requerido").min(1),
  address: string("Dirección requerida").min(1),
  city: string("Ciudad requerida").min(1),
  province: string("Provincia requerida").min(1),
  zipCode: string("Código postal requerido").min(1),
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
  userId: string("Usuario requerido").min(1, "Usuario requerido"),
  features: array(string()),
  video: string(),
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
