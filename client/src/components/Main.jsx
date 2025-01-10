import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const Main = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: window.devicePixelRatio,  // Dynamically setting based on the device
      width: window.innerWidth,  // Set the width dynamically
      height: window.innerHeight,  // Set the height dynamically
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="bg-transparent overflow-hidden border border-gray-600 p-4 rounded-lg shadow-inner h-[60%] w-[75%] flex flex-col items-center justify-center relative">
      <div className="text-center mb-6 z-10">
        <h1 className="text-2xl font-bold text-white">
        Agricultural Companion tailored for Farmers.
        </h1>
        <p className="text-gray-300 mt-2">
        We provide an innovative platform dedicated to enhancing agricultural productivity and sustainability for farmers.
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Free Consultation
        </button>
        <p className="mt-4 text-gray-500">
        Empowering Farmers with Expertise, Insights, and Innovation
        </p>
      </div>
      
      <div className="absolute top-0 -right-[28rem] w-full h-[500px] overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "97%", display: "block" }}
          className={className}
        />
      </div>
    </div>
  );
};

export default Main;


