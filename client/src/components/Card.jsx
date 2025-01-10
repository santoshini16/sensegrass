import React from 'react';
import { BackgroundGradient } from "../components/ui/background-gradient";

const cardData = [
  {
    title: "YieldSync",
    subtitle: "Precision Agriculture, Perfectly Timed",
    description: "YieldSync uses GeoAI to convert satellite data and advanced indices into actionable crop insights from germination to yield optimization. With precision mapping and seasonal evaluations, it supports data-driven decisions for optimal input use and sustainable practices, maximizing farm potential."
  },
  {
    title: "TerrainSync",
    subtitle: "Monitoring Ecosystems, Empowering Sustainability",
    description: "TerrainSync utilizes GeoAI and satellite data to deliver real-time insights into habitat health, biodiversity, and environmental shifts. Equipped for ecosystem monitoring, restoration, and desertification tracking, it enables data-driven decisions that support resilient landscapes and ecological balance."
  },
  {
    title: "UrbanSync",
    subtitle: "Thriving Cities, Driving Resilience",
    description: "UrbanSync harnesses GeoAI and real-time data to monitor urban landscapes, offering insights for green space management, air quality tracking, flood risk mapping, and more. Tailored for modern city challenges, it enables informed decisions to enhance livability, reduce risks, and boost resilience, equipping users with tools to shape sustainable, future-ready cities."
  }
];

const Card = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      
      {cardData.map((item, index) => (
        <BackgroundGradient
          key={index}
          className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
        >
          <h2 className="text-2xl font-bold text-black dark:text-neutral-200">
            {item.title}
          </h2>
          <p className="text-base sm:text-xl text-black mt-2 mb-2 dark:text-neutral-200">
            {item.subtitle}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {item.description}
          </p>
        </BackgroundGradient>
      ))}
    </div>
  );
};

export default Card;
