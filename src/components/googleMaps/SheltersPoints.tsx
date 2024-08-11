import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";

import { useState } from "react";
import Directions from "./Directions";
import { Point } from "@/lib/types";

export type Props = { points: Point[] };

export default function SheltersPoint({ points }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [destination, setDestination] = useState<Point | null>(null);

  return (
    <>
      {points.map((point) => {
        const position = {
          lat: point.coordinates.latitude,
          lng: point.coordinates.longitude,
        };

        return (
          <div key={point._id}>
            <AdvancedMarker
              position={position}
              onClick={() => setOpenId(point._id)}
            >
              <Pin />
            </AdvancedMarker>
            {openId === point._id && (
              <InfoWindow
                position={position}
                onCloseClick={() => setOpenId(null)}
              >
                <div>
                  <p>{point.address}</p>
                  <button onClick={() => setDestination(point)}>
                    Navigate
                  </button>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}

      {destination && <Directions destination={destination} />}
    </>
  );
}