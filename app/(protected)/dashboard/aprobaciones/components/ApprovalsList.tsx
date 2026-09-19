"use client";

import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import type { Toast as ToastType } from "primereact/toast";
import { approveProperty, rejectProperty } from "../../propiedades/actions/actionsApproval";
import FormProperty from "../../propiedades/components/FormProperty";
import type { Session } from "next-auth";

type PendingProperty = {
  id: string;
  title: string;
  description: string;
  city: string;
  province: string;
  price: number;
  currency: "USD" | "ARS";
  createdAt: Date;
  user: { name: string; email: string };
  images: { url: string }[];
  listingType: { id: string; name: string };
  propertyType: { id: string; name: string };
  address: string;
  totalRooms: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lat: number;
  lng: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD" | "RENTED";
  documentation: "POSSESSORY_RIGHTS" | "DEED";
  active: boolean;
  standOut: boolean;
  userId: string;
  updatedAt: Date;
  video: string;
  features: { id: string; value: string; feature: { id: string; name: string; category: "SERVICE" | "ADDITIONAL" } }[];
  documents: { id: string; url: string; name: string }[];
};

export default function ApprovalsList({ properties, session }: { properties: PendingProperty[]; session: Session }) {
  const [items, setItems] = useState(properties);
  const [propertyToEdit, setPropertyToEdit] = useState<PendingProperty | null>(null);
  const [propertyToReject, setPropertyToReject] = useState<PendingProperty | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const toast = useRef<ToastType | null>(null);

  useEffect(() => {
    setItems(properties);
  }, [properties]);

  const handleApprove = async (id: string) => {
    const result = await approveProperty(id);
    if (result.success) {
      setItems((current) => current.filter((item) => item.id !== id));
      toast.current?.show({ severity: "success", summary: "Aprobada", detail: "La propiedad ya es visible", life: 3000 });
    } else {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
    }
  };

  const handleReject = async () => {
    if (!propertyToReject) return;
    const result = await rejectProperty(propertyToReject.id, rejectionReason);
    if (result.success) {
      setItems((current) => current.filter((item) => item.id !== propertyToReject.id));
      setPropertyToReject(null);
      setRejectionReason("");
      toast.current?.show({ severity: "success", summary: "Rechazada", detail: "La propiedad fue rechazada", life: 3000 });
    } else {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
    }
  };

  return (
    <div className="space-y-4">
      <Toast ref={toast} />
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          No hay publicaciones pendientes.
        </p>
      ) : items.map((property) => (
        <article key={property.id} className="rounded-xl border border-yellow-300 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {property.images[0] && <img src={property.images[0].url} alt="" className="h-32 w-32 rounded-md object-cover" />}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-hornez-blue">{property.title}</h2>
              <p className="mt-1 text-sm text-gray-600">Creada por {property.user.name} ({property.user.email})</p>
              <p className="mt-2 text-sm text-gray-700">{property.city}, {property.province}</p>
              <p className="mt-3 line-clamp-3 text-sm text-gray-700">{property.description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
              <Button label="Editar" icon="pi pi-pencil" className="dashboard-action-button" onClick={() => setPropertyToEdit(property)} />
              <Button label="Aprobar" icon="pi pi-check" severity="success" onClick={() => void handleApprove(property.id)} />
              <Button label="Rechazar" icon="pi pi-times" severity="warning" outlined onClick={() => setPropertyToReject(property)} />
            </div>
          </div>
        </article>
      ))}
      <Dialog
        visible={propertyToEdit !== null}
        onHide={() => setPropertyToEdit(null)}
        header="Editar publicación pendiente"
        modal
        style={{ width: "min(95vw, 46rem)" }}
      >
        {propertyToEdit && <FormProperty property={propertyToEdit} setOpenModalForm={(open) => { if (!open) setPropertyToEdit(null); }} toast={toast} session={session} />}
      </Dialog>
      <Dialog
        visible={propertyToReject !== null}
        onHide={() => setPropertyToReject(null)}
        header="Rechazar publicación"
        modal
        style={{ width: "min(90vw, 32rem)" }}
      >
        <p className="mb-3 text-gray-700">Indicá por qué rechazás <strong>{propertyToReject?.title}</strong>.</p>
        <InputTextarea value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} rows={4} className="w-full" />
        <div className="mt-4 flex justify-end gap-2">
          <Button label="Cancelar" severity="secondary" outlined onClick={() => setPropertyToReject(null)} />
          <Button label="Rechazar" severity="warning" onClick={() => void handleReject()} />
        </div>
      </Dialog>
    </div>
  );
}
