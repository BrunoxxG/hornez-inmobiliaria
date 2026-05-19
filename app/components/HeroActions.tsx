"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "border-2 border-white bg-transparent px-[2.2rem] py-[0.825rem] text-[1.24rem] font-semibold text-white rounded-md transition-colors hover:border-hornez-orange hover:bg-hornez-orange";
const WHATSAPP_SELL_URL =
  "https://wa.me/5493544400903?text=Hola%20Hornez%20Inmobiliaria%2C%20quiero%20vender%20una%20propiedad.";
const INSTAGRAM_URL =
  "https://www.instagram.com/hornezinmobiliaria?igsh=dWM5NXdpYjZqczhm&utm_source=qr";

export default function HeroActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/propiedades?operacion=venta" className={BUTTON_CLASS}>
          Comprar
        </a>
        <button type="button" className={BUTTON_CLASS} onClick={() => setIsModalOpen(true)}>
          Vender
        </button>
        <a href="/propiedades?operacion=alquiler" className={BUTTON_CLASS}>
          Alquilar
        </a>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-7 text-center text-gray-900 shadow-2xl">
            <button
              type="button"
              aria-label="Cerrar opciones de venta"
              className="absolute right-4 top-4 text-2xl text-gray-400 transition-colors hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="pi pi-times" />
            </button>

            <h2 className="mb-3 pr-8 text-2xl font-bold text-gray-900">
              ¿Querés vender tu propiedad?
            </h2>
            <p className="mb-7 text-lg text-gray-600">
              Te asesoramos sin compromiso.
            </p>

            <div className="space-y-3 text-left">
              <a
                href={WHATSAPP_SELL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-md bg-[#25D366] px-5 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#1fb858]"
              >
                <i className="pi pi-whatsapp text-xl" />
                Hablar por WhatsApp
              </a>
              <a
                href="tel:+5493544400903"
                className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-5 py-3 text-lg font-semibold text-gray-800 transition-colors hover:border-hornez-orange hover:text-hornez-orange"
              >
                <i className="pi pi-phone text-xl" />
                Llamar ahora
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-5 py-3 text-lg font-semibold text-gray-800 transition-colors hover:border-hornez-orange hover:text-hornez-orange"
              >
                <i className="pi pi-instagram text-xl" />
                Ver Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
