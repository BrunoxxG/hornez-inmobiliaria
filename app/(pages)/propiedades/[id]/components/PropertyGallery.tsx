"use client";

import { useEffect, useState } from "react";

export default function PropertyGallery({
  images,
  operation,
}: {
  images: { url: string; id: string }[];
  operation: string;
}) {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  if (images.length === 0) {
    return (
      <div className="relative flex items-center justify-center h-80 bg-gray-100 rounded-xl text-gray-400">
        <img src="/img/vendeLogo.png" alt="venta logo" className={`h-15 absolute top-3 left-3 ${operation !== "Venta" ? "hidden" : "" }`} />
        <img src="/img/alquilaLogo.png" alt="alquiler logo" className={`h-15 absolute top-3 left-3 ${operation !== "Alquiler" ? "hidden" : "" }`} />
        <i className="pi pi-image text-6xl" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Imagen principal */}
      <div className="relative h-80 md:h-120 bg-gray-100 rounded-xl overflow-hidden">
        <img src="/img/vendeLogo.png" alt="venta logo" className={`h-15 absolute top-3 left-3 ${operation !== "Venta" ? "hidden" : "" }`} />
        <img src="/img/alquilaLogo.png" alt="alquiler logo" className={`h-15 absolute top-3 left-3 ${operation !== "Alquiler" ? "hidden" : "" }`} />
        <img
          src={images[active].url}
          alt="Imagen de la propiedad"
          className="cursor-zoom-in object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          onClick={() => setIsModalOpen(true)}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Anterior"
            >
              <i className="pi pi-chevron-left" />
            </button>
            <button
              onClick={() => setActive((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label="Siguiente"
            >
              <i className="pi pi-chevron-right" />
            </button>
            <span className="absolute bottom-3 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-hornez-blue" : "border-transparent"
              }`}
            >
              <img src={img.url} alt="" className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada de la propiedad"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/30"
            aria-label="Cerrar imagen ampliada"
            onClick={() => setIsModalOpen(false)}
          >
            <i className="pi pi-times" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white transition-colors hover:bg-white/30"
                aria-label="Imagen anterior"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((prev) => (prev - 1 + images.length) % images.length);
                }}
              >
                <i className="pi pi-chevron-left" />
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white transition-colors hover:bg-white/30"
                aria-label="Imagen siguiente"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((prev) => (prev + 1) % images.length);
                }}
              >
                <i className="pi pi-chevron-right" />
              </button>
            </>
          )}
          <img
            src={images[active].url}
            alt="Imagen ampliada de la propiedad"
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
