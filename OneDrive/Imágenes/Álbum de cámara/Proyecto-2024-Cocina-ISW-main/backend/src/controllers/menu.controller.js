"use strict";
import {
  addMenuItem,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menu.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import { menuValidation } from "../validations/menu.validation.js";

export async function createMenuItem(req, res) {
  try {
    const { body } = req;
    const { error } = menuValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [newMenuItem, errorNewItem] = await addMenuItem(body);

    if (errorNewItem) {
      return handleErrorClient(res, 400, "Error añadiendo el plato", errorNewItem);
    }

    handleSuccess(res, 201, "Plato añadido con éxito", newMenuItem);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAllMenuItems(req, res) {
  try {
    const [menu, error] = await getMenu();

    if (error) {
      return handleErrorClient(res, 404, "No se encontró el menú");
    }

    handleSuccess(res, 200, "Menú encontrado", menu);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function editMenuItem(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const { error } = menuValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [updatedMenuItem, errorUpdate] = await updateMenuItem(id, body);

    if (errorUpdate) {
      return handleErrorClient(res, 404, "Error al actualizar el plato", errorUpdate);
    }

    handleSuccess(res, 200, "Plato actualizado con éxito", updatedMenuItem);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function removeMenuItem(req, res) {
  try {
    const { id } = req.params;

    const [deletedMenuItem, error] = await deleteMenuItem(id);

    if (error) {
      return handleErrorClient(res, 404, "Error al eliminar el plato", error);
    }

    handleSuccess(res, 200, "Plato eliminado con éxito", deletedMenuItem);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}