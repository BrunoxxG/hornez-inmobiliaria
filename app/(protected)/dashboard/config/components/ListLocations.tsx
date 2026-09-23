"use client";

import { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { useDataTableFilters } from "@/app/lib/hooks/useDataTableFilters";

const initialFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

export function ListLocations({ locations }: { locations: string[] }) {
  const [items, setItems] = useState(locations.map((name) => ({ name })));
  const { filters, globalFilterValue, onGlobalFilterChange } = useDataTableFilters(initialFilters);

  return (
    <div className="rounded-lg border">
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
            <h2 className="text-lg font-bold text-hornez-blue">Localidad</h2>
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
      </DataTable>
    </div>
  );
}
