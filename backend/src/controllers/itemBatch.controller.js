"use strict";
import { 
    addItemToBatchService,
    getAllItemsInBatchesService,
    getAllItemsInBatchService,
    updateItemInBatchService,
    deleteItemFromBatchService,
    checkDuplicateItemInBatchService
} from '../services/itemBatch.service.js';
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { ItemBodyValidation } from '../validations/itemBatch.validation.js';

// Añadir item a lote
export async function addItemToBatch(req, res) {
    try {
        const { batchId } = req.params;

        if (!batchId || isNaN(batchId)) {
            return handleErrorClient(res, 400, "El ID del lote debe ser un número válido.");
        }

        const { error, value: data } = ItemBodyValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return handleErrorClient(res, 400, errorMessages);
        }

        const [isDuplicate, duplicateError] = await checkDuplicateItemInBatchService(batchId, data);
        
        if (duplicateError) {
            return handleErrorServer(res, 500, "Error al verificar duplicados en el lote");
        }

        if (isDuplicate) {
            return handleErrorClient(res, 400, "Este ítem ya existe en el lote y no se puede duplicar.");
        }

        const [item, serviceError] = await addItemToBatchService(batchId, data);
        
        if (serviceError) {
            return handleErrorClient(res, 400, serviceError);
        }

        return handleSuccess(res, 201, "Item añadido al lote", item);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al añadir el item al lote");
    }
}

// Obtener todos los items de todos los lotes
export async function getAllItemsInBatches(req, res) {
    try {
        const [items, error] = await getAllItemsInBatchesService();
        
        if (error) return handleErrorServer(res, 500, error);
        return handleSuccess(res, 200, "Items obtenidos", items);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al obtener los items de todos los lotes");
    }
}

// Obtener todos los items de un lote específico
export async function getAllItemsInBatch(req, res) {
    try {
        const { batchId } = req.params;

        if (!batchId || isNaN(batchId)) {
            return handleErrorClient(res, 400, "El ID del lote debe ser un número válido.");
        }

        const [items, error] = await getAllItemsInBatchService(batchId);

        if (error) return handleErrorServer(res, 500, error);
        if (items.length === 0) {
            return handleSuccess(res, 200, "No se encontraron ítems en el lote especificado.", []);
        }
        return handleSuccess(res, 200, "Ítems obtenidos exitosamente", items);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al obtener los items del lote");
    }
}

// Actualizar item en lote
export async function updateItemInBatch(req, res) {
    try {
        const { itemId } = req.params;
        const { error, value: itemData } = ItemBodyValidation.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return handleErrorClient(res, 400, errorMessages);
        }

        const [item, serviceError] = await updateItemInBatchService(itemId, itemData);

        if (serviceError) return handleErrorClient(res, 404, serviceError);
        return handleSuccess(res, 200, "Item actualizado", item);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al actualizar el item");
    }
}

// Eliminar item de lote
export async function deleteItemFromBatch(req, res) {
    try {
        const { itemId } = req.params;
        const [item, error] = await deleteItemFromBatchService(itemId);
        
        if (error) return handleErrorClient(res, 404, error);
        return handleSuccess(res, 200, "Item eliminado", item);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al eliminar el item del lote");
    }
}