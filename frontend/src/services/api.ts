import axios from 'axios';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? 'https://mini-ecommerce-backend-l1pc.onrender.com/api/v1';

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
