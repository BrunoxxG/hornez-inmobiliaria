"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 16);
  }, [lat, lng]);

  return null;
}

function DraggableMarker({ lat, lng, onChange }: Props) {
  const [position, setPosition] = useState<[number, number]>([lat, lng]);

  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      onChange(newPos[0], newPos[1]);
    },
  });

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const newPos = marker.getLatLng();
          setPosition([newPos.lat, newPos.lng]);
          onChange(newPos.lat, newPos.lng);
        },
      }}
    />
  );
}

export default function MapPicker({ lat, lng, onChange }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      <Recenter lat={lat} lng={lng} />

      <DraggableMarker lat={lat} lng={lng} onChange={onChange} />
    </MapContainer>
  );
}