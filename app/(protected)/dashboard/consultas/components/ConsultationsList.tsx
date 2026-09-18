"use client";

import { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";
import { deleteContactInquiry, markContactInquiryAsRead } from "@/lib/contactInquiries";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  reason: "TASACION" | "COMPRA" | "OTRO";
  message: string;
  read: boolean;
  createdAt: Date;
};

const REASON_LABELS = {
  TASACION: "Tasación",
  COMPRA: "Compra",
  OTRO: "Otro",
};

export default function ConsultationsList({ inquiries }: { inquiries: Inquiry[] }) {
  const [items, setItems] = useState(inquiries);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const toast = useRef<ToastType | null>(null);

  const handleToggleRead = async (id: string, read: boolean) => {
    const result = await markContactInquiryAsRead(id, read);
    if (result.success) {
      setItems((current) => current.map((item) => (item.id === id ? { ...item, read } : item)));
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteContactInquiry(id);
    if (result.success) {
      setItems((current) => current.filter((item) => item.id !== id));
      toast.current?.show({ severity: "success", summary: "Eliminada", detail: "Consulta eliminada", life: 3000 });
    } else {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
    }
  };

  return (
    <div className="space-y-4">
      <Toast ref={toast} />
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">Todavía no hay consultas.</p>
      ) : items.map((inquiry) => (
        <article key={inquiry.id} className={`rounded-xl border bg-white p-5 shadow-sm ${inquiry.read ? "border-gray-200" : "border-hornez-orange"}`}>
          <div className="flex flex-col gap-4">
            <div className="min-w-0">
              <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Nombre</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-hornez-blue">{inquiry.name}</h2>
                    {!inquiry.read && <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-hornez-orange">Nueva</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Motivo</p>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{REASON_LABELS[inquiry.reason]}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Teléfono</p>
                  <a href={`tel:${inquiry.phone}`} className="hover:text-hornez-orange">{inquiry.phone}</a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Mail</p>
                  <a href={`mailto:${inquiry.email}`} className="hover:text-hornez-orange">{inquiry.email}</a>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Consulta</p>
                <p className="whitespace-pre-line text-gray-800">{inquiry.message}</p>
              </div>
              <p className="mt-4 text-xs text-gray-400">{new Date(inquiry.createdAt).toLocaleString("es-AR")}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => void handleToggleRead(inquiry.id, !inquiry.read)}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-hornez-orange hover:text-white"
              >
                {inquiry.read ? "No leído" : "Leído"}
              </button>
              <button
                type="button"
                onClick={() => setInquiryToDelete(inquiry)}
                className="rounded-md bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-600 hover:text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </article>
      ))}
      <Dialog
        visible={inquiryToDelete !== null}
        onHide={() => setInquiryToDelete(null)}
        header="Confirmar eliminación"
        modal
        style={{ width: "min(90vw, 28rem)" }}
      >
        <p className="m-0 text-gray-700">
          ¿Estás seguro que deseas eliminar la consulta de <strong>{inquiryToDelete?.name}</strong>?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button label="Cancelar" severity="secondary" outlined onClick={() => setInquiryToDelete(null)} />
          <Button
            label="Eliminar"
            severity="danger"
            onClick={() => {
              if (inquiryToDelete) void handleDelete(inquiryToDelete.id);
              setInquiryToDelete(null);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}
