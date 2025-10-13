import api from "@/lib/axios";
import type { LoginData, LoginResponse } from "@/types/index";

// Servicio de login
export const login = async (loginData: LoginData) => {
    const response = await api.post('/auth/login', loginData);
    return response.data;
};

// Función helper para guardar el token
export const saveToken = (token: string): void => {
    localStorage.setItem('token', token);
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Login automático para desarrollo
export const quickLogin = async (): Promise<LoginResponse> => {
    try {
        const loginData: LoginData = {
            email: 'admin@blockchain.com',
            password: 'admin123'
        };
        
        console.log('🔐 Haciendo login automático...');
        const response = await login(loginData);
        
        if (response.success && response.data.token) {
            saveToken(response.data.token);
            console.log('✅ Login exitoso:', response.data);
            return response;
        } else {
            throw new Error(`Login falló: ${response.message || 'Error desconocido'}`);
        }
    } catch (error: any) {
        console.error('❌ Error en login:', error);
        throw error;
    }
};