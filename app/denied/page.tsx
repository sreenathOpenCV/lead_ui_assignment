"use client";

import { motion } from 'framer-motion';

const page: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-center min-h-screen bg-gray-800 mx-2"
        >
            <div className="text-center p-8 bg-red-600 rounded-lg shadow-xl w-full">
                <h1 className="text-white text-3xl font-bold">Access Denied</h1>
                <p className="text-white mt-4">You do not have permission to view this content.</p>
            </div>
        </motion.div>
    );
};

export default page;
