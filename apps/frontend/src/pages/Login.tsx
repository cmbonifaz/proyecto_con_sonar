import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Sesión iniciada' });
      navigate('/');
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas' });
    }
  };

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <Card title="Iniciar Sesión" className="w-30rem">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask />
          </div>
          <Button label="Entrar" type="submit" />
        </form>
        <div className="mt-3">
          <Button label="Registrarse" className="p-button-link" onClick={() => navigate('/register')} />
        </div>
      </Card>
    </div>
  );
};