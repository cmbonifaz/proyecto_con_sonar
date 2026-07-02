
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';
import type { User } from '../types';


interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

    // decodificar JWT para obtener datos del usuario
    const decodeToken = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return { id: payload.sub, email: payload.email, role: payload.role };
        } catch {
            return null;
        }
    };

    useEffect(() => {
        if (token) {
            const userData = decodeToken(token);
            if (userData) setUser(userData as User);
            else { setToken(null); localStorage.removeItem('access_token'); }
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await apiLogin({ email, password });
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        setToken(res.access_token);
    };

    const register = async (data: any) => {
        const res = await apiRegister(data);
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        setToken(res.access_token);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};