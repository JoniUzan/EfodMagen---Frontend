import { useShelters } from "@/context/ShelterProvider";
import { Shelter } from "@/lib/types";
import React from "react";

function ColosestShelters({
  handleNavigate,
}: {
  handleNavigate: (point: Shelter) => void;
}) {
  const { closestShelters, closestSheltersLoading, closestSheltersError } =
    useShelters();

  if (closestSheltersLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-gray-600 text-lg">Loading closest shelters...</div>
      </div>
    );
  }

  if (closestSheltersError) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="text-red-500 text-lg">Error loading closest shelters</div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 my-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Closest Shelters
      </h2>
      {closestShelters?.slice(0, 5).map((shelter) => (
        <div
          className="cursor-pointer p-4 mb-4 border rounded-lg hover:bg-gray-100 transition duration-300"
          onClick={() => handleNavigate(shelter)}
          key={shelter._id}
        >
          <p className="text-gray-700 font-medium">📍 {shelter.address}</p>
          <p className="text-gray-500">Accessibility: {shelter.accessibility ? "Yes" : "No"}</p>
          <p className="text-gray-500">Note: {shelter.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default ColosestShelters;
