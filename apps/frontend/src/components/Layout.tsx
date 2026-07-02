import { Menubar } from 'primereact/menubar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/') },
    ...(user?.role === 'operador'
      ? [
          { label: 'Usuarios', icon: 'pi pi-users', command: () => navigate('/users') },
          { label: 'Productos', icon: 'pi pi-shopping-bag', command: () => navigate('/products') },
          { label: 'Categorías', icon: 'pi pi-tags', command: () => navigate('/categories') },
        ]
      : [
          { label: 'Productos', icon: 'pi pi-shopping-bag', command: () => navigate('/products') },
        ]),
    ...(user
      ? [
          {
            label: user.email,
            icon: 'pi pi-user',
            items: [{ label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: logout }],
          },
        ]
      : [{ label: 'Login', icon: 'pi pi-sign-in', command: () => navigate('/login') }]),
  ];

  return (
    <div>
      <Menubar model={items} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};