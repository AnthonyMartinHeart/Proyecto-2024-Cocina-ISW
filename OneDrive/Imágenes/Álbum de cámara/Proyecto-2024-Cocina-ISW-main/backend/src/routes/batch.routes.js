import express from "express";
import {
  createBatch,
  getBatches,
  getBatch,
  updateBatch,
  deleteBatch,
} from "../controllers/batch.controller.js";

import { isAdmin  } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Crear un nuevo lote
router.post("/purchase",authenticateJwt ,isAdmin , createBatch);

// Obtener todos los lotes
router.get("/getall", getBatches);

// Obtener un lote por su ID
router.get("/get/:id", getBatch);

// Modificar un lote por su ID
router.put("/upd/:id",authenticateJwt, isAdmin, updateBatch);

// Eliminar un lote por su ID
router.delete("/del/:id",authenticateJwt, isAdmin, deleteBatch);

export default router;