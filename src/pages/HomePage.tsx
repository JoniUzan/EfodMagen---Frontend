import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BgImage from "../images/BackGroundImage.jpeg";
import CallForActionImage from "../images/CallForActionImage.jpeg";
import Loading from "../components/SelfMade/Loading";
import FirstGIF from "../images/location.gif";
import SecondGIF from "../images/user.gif";
import ThirdGIF from "../images/around-the-world.gif";
import Map from "../components/googleMaps/Map";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-sans"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-cover bg-center mt-16 py-12 text-white overflow-hidden sm:py-24"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${BgImage})`, opacity: 0.9 }} // Increased opacity
        ></motion.div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
            >
              Discover Safe Shelters Nearby with EfodMagen
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-base sm:text-lg mb-6 leading-relaxed"
            >
              EfodMagen helps you find shelters closest to you quickly and easily. Whether you're in an emergency or seeking a safe haven, our app provides real-time information on nearby shelters.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col items-center space-y-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/shelters"
                className="bg-blue-500 text-2xl sm:text-4xl text-white hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition duration-300 ease-in-out font-semibold"
              >
                Add Shelter
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 sm:py-24 bg-primary dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-lg sm:max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-12 text-black"
            >
              Why Choose EfodMagen?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8"
            >
              {[
                {
                  title: "Nearby Shelters",
                  description:
                    "Effortlessly locate shelters near your current location for quick and reliable assistance.",
                  icon: (
                    <div className="flex flex-col items-center">
                      <img
                        src={FirstGIF}
                        alt="Nearby Shelters"
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-2"
                      />
                    </div>
                  ),
                },
                {
                  title: "Real-Time Updates",
                  description:
                    "Get the latest information on shelter availability and updates in real-time.",
                  icon: (
                    <div className="flex flex-col items-center">
                      <img
                        src={ThirdGIF}
                        alt="Real-Time Updates"
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-2"
                      />
                    </div>
                  ),
                },
                {
                  title: "Verified Shelters",
                  description:
                    "Only verified shelters are listed, ensuring you receive accurate and safe information.",
                  icon: (
                    <div className="flex flex-col items-center">
                      <img
                        src={SecondGIF}
                        alt="Verified Shelters"
                        className="w-20 h-20 sm:w-24 sm:h-24 mb-2"
                      />
                    </div>
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card dark:bg-primary p-6 sm:p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    viewport={{ once: true }}
                    className="mb-4"
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-lg sm:text-xl text-card-foreground dark:text-white font-bold mb-4"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-base text-card-foreground dark:text-gray-200"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Shelters Section */}


      <div className="relative p-6 mx-auto max-w-full ">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-6xl font-extrabold text-red-900 my-6"
        >
          All Shelters In Israel
        </motion.h1>
        <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden m-auto max-w-[750px] p-6 my-5 ">

          <Map />
        </div>
      </div>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cover bg-center py-12 sm:py-24 text-white overflow-hidden"
        style={{ backgroundImage: `url(${CallForActionImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl mb-8"
          >
            Join us in ensuring safety and support for those in need. Contribute by adding shelters or spreading the word about EfodMagen.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contribute"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Contribute Now
          </motion.a>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default HomePage;
