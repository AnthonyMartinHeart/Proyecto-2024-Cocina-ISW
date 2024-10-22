"use strict";
import Order from "../entity/order.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createOrderService(data) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const newOrder = orderRepository.create(data);
    await orderRepository.save(newOrder);

    return [newOrder, null];
  } catch (error) {
    console.error("Error creando el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrderService(query) {
  try {
    const { id } = query;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });

    if (!order) return [null, "Pedido no encontrado"];

    return [order, null];
  } catch (error) {
    console.error("Error obteniendo el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getOrdersService() {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find();

    if (orders.length === 0) return [null, "No hay pedidos"];

    return [orders, null];
  } catch (error) {
    console.error("Error obteniendo los pedidos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrderStatusService(query, status) {
  try {
    const { id } = query;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });

    if (!order) return [null, "Pedido no encontrado"];
    if (order.status === "completado") return [null, "El pedido ya está completado"];
    if (order.status === "en preparación" && status === "pendiente")
      return [null, "No se puede regresar el estado a pendiente"];

    order.status = status;
    await orderRepository.save(order);

    return [order, null];
  } catch (error) {
    console.error("Error actualizando el estado del pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function cancelOrderService(query) {
  try {
    const { id } = query;
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });

    if (!order) return [null, "Pedido no encontrado"];
    if (order.status !== "pendiente") return [null, "El pedido ya está en preparación o completado"];

    await orderRepository.remove(order);

    return [order, null];
  } catch (error) {
    console.error("Error cancelando el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}
