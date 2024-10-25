"use strict";
import { Router } from "express";
import {
  createMenuItem,
  getAllMenuItems,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menu.controller.js";

const router = Router();

router
  .post("/create", createMenuItem) // Añadir un nuevo plato
  .get("/get", getAllMenuItems) // Obtener el menú
  .put("/:id", editMenuItem) // Editar un plato existente
  .delete("/:id", removeMenuItem); // Eliminar un plato

export default router;