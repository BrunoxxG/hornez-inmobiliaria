import z, { boolean, date, number, object, string } from "zod";
import { Dispatch, SetStateAction } from "react";
import type { Toast as ToastType } from "primereact/toast";

import { Currency, PropertyStatus } from "@prisma/client";

export const propertySchema = object({
  id: string(),
  title: string(),
  description: string(),
  price: number(),
  listingTypeId: string(),
  propertyTypeId: string(),
  address: string(),
  city: string(),
  province: string(),
  zipCode: string(),
  bedrooms: number().nullable().optional(),
  bathrooms: number().nullable().optional(),
  area: number().nullable().optional(),
  currency: z.enum(Currency),
  lat: number().nullable().optional(),
  lng: number().nullable().optional(),
  status: z.enum(PropertyStatus),
  active: boolean(),
  userId: string(),
  createdAt: date(),
  updatedAt: date(),
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
  bedrooms: number().optional().default(0),
  bathrooms: number().optional().default(0),
  area: number().optional().default(0),
  currency: z.enum(Currency),
  lat: number().optional().default(0),
  lng: number().optional().default(0),
  status: z.enum(PropertyStatus),
  active: boolean().default(true),
});

export type PropertyFormZod = z.infer<typeof propertyFormSchema>;

export type FormPropertyProps = {
  setOpenModalForm?: Dispatch<SetStateAction<boolean>>;
  property?: PropertyZod;
  toast: React.RefObject<ToastType | null>;
};
