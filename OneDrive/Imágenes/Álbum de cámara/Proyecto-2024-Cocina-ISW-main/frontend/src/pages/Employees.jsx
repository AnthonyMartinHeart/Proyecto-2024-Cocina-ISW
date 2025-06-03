import React, { useState } from 'react';
import useEmployees from '@hooks/useEmployees';
import PopupEmployee from '@components/PopupEmployee';
import useDeleteEmployee from '@hooks/useDeleteEmployee';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado o si no npm install sweetalert2
import '@styles/employees.css';

const Employees = () => {
    const { employees, fetchEmployees } = useEmployees();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rutFilter, setRutFilter] = useState('');
    const { handleDelete } = useDeleteEmployee(fetchEmployees);

    // Función para manejar la asistencia (presente/ausente)
    const handleAttendance = (employee, isPresent) => {
        // Usamos SweetAlert para mostrar la notificación
        Swal.fire({
            title: isPresent ? '¡Empleado presente!' : '¡Empleado ausente!',
            icon: isPresent ? 'success' : 'error',
            text: `${employee.nombreCompleto} está ahora ${isPresent ? 'presente' : 'ausente'}.`,
        });
    };

    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setIsPopupOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsPopupOpen(true);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.rut.toLowerCase().includes(rutFilter.toLowerCase())
    );

    return (
        <div className="main-container">
            <h1>Gestión de Empleados</h1>
            <input
                type="text"
                value={rutFilter}
                onChange={(e) => setRutFilter(e.target.value)}
                placeholder="Filtrar por RUT"
                className="rut-filter-input"
            />
            <button onClick={handleAddEmployee}>Agregar Empleado</button>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>RUT</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Acciones</th>
                        <th>Asistencia</th> {/* Nueva columna para asistencia */}
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.nombreCompleto}</td>
                            <td>{employee.rut}</td>
                            <td>{employee.email}</td>
                            <td>{employee.cargo}</td>
                            <td>
                                <button
                                    onClick={() => handleEditEmployee(employee)}
                                    className="edit-button"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(employee.id)}
                                    className="delete-button"
                                >
                                    🗑️
                                </button>
                            </td>
                            <td>
                                {/* Botones de asistencia alineados horizontalmente */}
                                <div className="attendance-buttons">
                                    <button
                                        onClick={() => handleAttendance(employee, true)}
                                        className="attendance-button present"
                                        title="Marcar presente"
                                    >
                                        ✅
                                    </button>
                                    <button
                                        onClick={() => handleAttendance(employee, false)}
                                        className="attendance-button absent"
                                        title="Marcar ausente"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isPopupOpen && (
                <PopupEmployee
                    show={isPopupOpen}
                    setShow={setIsPopupOpen}
                    employee={selectedEmployee}
                    onFormSubmit={fetchEmployees}
                />
            )}
        </div>
    );
};

export default Employees;
