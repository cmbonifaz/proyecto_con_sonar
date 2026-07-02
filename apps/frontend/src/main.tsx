import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tema visual de PrimeReact (puedes cambiar el tema)
import 'primereact/resources/themes/lara-light-blue/theme.css';

// Core CSS de PrimeReact (a veces incluido en el tema, pero se recomienda)
import 'primereact/resources/primereact.min.css';

// Iconos
import 'primeicons/primeicons.css';

// Utilidades de espaciado y flex (opcional pero muy útil)
import 'primeflex/primeflex.css';

// Tus estilos globales (si los tienes)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);