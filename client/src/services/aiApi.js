// services/aiApi.js
import axios from 'axios';

const API_URL = 'https://sensegrass-69dv.onrender.com/api/ai';

// Generate AI insights by field name
export const generateAIAnalysis = async (fieldName) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, { fieldName });
        return response.data;
    } catch (error) {
        console.error('Error calling AI analysis API:', error);
        throw error;
    }
};

export const getAIAnalysisByFieldName = async (fieldName) => {
    try {
        const response = await axios.get(`${API_URL}/results/${fieldName}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching AI analysis:', error);
        throw error;
    }
};
