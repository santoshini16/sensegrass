import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ title, description, position }) => {
    return (
        <motion.div
            className={`hidden md:block absolute w-64 p-4 rounded-2xl shadow-lg bg-gray-600 text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={position}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm mt-2">{description}</p>
        </motion.div>
    );
};

const ImageWithCards = () => {
    return (
        <div className="relative flex items-center justify-center -mt-20">
            {/* Central Image */}
            <img
                src="https://static.vecteezy.com/system/resources/previews/031/696/054/non_2x/sprawling-agricultural-farm-featuring-fields-of-crops-ai-generated-photo.jpg"
                alt="Central Map"
                className=" w-[90%] md:w-[60%] h-auto rounded-lg shadow-2xl"
            />

            {/* Animated Info Cards */}
            <InfoCard
                title="Early Crop Growth Detector"
                description="Designed to monitor early crop growth stages, minimizing soil interference and providing clear insights even when plants are just sprouting."
                position={{ top: '2%', left: '10%' }}
            />
            <InfoCard
                title="Bare Soil and Erosion Detector"
                description="This tool identifies areas with exposed soil, helping farmers implement erosion control and prepare fields for planting."
                position={{ top: '12%', right: '10%' }}
            />
            <InfoCard
                title="Salinity Index for Soil Health Management"
                description="Soil salinity can reduce crop productivity and lead to long-term degradation if left unchecked."
                position={{ bottom: '8%', left: '10%' }}
            />
            <InfoCard
                title="Flood & Waterlogging Monitor"
                description="Managing excess water is crucial to prevent crop losses due to waterlogging. This tool monitors soil and plant water levels, helping farmers take action to improve drainage before damage occurs."
                position={{ bottom: '2%', right: '10%' }}
            />
        </div>
    );
};

export default ImageWithCards;
