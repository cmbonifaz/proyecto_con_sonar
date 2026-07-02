import type { AuthResponse, LoginPayload, RegisterPayload } from '../types';
import { authFetch } from './api';


export const login = (data: LoginPayload): Promise<AuthResponse> =>
  authFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) });

export const register = (data: RegisterPayload): Promise<AuthResponse> =>
  authFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) });

export const refresh = (userId: string, refreshToken: string): Promise<AuthResponse> =>
  authFetch('/auth/refresh', { method: 'POST', body: JSON.stringify({ userId, refreshToken }) });