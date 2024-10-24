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

export async function getOrderService(id) {
  try {
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

    // Si no hay pedidos, se devuelve un array vacío
    return [orders.length > 0 ? orders : [], null];
  } catch (error) {
    console.error("Error obteniendo los pedidos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateOrderStatusService(id, status) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });

    if (!order) return [null, "Pedido no encontrado"];
    if (order.status === "completado") return [null, "El pedido ya está completado"];
    if (order.status === "en preparación" && status === "pendiente") {
      return [null, "No se puede regresar el estado a pendiente"];
    }

    order.status = status;
    await orderRepository.save(order);

    return [order, null];
  } catch (error) {
    console.error("Error actualizando el estado del pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function cancelOrderService(id) {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id } });

    if (!order) return [null, "Pedido no encontrado"];

    // Permitir cancelación si el pedido está en "pendiente", "en preparación" o "listo"
    if (order.status !== "pendiente" && order.status !== "en preparación" && order.status !== "listo") {
      return [null, "El pedido no puede ser cancelado"];
    }

    await orderRepository.remove(order);
    return [order, null];
  } catch (error) {
    console.error("Error cancelando el pedido:", error);
    return [null, "Error interno del servidor"];
  }
}

