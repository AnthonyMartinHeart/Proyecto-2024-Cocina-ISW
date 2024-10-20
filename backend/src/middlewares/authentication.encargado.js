"use strict";
import passport from "passport";
import { handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";

/**
 * Middleware para autenticar a los usuarios usando JWT.
 * Si la autenticación es exitosa, el usuario se adjunta al objeto `req`.
 * Si falla, se manejan los errores adecuadamente.
 */
export function authenticateJwt(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    // Manejar errores en el proceso de autenticación
    if (err) {
      return handleErrorServer(res, 500, "Error de autenticación en el servidor");
    }
    
    // Si no se encuentra un usuario, manejar el error de autorización
    if (!user) {
      return handleErrorClient(res, 401, "No tienes permiso para acceder a este recurso", {
        info: info ? info.message : "No se encontró el usuario"
      });
    }

    // Si la autenticación es exitosa, adjuntar el usuario a la solicitud
    req.user = user;
    
    // Llamar a next() para pasar al siguiente middleware o controlador
    next();
  })(req, res, next);
}
