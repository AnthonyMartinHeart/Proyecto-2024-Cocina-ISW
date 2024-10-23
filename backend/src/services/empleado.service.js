"use strict";
import EmpleadoSchema from "../entity/empleado.entity.js";
import { AppDataSource } from "../config/configDb.js";


// Crear empleado
export async function createEmployeesService(data) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    const newEmployee = employeeRepository.create(data);
    const savedEmployee = await employeeRepository.save(newEmployee);
    return [savedEmployee, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Obtener todos los empleados
export async function getEmployeesService() {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    const employees = await employeeRepository.find();
    return [employees, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Obtener un solo empleado
export async function getEmployeeService(id) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    const employee = await employeeRepository.findOne({ where: { id } });
    return [employee, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Actualizar empleado
export async function updateEmployeeService(id, data) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    await employeeRepository.update(id, data);
    const updatedEmployee = await employeeRepository.findOne({ where: { id } });
    return [updatedEmployee, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Eliminar empleado
export async function deleteEmployeeService(id) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    const result = await employeeRepository.delete(id);
    return [result, null];
  } catch (error) {
    return [null, error.message];
  }
}

// Obtener asistencia diaria
export async function getAttendanceService(date) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema);
    const attendanceList = await employeeRepository.find({
      where: { horarioTrabajo: date }, // Ajustar la lógica de la fecha
    });
    return [attendanceList, null];
  } catch (error) {
    return [null, error.message];
  }
}
