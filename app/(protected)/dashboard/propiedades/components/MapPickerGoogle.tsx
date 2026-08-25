"use client";

// import {
//   AdvancedMarker,
//   Map,
//   useMap,
// } from "@vis.gl/react-google-maps";

type Props = {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
};

export default function MapPicker({
  lat,
  lng,
  onChange,
}: Props) {
  // return (
  //   <div className="h-100 w-full rounded-xl overflow-hidden">
  //     <Map
  //       defaultZoom={16}
  //       defaultCenter={{ lat, lng }}
  //       mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
  //       gestureHandling="greedy"
  //       disableDefaultUI={false}
  //       onClick={(e) => {
  //         if (!e.detail.latLng) return;
  //         onChange(e.detail.latLng.lat, e.detail.latLng.lng);
  //       }}
  //     >
  //       <AdvancedMarker
  //         position={{ lat, lng }}
  //         draggable
  //         onDragEnd={(e) => {
  //           if (!e.latLng) return;
  //           onChange(e.latLng.lat(), e.latLng.lng());
  //         }}
  //       />
  //     </Map>
  //   </div>
  // );
  return (
    <div className="flex h-100 w-full items-center justify-center rounded-xl bg-gray-100 text-gray-500">
      Mapa temporalmente desactivado
    </div>
  );
}