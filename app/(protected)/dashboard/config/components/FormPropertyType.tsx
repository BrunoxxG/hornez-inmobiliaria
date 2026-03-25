"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { FormPropertyTypeProps, propertyTypeFormSchema, PropertyTypeFormZod } from "../lib/zodConfig";
import { createPropertyType, updatePropertyType } from "../actions/actionsConfig";

export default function FormPropertyType(props: FormPropertyTypeProps) {
  const { propertyType, setOpenModalForm, toast } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyTypeFormZod>({
    resolver: zodResolver(propertyTypeFormSchema),
    mode: "onChange",
    defaultValues: {
      name: propertyType?.name || "",
    },
  });
  const { isValid } = form.formState;
  const { reset } = form;

  const onSubmit = async (values: PropertyTypeFormZod) => {
    setIsSubmitting(true);
    if (propertyType) {
      await onSubmitUpdate(values);
    } else {
      const { success, error } = await createPropertyType(values);
      if (!success) {
        toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
        setIsSubmitting(false);
        return;
      }
      toast.current?.show({
        severity: "success",
        summary: "Creado",
        detail: "Tipo de Propiedad creado exitosamente",
        life: 3000,
      });
      setOpenModalForm?.(false);
    }
    setIsSubmitting(false);
  };

  const onSubmitUpdate = async (values: PropertyTypeFormZod) => {
    if (!propertyType) {
      setIsSubmitting(false);
      return;
    }
    const propertyTypeId = propertyType.id;
    const { success, error } = await updatePropertyType(values, propertyTypeId);
    if (!success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
      setIsSubmitting(false);
      return;
    }
    toast.current?.show({
      severity: "success",
      summary: "Actualizado",
      detail: "Tipo de Propiedad actualizado exitosamente",
      life: 3000,
    });
    reset();
    setOpenModalForm?.(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-2">Nombre</label>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <InputText {...field} placeholder="Nombre del Tipo de Propiedad" className="w-full" />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <Button
            label="Guardar Tipo de Propiedad"
            className="p-button-danger"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
