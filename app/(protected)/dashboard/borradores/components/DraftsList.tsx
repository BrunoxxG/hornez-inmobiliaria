"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import type { Toast as ToastType } from "primereact/toast";
import { deletePropertyDraft } from "../actions/actionsDrafts";

type Draft = {
  id: string;
  title: string;
  data: Record<string, unknown>;
  updatedAt: Date;
  user: { name: string; email: string };
};

export default function DraftsList({ drafts, onResume, onDraftRemoved }: { drafts: Draft[]; onResume: (draft: Draft) => void; onDraftRemoved?: (draftId: string) => void }) {
  const [items, setItems] = useState(drafts);
  const [draftToDelete, setDraftToDelete] = useState<Draft | null>(null);
  const toast = useRef<ToastType | null>(null);

  const handleDelete = async () => {
    if (!draftToDelete) return;
    const result = await deletePropertyDraft(draftToDelete.id);
    if (!result.success) {
      toast.current?.show({ severity: "error", summary: "Error", detail: result.error, life: 3000 });
      return;
    }
    setItems((current) => current.filter((item) => item.id !== draftToDelete.id));
    onDraftRemoved?.(draftToDelete.id);
    setDraftToDelete(null);
    toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Borrador eliminado", life: 3000 });
  };

  return (
    <div className="space-y-4">
      <Toast ref={toast} />
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">No hay borradores guardados.</p>
      ) : items.map((draft) => (
        <article key={draft.id} className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-bold text-hornez-blue">{draft.title}</h2>
            <p className="mt-1 text-sm text-gray-600">Guardado por {draft.user.name} el {new Date(draft.updatedAt).toLocaleString("es-AR")}</p>
          </div>
          <div className="flex gap-2">
            <Button label="Retomar" icon="pi pi-pencil" className="dashboard-action-button" onClick={() => onResume(draft)} />
            <Button icon="pi pi-trash" severity="danger" text tooltip="Eliminar borrador" tooltipOptions={{ position: "top" }} aria-label={`Eliminar borrador ${draft.title}`} onClick={() => setDraftToDelete(draft)} />
          </div>
        </article>
      ))}
      <Dialog visible={draftToDelete !== null} onHide={() => setDraftToDelete(null)} header="Confirmar eliminación" modal style={{ width: "min(90vw, 28rem)" }}>
        <p>¿Eliminar el borrador <strong>{draftToDelete?.title}</strong>?</p>
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setDraftToDelete(null)} /><Button label="Eliminar" severity="danger" onClick={() => void handleDelete()} /></div>
      </Dialog>
    </div>
  );
}
