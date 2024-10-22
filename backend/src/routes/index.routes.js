"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import empleadoRoutes from "./empleado.routes.js"; // Importar las rutas de empleados
import orderRoutes from "./order.routes.js"; // Importar las rutas de pedidos

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/empleados", empleadoRoutes) // Rutas de empleados
    .use("/orders", orderRoutes); // Rutas de pedidos

export default router;
