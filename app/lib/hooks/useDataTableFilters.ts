import { useState } from "react";
import { DataTableFilterMeta, DataTableFilterMetaData } from "primereact/datatable";

type CustomMatchMode = DataTableFilterMetaData["matchMode"] | "custom_lines";

export function useDataTableFilters(initialFilters: DataTableFilterMeta) {
  const [filters, setFilters] = useState<DataTableFilterMeta>(initialFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const getFilterValue = (field: string) => {
    const filter = filters[field] as DataTableFilterMetaData | undefined;
    return filter?.value ?? null;
  };

  const setFilter = (field: string, value: unknown, matchMode: DataTableFilterMetaData["matchMode"]) => {
    setFilters((prev) => ({
      ...prev,
      [field]: {
        value,
        matchMode,
      },
    }));
  };

  const onGlobalFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        value,
      },
    }));
    setGlobalFilterValue(value);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setGlobalFilterValue("");
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some((filter) => {
      const f = filter as DataTableFilterMetaData;
      return f?.value !== null && f?.value !== undefined && f?.value !== "";
    });
  };

  return {
    filters,
    setFilter,
    getFilterValue,
    globalFilterValue,
    onGlobalFilterChange,
    clearFilters,
    hasActiveFilters,
  };
}
