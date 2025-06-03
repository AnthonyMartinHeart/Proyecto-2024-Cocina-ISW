import { updateBatch } from '@services/batch.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert';

const useUpdateBatch = (fetchBatches, setShowPopup, setBatchToEdit) => {
  const handleUpdate = async (id, batchData) => {
    try {
      await updateBatch(id, batchData);
      fetchBatches();
      showSuccessAlert('Lote actualizado con éxito');
      setShowPopup(false);
      setBatchToEdit(null);
    } catch (error) {
      console.error('Error al actualizar el lote:', error);
      showErrorAlert('Error', 'No se pudo actualizar el lote');
    }
  };

  return { handleUpdate };
};

export { useUpdateBatch };
