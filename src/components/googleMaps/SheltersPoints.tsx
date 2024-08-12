import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { Dispatch, SetStateAction, useState } from "react";
import { Dispatch, SetStateAction, useState } from "react";
import Directions from "./Directions";
import { Shelter } from "@/lib/types";
import { FaSave } from 'react-icons/fa'; // Import the save icon from React Icons


export type Props = {
  points: Shelter[];
  setShowDirections: Dispatch<SetStateAction<boolean>>;
  showDirections: boolean;
  openId: string | null;
  setOpenId: Dispatch<SetStateAction<string | null>>;
  destination: Shelter | null;
  setDestination: Dispatch<SetStateAction<Shelter | null>>;
  handleNavigate: (point: Shelter) => void;
};

export default function SheltersPoint({
  points,
  openId,
  setOpenId,
  destination,
  showDirections,
  setShowDirections,
  setDestination,
  handleNavigate,
}: Props) {
export type Props = {
  points: Shelter[];
  setShowDirections: Dispatch<SetStateAction<boolean>>;
  showDirections: boolean;
  openId: string | null;
  setOpenId: Dispatch<SetStateAction<string | null>>;
  destination: Shelter | null;
  setDestination: Dispatch<SetStateAction<Shelter | null>>;
  handleNavigate: (point: Shelter) => void;
};

export default function SheltersPoint({
  points,
  openId,
  setOpenId,
  destination,
  showDirections,
  setShowDirections,
  setDestination,
  handleNavigate,
}: Props) {
  return (
    <>
      {points.map((point) => {
        const position = {
          lat: point.location.coordinates[1],
          lng: point.location.coordinates[0],
          lat: point.location.coordinates[1],
          lng: point.location.coordinates[0],
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
                  <button
                    onClick={() => handleNavigate(point)}
                    className="w-8 relative bottom-3 mt-6 bg-green-600 text-white font-bold py-2 rounded-lg m-auto hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaSave className="w-5 h-5" aria-hidden="true" /> {/* Add the icon */}
                    {/* Button text */}
                  </button>
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
