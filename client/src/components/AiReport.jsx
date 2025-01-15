import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import { getAIAnalysisByFieldName } from '../services/aiApi';

const AiReport = () => {
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

    const handleRefresh = () => {
        setFieldName('');
        setAnalysisResult(null);
        setError(null);
    };

    return (
        <div className="flex flex-col p-4 bg-slate-400">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-[2rem] font-bold mb-2 text-blue-600">Get Your AI Analysis</h1>
                <p className="text-lg text-gray-700">
                    Get insights on soil health and crop health statistics using AI technology.
                </p>
            </div>

            {/* Image Section */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
                <img
                    src="https://fdcenterprises.com/wp-content/uploads/2024/04/smart-soil.jpg"
                    alt="AI Analysis"
                    className="w-full max-w-lg rounded-lg shadow-lg"
                />
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

                {analysisResult && (
                    <div className="mt-4 text-gray-900">
                        <p className="text-lg font-medium mb-4">📊 Soil Health Data:</p>
                        <ul className="text-gray-800 list-disc pl-5 mb-4">
                            <li><strong>pH Level:</strong> {analysisResult?.analysis?.soilHealth?.phLevel}</li>
                            <li><strong>Moisture Level:</strong> {analysisResult?.analysis?.soilHealth?.moistureLevel}%</li>
                            <li><strong>Temperature:</strong> {analysisResult?.analysis?.soilHealth?.temperature}°C</li>
                            <li><strong>Nitrogen:</strong> {analysisResult?.analysis?.soilHealth?.nutrients?.nitrogen}</li>
                            <li><strong>Phosphorus:</strong> {analysisResult?.analysis?.soilHealth?.nutrients?.phosphorus}</li>
                            <li><strong>Potassium:</strong> {analysisResult?.analysis?.soilHealth?.nutrients?.potassium}</li>
                        </ul>
                        <p className="text-lg font-medium mb-4 text-gray-900">🌿 Crop Health Status:</p>
                        <p><strong>Health Status:</strong> {analysisResult?.analysis?.cropHealth?.healthStatus}</p>
                        <p><strong>Yield Estimate:</strong> {analysisResult?.analysis?.cropHealth?.yieldEstimate}%</p>
                    </div>
                )}
            </div>
            </div>
            {analysisResult && (
                <div className="bg-gradient-to-br from-blue-600 via-slate-600 to-slate-500 p-6 rounded-lg shadow-lg mb-4">
                    <h2 className="text-2xl font-semibold text-black mb-4">📖 Insights</h2>
                    <p className="text-gray-800 whitespace-pre-line">{analysisResult?.insights}</p>
                    <div className='flex justify-center gap-2'>
                    <button
                        onClick={handleRefresh}
                        className="w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 mt-4"
                    >
                        Test Again
                    </button>
                    <button
                        onClick={()=>navigate('/farmerdashboard')}
                        className="w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-green-600 mt-4"
                    >
                        Go Back
                    </button>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default AiReport;











