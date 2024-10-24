"use strict";
import {
  createOrderService,
  getOrderService,
  getOrdersService,
  updateOrderStatusService,
  cancelOrderService,
} from "../services/order.service.js";
import { orderBodyValidation } from "../validations/order.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createOrder(req, res) {
  try {
    // Validar el cuerpo de la solicitud
    const { error } = orderBodyValidation.validate(req.body);
    if (error) return handleErrorClient(res, 400, error.message);

    // Obtener todos los pedidos existentes
    const [existingOrders, errorOrders] = await getOrdersService();
    if (errorOrders) return handleErrorClient(res, 500, errorOrders);

    // Verificar que no haya más de 30 pedidos
    if (existingOrders.length >= 30) {
      return handleErrorClient(res, 400, "No se pueden crear más de 30 pedidos.");
    }

    // Verificar si ya existe un pedido con los mismos datos
    const duplicateOrder = existingOrders.find(order =>
      order.clientName === req.body.clientName && order.product === req.body.product
    );

    if (duplicateOrder) {
      return handleErrorClient(res, 400, "Ya existe un pedido con los mismos datos.");
    }

    // Crear el nuevo pedido
    const [order, errorOrder] = await createOrderService(req.body);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    // Responder con el pedido creado
    handleSuccess(res, 201, "Pedido creado exitosamente", order);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrder(req, res) {
  try {
    const id = req.params.id;
    const [order, errorOrder] = await getOrderService(id);
    if (errorOrder) return handleErrorClient(res, 404, errorOrder);

    handleSuccess(res, 200, "Pedido encontrado", order);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrders(req, res) {
  try {
    const [orders, errorOrders] = await getOrdersService();
    if (errorOrders) {
      // Si no hay pedidos, devolvemos un array vacío
      return handleSuccess(res, 200, "No hay pedidos", []);
    }

    handleSuccess(res, 200, "Pedidos encontrados", orders);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const [order, errorOrder] = await updateOrderStatusService(id, status);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Estado del pedido actualizado", order);
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error);
    handleErrorServer(res, 500, error.message);
  }
}

export async function cancelOrder(req, res) {
  try {
    const id = req.params.id;
    const [order, errorOrder] = await cancelOrderService(id);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Pedido cancelado", order);
  } catch (error) {
    console.error("Error al cancelar pedido:", error);
    handleErrorServer(res, 500, error.message);
  }
}
