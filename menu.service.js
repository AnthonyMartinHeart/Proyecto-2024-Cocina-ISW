"use strict";
import Menu from "../entity/menu.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function addMenuItem(menuItem) {
  try {
    const menuRepository = AppDataSource.getRepository(Menu);
    const newMenuItem = menuRepository.create(menuItem);
    await menuRepository.save(newMenuItem);
    return [newMenuItem, null];
  } catch (error) {
    console.error("Error al añadir un plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getMenu() {
  try {
    const menuRepository = AppDataSource.getRepository(Menu);
    const menu = await menuRepository.find({ where: { disponible: true } });
    return [menu, null];
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateMenuItem(id, updatedData) {
  try {
    const menuRepository = AppDataSource.getRepository(Menu);
    let menuItem = await menuRepository.findOne({ where: { id } });

    if (!menuItem) {
      return [null, "Plato no encontrado"];
    }

    menuItem = Object.assign(menuItem, updatedData);
    await menuRepository.save(menuItem);
    return [menuItem, null];
  } catch (error) {
    console.error("Error al actualizar un plato:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteMenuItem(id) {
  try {
    const menuRepository = AppDataSource.getRepository(Menu);
    const menuItem = await menuRepository.findOne({ where: { id } });

    if (!menuItem) {
      return [null, "Plato no encontrado"];
    }

    menuItem.disponible = false; // Marcamos como no disponible en lugar de eliminar
    await menuRepository.save(menuItem);
    return [menuItem, null];
  } catch (error) {
    console.error("Error al eliminar un plato:", error);
    return [null, "Error interno del servidor"];
  }
}