import axios from 'axios';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'https://mini-ecommerce-backend-l1pc.onrender.com/api/v1';

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach token from localStorage to all requests
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    // ignore
  }

  return config;
});
