import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useAuth } from '../contexts/AuthContext';

export const Register = () => {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    password: '',
  });
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(form);
      toast.current?.show({
        severity: 'success',
        summary: 'Registro exitoso',
        detail: 'Tu cuenta ha sido creada. Ya has iniciado sesión.',
      });
      navigate('/');
    } catch (err: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: err.message || 'No se pudo completar el registro',
      });
    }
  };

  return (
    <div className="flex justify-content-center">
      <Toast ref={toast} />
      <Card title="Crear cuenta" className="w-30rem">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="nombres">Nombres</label>
            <InputText
              id="nombres"
              value={form.nombres}
              onChange={(e) => setForm({ ...form, nombres: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="apellidos">Apellidos</label>
            <InputText
              id="apellidos"
              value={form.apellidos}
              onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="dni">DNI (10 dígitos)</label>
            <InputText
              id="dni"
              value={form.dni}
              onChange={(e) => setForm({ ...form, dni: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              maxLength={10}
              keyfilter="int"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <InputText
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <Password
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              toggleMask
              feedback={false}
              required
            />
          </div>
          <Button label="Registrarse" type="submit" icon="pi pi-user-plus" />
        </form>
        <div className="mt-3 text-center">
          <span>¿Ya tienes cuenta? </span>
          <Button
            label="Inicia sesión"
            className="p-button-link p-0"
            onClick={() => navigate('/login')}
          />
        </div>
      </Card>
    </div>
  );
};