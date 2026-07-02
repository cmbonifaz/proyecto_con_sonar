import type { User } from '../types';
import { authFetch } from './api';


export const getUsers = (): Promise<User[]> => authFetch('/users');

export const getUser = (id: string): Promise<User> => authFetch(`/users/${id}`);

export const createUser = (data: Partial<User> & { password?: string }): Promise<User> =>
  authFetch('/users', { method: 'POST', body: JSON.stringify(data) });

export const updateUser = (id: string, data: Partial<User>): Promise<User> =>
  authFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteUser = (id: string): Promise<void> =>
  authFetch(`/users/${id}`, { method: 'DELETE' });