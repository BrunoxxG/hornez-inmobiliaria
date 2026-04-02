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
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";
import { PropertyZod } from "../lib/zodPublications";
import FormProperty from "./FormProperty";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListProperties({ properties }: { properties: PropertyZod[] }) {
  const [showNewPropertyModal, setShowNewPropertyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyZod | undefined>(undefined);
  const toast = useRef<ToastType | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<PropertyZod[]>(properties);

  const {
    filters,
    globalFilterValue,
    onGlobalFilterChange,
    clearFilters,
    hasActiveFilters,
  } = useDataTableFilters(initialFilters);

  const titleBodyTemplate = (rowData: PropertyZod) => {
    return (
      <div>
        <div className="font-semibold">{rowData.title}</div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: PropertyZod) => {
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
            setSelectedProperty(rowData);
            setShowDetailModal(true);
          }}
        />
      </div>
    );
  };

  const header = (
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 items-center flex-wrap flex-1">
          <InputText
            value={globalFilterValue}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            placeholder="Buscar..."
            className="w-50 h-9.5 text-sm filter-compact"
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
          label="Nueva Propiedad"
          icon="pi pi-plus"
          onClick={() => setShowNewPropertyModal(true)}
          className="p-button-danger"
        />
      </div>
  );

  return (
    <div className="border">
      <Toast ref={toast} />
      <DataTable
        value={properties}
        onValueChange={(e) => setFilteredProperties(e)}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
        filters={filters}
        globalFilterFields={["title"]}
        header={header}
        emptyMessage="No se encontraron propiedades"
        className="datatable-responsive"
      >
        <Column field="title" header="Título" body={titleBodyTemplate} sortable style={{ minWidth: "200px" }} />
        <Column header="Acciones" body={actionsBodyTemplate} exportable={false} style={{ minWidth: "100px" }} />
      </DataTable>

      <Dialog
        visible={showNewPropertyModal}
        onHide={() => setShowNewPropertyModal(false)}
        header="Nueva Propiedad"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        <FormProperty setOpenModalForm={setShowNewPropertyModal} toast={toast} />
      </Dialog>

      <Dialog
        visible={showDetailModal}
        onHide={() => {
          setShowDetailModal(false);
          setSelectedProperty(undefined);
        }}
        header="Propiedad"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        {selectedProperty && <FormProperty property={selectedProperty} setOpenModalForm={setShowDetailModal} toast={toast} />}
      </Dialog>
    </div>
  );
}
