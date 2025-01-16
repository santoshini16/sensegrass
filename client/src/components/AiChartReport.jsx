import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, CartesianGrid, Tooltip, Legend, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { getAIAnalysisByFieldName } from '../services/aiApi';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#4A90E2', '#50E3C2', '#F5A623'];
const HEALTH_STATUS_COLORS = { Optimal: '#50E3C2', Moderate: '#F5A623', Poor: '#E94E77' };
const ENVIRONMENTAL_COLORS = { 'pH Level': '#4A90E2', 'Moisture Level': '#50E3C2', 'Temperature': '#F5A623' };
const YIELD_ESTIMATE_COLORS = ['#4A90E2', '#50E3C2', '#F5A623'];

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
            console.log('result chart:', result);
        } catch (err) {
            setError(err.message || 'Failed to fetch AI analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const soilHealthData = analysisResult?.analysis?.soilHealth || {};
    const cropHealthData = analysisResult?.analysis?.cropHealth || {};

    const nutrientsData = soilHealthData.nutrients ? Object.entries(soilHealthData.nutrients).map(([key, value]) => ({
        name: key,
        value,
    })) : [];

    const environmentalData = [
        { name: 'pH Level', value: soilHealthData.phLevel || 0 },
        { name: 'Moisture Level', value: soilHealthData.moistureLevel || 0 },
        { name: 'Temperature', value: soilHealthData.temperature || 0 }
    ];

    const healthStatusData = [
        { name: cropHealthData.healthStatus || 'Unknown', value: 100 }
    ];

    const yieldEstimateData = [
        { name: 'Yield Estimate', value: cropHealthData.yieldEstimate || 0 }
    ];

    return (
        <div className="flex flex-col justify-center p-8">
            <div className=" rounded-lg p-8 shadow-2xlv">
                <h2 className="text-2xl font-semibold text-white text-center mb-4">Soil & Crop Health Data</h2>
                {!analysisResult && (
                    <>
                       <div className='bg-gradient-to-br from-blue-600 via-slate-600 to-slate-500 flex flex-col justify-center items-center m-auto w-[400px] p-10 border rounded-lg shadow-xl'>
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
                       </div>
                    </>
                )}
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>

            {analysisResult && (
                <>
                 <button
                            onClick={() => navigate('/farmerdashboard')}
                            className=" absolute top-10 right-12 p-3 rounded-lg bg-transparent border text-white font-semibold hover:bg-green-600 mt-4"
                        >
                            Go Back
                        </button>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
                >
                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Health Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={healthStatusData} dataKey="value" nameKey="name" outerRadius={120}>
                                    {healthStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={HEALTH_STATUS_COLORS[entry.name] || '#8884d8'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Environmental Factors</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={environmentalData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value">
                                    {environmentalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={ENVIRONMENTAL_COLORS[entry.name]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Nutrients Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={nutrientsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#4A90E2" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-5">
                        <h3 className="text-lg font-semibold mb-4">Yield Estimate</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={yieldEstimateData} dataKey="value" nameKey="name" outerRadius={120}>
                                    {yieldEstimateData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={YIELD_ESTIMATE_COLORS[index % YIELD_ESTIMATE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
                </>
            )}
        </div>
    );
};

export default AiChartReport;










