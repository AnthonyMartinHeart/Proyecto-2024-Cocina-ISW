"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js"; 
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
  .post("/create", createOrder) // Crear un pedido admin & usuarios
  .get("/get", getOrders) // Obtener todos los pedidos solo admin & usuarios
  .get("/:id", authenticateJwt, getOrder) // Obtener un pedido por ID solo ADMIN
  .put("/:id/status", authenticateJwt, updateOrderStatus) // Actualizar el estado de un pedido por ID solo ADMIN
  .delete("/:id", authenticateJwt, cancelOrder); // Cancelar un pedido por ID solo ADMIN

export default router;
