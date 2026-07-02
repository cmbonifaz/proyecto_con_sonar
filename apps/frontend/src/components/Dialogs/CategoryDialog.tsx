import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import type { Category } from '../../types';


interface Props {
  category: Category | null;
  onSave: (data: { name: string; description?: string }) => void;
  onCancel: () => void;
}

export const CategoryDialog = ({ category, onSave, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [category]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), description: description.trim() || undefined });
  };

  return (
    <div className="p-fluid">
      <div className="field">
        <label htmlFor="catName">Nombre *</label>
        <InputText
          id="catName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="field">
        <label htmlFor="catDesc">Descripción</label>
        <InputTextarea
          id="catDesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="flex justify-content-end gap-2">
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onCancel} />
        <Button label="Guardar" icon="pi pi-check" onClick={handleSave} disabled={!name.trim()} />
      </div>
    </div>
  );
};