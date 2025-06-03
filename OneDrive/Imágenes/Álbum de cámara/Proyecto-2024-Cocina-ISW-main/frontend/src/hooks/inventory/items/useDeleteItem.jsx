//'@hooks/inventory/items/useDeleteItem'
import { deleteItem } from '@services/itemBatch.service.js';
import { showErrorAlert, showSuccessAlert, deleteDataAlert } from '@helpers/sweetAlert';

const useDeleteItem = (fetchItems) => {
    const handleDelete = async (batchId, itemId) => {
        const result = await deleteDataAlert();
        if (result.isConfirmed) {
            try {
                await deleteItem(batchId, itemId);
                fetchItems();
                showSuccessAlert('Item eliminado con exito');
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar el item');
            }
        }
    };

    return { handleDelete };
};

export { useDeleteItem };
