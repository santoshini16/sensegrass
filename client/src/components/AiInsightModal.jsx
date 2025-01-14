import React, { useState } from 'react';
import { generateAIAnalysis } from '../services/aiApi';

const AiInsightModal = ({ isOpen, onClose }) => {
    const [fieldName, setFieldName] = useState('');
    const [aiResult, setAiResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateAIAnalysis(fieldName);
            setAiResult(result);
            console.log(result)
        } catch (error) {
            console.error('Error fetching AI insights:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black bg-opacity-30">
            <div className="p-6 rounded-lg bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">AI Insight Analysis</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Field Name"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        className="p-2 w-full border border-gray-300 rounded-lg mb-4"
                        required
                    />
                    <div className='mt-2 flex justify-around items-center'>
                    <button
                        type="submit"
                        className=" text-white p-2 "
                    >
                        Submit
                    </button>
                    <button
                    className=" text-white p-2 "
                    onClick={onClose}
                >
                    Close
                </button>
                </div> 
                </form> 
            </div>
        </div>
    );
};

export default AiInsightModal;
