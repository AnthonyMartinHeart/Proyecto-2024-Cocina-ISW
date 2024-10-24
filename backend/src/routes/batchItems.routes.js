import express from "express";
import {
  addItemToBatch,
  updateItemInBatch,
  deleteItemFromBatch,
  getAllItemsInBatches,
  getAllItemsInBatch
} from "../controllers/batch.controller.js";

import { isAdmin  } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Añadir un ítem a un lote
router.post("/:batchId/items",authenticateJwt, isAdmin, addItemToBatch);

// Modificar un ítem de un lote
router.put("/:batchId/items/:itemId",authenticateJwt, isAdmin, updateItemInBatch);

// Eliminar un ítem de un lote
router.delete("/:batchId/items/:itemId",authenticateJwt, isAdmin, deleteItemFromBatch);

// Obtener todos los ítems de todos los lotes
router.get("/all", getAllItemsInBatches);

// Obtener todos los ítems del lote
router.get("/:batchId/items", getAllItemsInBatch);

export default router;