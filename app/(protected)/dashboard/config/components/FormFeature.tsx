"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { featureFormSchema, FeatureFormZod, FormFeatureProps } from "../lib/zodConfig";
import { createFeature, updateFeature } from "../actions/actionsConfig";

export default function FormFeature(props: FormFeatureProps) {
  const { feature, setOpenModalForm, toast } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeatureFormZod>({
    resolver: zodResolver(featureFormSchema),
    mode: "onChange",
    defaultValues: {
      name: feature?.name || "",
    },
  });
  const { isValid } = form.formState;
  const { reset } = form;

  const onSubmit = async (values: FeatureFormZod) => {
    setIsSubmitting(true);
    if (feature) {
      await onSubmitUpdate(values);
    } else {
      const { success, error } = await createFeature(values);
      if (!success) {
        toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
        setIsSubmitting(false);
        return;
      }
      toast.current?.show({
        severity: "success",
        summary: "Creada",
        detail: "Característica creada exitosamente",
        life: 3000,
      });
      setOpenModalForm?.(false);
    }
    setIsSubmitting(false);
  };

  const onSubmitUpdate = async (values: FeatureFormZod) => {
    if (!feature) {
      setIsSubmitting(false);
      return;
    }
    const featureId = feature.id;
    const { success, error } = await updateFeature(values, featureId);
    if (!success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });
      setIsSubmitting(false);
      return;
    }
    toast.current?.show({
      severity: "success",
      summary: "Actualizada",
      detail: "Característica actualizada exitosamente",
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
                  <InputText {...field} placeholder="Nombre de la característica" className="w-full" />
                  {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <Button
            label="Guardar Característica"
            className="p-button-danger"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
