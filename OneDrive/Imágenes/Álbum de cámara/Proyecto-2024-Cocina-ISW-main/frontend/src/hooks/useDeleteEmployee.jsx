// src/hooks/useDeleteEmployee.jsx
import { deleteEmployee } from '@services/employee.service';
import { showErrorAlert, showSuccessAlert, deleteDataAlert } from '@helpers/sweetAlert';

const useDeleteEmployee = (fetchEmployees) => {
    const handleDelete = async (id) => {
        const result = await deleteDataAlert();
        if (result.isConfirmed) {
            try {
                await deleteEmployee(id);
                fetchEmployees();
                showSuccessAlert('Empleado eliminado con éxito');
            } catch (error) {
                showErrorAlert('Error', 'No se pudo eliminar el empleado');
            }
        }
    };

    return { handleDelete };
};

export default useDeleteEmployee;
