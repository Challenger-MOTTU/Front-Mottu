import axios from 'axios';

const api = axios.create({
  baseURL: 'https://java-mottu.onrender.com', // sua API
  timeout: 100000,
});

export default api;
