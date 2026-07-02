import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import { getProducts, deleteProduct, createProduct, updateProduct } from '../api/products';
import { getCategories } from '../api/categories';
import { ProductDialog } from '../components/Dialogs/ProductDialog';
import { useAuth } from '../contexts/AuthContext';
import type { Category, Product } from '../types';

export const Products = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const toast = useRef<Toast>(null);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar productos' });
        }
    };

    useEffect(() => {
        fetchProducts();
        getCategories().then(setCategories).catch(() =>
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar categorías' })
        );
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado' });
            fetchProducts();
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar' });
        }
    };

    const openNew = () => { setSelectedProduct(null); setShowDialog(true); };
    const openEdit = (product: Product) => { setSelectedProduct(product); setShowDialog(true); };
    const hideDialog = () => setShowDialog(false);

    const saveProduct = async (productData: any) => {
        try {
            if (selectedProduct) await updateProduct(selectedProduct.id, productData);
            else await createProduct(productData);
            toast.current?.show({ severity: 'success', summary: 'Guardado', detail: 'Producto guardado' });
            fetchProducts();
            hideDialog();
        } catch {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar' });
        }
    };

    const actionBody = (rowData: Product) => (
        user?.role === 'operador' ? (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => openEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDelete(rowData.id)} />
            </>
        ) : null
    );

    return (
        <div>
            <Toast ref={toast} />
            {user?.role === 'operador' && <Button label="Nuevo Producto" icon="pi pi-plus" onClick={openNew} className="mb-3" />}
            <DataTable value={products} paginator rows={10}>
                <Column field="name" header="Nombre" />
                <Column field="description" header="Descripción" />
                <Column field="price" header="Precio" />
                {user?.role === 'operador' && <Column field="costPrice" header="Costo" />}
                {user?.role === 'operador' && <Column field="stockExact" header="Stock" />}
                <Column field="category.name" header="Categoría" />
                {user?.role === 'operador' && <Column body={actionBody} header="Acciones" />}
            </DataTable>
            {user?.role === 'operador' && (
                <Dialog header={selectedProduct ? 'Editar Producto' : 'Nuevo Producto'} visible={showDialog} onHide={hideDialog}>
                    <ProductDialog product={selectedProduct} categories={categories} onSave={saveProduct} onCancel={hideDialog} />
                </Dialog>
            )}
        </div>
    );
};