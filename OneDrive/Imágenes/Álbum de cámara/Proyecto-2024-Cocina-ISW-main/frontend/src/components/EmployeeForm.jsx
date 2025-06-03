import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '@services/employee.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';
import '@styles/employeeForm.css';

const EmployeeForm = ({ employee, onFormSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        rut: '',
        email: '',
        cargo: '',
        password: '',
        fechaIngreso: '',
        horarioTrabajo: { entrada: '', salida: '' },
        estado: 'activo',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employee) {
            const horario = employee.horarioTrabajo ? employee.horarioTrabajo.split('-') : ['', ''];
            setFormData({
                nombreCompleto: employee.nombreCompleto || '',
                rut: employee.rut || '',
                email: employee.email || '',
                cargo: employee.cargo || 'desconocido',
                password: '',
                fechaIngreso: employee.fechaIngreso || '',
                horarioTrabajo: { entrada: horario[0] || '', salida: horario[1] || '' },
                estado: employee.estado || 'activo',
            });
        }
    }, [employee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, horarioTrabajo: { ...formData.horarioTrabajo, [name]: value } });
        setErrors({ ...errors, horarioTrabajo: '' });
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!formData.nombreCompleto) validationErrors.nombreCompleto = 'El nombre completo es obligatorio.';
        if (!formData.rut) validationErrors.rut = 'El RUT es obligatorio.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'El email debe ser válido.';
        if (!formData.password && !employee) validationErrors.password = 'La contraseña es obligatoria para nuevos empleados.';
        if (!formData.horarioTrabajo.entrada || !formData.horarioTrabajo.salida) validationErrors.horarioTrabajo = 'Las horas de entrada y salida son obligatorias.';
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const horarioTrabajo = `${formData.horarioTrabajo.entrada}-${formData.horarioTrabajo.salida}`;
            const employeeData = { ...formData, horarioTrabajo };
            if (employee && employee.id) {
                await updateEmployee(employee.id, employeeData);
                showSuccessAlert('Empleado actualizado con éxito');
            } else {
                await createEmployee(employeeData);
                showSuccessAlert('Empleado creado con éxito');
            }
            onFormSubmit();
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                showErrorAlert('Error 404', 'No se encontró el recurso solicitado');
            } else {
                showErrorAlert('Error', 'No se pudo procesar la solicitud');
            }
        }
    };

    // Modificamos el generador de opciones de horarios para adaptarnos a los nuevos rangos
    const generateTimeOptions = (isEntrada = true) => {
        const times = [];
        const startHour = isEntrada ? 8 : 12;  // Entrada comienza a las 8:00 AM, Salida a las 12:00 PM
        const endHour = isEntrada ? 12 : 24;   // Entrada hasta las 11:30 AM, Salida hasta la medianoche (00:00 AM)
        
        for (let i = startHour; i < endHour; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = i % 12 === 0 ? 12 : i % 12;  // Para que 12 PM y 12 AM se manejen correctamente
                const minute = String(j).padStart(2, '0');
                const period = i < 12 ? 'AM' : 'PM';
                const time = `${hour}:${minute} ${period}`;
                times.push(time);
            }
        }

        // Para salir a las 00:00 AM
        if (!isEntrada) {
            times.push('00:00 AM');
        }

        return times;
    };

    return (
        <form onSubmit={handleSubmit} className="employee-form">
            <h2>{employee ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
            <div className="form-group">
                <label>Nombre Completo</label>
                <input
                    type="text"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleInputChange}
                    placeholder="Nombre Completo"
                />
                {errors.nombreCompleto && <span className="error">{errors.nombreCompleto}</span>}
            </div>
            <div className="form-group">
                <label>RUT</label>
                <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleInputChange}
                    placeholder="RUT"
                />
                {errors.rut && <span className="error">{errors.rut}</span>}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label>Cargo</label>
                <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    placeholder="Cargo"
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
                <label>Fecha de Ingreso</label>
                <input
                    type="date"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label></label>
                <div className="time-selectors">
                    <div>
                        <label> Horario de Entrada</label>
                        <select
                            name="entrada"
                            value={formData.horarioTrabajo.entrada}
                            onChange={handleScheduleChange}
                        >
                            <option value="">Selecciona una hora</option>
                            {generateTimeOptions(true).map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Horario de Salida</label>
                        <select
                            name="salida"
                            value={formData.horarioTrabajo.salida}
                            onChange={handleScheduleChange}
                        >
                            <option value="">Selecciona una hora</option>
                            {generateTimeOptions(false).map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.horarioTrabajo && <span className="error">{errors.horarioTrabajo}</span>}
            </div>
            <div className="form-group">
                <label>Estado</label>
                <select name="estado" value={formData.estado} onChange={handleInputChange}>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                </select>
            </div>
            <button type="submit" className="submit-button">{employee ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
};

export default EmployeeForm;
