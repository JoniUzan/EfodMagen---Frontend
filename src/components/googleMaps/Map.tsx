import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { googleApiKey } from "@/lib/googleApiKey";
import { useShelters } from "@/context/ShelterProvider";
import SheltersPoint from "./SheltersPoints";

export default function Intro() {
  const { shelters } = useShelters();

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
        // Fallback to a default location if geolocation fails
        setPosition({ lat: 32.109333, lng: 34.855499 });
      }
    );
  }, []);

  if (!position) {
    // Optionally, you can return a loading indicator while the location is being fetched
    return <div>Loading...</div>;
  }

  return (
    <APIProvider apiKey={googleApiKey}>
      <div style={{ height: "80vh", width: "80%" }}>
        <Map
          defaultZoom={13}
          defaultCenter={position}
          mapId={"aa21e74a7cd52a60"}
          fullscreenControl={false}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker>
          {open && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpen(false)}
            ></InfoWindow>
          )}
          <SheltersPoint points={shelters} />
        </Map>
      </div>
    </APIProvider>
  );
}
