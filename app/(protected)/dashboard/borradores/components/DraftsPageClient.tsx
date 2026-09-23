"use client";

import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import type { Toast as ToastType } from "primereact/toast";
import { useRef } from "react";
import { Session } from "next-auth";
import DraftsList from "./DraftsList";
import FormProperty from "../../propiedades/components/FormProperty";

type Draft = {
  id: string;
  title: string;
  data: Record<string, unknown>;
  updatedAt: Date;
  user: { name: string; email: string };
};

export default function DraftsPageClient({ drafts, session }: { drafts: Draft[]; session: Session }) {
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const toast = useRef<ToastType | null>(null);

  return (
    <section className="space-y-6">
      <Toast ref={toast} />
      <div>
        <h1 className="text-3xl font-bold text-hornez-blue">Borradores</h1>
      </div>
      <DraftsList drafts={drafts} onResume={setSelectedDraft} />
      <Dialog visible={selectedDraft !== null} onHide={() => setSelectedDraft(null)} header="Retomar borrador" style={{ width: "min(95vw, 46rem)" }} modal>
        {selectedDraft && (
          <FormProperty
            draftId={selectedDraft.id}
            draftData={selectedDraft.data}
            setOpenModalForm={(open) => { if (!open) setSelectedDraft(null); }}
            toast={toast}
            session={session}
          />
        )}
      </Dialog>
    </section>
  );
}
