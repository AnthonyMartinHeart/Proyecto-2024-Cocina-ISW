"use strict";
import {
  createOrderService,
  getOrderService,
  getOrdersService,
  updateOrderStatusService,
  cancelOrderService,
} from "../services/order.service.js";
import {
  orderBodyValidation,
  orderQueryValidation,
} from "../validations/order.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createOrder(req, res) {
  try {
    const { error } = orderBodyValidation.validate(req.body);
    if (error) return handleErrorClient(res, 400, error.message);

    // Verificar si ya existe un pedido con los mismos datos
    const [existingOrders, errorOrders] = await getOrdersService(); // Obtener todos los pedidos
    if (errorOrders) return handleErrorClient(res, 500, "Error al obtener pedidos");

    const duplicateOrder = existingOrders.find(order =>
      order.clientName === req.body.clientName && order.product === req.body.product
    );

    if (duplicateOrder) {
      return handleErrorClient(res, 400, "Ya existe un pedido con los mismos datos");
    }

    const [order, errorOrder] = await createOrderService(req.body);
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 201, "Pedido creado exitosamente", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrder(req, res) {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la ruta
    const [order, errorOrder] = await getOrderService(id); // Pasar el ID al servicio
    if (errorOrder) return handleErrorClient(res, 404, errorOrder);

    handleSuccess(res, 200, "Pedido encontrado", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getOrders(req, res) {
  try {
    const [orders, errorOrders] = await getOrdersService();
    if (errorOrders) return handleErrorClient(res, 404, errorOrders);

    handleSuccess(res, 200, "Pedidos encontrados", orders);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la ruta
    const { status } = req.body; // Obtener el nuevo estado del body
    const [order, errorOrder] = await updateOrderStatusService(id, status); // Pasar el ID al servicio
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Estado del pedido actualizado", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function cancelOrder(req, res) {
  try {
    const id = req.params.id; // Obtener el ID del parámetro de la ruta
    const [order, errorOrder] = await cancelOrderService(id); // Pasar el ID al servicio
    if (errorOrder) return handleErrorClient(res, 400, errorOrder);

    handleSuccess(res, 200, "Pedido cancelado", order);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
