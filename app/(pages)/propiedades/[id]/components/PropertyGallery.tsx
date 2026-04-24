"use client";

import { useState } from "react";

export default function PropertyGallery({ images }: { images: { url: string; id: string }[] }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-100 rounded-xl text-gray-400">
        <i className="pi pi-image text-6xl" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Imagen principal */}
      <div className="relative h-80 md:h-120 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={images[active].url}
          alt="Imagen de la propiedad"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
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
                i === active ? "border-hornez-red" : "border-transparent"
              }`}
            >
              <img src={img.url} alt="" className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
