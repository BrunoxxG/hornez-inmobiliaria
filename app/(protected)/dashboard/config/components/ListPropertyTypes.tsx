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
import { PropertyTypeZod } from "../lib/zodConfig";
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";
import FormPropertyType from "./FormPropertyType";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListPropertyTypes({ propertyTypes }: { propertyTypes: PropertyTypeZod[] }) {
  const [showNewPropertyTypeModal, setShowNewPropertyTypeModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyTypeZod | undefined>(undefined);
  const toast = useRef<ToastType | null>(null);
  const [filteredPropertyTypes, setFilteredPropertyTypes] = useState<PropertyTypeZod[]>(propertyTypes);

  const {
    filters,
    globalFilterValue,
    onGlobalFilterChange,
    clearFilters,
    hasActiveFilters,
  } = useDataTableFilters(initialFilters);

  const nameBodyTemplate = (rowData: PropertyTypeZod) => {
    return (
      <div>
        <div className="font-semibold">{rowData.name}</div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: PropertyTypeZod) => {
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
            setSelectedPropertyType(rowData);
            setShowDetailModal(true);
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
          label="Nuevo Tipo de Propiedad"
          icon="pi pi-plus"
          onClick={() => setShowNewPropertyTypeModal(true)}
          className="p-button-danger"
        />
      </div>
  );

  return (
    <div className="border">
      <Toast ref={toast} />
      <DataTable
        value={propertyTypes}
        onValueChange={(e) => setFilteredPropertyTypes(e)}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name"]}
        header={header}
        emptyMessage="No se encontraron tipos de propiedades"
        className="datatable-responsive"
      >
        <Column field="name" header="Nombre" body={nameBodyTemplate} sortable style={{ minWidth: "200px" }} />
        <Column header="Acciones" body={actionsBodyTemplate} exportable={false} style={{ minWidth: "100px" }} />
      </DataTable>

      <Dialog
        visible={showNewPropertyTypeModal}
        onHide={() => setShowNewPropertyTypeModal(false)}
        header="Nuevo Tipo de Propiedad"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        <FormPropertyType setOpenModalForm={setShowNewPropertyTypeModal} toast={toast} />
      </Dialog>

      <Dialog
        visible={showDetailModal}
        onHide={() => {
          setShowDetailModal(false);
          setSelectedPropertyType(undefined);
        }}
        header="Propiedad"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        {selectedPropertyType && <FormPropertyType propertyType={selectedPropertyType} setOpenModalForm={setShowDetailModal} toast={toast} />}
      </Dialog>
    </div>
  );
}
