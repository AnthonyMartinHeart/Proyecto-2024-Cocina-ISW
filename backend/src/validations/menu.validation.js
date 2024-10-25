"use strict";
import Joi from "joi";

export const menuValidation = Joi.object({
  nombre: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      "string.empty": "El nombre del plato no puede estar vacío.",
      "any.required": "El nombre del plato es obligatorio.",
      "string.min": "El nombre del plato debe tener al menos 1 carácter.",
      "string.max": "El nombre del plato debe tener como máximo 100 caracteres.",
    }),

  descripcion: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía.",
      "any.required": "La descripción es obligatoria.",
      "string.min": "La descripción debe tener al menos 10 caracteres.",
    }),

  precio: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "El precio debe ser un número.",
      "number.positive": "El precio debe ser positivo.",
      "any.required": "El precio es obligatorio.",
    }),
}).unknown(false);