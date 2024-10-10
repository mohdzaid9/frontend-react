import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API base URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
