import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Redirigir al login si es necesario
            console.warn('Token expirado o inválido');
        }
        return Promise.reject(error);
    }
);

export default api;
