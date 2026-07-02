import type { Product } from '../types';
import { productFetch } from './api';


export const getProducts = (query?: string): Promise<Product[]> =>
  productFetch(`/products${query ? `?${query}` : ''}`);

export const getProduct = (id: string): Promise<Product> => productFetch(`/products/${id}`);

export const createProduct = (data: Omit<Product, 'id'>): Promise<Product> =>
  productFetch('/products', { method: 'POST', body: JSON.stringify(data) });

export const updateProduct = (id: string, data: Partial<Product>): Promise<Product> =>
  productFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteProduct = (id: string): Promise<void> =>
  productFetch(`/products/${id}`, { method: 'DELETE' });