export interface User {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  email: string;
  role: "cliente" | "operador";
  isVerified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nombres: string;
  apellidos: string;
  dni: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  costPrice?: number;
  stockExact?: number;
  imageUrl?: string;
  categoryId: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  products?: Product[];
}
