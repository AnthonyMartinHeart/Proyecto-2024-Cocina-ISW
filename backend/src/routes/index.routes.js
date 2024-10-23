"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import empleadoRoutes from "./empleado.routes.js"; // Importar las rutas de empleados
import orderRoutes from "./order.routes.js"; // Importar las rutas de pedidos
import menuRoutes from "./menu.routes.js"; // Rutas de menú

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    //.use("/empleados", empleadoRoutes) // Rutas de Valter Lineros
    //.use("/orders", orderRoutes) // Rutas de Fernando Flores
    //.use("/menu", menuRoutes);

export default router;
