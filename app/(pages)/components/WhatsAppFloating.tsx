"use client";

import { useEffect, useState } from "react";

const WHATSAPP_TOOLTIP_CLOSED_KEY = "whatsapp-tooltip-closed";

export default function WhatsAppFloating() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(localStorage.getItem(WHATSAPP_TOOLTIP_CLOSED_KEY) !== "true");
  }, []);

  const handleClose = () => {
    localStorage.setItem(WHATSAPP_TOOLTIP_CLOSED_KEY, "true");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://wa.me/5493544400903"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="flex h-[3.85rem] w-[3.85rem] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-transform hover:scale-110"
      >
        <i className="pi pi-whatsapp text-3xl" />
      </a>
      {isVisible && (
        <div className="animate-[whatsapp-in_180ms_ease-out] absolute bottom-[calc(100%+0.85rem)] right-0 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-emerald-100 bg-white px-4 py-3 pr-10 text-sm leading-relaxed text-gray-800 shadow-[0_14px_35px_rgba(15,23,42,0.18)]">
          <p>
            Hola! Si estás buscando comprar o vender tu propiedad,
            <br />
            ¡Estoy acá para ayudarte con eso!
          </p>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar mensaje de WhatsApp"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-orange-50 hover:text-hornez-orange"
          >
            <i className="pi pi-times" />
          </button>
          <span className="absolute -bottom-2 right-7 h-4 w-4 rotate-45 border-b border-r border-emerald-100 bg-white" />
        </div>
      )}
    </div>
  );
}
