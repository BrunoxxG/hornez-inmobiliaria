"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function PropertyGallery({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Ubicación</h2>

      <MapView lat={lat} lng={lng} />

      <p className="text-xs text-gray-500 mt-2">La ubicación es aproximada</p>
    </div>
  );
}
