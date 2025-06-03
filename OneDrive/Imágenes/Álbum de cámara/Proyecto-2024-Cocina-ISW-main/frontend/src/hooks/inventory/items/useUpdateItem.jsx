import { updateItem } from '@services/itemBatch.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useUpdateItem = (fetchItems) => {
    const handleUpdate = async (batchId, itemId, itemData) => {
        try {
            await updateItem(batchId, itemId, itemData);
            fetchItems();
            showSuccessAlert('Item actualizado con exito');
        } catch (error) {
            showErrorAlert('Error', 'No se pudo actualizar el item');
        }
    };

    return { handleUpdate };
};

export { useUpdateItem };
