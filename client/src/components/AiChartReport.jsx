import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, LineElement, PointElement);

const AiChartReport = ({ analysisResult }) => {
    const soilHealthData = analysisResult?.[0]?.soilHealth || null;
    const cropHealthData = analysisResult?.[0]?.cropHealth || null;

    if (!soilHealthData || !cropHealthData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row justify-around p-10 space-y-8 md:space-y-0 md:space-x-8"
            >
                <div className="w-full md:w-1/2 p-5">
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Soil Health Overview</h2>
                    <div className="relative w-full h-64 bg-gray-200 flex justify-center items-center">
                        <span className="text-gray-600">No data available for Soil Health</span>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-5">
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Soil Health Over Time</h2>
                    <div className="relative w-full h-64 bg-gray-200 flex justify-center items-center">
                        <span className="text-gray-600">No data available for Soil Health Over Time</span>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-5">
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Crop Health Status</h2>
                    <div className="relative w-full h-64 bg-gray-200 flex justify-center items-center">
                        <span className="text-gray-600">No data available for Crop Health Status</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Data for Soil Health Bar Chart
    const barData = {
        labels: ['pH Level', 'Moisture Level', 'Temperature'],
        datasets: [
            {
                label: 'Soil Health',
                data: [
                    soilHealthData.phLevel,
                    soilHealthData.moistureLevel,
                    soilHealthData.temperature,
                ],
                backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
                borderColor: ['#3b8de3', '#34a39f', '#f28c00'],
                borderWidth: 2,
            },
        ],
    };

    // Data for Soil Health Line Chart
    const lineData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Soil Health Over Time',
                data: [soilHealthData.phLevel, soilHealthData.moistureLevel, soilHealthData.temperature],
                borderColor: '#F5A623',
                backgroundColor: 'rgba(245, 166, 35, 0.2)',
                fill: true,
            },
        ],
    };

    // Data for Crop Health Pie Chart
    const pieData = {
        labels: ['Optimal', 'Moderate', 'Poor'],
        datasets: [
            {
                data: [
                    cropHealthData.healthStatus === 'Optimal' ? 1 : 0,
                    cropHealthData.healthStatus === 'Moderate' ? 1 : 0,
                    cropHealthData.healthStatus === 'Poor' ? 1 : 0,
                ],
                backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336'],
                borderWidth: 0,
            },
        ],
    };

    // Crop Yield Chart Data
    const yieldData = {
        labels: ['Optimal', 'Moderate', 'Poor'],
        datasets: [
            {
                label: 'Estimated Crop Yield',
                data: [
                    cropHealthData.healthStatus === 'Optimal' ? 90 : cropHealthData.healthStatus === 'Moderate' ? 65 : 40,
                ],
                backgroundColor: ['#7ED321', '#F5A623', '#D0021B'],
                borderColor: ['#4CAF50', '#FFC107', '#F44336'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-around p-1 space-y-8 md:space-y-0 md:space-x-8"
        >
            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Soil Health Overview</h2>
                <div className="relative w-full h-64">
                    <Bar data={barData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Soil Health Metrics' }
                        }
                    }} />
                </div>
            </div>

            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Soil Health Over Time</h2>
                <div className="relative w-full h-64">
                    <Line data={lineData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Soil Health Over Time' }
                        }
                    }} />
                </div>
            </div>

            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Crop Health Status</h2>
                <div className="relative w-full h-64">
                    <Pie data={pieData} options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Crop Health Status' }
                        }
                    }} />
                </div>
            </div>

            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Crop Yield</h2>
                <div className="relative w-full h-64">
                    <Bar data={yieldData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Estimated Crop Yield' }
                        }
                    }} />
                </div>
            </div>
        </motion.div>
    );
};

export default AiChartReport;





