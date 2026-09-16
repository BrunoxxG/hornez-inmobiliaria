import { getContactInquiries } from "./lib/dataContactInquiries";
import ConsultationsList from "./components/ConsultationsList";

export default async function ConsultationsPage() {
  const inquiries = await getContactInquiries();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-hornez-blue">Consultas</h1>
        <p className="mt-2 text-gray-600">Mensajes recibidos desde el formulario de contacto.</p>
      </div>
      <ConsultationsList inquiries={inquiries} />
    </section>
  );
}
