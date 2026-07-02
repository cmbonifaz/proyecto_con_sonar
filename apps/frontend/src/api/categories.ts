import type { Category } from '../types';
import { productFetch } from './api';


export const getCategories = (): Promise<Category[]> => productFetch('/categories');

export const createCategory = (data: { name: string; description?: string }): Promise<Category> =>
  productFetch('/categories', { method: 'POST', body: JSON.stringify(data) });

export const updateCategory = (id: string, data: Partial<Category>): Promise<Category> =>
  productFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteCategory = (id: string): Promise<void> =>
  productFetch(`/categories/${id}`, { method: 'DELETE' });