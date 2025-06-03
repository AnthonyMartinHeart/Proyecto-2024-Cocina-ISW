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
