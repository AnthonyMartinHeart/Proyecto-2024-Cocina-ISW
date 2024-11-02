import batchItemSchema from "../entity/batchItem.entity.js";
import { AppDataSource } from "../config/configDb.js";

// Añadir item a lote
export async function addItemToBatchService(batchId, data) {
    try {
      const itemRepository = AppDataSource.getRepository(batchItemSchema);
  
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
      const itemRepository = AppDataSource.getRepository(batchItemSchema);
      const items = await itemRepository.find({ relations: ["batch"] });
      return [items, null];
    } catch (error) {
      return [null, error.message];
    }
  }
  
  // Obtener todos los items del lote
  export async function getAllItemsInBatchService(batchId) {
    try {
      const itemRepository = AppDataSource.getRepository(batchItemSchema);
      const items = await itemRepository.find({ where: { batch: { id: batchId } } });
      return [items, null];
    } catch (error) {
      return [null, error.message];
    }
  }
  
  // Actualizar item en lote
  export async function updateItemInBatchService(itemId, data) {
    try {
      const itemRepository = AppDataSource.getRepository(batchItemSchema);
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
      const itemRepository = AppDataSource.getRepository(batchItemSchema);
  
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

  //Revisa si hay duplicados
  export async function checkDuplicateItemInBatchService(batchId, itemData) {
    try {
        const duplicateItem = await batchItemSchema.findOne({
            where: { 
                batch: batchId,
                name: itemData.name // Ajusta los campos según las propiedades únicas del ítem
            }
        });
        return [!!duplicateItem, null];
    } catch (error) {
        return [null, error.message];
    }
}