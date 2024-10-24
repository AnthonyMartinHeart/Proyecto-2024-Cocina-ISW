"use strict";
import { 
    //Batch
    createBatchService, 
    getAllBatchesService,
    getBatchService,
    updateBatchService,
    deleteBatchService,
    //Items
    addItemToBatchService,
    getAllItemsInBatchesService,
    getAllItemsInBatchService,
    updateItemInBatchService,
    deleteItemFromBatchService
  } from '../services/batch.service.js';
  import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
  
  // Lotes -------------------------------------------------------------------------------------------

  // Crear lote
  export async function createBatch(req, res) {
    // Elimina el id del cuerpo del JSON si es que esta
    const { id, ...data } = req.body;

    const [batch, error] = await createBatchService(data);

    if (error) {
        if (error.includes('ítems')) {
            return handleErrorClient(res, 400, error);
        }
        return handleErrorServer(res, 500, error);
    }

    return handleSuccess(res, 201, "Lote creado exitosamente", batch);
}

  // Obtener todos los lotes
  export async function getBatches(req, res) {
    const [batches, error] = await getAllBatchesService();
    if (error) return handleErrorServer(res, 500, error);
    return handleSuccess(res, 200, "Lotes obtenidos", batches);
  }

  // Obtener un lote por su ID
  export async function getBatch(req, res) {
    const { id } = req.params;
    const [batch, error] = await getBatchService(id);
    if (error) return handleErrorClient(res, 404, error);
    return handleSuccess(res, 200, "Lote obtenido", batch);
  }

  export async function updateBatch(req, res) {
    const { id } = req.params;
    const batchData = req.body;
    
    const [batch, error] = await updateBatchService(id, batchData);
    
    if (error) return handleErrorClient(res, 400, error);
    return handleSuccess(res, 200, "Lote actualizado", batch);
  }

  // Eliminar un lote por su ID
  export async function deleteBatch(req, res) {
    const { id } = req.params;
    const [result, error] = await deleteBatchService(id);
    if (error) return handleErrorClient(res, 404, error);
    return handleSuccess(res, 200, "Lote eliminado", result);
  }

  // Items -------------------------------------------------------------------------------------------
  
  // Añadir item a lote
  export async function addItemToBatch(req, res) {
    const { batchId } = req.params;
  
    if (!batchId || isNaN(batchId)) {
      return handleErrorClient(res, 400, "El ID del lote debe ser un número válido.");
    }
  
    // Obtener el cuerpo de la solicitud y eliminar el id
    const { id, ...data } = req.body;
  
    // Llama al servicio para añadir el ítem al lote
    const [item, error] = await addItemToBatchService(batchId, data);
    if (error) return handleErrorClient(res, 400, error);
    
    return handleSuccess(res, 201, "Item añadido al lote", item);
  }
  
  // Obtener todos los items de todos los lotes
  export async function getAllItemsInBatches(req, res) {
    const [items, error] = await getAllItemsInBatchesService();
    if (error) return handleErrorServer(res, 500, error);
    return handleSuccess(res, 200, "Items obtenidos", items);
  }

  export async function getAllItemsInBatch(req, res) {
    const { batchId } = req.params;
  
    // Verificar que batchId sea un número válido
    if (!batchId || isNaN(batchId)) {
      return handleErrorClient(res, 400, "El ID del lote debe ser un número válido.");
    }
    // Llamar al servicio para obtener todos los ítems del lote
    const [items, error] = await getAllItemsInBatchService(batchId);
  
    if (error) {
      return handleErrorServer(res, 500, error);
    }
    if (items.length === 0) {
      return handleSuccess(res, 200, "No se encontraron ítems en el lote especificado.", []);
    }
    return handleSuccess(res, 200, "Ítems obtenidos exitosamente", items);
  }
  
  // Actualizar item en lote
  export async function updateItemInBatch(req, res) {
    const { itemId } = req.params;
    const [item, error] = await updateItemInBatchService(itemId, req.body);
    if (error) return handleErrorClient(res, 404, error);
    return handleSuccess(res, 200, "Item actualizado", item);
  }

  // Eliminar item de lote
  export async function deleteItemFromBatch(req, res) {
    const { itemId } = req.params;
    const [item, error] = await deleteItemFromBatchService(itemId);
    if (error) return handleErrorClient(res, 404, error);
    return handleSuccess(res, 200, "Item eliminado", item);
  }