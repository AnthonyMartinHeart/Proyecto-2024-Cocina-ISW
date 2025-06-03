// src/hooks/useEmployees.jsx
import { useState, useEffect } from 'react';
import { getEmployees } from '@services/employee.service';

const useEmployees = () => {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return { employees, fetchEmployees };
};

export default useEmployees;
