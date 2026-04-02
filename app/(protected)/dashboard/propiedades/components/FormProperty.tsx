"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { FormPropertyProps, propertyFormSchema, PropertyFormZod } from "../lib/zodPublications";
import { createProperty, updateProperty } from "../actions/actionsProperties";
import { usePropertyFormData } from "../hooks/usePropertyFormData";
import Loader from "@/app/(protected)/components/Loader";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";

export default function FormProperty(props: FormPropertyProps) {
  const { property, setOpenModalForm, toast } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { listingTypes, propertyTypes, features, isLoading } = usePropertyFormData();

  const form = useForm<PropertyFormZod>({
    resolver: zodResolver(propertyFormSchema),
    mode: "onChange",
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      price: property?.price || 0,
      currency: property?.currency || "USD",
      listingTypeId: property?.listingTypeId || "",
      propertyTypeId: property?.propertyTypeId || "",
      address: property?.address || "",
      city: property?.city || "",
      province: property?.province || "",
      zipCode: property?.zipCode || "",
      totalRooms: property?.totalRooms ?? 0,
      bedrooms: property?.bedrooms ?? 0,
      bathrooms: property?.bathrooms ?? 0,
      area: property?.area ?? 0,
      lat: property?.lat ?? 0,
      lng: property?.lng ?? 0,
      status: property?.status || "AVAILABLE",
      active: property?.active ?? true,
      userId: property?.userId || "",
      features: [],
    },
  });
  const { isValid } = form.formState;
  const { reset } = form;

  const selectedFeatures = form.watch("features") || [];

  const handleAddFeature = (featureId: string) => {
    if (!selectedFeatures.includes(featureId)) {
      form.setValue("features", [...selectedFeatures, featureId]);
    }
  };

  const handleRemoveFeature = (featureId: string) => {
    form.setValue(
      "features",
      selectedFeatures.filter((f) => f !== featureId),
    );
  };

  const onSubmit = async (values: PropertyFormZod) => {
    setIsSubmitting(true);
    if (property) {
      await onSubmitUpdate(values);
    } else {
      const { success, error } = await createProperty(values);
      if (!success) {
        toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
        setIsSubmitting(false);
        return;
      }
      toast.current?.show({
        severity: "success",
        summary: "Creada",
        detail: "Propiedad creada exitosamente",
        life: 3000,
      });
      setOpenModalForm?.(false);
    }
    setIsSubmitting(false);
  };

  const onSubmitUpdate = async (values: PropertyFormZod) => {
    if (!property) {
      setIsSubmitting(false);
      return;
    }
    const propertyId = property.id;
    const { success, error } = await updateProperty(values, propertyId);
    if (!success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
      setIsSubmitting(false);
      return;
    }
    toast.current?.show({
      severity: "success",
      summary: "Actualizada",
      detail: "Propiedad actualizada exitosamente",
      life: 3000,
    });
    reset();
    setOpenModalForm?.(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3 col-span-2">
              <label className="block text-sm font-semibold mb-2">Título *</label>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Título" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3 col-span-2">
              <label className="block text-sm font-semibold mb-2">Descripción *</label>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputTextarea {...field} rows={4} placeholder="Descripción" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">Precio *</label>
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber
                      value={field.value}
                      onChange={(e) => field.onChange(e.value ?? 0)}
                      mode="currency"
                      currency="USD"
                      className="w-full"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div>
              <label className="font-bold mb-2 block">Moneda *</label>
              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={[
                        { label: "USD", value: "USD" },
                        { label: "ARS", value: "ARS" },
                      ]}
                      className="w-full"
                      placeholder="Seleccionar Moneda"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div>
              <label className="font-bold mb-2 block">Listado *</label>
              <Controller
                name="listingTypeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={listingTypes}
                      optionLabel="name"
                      optionValue="id"
                      className="w-full"
                      placeholder="Seleccionar Listado"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div>
              <label className="font-bold mb-2 block">Tipo *</label>
              <Controller
                name="propertyTypeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={propertyTypes}
                      optionLabel="name"
                      optionValue="id"
                      className="w-full"
                      placeholder="Seleccionar Tipo"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Dirección *</label>
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Dirección" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Ciudad *</label>
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Ciudad" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Provincia *</label>
              <Controller
                name="province"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Provincia" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Código Postal *</label>
              <Controller
                name="zipCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="Código Postal" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">Ambientes *</label>
              <Controller
                name="totalRooms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber
                      value={field.value}
                      onChange={(e) => field.onChange(e.value ?? 0)}
                      className="w-full"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">Dormitorios *</label>
              <Controller
                name="bedrooms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber
                      value={field.value}
                      onChange={(e) => field.onChange(e.value ?? 0)}
                      className="w-full"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">Baños *</label>
              <Controller
                name="bathrooms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber
                      value={field.value}
                      onChange={(e) => field.onChange(e.value ?? 0)}
                      className="w-full"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">Area (m2) *</label>
              <Controller
                name="area"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputNumber
                      value={field.value}
                      onChange={(e) => field.onChange(e.value ?? 0)}
                      className="w-full"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full col-span-2">
              <label className="block text-sm font-semibold mb-2">Características *</label>
              <Dropdown
                options={features}
                optionLabel="name"
                optionValue="id"
                onChange={(e) => handleAddFeature(e.value)}
                className="w-full"
                placeholder="Seleccionar Características"
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedFeatures.map((id) => {
                  const feature = features.find((f) => f.id === id);

                  return (
                    <div key={id} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                      <span>{feature?.name}</span>
                      <button type="button" onClick={() => handleRemoveFeature(id)} className="text-red-500">
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-8">
            <Button
              label="Guardar Propiedad"
              className="p-button-danger"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
