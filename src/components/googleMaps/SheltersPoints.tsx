import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Directions from "./Directions";
import { Point } from "@/lib/types";

export type Props = { points: Point[] };

export default function SheltersPoint({ points }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [destination, setDestination] = useState<Point | null>(null);
  const [showDirections, setShowDirections] = useState(true);

  const handleNavigate = (point: Point) => {
    setDestination(point);
    setShowDirections(true);
    setOpenId(null); // Close the InfoWindow when navigating
  };

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
                <div className="p-2 text-sm text-gray-800">
                  <p className="mb-2 font-semibold">{point.address}</p>
                  <button
                    onClick={() => handleNavigate(point)}
                    className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Navigate
                  </button>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}

      {destination && showDirections && (
        <Directions
          destination={destination}
          onClose={() => setShowDirections(false)} // Close Directions on navigate
        />
      )}
    </>
  );
}
