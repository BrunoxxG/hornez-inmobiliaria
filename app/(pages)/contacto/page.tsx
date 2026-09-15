"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Music2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createContactInquiry } from "@/lib/contactInquiries";

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/hornezinmobiliaria?igsh=dWM5NXdpYjZqczhm&utm_source=qr", label: "Instagram", icon: "pi-instagram" },
  { href: "https://www.facebook.com/share/1QngV9yJAU/?mibextid=wwXIfr", label: "Facebook", icon: "pi-facebook" },
  { href: "https://www.tiktok.com/@inmobiliariahornez?_r=1&_t=ZS-99EgEg1vBYX", label: "TikTok", icon: "music" },
  { href: "https://wa.me/5493544400903", label: "WhatsApp", icon: "pi-whatsapp" },
];

const CONTACT_PHONES = [
  { label: "Oficina", number: "3544400903", href: "tel:+5493544400903" },
  { label: "Bruno", number: "3544548602", href: "tel:+5493544548602" },
  { label: "Ailen", number: "3544302551", href: "tel:+5493544302551" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email");

    if (emailInput instanceof HTMLInputElement) {
      emailInput.value = emailInput.value.replace(/\s/g, "").toLowerCase();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        setEmailError("Ingresá un email válido, por ejemplo nombre@dominio.com");
        return;
      }
    }

    const formData = new FormData(form);
    const result = await createContactInquiry({
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      reason: String(formData.get("reason") || ""),
      message: String(formData.get("message") || ""),
    });

    if (!result.success) {
      setSubmitError(result.error || "No se pudo enviar la consulta");
      return;
    }

    setEmailError("");
    setSubmitError("");
    setSent(true);
    form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <section
            className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-cover bg-center px-4 py-8 shadow-sm sm:px-8"
            style={{ backgroundImage: "url('/img/lomaBolaLaCruz.jpeg')" }}
          >
            <div className="absolute inset-0 bg-transparent" />
            <div className="relative mx-auto w-full max-w-3xl rounded-2xl bg-white/60 p-6 shadow-xl sm:w-[35%] sm:p-8">
              <p className="mb-6 text-center text-lg font-medium leading-relaxed text-gray-800">
                Déjanos tus datos y nos comunicaremos a la brevedad.
              </p>
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-5">
                  <label className="block space-y-2 text-center text-sm font-semibold text-gray-700">
                    NOMBRE
                    <input required
                     name="name" 
                     type="text" 
                     maxLength={16}
                     placeholder="ej.: Bruno"
                     className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-center font-normal outline-none transition-colors focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange" />
                  </label>
                  <label className="block space-y-2 text-center text-sm font-semibold text-gray-700">
                    EMAIL
                    <input
                      required
                      name="email"
                      type="text"
                      inputMode="email"
                      maxLength={30}
                      placeholder="ej.: tu@email.com"
                      onInput={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "").toLowerCase();
                        setEmailError("");
                      }}
                      className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-center font-normal outline-none transition-colors focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange"
                    />
                    {emailError && <span className="block text-xs font-medium text-red-600">{emailError}</span>}
                  </label>
                  <label className="block space-y-2 text-center text-sm font-semibold text-gray-700">
                    TELÉFONO
                    <input
                      required
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={16}
                      pattern="\+?[0-9]{1,15}"
                      placeholder="ej.: 3544400903"
                      onInput={(event) => {
                        const hasPlus = event.currentTarget.value.startsWith("+");
                        const digits = event.currentTarget.value.replace(/\D/g, "").slice(0, 15);
                        event.currentTarget.value = `${hasPlus ? "+" : ""}${digits}`;
                      }}
                      className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-center font-normal outline-none transition-colors focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange"
                    />
                  </label>
                  <label className="block space-y-2 text-center text-sm font-semibold text-gray-700">
                    MOTIVO
                    <select required name="reason" defaultValue="" className="w-full rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-center font-normal outline-none transition-colors focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange">
                      <option value="" disabled>Seleccionar motivo</option>
                      <option value="tasacion">Tasación</option>
                      <option value="compra">Compra</option>
                      <option value="otro">Otro</option>
                    </select>
                  </label>
                </div>
                <label className="block space-y-2 text-center text-sm font-semibold text-gray-700">
                  MENSAJE
                  <textarea required 
                  name="message" 
                  rows={5} 
                  maxLength={256}
                  className="w-full resize-y rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-center font-normal outline-none transition-colors focus:border-hornez-orange focus:ring-1 focus:ring-hornez-orange" />
                </label>
                <div className="flex flex-col items-center justify-center gap-3">
                  <button type="submit" className="rounded-md bg-hornez-orange px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-600">
                    Enviar
                  </button>
                  {sent && <p className="text-sm font-medium text-green-700">Mensaje enviado correctamente.</p>}
                  {submitError && <p className="text-sm font-medium text-red-600">{submitError}</p>}
                </div>
              </form>
            </div>
          </section>

          <section className="mt-10 text-center">
            <h2 className="mb-5 text-xl font-bold text-hornez-blue">Seguinos en redes</h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-[5rem] leading-none text-white transition-colors hover:bg-hornez-orange"
                >
                  {social.icon === "music" ? (
                    <Music2 size={80} />
                  ) : (
                    <i className={`pi ${social.icon} inline-block leading-none`} style={{ fontSize: "4rem" }} />
                  )}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-hornez-blue">Ubicación del pueblo La Paz</h2>
              <p className="mt-2 text-gray-600">La Paz, Córdoba</p>
            </div>
            <iframe
              title="Ubicación de Plaza de La Paz, Córdoba"
              src="https://www.google.com/maps?q=Plaza%20de%20La%20Paz%2C%20C%C3%B3rdoba%2C%20Argentina&output=embed"
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section className="mt-10">
            <h2 className="mb-5 text-center text-xl font-bold text-hornez-blue">Hablemos</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {CONTACT_PHONES.map((contact) => (
                <Link key={contact.label} href={contact.href} className="rounded-lg bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50">
                  <span className="block text-sm font-semibold text-gray-500">{contact.label}</span>
                  <span className="mt-1 block font-semibold text-hornez-orange">{contact.number}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
