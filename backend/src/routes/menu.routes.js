"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js"; 
import {
  createMenuItem,
  getAllMenuItems,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menu.controller.js";

const router = Router();

router
  .post("/create", authenticateJwt, createMenuItem) // Añadir un nuevo plato pero solo admin puede crear menu
  .get("/get", getAllMenuItems) // Obtener el menú y puede ser visible para usuarios
  .put("/:id", authenticateJwt,  editMenuItem) // Editar un plato existente pero solos los admins pueden hacerlo
  .delete("/:id", authenticateJwt, removeMenuItem); // Eliminar un plato solo admins

export default router;
