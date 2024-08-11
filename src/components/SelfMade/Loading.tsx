import { motion } from "framer-motion";

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg relative overflow-hidden">
                <motion.img
                    src={'./src/images/Logo.jpeg'}
                    alt="EfodMagen Logo"
                    className="mx-auto mb-6 w-24 h-24 object-cover rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                <div className="relative flex items-center justify-center">
                    <motion.div
                        className="w-12 h-12 border-4 border-t-4 border-red-300 border-opacity-100 border-t-red-500 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />

                </div>
            </div>
        </div>
    );
}

export default Loading;
