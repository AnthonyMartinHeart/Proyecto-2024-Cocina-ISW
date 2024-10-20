import Joi from "joi";

// Validación para el cuerpo (body) de los empleados (creación/actualización)
export const EmployeeBodyValidation = Joi.object({
  nombreCompleto: Joi.string().max(255).required().messages({
    "string.base": "El nombre completo debe ser un texto.",
    "string.max": "El nombre completo no debe exceder los 255 caracteres.",
    "any.required": "El nombre completo es obligatorio.",
  }),
  rut: Joi.string().max(12).required().messages({
    "string.base": "El RUT debe ser un texto.",
    "string.max": "El RUT no debe exceder los 12 caracteres.",
    "any.required": "El RUT es obligatorio.",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.base": "El correo electrónico debe ser un texto.",
    "string.email": "El correo electrónico debe ser un correo válido.",
    "string.max": "El correo electrónico no debe exceder los 255 caracteres.",
    "any.required": "El correo electrónico es obligatorio.",
  }),
  rol: Joi.string().max(50).required().messages({
    "string.base": "El rol debe ser un texto.",
    "string.max": "El rol no debe exceder los 50 caracteres.",
    "any.required": "El rol es obligatorio.",
  }),
  cargo: Joi.string().max(50).optional().default("desconocido").messages({
    "string.base": "El cargo debe ser un texto.",
    "string.max": "El cargo no debe exceder los 50 caracteres.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.min": "La contraseña debe tener al menos 6 caracteres.",
    "any.required": "La contraseña es obligatoria.",
  }),
});

// Validación para los query parameters (consulta de un empleado)
export const EmployeeQueryValidation = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "El ID debe ser un número.",
    "number.integer": "El ID debe ser un número entero.",
    "any.required": "El ID es obligatorio.",
  }),
});
