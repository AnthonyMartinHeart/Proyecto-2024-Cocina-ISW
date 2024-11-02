import BatchPurchaseSchema from "../entity/batchPurchase.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Crear lote
export async function createBatchService(data) {
  try {

    const { totalItems } = data;

    if (!totalItems) {
      return [null, "Debe proporcionar una cantidad válida de ítems"];
    }

    // Verificación de que totalItems no sea superior al límite máximo permitido
    // Se puede modificar a necesidad
    if (totalItems > 20) {
      return [null, "No se pueden crear lotes con más de 20 de ítems."];
    }

    // Verificación de que totalItems sea un número válido
    if (totalItems <= 0) {
      return [null, "La cantidad total de ítems debe ser mayor que 0."];
    }

    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);
    
    // Verificar el número total de lotes
    const batchCount = await batchRepository.count();
    if (batchCount >= 20) {
      throw new Error("No se pueden crear más de 20 lotes");
    }

    const newBatch = batchRepository.create(data);
    const savedBatch = await batchRepository.save(newBatch);
    return [savedBatch, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Función para obtener todos los lotes
export async function getAllBatchesService() {
  try {
    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);
    const batches = await batchRepository.find();
    return [batches, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Función para obtener un lote por su ID
export async function getBatchService(id) {
  try {
    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);
    const batch = await batchRepository.findOneBy({ id });

    if (!batch) throw new Error("Lote no encontrado");
    
    return [batch, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function updateBatchService(id, batchData) {
  try {
    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);

    // Buscar el lote por ID
    const batch = await batchRepository.findOneBy({ id });
    if (!batch) throw new Error("Lote no encontrado");

    // Validar que batchData.totalItems sea un número válido
    const newTotalItems = typeof batchData.totalItems === 'number' ? batchData.totalItems : batch.totalItems;

    // Verificar si el total de ítems excede el límite
    if (newTotalItems > 20) {
      throw new Error(`La cantidad de ítems no puede exceder los 20`);
    }

    // Actualizar las propiedades del lote
    Object.assign(batch, batchData);

    // Guardar los cambios en la base de datos
    const updatedBatch = await batchRepository.save(batch);
    
    return [updatedBatch, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Función para eliminar un lote por su ID
export async function deleteBatchService(id) {
  try {
    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);
    
    // Buscar el lote por ID
    const batch = await batchRepository.findOneBy({ id });
    if (!batch) throw new Error("Lote no encontrado");

    // Eliminar el lote
    const result = await batchRepository.remove(batch);
    
    return [result, null];
  } catch (error) {
    return [null, error.message];
  }
}