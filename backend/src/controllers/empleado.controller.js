"use strict";
import {
  createEmployeesService,
  getEmployeeService,
  getEmployeesService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/empleado.service.js";
import {
  EmployeeBodyValidation,
  EmployeeQueryValidation,
} from "../validations/empleado.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

// Crear empleado
export async function createEmployees(req, res) {
  try {
    const { body } = req;

    const { error } = EmployeeBodyValidation.validate(body);

    if (error) return handleErrorClient(res, 400, error.message);

    const [Employee, EmployeeError] = await createEmployeesService(body);

    if (EmployeeError) return handleErrorClient(res, 400, EmployeeError);

    handleSuccess(res, 201, "Empleado registrado correctamente", Employee);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// Obtener todos los empleados
export async function getEmployees(req, res) {
  try {
    const [Employees, errorEmployees] = await getEmployeesService();

    if (errorEmployees) return handleErrorClient(res, 404, errorEmployees);

    handleSuccess(res, 200, "Empleados encontrados", Employees);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// Obtener un solo empleado
export async function getEmployee(req, res) {
  try {
    const { id } = req.params;

    // Validar el id utilizando EmployeeQueryValidation
    const { error } = EmployeeQueryValidation.validate({ id });
    if (error) return handleErrorClient(res, 400, error.message);

    const [Employee, errorEmployee] = await getEmployeeService(id);

    if (errorEmployee) return handleErrorClient(res, 404, errorEmployee);

    handleSuccess(res, 200, "Empleado encontrado", Employee);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// Actualizar empleado
export async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    // Validar el id utilizando EmployeeQueryValidation
    const { error: queryError } = EmployeeQueryValidation.validate({ id });
    if (queryError) return handleErrorClient(res, 400, queryError.message);

    // Validar el cuerpo utilizando EmployeeBodyValidation
    const { error: bodyError } = EmployeeBodyValidation.validate(body);
    if (bodyError) return handleErrorClient(res, 400, bodyError.message);

    const [Employee, EmployeeError] = await updateEmployeeService(id, body);

    if (EmployeeError) return handleErrorClient(res, 400, EmployeeError);

    handleSuccess(res, 200, "Empleado actualizado correctamente", Employee);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// Eliminar empleado
export async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;

    // Validar el id utilizando EmployeeQueryValidation
    const { error } = EmployeeQueryValidation.validate({ id });
    if (error) return handleErrorClient(res, 400, error.message);

    const [EmployeeDelete, errorEmployeeDelete] = await deleteEmployeeService(id);

    if (errorEmployeeDelete) return handleErrorClient(res, 404, errorEmployeeDelete);

    handleSuccess(res, 200, "Empleado eliminado correctamente", EmployeeDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
