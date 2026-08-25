"use client";

import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";
import { FeatureZod } from "../lib/zodConfig";
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";
import FormFeature from "./FormFeature";
import { deleteFeature } from "../actions/actionsConfig";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListFeatures({ features, category }: { features: FeatureZod[]; category: FeatureZod["category"] }) {
  const [showNewFeatureModal, setShowNewFeatureModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureZod | undefined>(undefined);
  const toast = useRef<ToastType | null>(null);
  const [filteredFeatures, setFilteredFeatures] = useState<FeatureZod[]>(
    features.filter((feature) => feature.category === category),
  );
  const title = category === "SERVICE" ? "Servicio" : "Adicional";
  const titlePlural = category === "SERVICE" ? "Servicios" : "Adicionales";

  const {
    filters,
    globalFilterValue,
    onGlobalFilterChange,
    clearFilters,
    hasActiveFilters,
  } = useDataTableFilters(initialFilters);

  const nameBodyTemplate = (rowData: FeatureZod) => {
    return (
      <div>
        <div className="font-semibold">{rowData.name}</div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: FeatureZod) => {
    const handleDelete = async () => {
      if (!window.confirm(`¿Eliminar el servicio "${rowData.name}"?`)) return;

      const result = await deleteFeature(rowData.id);
      if (!result.success) {
        toast.current?.show({ severity: "error", summary: "Error", detail: result.error });
        return;
      }

      setFilteredFeatures((current) => current.filter((feature) => feature.id !== rowData.id));
      toast.current?.show({ severity: "success", summary: "OK", detail: `${title} eliminado` });
    };

    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-text"
          style={{
            backgroundColor: "#F7F7F7",
            border: "1px solid #F9F9F9",
            color: "#E31E24",
            borderRadius: "8px",
            minHeight: "40px",
            minWidth: "40px",
          }}
          tooltip="Editar"
          tooltipOptions={{ position: "top" }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFeature(rowData);
            setShowDetailModal(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text"
          style={{
            backgroundColor: "#F7F7F7",
            border: "1px solid #F9F9F9",
            color: "#6B7280",
            borderRadius: "8px",
            minHeight: "40px",
            minWidth: "40px",
          }}
          tooltip="Eliminar"
          tooltipOptions={{ position: "top" }}
          onClick={(e) => {
            e.stopPropagation();
            void handleDelete();
          }}
        />
      </div>
    );
  };

  const header = (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <InputText
            value={globalFilterValue}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 h-9.5 text-sm filter-compact"
          />
          {hasActiveFilters() && (
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Limpiar"
              outlined
              onClick={clearFilters}
              style={{
                fontSize: "0.875rem",
                padding: "0.5rem 1rem",
              }}
            />
          )}
        </div>
        <Button
          label={`Nuevo ${title}`}
          icon="pi pi-plus"
          onClick={() => setShowNewFeatureModal(true)}
          className="p-button-danger"
        />
      </div>
  );

  return (
    <div className="border">
      <Toast ref={toast} />
      <DataTable
        value={filteredFeatures}
        onValueChange={(e) => setFilteredFeatures(e)}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name"]}
        header={header}
        emptyMessage={`No se encontraron ${titlePlural.toLowerCase()}`}
        className="datatable-responsive"
      >
        <Column field="name" header="Nombre" body={nameBodyTemplate} sortable style={{ minWidth: "200px" }} />
        <Column header="Acciones" body={actionsBodyTemplate} exportable={false} style={{ minWidth: "100px" }} />
      </DataTable>

      <Dialog
        visible={showNewFeatureModal}
        onHide={() => setShowNewFeatureModal(false)}
        header={`Nuevo ${title}`}
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        <FormFeature category={category} setOpenModalForm={setShowNewFeatureModal} toast={toast} />
      </Dialog>

      <Dialog
        visible={showDetailModal}
        onHide={() => {
          setShowDetailModal(false);
          setSelectedFeature(undefined);
        }}
        header={category === "SERVICE" ? "Servicio" : "Adicional"}
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        {selectedFeature && <FormFeature category={category} feature={selectedFeature} setOpenModalForm={setShowDetailModal} toast={toast} />}
      </Dialog>
    </div>
  );
}
