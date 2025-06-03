import { createItem } from '@services/itemBatch.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useCreateItem = (fetchItems) => {
    const handleCreate = async (id, itemData) => {
        try {
            const response = await createItem(id, itemData);
            fetchItems();
            showSuccessAlert('Item creado con éxito');
        } catch (error) {
            // Mostramos el error real
            console.error(error);
            showErrorAlert('Error', 'No se pudo crear el item');
        }
    };

    return { handleCreate };
};

export { useCreateItem };
