"use client";

import { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";
import { useRef } from "react";
import { createLocation, deleteLocation, updateLocation } from "../actions/actionsLocations";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListLocations({ locations }: { locations: string[] }) {
  const [items, setItems] = useState(locations.map((name) => ({ name })));
  const [locationToEdit, setLocationToEdit] = useState<{ name: string } | null>(null);
  const [locationToDelete, setLocationToDelete] = useState<{ name: string } | null>(null);
  const [editedName, setEditedName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const toast = useRef<ToastType | null>(null);
  const { filters, globalFilterValue, onGlobalFilterChange } = useDataTableFilters(initialFilters);

  const handleEdit = async () => {
    if (!locationToEdit) return;
    const result = await updateLocation(locationToEdit.name, editedName);
    if (!result.success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
      return;
    }
    setItems((current) => current.map((item) => item.name === locationToEdit.name ? { name: editedName.trim() } : item));
    setLocationToEdit(null);
    toast.current?.show({ severity: "success", summary: "Actualizada", detail: "Localidad actualizada", life: 3000 });
  };

  const handleDelete = async () => {
    if (!locationToDelete) return;
    const result = await deleteLocation(locationToDelete.name);
    if (!result.success) {
      toast.current?.show({ severity: "warn", summary: "No se puede eliminar", detail: result.error, life: 4000 });
      setLocationToDelete(null);
      return;
    }
    setItems((current) => current.filter((item) => item.name !== locationToDelete.name));
    setLocationToDelete(null);
    toast.current?.show({ severity: "success", summary: "Eliminada", detail: "Localidad eliminada", life: 3000 });
  };

  const handleCreate = async () => {
    const result = await createLocation(newName);
    if (!result.success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
      return;
    }
    if (result.locality) setItems((current) => [...current, { name: result.locality.name }].sort((a, b) => a.name.localeCompare(b.name, "es")));
    setNewName("");
    setShowCreate(false);
    toast.current?.show({ severity: "success", summary: "Creada", detail: "Localidad creada", life: 3000 });
  };

  return (
    <div className="rounded-lg border">
      <Toast ref={toast} />
      <Dialog visible={locationToEdit !== null} onHide={() => setLocationToEdit(null)} header="Editar localidad" modal style={{ width: "min(90vw, 28rem)" }}>
        <InputText value={editedName} onChange={(event) => setEditedName(event.target.value)} className="w-full" />
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setLocationToEdit(null)} /><Button label="Guardar" className="dashboard-action-button" onClick={() => void handleEdit()} /></div>
      </Dialog>
      <Dialog visible={locationToDelete !== null} onHide={() => setLocationToDelete(null)} header="Confirmar eliminación" modal style={{ width: "min(90vw, 28rem)" }}>
        <p>¿Eliminar la localidad <strong>{locationToDelete?.name}</strong>?</p>
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setLocationToDelete(null)} /><Button label="Eliminar" severity="danger" onClick={() => void handleDelete()} /></div>
      </Dialog>
      <DataTable
        value={items}
        onValueChange={setItems}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        dataKey="name"
        filters={filters}
        globalFilterFields={["name"]}
        header={
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-hornez-blue">Localidad</h2>
              <Button icon="pi pi-plus" className="dashboard-action-button p-0" text tooltip="Nueva localidad" tooltipOptions={{ position: "top" }} onClick={() => setShowCreate(true)} />
            </div>
            <InputText
              value={globalFilterValue}
              onChange={(event) => onGlobalFilterChange(event.target.value)}
              placeholder="Buscar localidad..."
              className="h-9.5 text-sm filter-compact"
            />
          </div>
        }
        emptyMessage="No hay localidades cargadas"
        className="datatable-responsive"
      >
        <Column field="name" header="Nombre" sortable />
        <Column
          header="Acciones"
          body={(row: { name: string }) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-text" style={{ color: "#EF7D00" }} tooltip="Editar" tooltipOptions={{ position: "top" }} onClick={() => { setLocationToEdit(row); setEditedName(row.name); }} />
              <Button icon="pi pi-trash" text severity="danger" tooltip="Eliminar" tooltipOptions={{ position: "top" }} onClick={() => setLocationToDelete(row)} />
            </div>
          )}
        />
      </DataTable>
      <Dialog visible={showCreate} onHide={() => setShowCreate(false)} header="Nueva localidad" modal style={{ width: "min(90vw, 28rem)" }}>
        <InputText value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Localidad" className="w-full" />
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setShowCreate(false)} /><Button label="Crear" className="dashboard-action-button" onClick={() => void handleCreate()} /></div>
      </Dialog>
    </div>
  );
}
