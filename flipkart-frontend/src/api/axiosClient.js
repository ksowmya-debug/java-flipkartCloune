import axios from 'axios';

// Create a custom Axios instance
const axiosClient = axios.create({
    // Use the production backend URL if available, otherwise default to local port 8081
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an "interceptor" to automatically attach the JWT token to every request
axiosClient.interceptors.request.use(
    (config) => {
        // Look in the browser's localStorage for a saved token
        const token = localStorage.getItem('token');
        
        // If we found a token, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
