import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { getAIAnalysisByFieldName } from '../services/aiApi';
import { useNavigate } from 'react-router-dom';
// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, LineElement, PointElement);

const AiChartReport = () => {
    const [fieldName, setFieldName] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setFieldName(e.target.value);
    };

    const handleSubmit = async () => {
        if (!fieldName.trim()) {
            setError('Please enter a valid field name.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await getAIAnalysisByFieldName(fieldName);
            setAnalysisResult(result);
            console.log('Analysis Result:', result);
        } catch (err) {
            setError(err.message || 'Failed to fetch AI analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };
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
            <div className='flex flex-col justify-center p-4'>
                <div className="bg-gradient-to-br from-blue-600 via-slate-600 to-slate-500 rounded-lg p-8 shadow-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Soil & Crop Health Data</h2>
                {!analysisResult && (
                    <>
                        <input
                            type="text"
                            value={fieldName}
                            onChange={handleInputChange}
                            placeholder="Enter field name"
                            className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full p-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                        >
                            {loading ? 'Analyzing...' : 'Generate AI Analysis'}
                        </button>
                        <button
                        onClick={()=>navigate('/farmerdashboard')}
                        className="w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 mt-4"
                    >
                        Go Back
                      </button>
                    </>
                )}

                {error && <p className="text-red-500 mt-3">{error}</p>}
                  
                 </div>
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
            </div>
        
    );
};

export default AiChartReport;





