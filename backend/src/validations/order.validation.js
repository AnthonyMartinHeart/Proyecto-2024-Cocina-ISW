"use strict";
import Joi from "joi";

export const orderBodyValidation = Joi.object({
  clientName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre del cliente es obligatorio.",
    "string.min": "El nombre del cliente debe tener al menos 3 caracteres.",
    "string.max": "El nombre del cliente debe tener como máximo 100 caracteres.",
  }),
  product: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El producto es obligatorio.",
    "string.min": "El producto debe tener al menos 3 caracteres.",
    "string.max": "El producto debe tener como máximo 100 caracteres.",
  }),
  status: Joi.string().valid("pendiente", "en preparación", "completado").optional(),
});
