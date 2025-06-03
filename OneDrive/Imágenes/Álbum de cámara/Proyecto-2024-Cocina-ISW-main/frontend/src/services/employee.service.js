// src/services/employee.service.js
import axios from './root.service.js';

export async function getEmployees() {
    const { data } = await axios.get('/empleados/name');
    return data.data;
}

export async function getEmployee(id) {
    const { data } = await axios.get(`/empleados/name/${id}`);
    return data.data;
}

export async function createEmployee(employeeData) {
    const response = await axios.post('/empleados/create', employeeData);
    return response.data;
}

export async function updateEmployee(id, employeeData) {
    const response = await axios.put(`/empleados/update/${id}`, employeeData);
    return response.data;
}

export async function deleteEmployee(id) {
    const response = await axios.delete(`/empleados/delete/${id}`);
    return response.data;
}

// Nueva función para obtener la asistencia de todos los empleados
export async function getAttendance() {
    const { data } = await axios.get('/empleados/attendance');
    return data.data;  // Devuelve la lista de registros de asistencia
}
