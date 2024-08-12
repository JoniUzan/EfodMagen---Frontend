import { getUserShelters, toggleSavedShelter } from "@/lib/htpp";
import React from "react";
import { useQuery, useMutation } from "react-query";
import { motion } from "framer-motion";
import { FaSave } from "react-icons/fa"; // Import the save icon from React Icons

function MyShelters() {
  const {
    data: shelters,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-shelters"],
    queryFn: getUserShelters,
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-4">
        Error: {error.message}
      </div>
    );
  }

  if (!shelters || shelters.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-4">No shelters saved.</div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1, // Staggered animation for each card
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  function toggleSave(shelterId) {
    mutate(shelterId);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-800 py-6">
        My Saved Shelters
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shelters.map((shelter, index) => (
          <motion.div
            key={shelter._id}
            className="bg-white border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            animate="visible"
            custom={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }} // Slight scale-up on hover
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {shelter.address}
            </h2>
            <p className="text-gray-600 mb-1">Capacity: {shelter.capacity}</p>
            <p className="text-gray-600 mb-1">
              Accessibility: {shelter.accessibility ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-4">Notes: {shelter.notes}</p>
            <button
              onClick={() => toggleSave(shelter._id)}
              className="w-full bg-green-600 text-white font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition duration-300"
            >
              <FaSave className="w-5 h-5" aria-hidden="true" />
              <span>Toggle Save</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MyShelters;
