import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, CartesianGrid, Tooltip, Legend, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { getAIAnalysisByFieldName } from '../services/aiApi';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#4A90E2', '#50E3C2', '#F5A623'];

const AiChartReport = () => {
    const [fieldName, setFieldName] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => setFieldName(e.target.value);

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
        } catch (err) {
            setError(err.message || 'Failed to fetch AI analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const soilHealthData = analysisResult?.[0]?.analysis?.soilHealth || {};
    const cropHealthData = analysisResult?.[0]?.analysis?.cropHealth || {};

    const soilData = [
        { name: 'Nutrients', value: soilHealthData.nutrients || 0 },
        { name: 'pH Level', value: soilHealthData.phLevel || 0 },
        { name: 'Moisture', value: soilHealthData.moistureLevel || 0 },
        { name: 'Temperature', value: soilHealthData.temperature || 0 },
    ];

    const cropData = [
        { name: 'Yield Status', value: cropHealthData.yield || 0 },
        { name: 'Health Status', value: cropHealthData.healthStatus || 0 },
    ];

    return (
        <div className="flex flex-col justify-center p-8">
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
                            onClick={() => navigate('/farmerdashboard')}
                            className="w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 mt-4"
                        >
                            Go Back
                        </button>
                    </>
                )}
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>

            {analysisResult && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
                >
                    {/* Soil Health Bar Chart */}
                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Soil Health Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={soilData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#4A90E2" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Crop Health Pie Chart */}
                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Crop Health Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={cropData} dataKey="value" nameKey="name" outerRadius={120}>
                                    {COLORS.map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Soil Health Line Chart */}
                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Soil Health Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={soilData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#F5A623" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AiChartReport;






