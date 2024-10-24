import Joi from "joi";

// Validación para el cuerpo de los lotes
export const BatchBodyValidation = Joi.object({
  acquisitionDate: Joi.date().required().messages({
    "date.base": "La fecha de adquisición debe ser una fecha válida.",
    "any.required": "La fecha de adquisición es obligatoria.",
  }),
  totalItems: Joi.number().integer().min(1).max(20).required().messages({
    "number.base": "El número de ítems debe ser un número.",
    "number.min": "Debe haber al menos un ítem en el lote.",
    "number.max": "Debe haber menos de 20 items en el lote",
    "any.required": "El número de ítems es obligatorio.",
  }),
});

// Validación para el cuerpo de los ítems
export const ItemBodyValidation = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.max": "El nombre no debe exceder los 255 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),
  type: Joi.string().valid("food", "utensil").required().messages({
    "any.only": "El tipo de ítem debe ser 'food' o 'utensil'.",
    "any.required": "El tipo es obligatorio.",
  }),
  quantity: Joi.number().integer().min(1).max(20).required().messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser al menos 1.",
    "number.max": "No se puede agregar más de 20 de ítems.",
    "any.required": "La cantidad es obligatoria.",
  }),
  expirationDate: Joi.when('type', {
    is: "food",
    then: Joi.date().required().messages({
      "date.base": "La fecha de expiración debe ser una fecha válida.",
      "any.required": "La fecha de expiración es obligatoria para alimentos.",
    }),
    otherwise: Joi.optional()
  }),
});