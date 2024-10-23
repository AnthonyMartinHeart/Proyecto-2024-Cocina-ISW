"use strict";
import { loginService, registerService } from "../services/auth.service.js";
import {
  authValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";  // Asegúrate de tener esta línea

export async function login(req, res) {
  try {
    const { body } = req;

    const { error } = authValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }
    const [accessToken, errorToken] = await loginService(body);

    if (errorToken) return handleErrorClient(res, 400, "Error iniciando sesión", errorToken);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    handleSuccess(res, 200, "Inicio de sesión exitoso", { token: accessToken });
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function register(req, res) {
  try {
    const { body } = req;

    const { error } = registerValidation.validate(body);

    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const [newUser, errorNewUser] = await registerService(body);

    if (errorNewUser) return handleErrorClient(res, 400, "Error registrando al usuario", errorNewUser);

    handleSuccess(res, 201, "Usuario registrado con éxito", newUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}


// Nueva función para obtener todos los usuarios
export async function getAllUsers(req, res) {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find(); // Encontrar a todos los usuarios

    if (!users.length) {
      return handleErrorClient(res, 404, "No hay usuarios registrados");
    }

    // Excluir las contraseñas de los usuarios
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    handleSuccess(res, 200, "Usuarios encontrados", usersWithoutPassword);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// GET: Obtener un usuario por su ID
export async function getUserById(req, res) {
  try {
    const { id } = req.params; // obtenemos el ID desde los parámetros de la ruta

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id }
    });

    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    const { password, ...userData } = user; // No devolver la contraseña

    handleSuccess(res, 200, "Usuario encontrado", userData);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// PUT: Actualizar los datos de un usuario por su ID
export async function updateUserById(req, res) {
  try {
    const { id } = req.params; // obtenemos el ID desde los parámetros de la ruta
    const { body } = req; // datos del usuario que se actualizarán

    const userRepository = AppDataSource.getRepository(User);
    let user = await userRepository.findOne({
      where: { id }
    });

    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    // Actualizamos los datos del usuario
    user = Object.assign(user, body);

    await userRepository.save(user);

    const { password, ...updatedUser } = user; // No devolver la contraseña

    handleSuccess(res, 200, "Usuario actualizado con éxito", updatedUser);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// DELETE: Eliminar un usuario por su ID
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params; // obtenemos el ID desde los parámetros de la ruta

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id }
    });

    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    await userRepository.remove(user);

    handleSuccess(res, 200, "Usuario eliminado con éxito");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}


export async function logout(req, res) {
  try {
    res.clearCookie("jwt", { httpOnly: true });
    handleSuccess(res, 200, "Sesión cerrada exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
