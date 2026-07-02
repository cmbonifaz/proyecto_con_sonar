import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import type { Category, Product } from '../../types';


interface Props {
  product: Product | null;
  categories: Category[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const ProductDialog = ({ product, categories, onSave, onCancel }: Props) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    costPrice: 0,
    stockExact: 0,
    imageUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        costPrice: product.costPrice || 0,
        stockExact: product.stockExact || 0,
        imageUrl: product.imageUrl || '',
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  return (
    <div className="p-fluid">
      <div className="field">
        <label>Nombre</label>
        <InputText value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="field">
        <label>Descripción</label>
        <InputText value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="field">
        <label>Precio</label>
        <InputNumber value={form.price} onValueChange={(e) => setForm({ ...form, price: e.value || 0 })} mode="currency" currency="USD" />
      </div>
      <div className="field">
        <label>Costo</label>
        <InputNumber value={form.costPrice} onValueChange={(e) => setForm({ ...form, costPrice: e.value || 0 })} mode="currency" currency="USD" />
      </div>
      <div className="field">
        <label>Stock</label>
        <InputNumber value={form.stockExact} onValueChange={(e) => setForm({ ...form, stockExact: e.value || 0 })} />
      </div>
      <div className="field">
        <label>URL Imagen</label>
        <InputText value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
      </div>
      <div className="field">
        <label>Categoría</label>
        <Dropdown value={form.categoryId} options={categories} optionLabel="name" optionValue="id"
          onChange={(e) => setForm({ ...form, categoryId: e.value })} />
      </div>
      <div className="flex justify-content-end">
        <Button label="Cancelar" className="p-button-text" onClick={onCancel} />
        <Button label="Guardar" onClick={() => onSave(form)} />
      </div>
    </div>
  );
};