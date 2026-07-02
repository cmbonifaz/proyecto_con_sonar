import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react/jsx-runtime';

interface Props {
    children: JSX.Element;
    requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: Props) => {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;
    return children;
};