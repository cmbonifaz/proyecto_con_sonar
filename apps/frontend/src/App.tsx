import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { Products } from './pages/Products';
import { Dashboard } from './pages/Dashboard';
import { Register } from './pages/Register';
import { Categories } from './pages/Categories';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={
              <ProtectedRoute requiredRole="operador"><Users /></ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute requiredRole="operador"><Categories /></ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;