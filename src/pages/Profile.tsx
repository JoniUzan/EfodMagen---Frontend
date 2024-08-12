import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Profile() {
  const { loggedInUser } = useAuth();
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, delay: 0.2 },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.4 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, delay: 0.6 },
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-96"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center"
          variants={avatarVariants}
        >
          <Avatar className="mb-4">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={loggedInUser.firstName + " " + loggedInUser.lastName}
              className="rounded-full"
            />
            <AvatarFallback className="text-2xl bg-gray-300">
              {loggedInUser.firstName[0]}
              {loggedInUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <motion.h2
            className="text-2xl font-semibold text-gray-800"
            variants={textVariants}
          >
            {loggedInUser.firstName} {loggedInUser.lastName}
          </motion.h2>
          <motion.p className="text-gray-500" variants={textVariants}>
            {loggedInUser.email}
          </motion.p>
        </motion.div>
        <motion.div className="mt-6" variants={textVariants}>
          <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
            My Shelters:
          </h2>
          {/* {loggedInUser.saved_shelters.map(shelter => (
            <div key={shelter._id} className="mb-4">
              <p className="text-gray-700 font-medium">{shelter.address}</p>
              <p className="text-gray-500">{shelter.accessibility}</p>
              <p className="text-gray-400">{shelter.notes}</p>
            </div>
          ))} */}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
