// services/fieldApi.js
import axios from 'axios';

const API_URL = 'https://sensegrass-69dv.onrender.com/api/fields';

export const createField = async (fieldData) => {
    const response = await axios.post(API_URL, fieldData);
    return response.data;
};

export const getAllFields = async () => {
    const response = await axios.get(API_URL);
    console.log(response)
    return response.data;
};

export const updateField = async (id, fieldData) => {
    const response = await axios.put(`${API_URL}/${id}`, fieldData);
    return response.data;
};

export const deleteField = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
