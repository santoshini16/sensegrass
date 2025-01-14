import React, { useState } from 'react';
import { getAIAnalysisByFieldName } from '../services/aiApi';
import AiChartReport from './AiChartReport';

const AiReport = () => {
    const [fieldName, setFieldName] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        <div className="flex flex-col md:flex-row min-h-screen p-10 -mt-28">
            <div className="flex-1 flex items-center justify-center">
                <img 
                    src="https://fdcenterprises.com/wp-content/uploads/2024/04/smart-soil.jpg" 
                    alt="AI Analysis" 
                    className="w-full max-w-md rounded-lg shadow-lg md:max-w-lg lg:max-w-xl" 
                />
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-600">Get Your AI Analysis</h1>
                <p className="text-lg mb-6 text-gray-700">
                    Get insights on soil health and crop health statistics using AI technology.
                </p>

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
                            className={`w-full p-3 rounded-lg text-white font-semibold ${
                                loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {loading ? 'Analyzing...' : 'Generate AI Analysis'}
                        </button>
                    </>
                )}

                {error && <p className="text-red-500 mt-3">{error}</p>}

                {analysisResult && (
                    <>
                        <AiChartReport analysisResult={analysisResult} />
                        <button
                            onClick={handleRefresh}
                            className="mt-2 w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
                        >
                            Test Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AiReport;







