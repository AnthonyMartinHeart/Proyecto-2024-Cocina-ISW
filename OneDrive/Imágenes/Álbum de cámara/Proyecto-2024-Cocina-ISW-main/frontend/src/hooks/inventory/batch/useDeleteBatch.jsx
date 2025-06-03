import { deleteBatch } from '@services/batch.service.js';
import { showErrorAlert, showSuccessAlert, deleteDataAlert } from '@helpers/sweetAlert';

const useDeleteBatch = (fetchBatches) => {
    const handleDelete = async (id) => {
        const result = await deleteDataAlert();
        if (result.isConfirmed) {
            try {
                await deleteBatch(id);
                fetchBatches();
                showSuccessAlert('Lote eliminado con éxito');
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar el lote');
            }
        }
    };

    return { handleDelete };
};

export { useDeleteBatch };
