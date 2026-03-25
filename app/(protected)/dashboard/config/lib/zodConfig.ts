import z, { object, string } from "zod";
import { Dispatch, SetStateAction } from "react";
import type { Toast as ToastType } from "primereact/toast";

export const listingTypeSchema = object({
  id: string(),
  name: string(),
  slug: string(),
});
export type ListingTypeZod = z.infer<typeof listingTypeSchema>;
export const listingTypeFormSchema = object({
  name: string("Nombre requirido").min(1, "Nombre requerido"),
});
export type ListingTypeFormZod = z.infer<typeof listingTypeFormSchema>;
export type FormListingTypeProps = {
  setOpenModalForm?: Dispatch<SetStateAction<boolean>>;
  listingType?: ListingTypeZod;
  toast: React.RefObject<ToastType | null>;
};

export const propertyTypeSchema = object({
  id: string(),
  name: string(),
  slug: string(),
});
export type PropertyTypeZod = z.infer<typeof propertyTypeSchema>;
export const propertyTypeFormSchema = object({
  name: string("Nombre requirido").min(1, "Nombre requerido"),
});
export type PropertyTypeFormZod = z.infer<typeof propertyTypeFormSchema>;
export type FormPropertyTypeProps = {
  setOpenModalForm?: Dispatch<SetStateAction<boolean>>;
  propertyType?: PropertyTypeZod;
  toast: React.RefObject<ToastType | null>;
};

export const featureSchema = object({
  id: string(),
  name: string(),
});
export type FeatureZod = z.infer<typeof featureSchema>;
export const featureFormSchema = object({
  name: string("Nombre requirido").min(1, "Nombre requerido"),
});
export type FeatureFormZod = z.infer<typeof featureFormSchema>;
export type FormFeatureProps = {
  setOpenModalForm?: Dispatch<SetStateAction<boolean>>;
  feature?: FeatureZod;
  toast: React.RefObject<ToastType | null>;
};
