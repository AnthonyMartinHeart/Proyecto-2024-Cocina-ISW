import BatchPurchaseSchema from "../entity/batchPurchase.entity.js";
import BatchItemSchema from "../entity/batchItem.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Crear lote
export async function createBatchService(data) {
  try {

    const { totalItems } = data;

    if (!totalItems) {
      return [null, "Debe proporcionar una cantidad válida de ítems"];
    }

    // Verificación de que totalItems no sea superior al límite máximo permitido
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

// Items --------------------------------------------------------------------------------------

// Añadir item a lote
export async function addItemToBatchService(batchId, data) {
  try {
    const itemRepository = AppDataSource.getRepository(BatchItemSchema);

    // Verifica el número total de ítems en el sistema
    const totalItemsCount = await itemRepository.count();
    if (totalItemsCount >= 20) {
      throw new Error("No se pueden tener más de 20 ítems en el inventario.");
    }

    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);
    const batch = await batchRepository.findOne({ where: { id: batchId }, relations: ["items"] });
    if (!batch) return [null, "Lote no encontrado"];

    // Verifica cuántos ítems hay en el lote
    const itemCountInBatch = batch.items.length;
    if (itemCountInBatch >= 20) {
      throw new Error("No se pueden añadir más de 20 ítems a un lote.");
    }

    const newItem = itemRepository.create({
      ...data,
      batch
    });

    const savedItem = await itemRepository.save(newItem);
    
    return [savedItem, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Obtener todos los items de los lotes
export async function getAllItemsInBatchesService() {
  try {
    const itemRepository = AppDataSource.getRepository(BatchItemSchema);
    const items = await itemRepository.find({ relations: ["batch"] });
    return [items, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Obtener todos los items del lote
export async function getAllItemsInBatchService(batchId) {
  try {
    const itemRepository = AppDataSource.getRepository(BatchItemSchema);
    const items = await itemRepository.find({ where: { batch: { id: batchId } } });
    return [items, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Actualizar item en lote
export async function updateItemInBatchService(itemId, data) {
  try {
    const itemRepository = AppDataSource.getRepository(BatchItemSchema);
    const batchRepository = AppDataSource.getRepository(BatchPurchaseSchema);

    // Buscar el ítem por su ID
    const item = await itemRepository.findOne({ where: { id: itemId }, relations: ["batch"] });
    if (!item) return [null, "Item no encontrado"];

    const batch = item.batch;  // Obtener el lote relacionado con el ítem
    if (!batch) return [null, "Lote asociado no encontrado"];

    // Verificar cuántos ítems hay actualmente en el lote
    const currentItemCount = await itemRepository.count({ where: { batch: { id: batch.id } } });
    
    // Si se está intentando aumentar el número de ítems más allá del límite, lanzar error
    const newTotalItems = (data.quantity ? currentItemCount + data.quantity : currentItemCount);

    if (newTotalItems > 20) {
      throw new Error("No se pueden añadir más de 20 ítems en total a este lote.");
    }

    // Actualizar el ítem con los nuevos datos
    Object.assign(item, data);
    const updatedItem = await itemRepository.save(item);
    return [updatedItem, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Eliminar item de lote
export async function deleteItemFromBatchService(itemId) {
  try {
    const itemRepository = AppDataSource.getRepository(BatchItemSchema);

    // Buscar el ítem por su ID
    const item = await itemRepository.findOne({ where: { id: itemId } });
    if (!item) return [null, "Item no encontrado"];

    // Eliminar el ítem de la base de datos
    await itemRepository.remove(item);
    return [item, null];
  } catch (error) {
    return [null, error.message];
  }
}