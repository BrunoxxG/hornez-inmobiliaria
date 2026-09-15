"use client";

import { useState } from "react";
import { markContactInquiryAsRead } from "@/lib/contactInquiries";

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

  const handleMarkAsRead = async (id: string) => {
    const result = await markContactInquiryAsRead(id);
    if (result.success) {
      setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
    }
  };

  if (items.length === 0) {
    return <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">Todavía no hay consultas.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((inquiry) => (
        <article key={inquiry.id} className={`rounded-xl border bg-white p-5 shadow-sm ${inquiry.read ? "border-gray-200" : "border-hornez-orange"}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-bold text-hornez-blue">{inquiry.name}</h2>
                {!inquiry.read && <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-hornez-orange">Nueva</span>}
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{REASON_LABELS[inquiry.reason]}</span>
              </div>
              <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                <a href={`mailto:${inquiry.email}`} className="hover:text-hornez-orange">{inquiry.email}</a>
                <a href={`tel:${inquiry.phone}`} className="hover:text-hornez-orange">{inquiry.phone}</a>
              </div>
              <p className="mt-4 whitespace-pre-line text-gray-800">{inquiry.message}</p>
              <p className="mt-4 text-xs text-gray-400">{new Date(inquiry.createdAt).toLocaleString("es-AR")}</p>
            </div>
            {!inquiry.read && (
              <button type="button" onClick={() => void handleMarkAsRead(inquiry.id)} className="shrink-0 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-hornez-orange hover:text-white">
                Marcar como leída
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
