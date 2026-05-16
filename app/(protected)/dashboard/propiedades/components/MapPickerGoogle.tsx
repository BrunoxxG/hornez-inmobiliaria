"use client";

import {
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { useEffect } from "react";

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

function Recenter({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.panTo({ lat, lng });
  }, [map, lat, lng]);

  return null;
}

export default function MapPicker({
  lat,
  lng,
  onChange,
}: Props) {
  return (
    <div className="h-100 w-full rounded-xl overflow-hidden">
      <Map
        defaultZoom={16}
        defaultCenter={{ lat, lng }}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        gestureHandling="greedy"
        disableDefaultUI={false}
        onClick={(e) => {
          if (!e.detail.latLng) return;

          onChange(
            e.detail.latLng.lat,
            e.detail.latLng.lng
          );
        }}
      >
        <Recenter lat={lat} lng={lng} />

        <AdvancedMarker
          position={{ lat, lng }}
          draggable
          onDragEnd={(e) => {
            if (!e.latLng) return;

            onChange(
              e.latLng.lat(),
              e.latLng.lng()
            );
          }}
        />
      </Map>
    </div>
  );
}