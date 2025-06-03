"use strict";
import { 
    createBatchService, 
    getAllBatchesService,
    getBatchService,
    updateBatchService,
    deleteBatchService,
} from '../services/batch.service.js';
import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { BatchBodyValidation } from '../validations/batch.validation.js';

// Crear lote
export async function createBatch(req, res) {
    try {
        const { error, value: data } = BatchBodyValidation.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return handleErrorClient(res, 400, errorMessages);
        }

        // Llamar al servicio para crear el lote
        const [batch, serviceError] = await createBatchService(data);

        if (serviceError) {
            if (serviceError.includes('ítems')) {
                return handleErrorClient(res, 400, serviceError);
            }
            return handleErrorServer(res, 500, serviceError);
        }

        return handleSuccess(res, 201, "Lote creado exitosamente", batch);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al crear el lote");
    }
}

// Obtener todos los lotes
export async function getBatches(req, res) {
    try {
        const [batches, error] = await getAllBatchesService();
        
        if (error) return handleErrorServer(res, 500, error);
        return handleSuccess(res, 200, "Lotes obtenidos", batches);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al obtener los lotes");
    }
}

// Obtener un lote por su ID
export async function getBatch(req, res) {
    try {
        const { id } = req.params;
        const [batch, error] = await getBatchService(id);
        
        if (error) return handleErrorClient(res, 404, error);
        return handleSuccess(res, 200, "Lote obtenido", batch);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al obtener el lote");
    }
}

// Actualizar un lote
export async function updateBatch(req, res) {
    try {
        const { id } = req.params;
        const { error, value: batchData } = BatchBodyValidation.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(err => err.message);
            return handleErrorClient(res, 400, errorMessages);
        }

        // Llamar al servicio para actualizar el lote
        const [batch, serviceError] = await updateBatchService(id, batchData);
        
        if (serviceError) return handleErrorClient(res, 400, serviceError);
        return handleSuccess(res, 200, "Lote actualizado", batch);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al actualizar el lote");
    }
}

// Eliminar un lote por su ID
export async function deleteBatch(req, res) {
    try {
        const { id } = req.params;
        const [result, error] = await deleteBatchService(id);
        
        if (error) return handleErrorClient(res, 404, error);
        return handleSuccess(res, 200, "Lote eliminado", result);
    } catch (error) {
        return handleErrorServer(res, 500, "Error en el servidor al eliminar el lote");
    }
}
