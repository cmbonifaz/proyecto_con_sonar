const BASE_AUTH = 'http://localhost:3000';
const BASE_PRODUCT = 'http://localhost:3001';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function authFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_AUTH}${url}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function productFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_PRODUCT}${url}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}