import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import SheltersMap from "@/components/googleMaps/SheltersMap";
import api from "@/lib/api";

interface Shelter {
  _id: string;
  address: string;
  capacity: number;
  location: {
    type: string;
    coordinates: [number, number];
  };
  notes: string;
  accessibility: boolean;
  isPrivate: boolean;
  contact_name_and_phone_number: string;
  israeli_ID: number;
}

function FindShelter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [setShelters] = useState<Shelter[]>([]);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShelters() {
      try {
        const response = await api.get("/shelters");
        if (response.status === 200) {
          const data = await response.data;
          setShelters(data);
        } else {

          console.error("Failed to fetch shelters");
        }
      } catch (error) {
        console.error("An error occurred:", error);

      }
    }

    fetchShelters();
  }, []);

  function openModal(shelter: Shelter | null = null) {
    setSelectedShelter(shelter);
    setIsEditing(!!shelter);
    setIsOpen(true);
  }

  function closeModal() {
    setSelectedShelter(null);
    setIsEditing(false);
    setIsOpen(false);
  }

  async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const address = formData.get("address") as string;
    const capacity = parseInt(formData.get("capacity") as string, 10);
    const locationString = formData.get("location") as string;
    const [longitude, latitude] = locationString
      .split(",")
      .map((coord) => parseFloat(coord));
    const location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    const notes = formData.get("notes") as string;
    const accessibility = formData.get("accessibility") === "on";
    const isPrivate = formData.get("isPrivate") === "on";
    const contact_name_and_phone_number = formData.get(
      "contact_name_and_phone_number"
    ) as string;
    let israeli_ID = formData.get("israeli-id") as string | number;
    israeli_ID = parseInt(israeli_ID as string, 10);

    const shelterData = {
      address,
      capacity,
      location,
      notes,
      accessibility,
      isPrivate,
      contact_name_and_phone_number,
      israeli_ID,
    };

    try {
      let response;
      if (isEditing && selectedShelter) {

        // Edit existing shelter
        response = await api.put(
          `/shelters/${selectedShelter._id}`,
          shelterData
        );

      } else {
        response = await api.post("/shelters", shelterData);
      }


      if (response.status === 200) {

    
        console.log(
          isEditing
            ? "Shelter updated successfully!"
            : "Shelter added successfully!"
        );

        closeModal();
        const updatedResponse = await api.get("/shelters");
        if (updatedResponse.status === 200) {
          setShelters(await updatedResponse.data);
        }
      } else {

        console.error(
          isEditing ? "Failed to update shelter" : "Failed to add shelter"
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);

    }
  }

  return (
    <>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>}

      <button
        onClick={() => openModal()}
        className="w-full py-2 pt-32 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
      >
        Add Shelter
      </button>

      <Dialog open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white pt-28 rounded-lg shadow-lg max-w-sm w-full mx-auto p-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {isEditing ? "Edit Shelter" : "Add New Shelter"}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 mb-4">
              {isEditing
                ? "Update the details below to edit the shelter."
                : "Please fill in the details below to add a new shelter."}
            </Dialog.Description>
            <form onSubmit={handleFormSubmit} className="space-y-4">

              {[
                { id: "address", label: "Address", type: "text" },
                { id: "capacity", label: "Capacity", type: "number" },
                { id: "location", label: "Location (longitude,latitude)", type: "text" },
                { id: "notes", label: "Notes", type: "text" },
                { id: "contact_name_and_phone_number", label: "Contact Name and Phone Number", type: "text" }
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    defaultValue={isEditing ? selectedShelter?.[id as keyof Shelter] as string : ''}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={isEditing ? selectedShelter?.address : ""}
                  placeholder="Enter your address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  defaultValue={
                    isEditing ? selectedShelter?.capacity.toString() : ""
                  }
                  placeholder="Enter capacity"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location (longitude,latitude)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={
                    isEditing
                      ? selectedShelter?.location.coordinates.join(",")
                      : ""
                  }
                  placeholder="Enter longitude and latitude separated by a comma"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  defaultValue={isEditing ? selectedShelter?.notes : ""}
                  placeholder="Leave a note"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="accessibility"
                  className="block text-sm font-medium text-gray-700"
                >
                  Accessibility
                </label>
                <input
                  type="checkbox"
                  id="accessibility"
                  name="accessibility"
                  defaultChecked={
                    isEditing ? selectedShelter?.accessibility : false
                  }
                  className="mt-1 block h-4 w-4 text-red-600 border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="isPrivate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Private
                </label>
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  defaultChecked={
                    isEditing ? selectedShelter?.isPrivate : false
                  }
                  className="mt-1 block h-4 w-4 text-red-600 border-gray-300 rounded"
                />
              </div>


              <div>
                <label
                  htmlFor="contact_name_and_phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Name and Phone Number
                </label>
                <input
                  type="text"
                  id="contact_name_and_phone_number"
                  name="contact_name_and_phone_number"
                  defaultValue={
                    isEditing
                      ? selectedShelter?.contact_name_and_phone_number
                      : ""
                  }
                  placeholder="Contact name and phone number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {isEditing ? "Update Shelter" : "Register Shelter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <SheltersMap  />
    </>
  );
}

export default FindShelter;
