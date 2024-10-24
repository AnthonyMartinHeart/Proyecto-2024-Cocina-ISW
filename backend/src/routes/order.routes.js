"use strict";
import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";

const router = Router();

// Rutas para el manejo de pedidos
router
  .post("/create", createOrder) // Crear un pedido
  .get("/get", getOrders) // Obtener todos los pedidos
  .get("/:id", getOrder) // Obtener un pedido por ID
  .put("/:id/status", updateOrderStatus) // Actualizar el estado de un pedido por ID
  .delete("/:id", cancelOrder); // Cancelar un pedido por ID

export default router;
