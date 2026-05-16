// "use client";

// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";

// delete (L.Icon.Default.prototype as any)._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// type Props = {
//   lat: number;
//   lng: number;
// };

// export default function MapView({ lat, lng }: Props) {
//   return (
//     <MapContainer
//       center={[lat, lng]}
//       zoom={15}
//       scrollWheelZoom={false}
//       style={{ height: "300px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap"
//       />

//       <Marker position={[lat, lng]} />
//     </MapContainer>
//   );
// }

"use client";

import {
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

type Props = {
  lat: number;
  lng: number;
};

export default function MapView({
  lat,
  lng,
}: Props) {
  return (
    <div className="h-80 w-full rounded-xl overflow-hidden">
      <Map
        defaultCenter={{ lat, lng }}
        zoom={15}
        gestureHandling="greedy"
        disableDefaultUI={false}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
      >
        <AdvancedMarker
          position={{ lat, lng }}
        />
      </Map>
    </div>
  );
}