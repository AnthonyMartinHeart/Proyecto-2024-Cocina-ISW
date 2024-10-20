import express from "express";
import {
  createEmployees,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/empleado.controller.js";
import { authenticateJwt } from "../middlewares/authentication.encargado.js"; 

const router = express.Router();

// Ruta para obtener todos los empleados
router.get("/name",  authenticateJwt, getEmployees); 

// Ruta para obtener un empleado por ID
router.get("/name/:id", authenticateJwt,  getEmployee);

// Ruta para crear un nuevo empleado
router.post("/create",  authenticateJwt, createEmployees);

// Ruta para actualizar un empleado por ID
router.put("/update/:id",  authenticateJwt , updateEmployee);

// Ruta para eliminar un empleado por ID
router.delete("/delete/:id",  authenticateJwt , deleteEmployee);

export default router;
