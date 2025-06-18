// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5049', // your .NET backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
