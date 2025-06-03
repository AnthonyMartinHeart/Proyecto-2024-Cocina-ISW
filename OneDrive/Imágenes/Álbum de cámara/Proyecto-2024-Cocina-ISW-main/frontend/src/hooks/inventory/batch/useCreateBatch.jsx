// hooks/useCreateBatch.js
import { createBatch } from '@services/batch.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useCreateBatch = (fetchBatches) => {
    const handleCreate = async (batchData) => {
        try {
            await createBatch(batchData);
            fetchBatches();
            showSuccessAlert('Lote creado con éxito');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'No se pudo crear el lote';
            showErrorAlert('Error', errorMessage);
        }
    };

    return { handleCreate };
};

export { useCreateBatch };
