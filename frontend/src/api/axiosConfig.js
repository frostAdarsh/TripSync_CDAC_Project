import axios from 'axios';

// 1. Connection to Auth Service (Port 8081)
export const authApi = axios.create({
    baseURL: 'http://localhost:8081/api/auth',
    headers: { 'Content-Type': 'application/json' }
});

// 2. Connection to Catalog Service (Port 8082)
export const catalogApi = axios.create({
    baseURL: 'http://localhost:8082/api',
});

// 3. Interceptor: Automatically attach the Token to requests
catalogApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);