import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://calculadora-terraco-backend.onrender.com';

export const getCalculationOptions = async () => {
  const response = await axios.get(`${API_URL}/api/options/`);
  return response.data;
};

export const calculateTerraces = async (data) => {
  const response = await axios.post(`${API_URL}/api/calculate/`, data);
  return response.data;
};

export const generateReport = async (data) => {
  const response = await axios.post(`${API_URL}/api/report/`, data, {
    responseType: 'blob'
  });
  return response.data;
};