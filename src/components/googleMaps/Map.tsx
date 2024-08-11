import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useShelters } from "@/components/context/ShelterProvider";
import SheltersPoint from "./SheltersPoints";
import { googleApiKey } from "@/lib/googleApiKey";

export default function Intro() {
  const { shelters } = useShelters();

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
        setPosition({ lat: 32.109333, lng: 34.855499 });
      }
    );
  }, []);

  if (!position) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={googleApiKey}>
      <div className="relative h-[80vh] w-[80%] mx-auto rounded-lg shadow-lg overflow-hidden">
        <Map
          defaultZoom={13}
          defaultCenter={position}
          mapId={"aa21e74a7cd52a60"}
          fullscreenControl={false}
          className="h-full w-full"
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={"#ffa500"} />
            {/* Blue color pin */}
          </AdvancedMarker>
          {open && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpen(false)}
            >
              <div className="text-sm">
                You are here
              </div>
            </InfoWindow>
          )}
          <SheltersPoint points={shelters} />
        </Map>
      </div>
    </APIProvider>
  );
}