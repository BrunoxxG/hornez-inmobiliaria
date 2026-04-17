"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { FormPropertyProps, PROPERTY_STATUS, propertyFormSchema, PropertyFormZod } from "../lib/zodPublications";
import { createProperty, updateProperty } from "../actions/actionsProperties";
import { usePropertyFormData } from "../hooks/usePropertyFormData";
import Loader from "@/app/(protected)/components/Loader";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";

type ImageItem = {
  id?: string;
  url: string;
  file?: File;
  existing: boolean;
  order?: number;
};

export default function FormProperty(props: FormPropertyProps) {
  const { property, setOpenModalForm, toast } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<ImageItem[]>([]);
  const [newImages, setNewImages] = useState<ImageItem[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const { listingTypes, propertyTypes, features, isLoading } = usePropertyFormData();

  useEffect(() => {
    if (property?.images) {
      const mapped = property.images.map((img) => ({
        id: img.id,
        url: img.url,
        existing: true,
      }));

      setExistingImages(mapped);
    }
  }, [property]);

  useEffect(() => {
    return () => {
      newImages.forEach((img) => {
        if (img.file) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, []);

  const form = useForm<PropertyFormZod>({
    resolver: zodResolver(propertyFormSchema),
    mode: "onChange",
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      price: property?.price || 0,
      currency: property?.currency || "USD",
      listingTypeId: property?.listingType.id || "",
      propertyTypeId: property?.propertyType.id || "",
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
      standOut: property?.standOut ?? false,
      userId: property?.userId || "",
      features: property?.features?.map((f) => f.feature.id) || [],
      video: property?.video || "",
    },
  });
  const { isValid } = form.formState;
  const { reset } = form;

  const selectedFeatures = form.watch("features") || [];

  const allImages = [...existingImages, ...newImages];

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

  const uploadImages = async (images: ImageItem[], title: string) => {
    const uploads = await Promise.all(
      images.map(async (img) => {
        if (!img.file) return null;

        const formData = new FormData();
        formData.append("file", img.file);
        formData.append("folder", `HORNEZ/properties/${title.trim()}`);
        formData.append("publicName", `${title.trim()}-${Date.now()}-${Math.random()}`);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!data?.url) return null;

        return {
          url: data.url,
          order: img.order!,
        };
      }),
    );

    console.log(uploads)

    return uploads.filter((img): img is { url: string; order: number } => img !== null);
  };

  const handleDragStart = (index: number) => {
    return (e: React.DragEvent) => {
      e.dataTransfer.setData("index", index.toString());
    };
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    const draggedIndex = Number(e.dataTransfer.getData("index"));

    const updated = [...allImages];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);

    setExistingImages(updated.filter((i) => i.existing));
    setNewImages(updated.filter((i) => !i.existing));
  };

  const handleRemoveImage = (index: number) => {
    const img = allImages[index];

    if (img.existing && img.id) {
      setDeletedImages((prev) => [...prev, img.id!]);
      setExistingImages((prev) => prev.filter((i) => i.id !== img.id));
    } else {
      setNewImages((prev) => prev.filter((i) => i.file?.name !== img.file?.name));
    }
  };

  const onSubmit = async (values: PropertyFormZod) => {
    setIsSubmitting(true);

    try {
      const newImagesOrdered = allImages.map((img, index) => ({ ...img, order: index })).filter((img) => !img.existing);

      const uploaded = await uploadImages(newImagesOrdered, values.title);

      const payload = {
        ...values,
        images: uploaded,
        deletedImages,
        existingImages: existingImages
          .filter((img): img is ImageItem & { id: string } => !!img.id)
          .map((img) => ({
            id: img.id,
            order: allImages.findIndex((i) => i.id === img.id),
          })),
      };

      if (property) {
        await onSubmitUpdate(payload);
      } else {
        const { success, error } = await createProperty(payload);

        if (!success) {
          throw new Error(error);
        }

        toast.current?.show({
          severity: "success",
          summary: "OK",
          detail: "Propiedad guardada",
        });
      }

      setOpenModalForm?.(false);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al subir imágenes",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <label className="block text-sm font-semibold mb-2">Moneda *</label>
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
              <label className="block text-sm font-semibold mb-2">Listado *</label>
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
              <label className="block text-sm font-semibold mb-2">Tipo *</label>
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

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Video</label>
              <Controller
                name="video"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <InputText {...field} placeholder="URL Video" className="w-full" />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold mb-2">Estado *</label>
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={Object.entries(PROPERTY_STATUS).map(([value, config]) => ({
                        label: config.label,
                        value: value,
                      }))}
                      className="w-full"
                      placeholder="Seleccionar estado"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div className="w-full col-span-2">
              <label className="block text-sm font-semibold mb-2">Características *</label>
              <Dropdown
                options={features.filter((f) => !selectedFeatures.includes(f.id))}
                optionLabel="name"
                optionValue="id"
                onChange={(e) => handleAddFeature(e.value)}
                className="w-full"
                placeholder="Seleccionar Características"
              />
              {isLoading ? (
                <span>Cargando características...</span>
              ) : (
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
              )}
            </div>

            <div className="w-full col-span-2">
              <label className="block text-sm font-semibold mb-2">Imágenes *</label>
              <FileUpload
                mode="advanced"
                multiple
                customUpload
                uploadOptions={{ className: "hidden" }}
                chooseLabel="Seleccionar Imágenes"
                auto={false}
                onSelect={(e) => {
                  const mapped = e.files.map((file: File) => ({
                    file,
                    url: URL.createObjectURL(file),
                    existing: false,
                  }));

                  setNewImages((prev) => {
                    const existingNames = prev.map((img) => img.file?.name);

                    const filtered = mapped.filter((img) => !existingNames.includes(img.file.name));

                    return [...prev, ...filtered];
                  });
                }}
                onRemove={(e) => {
                  setNewImages((prev) => prev.filter((img) => img.file?.name !== e.file.name));
                }}
                onClear={() => setNewImages([])}
              />

              {isLoading ? (
                <span>Cargando imágenes...</span>
              ) : (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={handleDragStart(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop(index)}
                      className="relative w-24 h-24 border rounded overflow-hidden cursor-move"
                    >
                      <img src={img.url} className="w-full h-full object-cover" />

                      <span className="absolute top-1 left-1 text-xs bg-black/50 text-white px-1 rounded">
                        {img.existing ? "SUBIDA" : "NUEVA"}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>

                      <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        {index}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mostrar *</label>
              <Controller
                name="active"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={[
                        { label: "SI", value: true },
                        { label: "NO", value: false },
                      ]}
                      className="w-full"
                      placeholder="Mostrar Propiedad"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Destacar *</label>
              <Controller
                name="standOut"
                control={form.control}
                render={({ field, fieldState }) => (
                  <>
                    <Dropdown
                      {...field}
                      options={[
                        { label: "SI", value: true },
                        { label: "NO", value: false },
                      ]}
                      className="w-full"
                      placeholder="Destacar Propiedad"
                    />
                    {fieldState.error && <small className="p-error">{fieldState.error.message}</small>}
                  </>
                )}
              />
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
