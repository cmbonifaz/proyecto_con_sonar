import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import type { User } from '../../types';


interface Props {
  user: User | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const UserDialog = ({ user, onSave, onCancel }: Props) => {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    email: '',
    password: '',
    role: 'cliente',
  });

  useEffect(() => {
    if (user) {
      setForm({
        nombres: user.nombres,
        apellidos: user.apellidos,
        dni: user.dni,
        email: user.email,
        password: '', // no se muestra
        role: user.role,
      });
    }
  }, [user]);

  const handleSave = () => {
    const payload: any = { ...form };
    if (!user || form.password) payload.password = form.password;
    onSave(payload);
  };

  return (
    <div className="p-fluid">
      <div className="field">
        <label>Nombres</label>
        <InputText value={form.nombres} onChange={(e) => setForm({ ...form, nombres: e.target.value })} />
      </div>
      <div className="field">
        <label>Apellidos</label>
        <InputText value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />
      </div>
      <div className="field">
        <label>DNI (10 dígitos)</label>
        <InputText value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} maxLength={10} keyfilter="int" />
      </div>
      <div className="field">
        <label>Email</label>
        <InputText value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="field">
        <label>Contraseña {user && '(dejar vacío para no cambiar)'}</label>
        <Password value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} feedback={false} toggleMask />
      </div>
      <div className="field">
        <label>Rol</label>
        <Dropdown value={form.role} options={['cliente', 'operador']} onChange={(e) => setForm({ ...form, role: e.value })} />
      </div>
      <div className="flex justify-content-end">
        <Button label="Cancelar" className="p-button-text" onClick={onCancel} />
        <Button label="Guardar" onClick={handleSave} />
      </div>
    </div>
  );
};