import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../api/categories';
import { useAuth } from '../contexts/AuthContext';
import type { Category } from '../types';
import { CategoryDialog } from '../components/Dialogs/CategoryDialog';


export const Categories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const toast = useRef<Toast>(null);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar categorías' });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.current?.show({ severity: 'success', summary: 'Eliminada', detail: 'Categoría eliminada' });
      fetchCategories();
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
    }
  };

  const openNew = () => {
    setSelectedCategory(null);
    setShowDialog(true);
  };

  const openEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const hideDialog = () => setShowDialog(false);

  const saveCategory = async (data: { name: string; description?: string }) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data);
      } else {
        await createCategory(data);
      }
      toast.current?.show({ severity: 'success', summary: 'Guardada', detail: 'Categoría guardada correctamente' });
      fetchCategories();
      hideDialog();
    } catch (err: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: err.message || 'No se pudo guardar' });
    }
  };

  const actionBody = (rowData: Category) => (
    <div>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success mr-2"
        onClick={() => openEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  // Si no es operador, no mostramos nada (la ruta ya está protegida, pero es redundante)
  if (user?.role !== 'operador') return null;

  return (
    <div>
      <Toast ref={toast} />
      <Button label="Nueva Categoría" icon="pi pi-plus" onClick={openNew} className="mb-3" />
      <DataTable value={categories} paginator rows={10} emptyMessage="No hay categorías registradas">
        <Column field="name" header="Nombre" />
        <Column field="description" header="Descripción" />
        <Column body={actionBody} header="Acciones" style={{ width: '10rem' }} />
      </DataTable>
      <Dialog
        header={selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        visible={showDialog}
        onHide={hideDialog}
        style={{ width: '450px' }}
      >
        <CategoryDialog category={selectedCategory} onSave={saveCategory} onCancel={hideDialog} />
      </Dialog>
    </div>
  );
};