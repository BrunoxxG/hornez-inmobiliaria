export const MENU_ITEMS = [
  { label: "Propiedades", icon: "pi pi-book", path: "/dashboard/propiedades" },
  { label: "Configuración", icon: "pi pi-cog", path: "/dashboard/config" },
];

export const formatCurrency = (amount: number) => {
  if (amount === null || amount === undefined) return "$0";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};