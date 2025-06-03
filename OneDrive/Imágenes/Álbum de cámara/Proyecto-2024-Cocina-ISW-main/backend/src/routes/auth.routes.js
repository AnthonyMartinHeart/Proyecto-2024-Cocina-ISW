"use strict";
import { Router } from "express";
import { login, logout, register, getUserById, updateUserById, deleteUserById, getAllUsers } from "../controllers/auth.controller.js";

const router = Router();

router
  .post("/login", login)
  .post("/register", register)
  .post("/logout", logout)
  .get("/:id", getUserById) // Obtener un usuario por su ID
  .put("/:id", updateUserById) // Actualizar un usuario por su ID
  .delete("/:id", deleteUserById) // Eliminar un usuario por su ID
  .get("/", getAllUsers); // Obtener todos los usuarios

export default router;
