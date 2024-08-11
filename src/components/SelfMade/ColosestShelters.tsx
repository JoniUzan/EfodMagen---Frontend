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

  console.log(closestShelters);

  if (closestSheltersLoading) {
    return <div>Loading closest shelters...</div>;
  }

  if (closestSheltersError) {
    return <div>Error loading closest shelters</div>;
  }

  return (
    <div>
      {closestShelters?.map((shelter) => (
        <div className="" onClick={() => handleNavigate(shelter)} key={shelter._id}>
          <p>Address: {shelter.address}</p>
          <p>Accessibility: {shelter.accessibility}</p>
          <p>Note: {shelter.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default ColosestShelters;
