import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { Dispatch, SetStateAction, useState } from "react";

import Directions from "./Directions";
import { Shelter } from "@/lib/types";

import { FaEdit, FaSave } from "react-icons/fa"; // Import the save icon from React Icons
import { useMutation } from "react-query";
import { toggleSavedShelter } from "@/lib/htpp";
import { useShelters } from "@/context/ShelterProvider";

export type Props = {
  points: Shelter[];
  setShowDirections: Dispatch<SetStateAction<boolean>>;
  showDirections: boolean;
  openId: string | null;
  setOpenId: Dispatch<SetStateAction<string | null>>;
  destination: Shelter | null;
  setDestination: Dispatch<SetStateAction<Shelter | null>>;
  handleNavigate: (point: Shelter) => void;
  setPoints: Dispatch<SetStateAction<Shelter[]>>; // Ensure this is passed correctly
};

export default function SheltersPoint({
  points,
  openId,
  setOpenId,
  destination,
  showDirections,
  setShowDirections,

  handleNavigate,
  setPoints,
}: Props) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [updatedShelter, setUpdatedShelter] = useState<Shelter | null>(null);

  const { handleUpdate } = useShelters();

  const handleEdit = (shelter: Shelter) => {
    setSelectedShelter(shelter);
    setUpdatedShelter(shelter);
    setEditModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedShelter) {
      setUpdatedShelter({
        ...updatedShelter,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    console.log(setPoints); // Check if this is a function
    if (updatedShelter) {
      setPoints((prevPoints) =>
        prevPoints.map((shelter) =>
          shelter._id === updatedShelter._id ? updatedShelter : shelter
        )
      );
      // handleUpdate(updatedShelter);
      console.log(updatedShelter, updatedShelter._id);

      setEditModalOpen(false);
    }
  };

  const { mutate } = useMutation({
    mutationFn: toggleSavedShelter,
    onSuccess: (data) => {
      console.log("Shelter toggled successfully", data);
      // Optionally update local state or refetch queries if necessary
    },
    onError: (error) => {
      console.error("Error toggling shelter save status", error);
    },
  });

  function toggelSave(point: Shelter) {
    mutate(point._id);
  }

  return (
    <>
      {points.map((point) => {
        const position = {
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
                  <div className="flex justify-between mb-2">
                    <button
                      onClick={() => handleEdit(point)}
                      className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
                    >
                      <FaEdit className="w-5 h-5" aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => toggelSave(point)}
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
                    >
                      <FaSave className="w-5 h-5" aria-hidden="true" />
                      <span>Save</span>
                    </button>
                  </div>

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
          onClose={() => setShowDirections(false)}
        />
      )}

      {/* Edit Shelter Modal */}
      {isEditModalOpen && selectedShelter && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-lg font-bold mb-4">Edit Shelter</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={updatedShelter?.address || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={updatedShelter?.capacity || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            {/* Add more fields as necessary */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
