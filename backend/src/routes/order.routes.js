"use strict";
import { Router } from "express";
//import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";

const router = Router();

//router.use(authenticateJwt);

router
  .post("/create", createOrder)
  .get("/get", getOrders) // Cambiado para obtener todos los pedidos
  .get("/:id", getOrder) // Cambiado para obtener un pedido por ID
  .put("/:id/status", updateOrderStatus) // Cambiado para actualizar el estado de un pedido por ID
  .delete("/:id", cancelOrder); // Cambiado para cancelar un pedido por ID

export default router;
