import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AiChartReport = ({ analysisResult }) => {
    const soilHealthData = analysisResult[0]?.soilHealth || {};
    const cropHealthData = analysisResult[0]?.cropHealth || {};

    // Data for Bar Chart
    const barData = {
        labels: ['pH Level', 'Moisture Level', 'Temperature'],
        datasets: [
            {
                label: 'Soil Health',
                data: [
                    soilHealthData.phLevel,
                    soilHealthData.moistureLevel,
                    soilHealthData.temperature
                ],
                backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
                borderColor: ['#3b8de3', '#34a39f', '#f28c00'],
                borderWidth: 2,
            },
        ],
    };

    // Data for Pie Chart
    const pieData = {
        labels: ['Healthy', 'Unhealthy'],
        datasets: [
            {
                data: cropHealthData.healthStatus === 'Healthy' ? [1, 0] : [0, 1],
                backgroundColor: ['#7ED321', '#D0021B'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-around p-10 space-y-8 md:space-y-0 md:space-x-8"
        >
            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Soil Health Overview</h2>
                <div className="relative w-full h-64">
                    <Bar data={barData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Soil Health Metrics'
                            }
                        }
                    }} />
                </div>
            </div>

            <div className="w-full md:w-1/2 p-5">
                <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Crop Health Status</h2>
                <div className="relative w-full h-64">
                    <Pie data={pieData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Crop Health Distribution'
                            }
                        }
                    }} />
                </div>
            </div>
        </motion.div>
    );
};

export default AiChartReport;

