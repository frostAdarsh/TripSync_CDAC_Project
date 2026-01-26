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

// 3. NEW: Connection to Booking Service (Port 8083)
export const bookingApi = axios.create({
    baseURL: 'http://localhost:8083/api',
});

// --- HELPER: Function to attach Token ---
const attachToken = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// --- APPLY INTERCEPTORS ---
// Attach the token to requests for BOTH Catalog and Booking services
catalogApi.interceptors.request.use(attachToken, (error) => Promise.reject(error));
bookingApi.interceptors.request.use(attachToken, (error) => Promise.reject(error));