import EmpleadoSchema from "../entity/empleado.entity.js"; 
import { AppDataSource } from "../config/configDb.js"; 


// Crear empleado
export async function createEmployeesService(data) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema); // Obtener el repositorio
    const newEmployee = employeeRepository.create(data); // Crear la entidad
    const savedEmployee = await employeeRepository.save(newEmployee); // Guardar en la base de datos
    return [savedEmployee, null];
  } catch (error) {
    return [null, error.message]; // Devolver error
  }
}

// Obtener todos los empleados
export async function getEmployeesService() {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema); // Obtener el repositorio
    const employees = await employeeRepository.find(); // Obtener todos los empleados
    return [employees, null];
  } catch (error) {
    return [null, error.message]; // Devolver error
  }
}

// Obtener un solo empleado
export async function getEmployeeService(id) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema); // Obtener el repositorio
    const employee = await employeeRepository.findOneBy({ id }); // Obtener un empleado por ID
    if (!employee) return [null, "Empleado no encontrado"];
    return [employee, null];
  } catch (error) {
    return [null, error.message]; // Devolver error
  }
}

// Actualizar empleado
export async function updateEmployeeService(id, data) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema); // Obtener el repositorio
    const employee = await employeeRepository.findOneBy({ id }); // Buscar el empleado
    if (!employee) return [null, "Empleado no encontrado"];

    // Actualiza la información del empleado
    Object.assign(employee, data); // Mezclar los datos del empleado

    const updatedEmployee = await employeeRepository.save(employee); // Guardar los cambios
    return [updatedEmployee, null];
  } catch (error) {
    return [null, error.message]; // Devolver error
  }
}

// Eliminar empleado
export async function deleteEmployeeService(id) {
  try {
    const employeeRepository = AppDataSource.getRepository(EmpleadoSchema); // Obtener el repositorio
    const employee = await employeeRepository.findOneBy({ id }); // Buscar el empleado
    if (!employee) return [null, "Empleado no encontrado"];

    await employeeRepository.remove(employee); // Eliminar el empleado
    return [employee, null];
  } catch (error) {
    return [null, error.message]; // Devolver error
  }
}
