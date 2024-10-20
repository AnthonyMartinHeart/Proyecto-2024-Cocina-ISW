"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import empleadoRoutes from "./empleado.routes.js"; // Importar las rutas de empleados

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/empleados", empleadoRoutes); // Rutas de empleados

export default router;