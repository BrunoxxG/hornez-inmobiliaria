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
import { ListingTypeZod } from "../lib/zodConfig";
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";
import FormListingType from "./FormListingType";
import { deleteListingType } from "../actions/actionsConfig";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListListingTypes({ listingTypes }: { listingTypes: ListingTypeZod[] }) {
  const [showNewListingTypeModal, setShowNewListingTypeModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedListingType, setSelectedListingType] = useState<ListingTypeZod | undefined>(undefined);
  const [listingTypeToDelete, setListingTypeToDelete] = useState<ListingTypeZod | null>(null);
  const toast = useRef<ToastType | null>(null);
  const [filteredListingTypes, setFilteredListingTypes] = useState<ListingTypeZod[]>(listingTypes);

  const { filters, globalFilterValue, onGlobalFilterChange, clearFilters, hasActiveFilters } =
    useDataTableFilters(initialFilters);

  const handleDelete = async () => {
    if (!listingTypeToDelete) return;
    const result = await deleteListingType(listingTypeToDelete.id);
    if (!result.success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error });
      return;
    }
    setFilteredListingTypes((current) => current.filter((listingType) => listingType.id !== listingTypeToDelete.id));
    setListingTypeToDelete(null);
    toast.current?.show({ severity: "success", summary: "OK", detail: "Tipo de listado eliminado" });
  };

  const nameBodyTemplate = (rowData: ListingTypeZod) => {
    return (
      <div>
        <div className="font-semibold">{rowData.name}</div>
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: ListingTypeZod) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-text"
          style={{
            backgroundColor: "#F7F7F7",
            border: "1px solid #F9F9F9",
            color: "#EF7D00",
            borderRadius: "8px",
            minHeight: "40px",
            minWidth: "40px",
          }}
          tooltip="Editar"
          tooltipOptions={{ position: "top" }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedListingType(rowData);
            setShowDetailModal(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text"
          style={{
            backgroundColor: "#F7F7F7",
            border: "1px solid #F9F9F9",
            color: "#C00D0D",
            borderRadius: "8px",
            minHeight: "40px",
            minWidth: "40px",
          }}
          tooltip="Eliminar"
          tooltipOptions={{ position: "top" }}
          onClick={(e) => {
            e.stopPropagation();
            setListingTypeToDelete(rowData);
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
            label="Limpiar filtros"
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
        label="Nuevo Tipo de Listado"
        icon="pi pi-plus"
        onClick={() => setShowNewListingTypeModal(true)}
        className="dashboard-action-button"
      />
    </div>
  );

  return (
    <div className="border">
      <Toast ref={toast} />
      <Dialog visible={listingTypeToDelete !== null} onHide={() => setListingTypeToDelete(null)} header="Confirmar eliminación" modal style={{ width: "min(90vw, 28rem)" }}>
        <p>¿Eliminar el tipo de listado <strong>{listingTypeToDelete?.name}</strong>?</p>
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setListingTypeToDelete(null)} /><Button label="Eliminar" severity="danger" onClick={() => void handleDelete()} /></div>
      </Dialog>
      <DataTable
        value={filteredListingTypes}
        onValueChange={(e) => setFilteredListingTypes(e)}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name"]}
        header={header}
        emptyMessage="No se encontraron tipos de listados"
        className="datatable-responsive"
      >
        <Column field="name" header="Nombre" body={nameBodyTemplate} sortable style={{ minWidth: "200px" }} />
        <Column header="Acciones" body={actionsBodyTemplate} exportable={false} style={{ minWidth: "100px" }} />
      </DataTable>

      <Dialog
        visible={showNewListingTypeModal}
        onHide={() => setShowNewListingTypeModal(false)}
        header="Nuevo Tipo de Listado"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        <FormListingType setOpenModalForm={setShowNewListingTypeModal} toast={toast} />
      </Dialog>

      <Dialog
        visible={showDetailModal}
        onHide={() => {
          setShowDetailModal(false);
          setSelectedListingType(undefined);
        }}
        header="Listado"
        style={{ width: "700px" }}
        modal
        dismissableMask
      >
        {selectedListingType && (
          <FormListingType listingType={selectedListingType} onUpdated={(updated) => setFilteredListingTypes((current) => current.map((item) => item.id === updated.id ? updated : item))} setOpenModalForm={setShowDetailModal} toast={toast} />
        )}
      </Dialog>
    </div>
  );
}
