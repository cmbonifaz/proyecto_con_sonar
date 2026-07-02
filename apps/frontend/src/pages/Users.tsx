import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

import { getUsers, deleteUser, createUser, updateUser } from '../api/users';
import { Dialog } from 'primereact/dialog';
import { UserDialog } from '../components/Dialogs/UserDialog';
import type { User } from '../types';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const toast = useRef<Toast>(null);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar usuarios' });
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Usuario eliminado' });
      fetchUsers();
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
    }
  };

  const openNew = () => {
    setSelectedUser(null);
    setShowDialog(true);
  };

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  const hideDialog = () => setShowDialog(false);

  const saveUser = async (userData: any) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
      } else {
        await createUser(userData);
      }
      toast.current?.show({ severity: 'success', summary: 'Guardado', detail: 'Usuario guardado' });
      fetchUsers();
      hideDialog();
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar' });
    }
  };

  const actionBodyTemplate = (rowData: User) => (
    <div>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => openEdit(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} />
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openNew} className="mb-3" />
      <DataTable value={users} paginator rows={10}>
        <Column field="nombres" header="Nombres" />
        <Column field="apellidos" header="Apellidos" />
        <Column field="dni" header="DNI" />
        <Column field="email" header="Email" />
        <Column field="role" header="Rol" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
      <Dialog header={selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'} visible={showDialog} onHide={hideDialog}>
        <UserDialog user={selectedUser} onSave={saveUser} onCancel={hideDialog} />
      </Dialog>
    </div>
  );
};